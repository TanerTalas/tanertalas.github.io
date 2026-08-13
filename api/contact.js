// Serverless endpoint behind the contact form. Validates the submission and
// hands it to Resend, which delivers it to my inbox.
//
// Environment variables (set them in the Vercel project settings):
//   RESEND_API_KEY      required — API key from https://resend.com
//   CONTACT_TO_EMAIL    optional — inbox that receives the messages
//   CONTACT_FROM_EMAIL  optional — verified sender; the Resend sandbox by default

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "tanertalas.dev@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keeps submitted text from being interpreted as markup in the HTML mail body.
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
