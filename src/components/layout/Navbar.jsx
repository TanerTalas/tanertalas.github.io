import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navLinks.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import "./Navbar.css";

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
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/img/icons/brand/logo.svg" alt="Logo" className="navbar__logo-img" />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map((link) => {
            const active = onHome && activeId === link.id;
            return (
              <li key={link.id}>
                <a href={link.href} className={`nav-link${active ? " nav-link--active" : ""}`}>
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
          className="theme-toggle"
        >
          <span className="theme-toggle__face" style={{ transform: `rotateX(${themeFlip}deg)` }}>
            <img
              src="/img/icons/theme/sun-up.svg"
              alt="light mode"
              className="theme-toggle__icon"
            />
            <img
              src="/img/icons/theme/sun-down.svg"
              alt="dark mode"
              className="theme-toggle__icon theme-toggle__icon--dark"
            />
          </span>
        </button>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="navbar__hamburger"
        >
          <img
            src={menuOpen ? "/img/icons/ui/close.svg" : "/img/icons/ui/menu.svg"}
            alt=""
            className="navbar__hamburger-img"
          />
        </button>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <ul className="navbar__menu">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="navbar__menu-link"
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
