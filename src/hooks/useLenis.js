import { useEffect } from "react";
import Lenis from "lenis";

// Module-level handle so non-React code (route-change jumps in App) can drive the
// same Lenis instance that the hook owns.
let lenis = null;
export function getLenis() {
  return lenis;
}

// Boots Lenis smooth-scroll once for the app: runs its RAF loop, routes in-page
// anchor clicks through `lenis.scrollTo` (so they animate instead of jumping),
// and tears everything down on unmount.
export function useLenis() {
  useEffect(() => {
    lenis = new Lenis();

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Delegate same-page hash-anchor clicks. Links whose target isn't on the
    // current page (e.g. "/#contact" from another route) fall through to the
    // browser so normal navigation still happens.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = e.target.closest?.('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (hash.length < 2) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target);
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}
