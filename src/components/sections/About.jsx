import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import "./About.css";

// Quick facts listed under the years-of-experience stat in the dark side card.
const facts = [
  { label: "Education", value: "Computer Programming, Istanbul Gedik University" },
  { label: "Focus", value: "Fullstack web development" },
];

// About section: a short bio card next to a dark stat panel.
export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <SectionHeading title="Behind the Screen" variant="paper" />

        <div className="about__grid">
          {/* Bio card */}
          <Reveal className="about__col about__col--bio">
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

          {/* Stat + quick-facts card */}
          <Reveal delay={150} className="about__col about__col--facts">
            <div className="about__facts">
              <div>
                <div className="about__stat">4+</div>
                <div className="about__stat-label">years writing software</div>
              </div>

              <div className="about__fact-list">
                {facts.map((fact) => (
                  <div key={fact.label} className="about__fact">
                    <span className="about__fact-label">{fact.label}</span>
                    <span className="about__fact-value">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
