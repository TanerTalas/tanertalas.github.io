import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/navLinks.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";

// Fixed top navigation: section links with scroll-spy highlight, a light/dark
// toggle, and a hamburger menu that collapses the links on small screens.
// On the home page it tracks sections; on other routes it links back home.
export default function Navbar({ onToggleTheme, isDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeHover, setThemeHover] = useState(false);
  const onHome = useLocation().pathname === "/";

  // The sun/moon face flips with the theme; hovering previews the opposite face.
  const themeFlip = (isDark ? 180 : 0) + (themeHover ? 180 : 0);

  // Home: in-page anchors with scroll-spy. Elsewhere: a slim link back home.
  const links = onHome
    ? navLinks.map((link) => ({ ...link, href: `#${link.id}` }))
    : [
        { id: "header", label: "Home", href: "/" },
        { id: "contact", label: "Contact", href: "/#contact" },
      ];

  const sectionIds = navLinks.map((link) => link.id);
  const activeId = useScrollSpy(onHome ? sectionIds : []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[2000] flex h-[72px] items-center justify-center bg-[var(--nav-bg)] backdrop-blur-md transition-[background] duration-1000">
      <div className="relative flex w-full max-w-[1200px] items-center gap-6 px-6">
        {/* Logo */}
        <Link to="/" className="mr-auto shrink-0">
          <img
            src="/img/icons/logo.svg"
            alt="Logo"
            className="w-11 [filter:var(--icon-invert)] transition-[filter] duration-1000"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = onHome && activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`inline-block rounded-full px-3.5 py-2 font-display text-[0.95rem] font-medium transition-colors duration-200 ${
                    active
                      ? "bg-accent text-white"
                      : "text-ink hover:bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] hover:text-accent"
                  }`}
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
          onMouseEnter={() => setThemeHover(true)}
          onMouseLeave={() => setThemeHover(false)}
          aria-label="Toggle light/dark mode"
          className="cursor-pointer [perspective:600px]"
        >
          <span
            className="relative block h-11 w-11 [transform-style:preserve-3d] transition-transform duration-500"
            style={{ transform: `rotateX(${themeFlip}deg)` }}
          >
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
          className="cursor-pointer md:hidden"
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
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full px-4 py-2.5 font-display font-medium text-ink transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] hover:text-accent"
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
