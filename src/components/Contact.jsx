import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const EMAIL = "tanertalas.dev@gmail.com";

// Contact section — a dark call-to-action card with an email button and social links.
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex justify-center bg-paper py-24 pb-30 transition-[background] duration-1000"
    >
      <div className="w-full max-w-[1200px] px-6">
        <SectionHeading eyebrow="05 · contact" title="Let's Build Something" variant="paper" />

        <Reveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-navy p-8 transition-[background] duration-1000 md:grid-cols-[1.2fr_1fr] md:p-12">
            {/* Pitch + email */}
            <div className="flex flex-col gap-4">
              <p className="m-0 max-w-[440px] text-[1.3rem] leading-[1.5] text-[#F2F5FA]">
                I'm always open to new projects and opportunities — drop me a line and let's talk.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex w-max items-center gap-3 rounded-full bg-[#F2F5FA] px-7 py-3.5 font-display text-[1.1rem] font-semibold text-[#0B1D33] transition-[transform,translate,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
              >
                <img src="/img/icons/mailcontact.svg" alt="" className="w-[22px] [filter:invert(1)]" />
                {EMAIL}
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/TanerTalas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[14px] border border-[var(--glass-border)] bg-[var(--glass)] px-5 py-3.5 font-mono text-base text-[#F2F5FA] transition-transform duration-300 hover:translate-x-1.5"
              >
                <img src="/img/icons/githubcontact.svg" alt="" className="w-6" />
                Github / TanerTalas
              </a>
              <a
                href="https://www.linkedin.com/in/taner-talas-a43a2236a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[14px] border border-[var(--glass-border)] bg-[var(--glass)] px-5 py-3.5 font-mono text-base text-[#F2F5FA] transition-transform duration-300 hover:translate-x-1.5"
              >
                <img src="/img/icons/linkedincontact.svg" alt="" className="w-6" />
                LinkedIn / Taner Talas
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
