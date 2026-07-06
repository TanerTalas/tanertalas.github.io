import { useEffect, useRef } from "react";
import "./Clouds.css";

// Eight layered cloud SVGs that fan in on load and drift with a parallax offset
// as the page scrolls. Each layer moves at a different `depth` for a sense of distance.
// `data-cloud` lets the theme toggle repoint each layer at its light/dark variant.
const layers = [
  { cloud: 8, depth: 0.015, z: 1, float: "7s", delay: "0s" },
  { cloud: 7, depth: 0.03, z: 2, float: "7s", delay: "0.5s" },
  { cloud: 6, depth: 0.045, z: 3, float: "7s", delay: "1s" },
  { cloud: 5, depth: 0.06, z: 4, float: "8s", delay: "1.5s" },
  { cloud: 4, depth: 0.075, z: 5, float: "8s", delay: "2s" },
  { cloud: 3, depth: 0.09, z: 6, float: "9s", delay: "2.5s" },
  { cloud: 2, depth: 0.105, z: 7, float: "9s", delay: "3s" },
  { cloud: 1, depth: 0.12, z: 8, float: "10s", delay: "3.5s" },
];

export default function Clouds() {
  const wrapRefs = useRef([]);
  const enteredRef = useRef(0);

  useEffect(() => {
    // Staggered entrance from below.
    const timers = layers.map((layer, idx) =>
      setTimeout(() => {
        enteredRef.current = Math.max(enteredRef.current, idx + 1);
        const wrap = wrapRefs.current[idx];
        if (wrap) {
          wrap.style.opacity = "1";
          wrap.style.transform = `translateY(${window.scrollY * layer.depth}px)`;
        }
      }, 200 + idx * 120),
    );

    // Parallax: shift each entered layer proportional to scroll depth.
    const onScroll = () => {
      const y = window.scrollY;
      layers.forEach((layer, idx) => {
        if (idx < enteredRef.current) {
          const wrap = wrapRefs.current[idx];
          if (wrap) wrap.style.transform = `translateY(${y * layer.depth}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {layers.map((layer, idx) => (
        <div
          key={layer.cloud}
          ref={(el) => (wrapRefs.current[idx] = el)}
          className="cloud"
          style={{ zIndex: layer.z }}
        >
          <img
            src={`/img/clouds/light/${layer.cloud}.svg`}
            data-cloud={layer.cloud}
            alt=""
            className="cloud__img"
            style={{ animation: `cloudFloat ${layer.float} ease-in-out infinite`, animationDelay: layer.delay }}
          />
        </div>
      ))}
    </>
  );
}
