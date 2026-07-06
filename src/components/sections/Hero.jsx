import { useEffect, useRef, useState } from "react";
import Clouds from "../effects/Clouds.jsx";
import { useTypewriter } from "../../hooks/useTypewriter.js";
import "./Hero.css";

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
    <header id="header" className="hero">
      <div ref={contentRef} className="hero__inner">
        {/* Hero left: intro copy */}
        <div className="hero__intro" style={enterStyle()}>
          <p className="hero__prompt">~/taner-talas $ whoami</p>
          <h1 className="hero__title">
            <span>Hello, I'm Taner</span>
            <br />
            <span className="hero__role">{typed}</span>
            <span className="hero__caret">|</span>
          </h1>
          <p className="hero__lead">
            I'm constantly improving myself by learning new things. Moreover, I designed and coded
            this website entirely myself!
          </p>
          <div className="hero__socials">
            <a
              href="https://github.com/TanerTalas"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social hero__social--gh"
            >
              <img src="/img/icons/social/github-hero.svg" alt="Github Icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/tanertalas/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social hero__social--li"
            >
              <img src="/img/icons/social/linkedin-hero.svg" alt="Linkedin Icon" />
            </a>
          </div>
          <a href="#about" className="hero__cta">
            Continue
          </a>
        </div>

        {/* Hero right: floating avatar (hidden below lg) */}
        <div className="hero__avatar-wrap" style={enterStyle("0.1s")}>
          <img src="/img/avatar.svg" alt="" className="hero__avatar" />
        </div>
      </div>

      <Clouds />
    </header>
  );
}
