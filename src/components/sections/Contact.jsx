import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import "./Contact.css";

const EMAIL = "tanertalas.dev@gmail.com";

// Contact section: a dark call-to-action card with an email button and social links.
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <SectionHeading eyebrow="05 · contact" title="Let's Build Something" variant="paper" />

        <Reveal>
          <div className="contact__card">
            {/* Pitch + email */}
            <div className="contact__pitch">
              <p className="contact__lead">
                I'm always open to new projects and opportunities. Drop me a line and let's talk.
              </p>
              <a href={`mailto:${EMAIL}`} className="contact__email">
                <img src="/img/icons/ui/mail.svg" alt="" className="contact__email-icon" />
                {EMAIL}
              </a>
            </div>

            {/* Social links */}
            <div className="contact__socials">
              <a
                href="https://github.com/TanerTalas"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social"
              >
                <img src="/img/icons/social/github-contact.svg" alt="" className="contact__social-icon" />
                Github / TanerTalas
              </a>
              <a
                href="https://www.linkedin.com/in/tanertalas/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social"
              >
                <img src="/img/icons/social/linkedin-contact.svg" alt="" className="contact__social-icon" />
                LinkedIn / Taner Talas
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
