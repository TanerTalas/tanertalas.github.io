// Serverless endpoint behind the contact form. Screens the submission for spam,
// validates it, then hands it to Resend, which delivers it to my inbox.
//
// Environment variables (set them in the Vercel project settings):
//   RESEND_API_KEY        required — API key from https://resend.com
//   TURNSTILE_SECRET_KEY  required in production — secret half of the Cloudflare
//                         Turnstile key pair; its public half is baked into the
//                         client as VITE_TURNSTILE_SITE_KEY
//   CONTACT_TO_EMAIL      optional — inbox that receives the messages
//   CONTACT_FROM_EMAIL    optional — verified sender; the Resend sandbox by default

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "tanertalas.dev@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-IP throttle. This lives in the instance's memory, so it only covers bursts
// that hit one warm instance — a deliberate floor, not a guarantee. Vercel's
// firewall rate-limiting rules are the durable layer above it.
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();

  // Drop expired buckets so the map cannot grow without bound.
  for (const [key, times] of hits) {
    const fresh = times.filter((t) => now - t < RATE_LIMIT.windowMs);
    if (fresh.length) hits.set(key, fresh);
    else hits.delete(key);
  }

  const times = hits.get(ip) || [];
  if (times.length >= RATE_LIMIT.max) return true;

  hits.set(ip, [...times, now]);
  return false;
}

// Keeps submitted text from being interpreted as markup in the HTML mail body.
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Asks Cloudflare whether the token the browser solved is genuine and unspent.
async function verifyTurnstile(token, ip) {
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const result = await response.json().catch(() => ({}));
  if (!result.success) {
    console.warn("Turnstile rejected a submission:", result["error-codes"]);
  }
  return Boolean(result.success);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Vercel parses JSON bodies for us, but be tolerant of a raw string.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid request body." });
    }
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";

  // Honeypot: a real visitor never sees this field. Answer as if the message
  // went through so the sender learns nothing about why it was dropped.
  if (String(body?.company ?? "").trim()) {
    console.warn("Dropped a honeypot submission from", ip);
    return res.status(200).json({ ok: true });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in every field." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ error: "That message is too long." });
  }

  // Only well-formed attempts count against the quota, so a visitor fixing a
  // typo is never throttled for it.
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  // The challenge is enforced whenever a secret is configured. Without one the
  // endpoint still works (handy for local runs) but is left wide open, so say so.
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = String(body?.turnstileToken ?? "").trim();
    if (!token) {
      return res.status(400).json({ error: "Please complete the anti-spam check." });
    }
    if (!(await verifyTurnstile(token, ip))) {
      return res.status(403).json({ error: "Anti-spam check failed. Please try again." });
    }
  } else {
    console.warn("TURNSTILE_SECRET_KEY is not set; the contact form is unprotected.");
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; cannot send contact mail.");
    return res.status(500).json({ error: "Mail is not configured yet. Please email me directly." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message:", response.status, detail);
      return res.status(502).json({ error: "Could not send the message. Please try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact mail failed:", err);
    return res.status(500).json({ error: "Could not send the message. Please try again." });
  }
}
