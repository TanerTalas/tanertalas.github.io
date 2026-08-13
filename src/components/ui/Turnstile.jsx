import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// The Cloudflare script is shared by every widget on the page, so load it once
// and hand the same promise to any later caller.
let scriptPromise = null;

function loadTurnstile() {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => reject(new Error("Turnstile failed to load."));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

// Cloudflare Turnstile challenge, rendered explicitly so we control its
// lifecycle. `onToken` receives the solved token, or "" whenever the challenge
// expires, errors, or is reset. Bumping `resetKey` clears a spent token —
// Turnstile tokens are single-use, so the widget must be reset after each POST.
export default function Turnstile({ siteKey, onToken, resetKey = 0 }) {
  const hostRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Kept in a ref so a changing callback identity never re-renders the widget.
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey) return undefined;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !hostRef.current || widgetIdRef.current !== null) return;

        widgetIdRef.current = turnstile.render(hostRef.current, {
          sitekey: siteKey,
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch(() => onTokenRef.current(""));

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  // Ask for a fresh challenge after a submit consumed the previous token.
  useEffect(() => {
    if (!resetKey || widgetIdRef.current === null || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenRef.current("");
  }, [resetKey]);

  if (!siteKey) return null;

  return <div ref={hostRef} className="contact__turnstile" />;
}
