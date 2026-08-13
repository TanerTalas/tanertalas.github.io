import { useState } from "react";
import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import "./Contact.css";

const EMAIL = "tanertalas.dev@gmail.com";

// Contact section: a dark card pairing my direct links with a message form.
// The form posts to /api/contact, which relays the message to my inbox.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const sendLabel = {
    idle: "Send message",
    sending: "Sending…",
    sent: "Message sent",
    error: "Try again",
  }[status];

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <SectionHeading title="Let's Build Something" variant="paper" />

        <Reveal>
          <div className="contact__card">
            {/* Pitch + direct links */}
            <div className="contact__pitch">
              <p className="contact__lead">
                I'm always open to new projects and opportunities. Drop me a line and let's talk.
              </p>

              <div className="contact__links">
                <a href={`mailto:${EMAIL}`} className="contact__link">
                  <img src="/img/icons/ui/mail.svg" alt="" className="contact__link-icon" />
                  {EMAIL}
                </a>
                <a
                  href="https://github.com/TanerTalas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <img
                    src="/img/icons/social/github-contact.svg"
                    alt=""
                    className="contact__link-icon"
                  />
                  Github / TanerTalas
                </a>
                <a
                  href="https://www.linkedin.com/in/tanertalas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <img
                    src="/img/icons/social/linkedin-contact.svg"
                    alt=""
                    className="contact__link-icon"
                  />
                  LinkedIn / Taner Talas
                </a>
              </div>
            </div>

            {/* Message form */}
            <form onSubmit={onSubmit} className="contact__form">
              <label className="contact__field">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="contact__input"
                />
              </label>

              <label className="contact__field">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="contact__input"
                />
              </label>

              <label className="contact__field">
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={5000}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are you working on?"
                  className="contact__input contact__textarea"
                />
              </label>

              <button type="submit" disabled={status === "sending"} className="contact__submit">
                {sendLabel}
              </button>

              {status === "sent" && (
                <p className="contact__status" role="status">
                  Thanks — I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="contact__status contact__status--error" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
