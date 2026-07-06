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
              <h3 className="about__bio-title">Always learning, never finished</h3>
              <p className="about__bio-text">
                With over four years of software experience, I'm on a learning journey that never
                stops. Technology keeps moving, and I like to move with it. Whenever I run into
                something I don't know, I stay curious about it, research it, dig into the details,
                and keep going until I truly understand how and why it works.
              </p>
              <p className="about__bio-text">
                That same mindset shapes the way I build. I care about writing clean, organized code
                and giving every project a sense of structure and beauty. For me, good work isn't
                just about making something function; it's about crafting an experience that feels
                polished and intentional, and carrying that quality all the way through to the person
                using it.
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
