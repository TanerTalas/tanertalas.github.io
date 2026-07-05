import { useEffect, useRef, useState } from "react";
import Clouds from "./Clouds.jsx";
import { useTypewriter } from "../hooks/useTypewriter.js";

// Landing hero: terminal-style intro, self-typing role headline, floating avatar,
// and the parallax cloudscape. The whole content block eases in on load and
// drifts/fades as the visitor scrolls past.
export default function Hero() {
  const typed = useTypewriter("I'm a Fullstack Developer", { startDelay: 1500, speed: 90 });
  const [entered, setEntered] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);

    const onScroll = () => {
      const y = window.scrollY;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.25}px)`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 700));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const enterStyle = (extraDelay = "0s") => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
    transitionDelay: extraDelay,
  });

  return (
    <header
      id="header"
      className="relative mt-[72px] flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-header-bg transition-[background] duration-1000"
    >
      <div
        ref={contentRef}
        className="relative z-[9] grid w-full max-w-[1200px] grid-cols-1 items-center justify-items-center gap-10 px-6 py-8 md:grid-cols-2"
      >
        {/* Hero left — intro copy */}
        <div className="justify-self-start" style={enterStyle()}>
          <p className="mb-3 font-mono text-base text-white/85">~/taner-talas $ whoami</p>
          <h1 className="mb-4 font-display text-[2.6rem] font-bold leading-none text-white [text-shadow:0_0_2px_rgba(0,0,0,0.2)] sm:text-[3.6rem]">
            <span>Hello, I'm Taner</span>
            <br />
            <span className="text-[2rem] leading-[1.15] text-[#1d4ed8] sm:text-[2.7rem]">{typed}</span>
            <span className="ml-0.5 inline-block animate-[blink_0.8s_infinite] text-[2rem] text-[#1d4ed8] sm:text-[2.7rem]">
              |
            </span>
          </h1>
          <p className="mb-6 max-w-[460px] text-xl leading-snug text-white [text-shadow:0_0_8px_rgba(0,0,0,0.2)]">
            I'm constantly improving myself by learning new things. Moreover, I designed and coded
            this website entirely myself!
          </p>
          <div className="mb-6 flex items-center gap-4">
            <a
              href="https://github.com/TanerTalas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform duration-300 hover:-rotate-6 hover:scale-125"
            >
              <img src="/img/icons/githubhero.svg" alt="Github Icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/taner-talas-a43a2236a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform duration-300 hover:rotate-6 hover:scale-125"
            >
              <img src="/img/icons/linkedinhero.svg" alt="Linkedin Icon" />
            </a>
          </div>
          <a
            href="#about"
            className="inline-block rounded-full bg-accent px-14 py-4 font-display text-[1.05rem] font-semibold text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.25)] active:translate-y-0"
          >
            Continue
          </a>
        </div>

        {/* Hero right — floating avatar */}
        <div className="z-[6] flex w-full items-center justify-center" style={enterStyle("0.1s")}>
          <img
            src="/img/avatar.svg"
            alt=""
            className="block w-full [animation:avatarFloat_7s_ease-in-out_infinite]"
          />
        </div>
      </div>

      <Clouds />
    </header>
  );
}
