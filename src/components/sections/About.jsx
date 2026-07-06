import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import "./About.css";

// Quick-facts shown in the dark side card.
const facts = [
  { key: '"education":', value: "Computer Programming, Istanbul Gedik University" },
  { key: '"focus":', value: "Fullstack web development" },
  { key: '"long_term":', value: "Artificial intelligence" },
];

// About section: a short bio card next to a JSON-styled "quick facts" panel.
export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <SectionHeading eyebrow="01 · about-me" title="Behind the Screen" variant="paper" />

        <div className="about__grid">
          {/* Bio card */}
          <Reveal>
            <div className="about__bio">
              <h3 className="about__bio-title">Frontend roots, fullstack ambitions</h3>
              <p className="about__bio-text">
                I'm a final-year Computer Programming student at Istanbul Gedik University. I started
                with front-end development and learned it in depth. Now I'm expanding into back-end
                technologies to become a well-rounded fullstack developer.
              </p>
              <p className="about__bio-text">
                I develop well-crafted projects by paying attention to design principles and writing
                clean, organized code. I make sure to fully understand every language or tool I learn
                before moving on to the next one.
              </p>
            </div>
          </Reveal>

          {/* Quick-facts card */}
          <Reveal delay={150}>
            <div className="about__facts">
              <p className="about__facts-file">// quick-facts.json</p>
              {facts.map((fact) => (
                <div key={fact.key} className="about__fact">
                  <span className="about__fact-key">{fact.key}</span>
                  <span className="about__fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
