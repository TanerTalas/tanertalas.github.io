import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import { frontendSkills, backendSkills, toolSkills, otherSkills } from "../../data/skills.js";
import "./Stack.css";

// A tag-style label like <frontend /> used as each card's header.
function TagLabel({ children }) {
  return <span className="tag-label">{children}</span>;
}

// A single skill tile (icon + name) with a lift-on-hover.
function SkillTile({ skill, tilt = "-2deg" }) {
  return (
    <div
      className="skill-tile"
      onMouseEnter={(e) => (e.currentTarget.style.transform = `translateY(-8px) rotate(${tilt})`)}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      <img src={skill.icon} alt={skill.name} className="skill-tile__icon" />
      <span className="skill-tile__name">{skill.name}</span>
    </div>
  );
}

// A rounded pill (icon + name) used in the everyday-tools and other rows.
function SkillPill({ skill }) {
  return (
    <div className="skill-pill">
      <img src={skill.icon} alt={skill.name} className="skill-pill__icon" />
      <span className="skill-pill__name">{skill.name}</span>
    </div>
  );
}

// Stack section: frontend / backend skill grids plus everyday-tools and other pill rows.
export default function Stack() {
  return (
    <section id="skills" className="stack">
      <div className="stack__inner">
        <SectionHeading eyebrow="02 · my-stack" title="Tools I Build With" variant="navy" />

        <div className="stack__grid">
          {/* Card 1: frontend */}
          <Reveal>
            <div className="stack-card">
              <div className="stack-card__head">
                <TagLabel>&lt;frontend /&gt;</TagLabel>
                <span className="stack-card__hint">what users see</span>
              </div>
              <div className="stack-card__tiles">
                {frontendSkills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} tilt="-2deg" />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 2: backend */}
          <Reveal delay={120}>
            <div className="stack-card">
              <div className="stack-card__head">
                <TagLabel>&lt;backend /&gt;</TagLabel>
                <span className="stack-card__hint">what runs behind</span>
              </div>
              <div className="stack-card__tiles">
                {backendSkills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} tilt="2deg" />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 3: everyday tools (full width) */}
          <Reveal delay={200} className="stack__full">
            <div className="stack-row">
              <TagLabel>&lt;everyday-tools /&gt;</TagLabel>
              <div className="stack-row__pills">
                {toolSkills.map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 4: other (full width) */}
          <Reveal delay={280} className="stack__full">
            <div className="stack-row">
              <TagLabel>&lt;other /&gt;</TagLabel>
              <div className="stack-row__pills">
                {otherSkills.map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
