import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import { useTheme } from "./hooks/useTheme.js";

// Handle scroll position when the route changes. Same-page anchor clicks (only the
// hash changes) are left to the browser's native smooth scroll. On a page change we
// jump instantly: to the #hash target once its section has mounted (SPA content
// isn't there for the browser's own hash scroll), or to the top otherwise.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    const pathChanged = lastPath.current !== pathname;
    lastPath.current = pathname;
    if (!pathChanged) return;

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        const root = document.documentElement;
        const prev = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        requestAnimationFrame(() => {
          target.scrollIntoView();
          root.style.scrollBehavior = prev;
        });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <ScrollToTop />
      <Navbar onToggleTheme={toggle} isDark={isDark} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
