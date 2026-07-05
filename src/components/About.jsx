import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

// Quick-facts shown in the dark side card.
const facts = [
  { key: '"education":', value: "Computer Programming, Istanbul Gedik University" },
  { key: '"focus":', value: "Fullstack web development" },
  { key: '"currently_learning":', value: "Node.js · Express · MongoDB" },
  { key: '"long_term":', value: "Artificial intelligence" },
];

// About section — a short bio card next to a JSON-styled "quick facts" panel.
export default function About() {
  return (
    <section
      id="about"
      className="relative flex justify-center bg-paper py-24 transition-[background] duration-1000"
    >
      <div className="w-full max-w-[1200px] px-6">
        <SectionHeading eyebrow="01 · about-me" title="Behind the Screen" variant="paper" />

        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-[1.4fr_1fr]">
          {/* Bio card */}
          <Reveal>
            <div className="box-border h-full rounded-[20px] border border-[var(--chip-border)] bg-card p-9 shadow-[0_4px_16px_rgba(22,35,59,0.07)] transition-[background] duration-1000">
              <h3 className="mb-4 font-display text-[1.6rem] font-semibold text-ink transition-[color] duration-1000">
                Frontend roots, fullstack ambitions
              </h3>
              <p className="mb-4 text-[1.15rem] leading-[1.7] text-muted transition-[color] duration-1000">
                I'm a final-year Computer Programming student at Istanbul Gedik University. I started
                with front-end development and learned it in depth — now I'm expanding into back-end
                technologies to become a well-rounded fullstack developer.
              </p>
              <p className="text-[1.15rem] leading-[1.7] text-muted transition-[color] duration-1000">
                I develop well-crafted projects by paying attention to design principles and writing
                clean, organized code. I make sure to fully understand every language or tool I learn
                before moving on to the next one.
              </p>
            </div>
          </Reveal>

          {/* Quick-facts card */}
          <Reveal delay={150}>
            <div className="box-border flex h-full flex-col gap-[18px] rounded-[20px] bg-navy p-7 transition-[background] duration-1000">
              <p className="m-0 font-mono text-[0.9rem] text-[#7FB4F5]">// quick-facts.json</p>
              {facts.map((fact) => (
                <div key={fact.key} className="flex flex-col gap-1">
                  <span className="font-mono text-[0.85rem] text-[#7FB4F5]">{fact.key}</span>
                  <span className="text-[1.05rem] font-medium text-[#F2F5FA]">{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
