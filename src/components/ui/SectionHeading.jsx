import Reveal from "./Reveal.jsx";
import "./SectionHeading.css";

// Shared section header: a monospace "NN · slug" chip above a large display title.
// `variant` switches the palette for light ("paper") vs. dark ("navy") sections.
export default function SectionHeading({ eyebrow, title, variant = "paper" }) {
  const v = variant === "paper" ? "paper" : "navy";

  return (
    <Reveal className="section-heading">
      <span className={`section-heading__eyebrow section-heading__eyebrow--${v}`}>{eyebrow}</span>
      <h2 className={`section-heading__title section-heading__title--${v}`}>{title}</h2>
    </Reveal>
  );
}
