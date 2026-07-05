import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { frontendSkills, backendSkills, toolSkills } from "../data/skills.js";

// A tag-style label like <frontend /> used as each card's header.
function TagLabel({ children }) {
  return (
    <span className="rounded-lg bg-[rgba(127,180,245,0.14)] px-3.5 py-[5px] font-mono text-[1.05rem] text-[#F2F5FA]">
      {children}
    </span>
  );
}

// A single skill tile (icon + name) with a lift-on-hover; backend tiles show a "learning" badge.
function SkillTile({ skill, tilt = "-2deg" }) {
  return (
    <div
      className="relative flex cursor-default flex-col items-center gap-2.5 rounded-[14px] bg-[#F6F8FC] px-2.5 py-[18px] transition-[transform,box-shadow] duration-[250ms] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
      onMouseEnter={(e) => (e.currentTarget.style.transform = `translateY(-8px) rotate(${tilt})`)}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      <img src={skill.icon} alt={skill.name} className="h-10 w-10" />
      <span className="font-display text-[0.95rem] font-semibold text-[#16233B]">{skill.name}</span>
      {skill.learning && (
        <span className="absolute -right-1.5 -top-2 rounded-full bg-accent px-2 py-[3px] font-mono text-[0.65rem] text-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
          learning
        </span>
      )}
    </div>
  );
}

// Stack section — frontend / backend skill grids plus an everyday-tools pill row.
export default function Stack() {
  return (
    <section
      id="skills"
      className="relative flex justify-center bg-navy py-24 transition-[background] duration-1000"
    >
      <div className="w-full max-w-[1200px] px-6">
        <SectionHeading eyebrow="02 · my-stack" title="Tools I Build With" variant="navy" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 — frontend */}
          <Reveal>
            <div className="box-border h-full rounded-[20px] border border-[var(--glass-border)] bg-[var(--glass)] p-7">
              <div className="mb-5 flex items-baseline gap-3">
                <TagLabel>&lt;frontend /&gt;</TagLabel>
                <span className="text-[0.95rem] text-[rgba(242,245,250,0.6)]">what users see</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {frontendSkills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} tilt="-2deg" />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 2 — backend */}
          <Reveal delay={120}>
            <div className="box-border h-full rounded-[20px] border border-[var(--glass-border)] bg-[var(--glass)] p-7">
              <div className="mb-5 flex items-baseline gap-3">
                <TagLabel>&lt;backend /&gt;</TagLabel>
                <span className="text-[0.95rem] text-[rgba(242,245,250,0.6)]">currently expanding</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {backendSkills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} tilt="2deg" />
                ))}
              </div>
              <p className="mt-[18px] font-mono text-[0.85rem] text-[rgba(242,245,250,0.55)]">
                // quality over quantity — I master each tool before adding the next
              </p>
            </div>
          </Reveal>

          {/* Card 3 — everyday tools (full width) */}
          <Reveal delay={200} className="md:col-span-2">
            <div className="box-border flex flex-wrap items-center gap-6 rounded-[20px] border border-[var(--glass-border)] bg-[var(--glass)] px-7 py-6">
              <TagLabel>&lt;everyday-tools /&gt;</TagLabel>
              <div className="flex flex-wrap gap-3">
                {toolSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex cursor-default items-center gap-2.5 rounded-full bg-[#F6F8FC] px-5 py-2.5 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                  >
                    <img src={skill.icon} alt={skill.name} className="h-7 w-7" />
                    <span className="font-display text-[0.95rem] font-semibold text-[#16233B]">
                      {skill.name}
                    </span>
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
