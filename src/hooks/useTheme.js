import { useCallback, useEffect, useState } from "react";

// Owns light/dark mode. Toggling flips the `dark` class on <html> (which swaps every
// CSS theme variable) and repoints the parallax cloud SVGs at their light/dark variants.
export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  const swapClouds = useCallback((dark) => {
    document.querySelectorAll("[data-cloud]").forEach((img) => {
      img.src = `/img/clouds/${dark ? "dark" : "light"}/${img.dataset.cloud}.svg`;
    });
  }, []);

  const toggle = useCallback(() => {
    const dark = document.documentElement.classList.toggle("dark");
    setIsDark(dark);
    swapClouds(dark);
  }, [swapClouds]);

  // Keep clouds in sync if the theme was restored before the header mounted.
  useEffect(() => {
    if (isDark) swapClouds(true);
  }, [isDark, swapClouds]);

  return { isDark, toggle };
}
