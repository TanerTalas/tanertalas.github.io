import { useInView } from "../hooks/useInView.js";

// Fades + slides its children up the first time they enter the viewport.
// `delay` (ms) staggers reveals within the same row of cards.
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
