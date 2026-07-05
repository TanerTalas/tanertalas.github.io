import Reveal from "./Reveal.jsx";

// Shared section header: a monospace "NN · slug" chip above a large display title.
// `variant` switches the palette for light ("paper") vs. dark ("navy") sections.
export default function SectionHeading({ eyebrow, title, variant = "paper" }) {
  const paper = variant === "paper";

  return (
    <Reveal className="mb-11 flex flex-col items-start gap-2.5">
      <span
        className="rounded-full border px-4 py-1.5 font-mono text-[0.95rem]"
        style={
          paper
            ? { color: "var(--accent)", borderColor: "var(--chip-border)", background: "var(--card)" }
            : { color: "#7FB4F5", borderColor: "var(--glass-border)", background: "var(--glass)" }
        }
      >
        {eyebrow}
      </span>
      <h2
        className="m-0 font-display text-[2.2rem] font-bold leading-[1.1] transition-[color] duration-1000 sm:text-[3rem]"
        style={{ color: paper ? "var(--ink)" : "#F2F5FA" }}
      >
        {title}
      </h2>
    </Reveal>
  );
}
