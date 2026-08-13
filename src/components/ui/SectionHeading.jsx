import Reveal from "./Reveal.jsx";
import "./SectionHeading.css";

// Shared section header: a single large display title.
// `variant` switches the palette for light ("paper") vs. dark ("navy") sections.
export default function SectionHeading({ title, variant = "paper" }) {
  const v = variant === "paper" ? "paper" : "navy";

  return (
    <Reveal className="section-heading">
      <h2 className={`section-heading__title section-heading__title--${v}`}>{title}</h2>
    </Reveal>
  );
}
