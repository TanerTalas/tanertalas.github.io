import { useState } from "react";
import { navLinks } from "../data/navLinks.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";

// Fixed top navigation: section links with scroll-spy highlight, a light/dark
// toggle, and a hamburger menu that collapses the links on small screens.
export default function Navbar({ onToggleTheme, spy = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.id);
  const activeId = useScrollSpy(spy ? sectionIds : []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[2000] flex h-[72px] items-center justify-center bg-[var(--nav-bg)] backdrop-blur-md transition-[background] duration-1000">
      <div className="relative flex w-full max-w-[1200px] items-center gap-6 px-6">
        {/* Logo */}
        <a href="#header" className="mr-auto shrink-0">
          <img
            src="/img/icons/logo.svg"
            alt="Logo"
            className="w-11 [filter:var(--icon-invert)] transition-[filter] duration-1000"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = spy && activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="inline-block rounded-full px-3.5 py-2 font-display text-[0.95rem] font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: active ? "var(--accent)" : "transparent",
                    color: active ? "#ffffff" : "var(--ink)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle light/dark mode"
          className="[perspective:600px]"
        >
          <span className="relative block h-11 w-11 [transform-style:preserve-3d] [transform:var(--theme-rot)] transition-transform duration-500">
            <img
              src="/img/icons/sunup.svg"
              alt="light mode"
              className="absolute inset-0 h-11 w-11 [backface-visibility:hidden]"
            />
            <img
              src="/img/icons/sundown.svg"
              alt="dark mode"
              className="absolute inset-0 h-11 w-11 [backface-visibility:hidden] [transform:rotateX(180deg)] [filter:var(--icon-invert)]"
            />
          </span>
        </button>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          <img
            src={menuOpen ? "/img/icons/close.svg" : "/img/icons/menuicon.svg"}
            alt=""
            className="w-8 [filter:var(--icon-invert)]"
          />
        </button>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <ul className="absolute inset-x-4 top-[68px] flex flex-col gap-1 rounded-2xl border border-[var(--chip-border)] bg-[var(--card)] p-3 shadow-xl md:hidden">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full px-4 py-2.5 font-display font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
