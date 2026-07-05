import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

// Projects page — the full catalogue, reusing the same browser-frame card as the home preview.
export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-navy2 pb-24 pt-[72px] transition-[background] duration-1000">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16">
        {/* Page heading */}
        <Reveal className="mb-11 flex flex-col items-start gap-2.5">
          <Link
            to="/"
            className="rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-1.5 font-mono text-[0.95rem] text-[#7FB4F5] transition-opacity duration-300 hover:opacity-80"
          >
            ← back-home
          </Link>
          <h1 className="m-0 font-display text-[2.2rem] font-bold leading-[1.1] text-[#F2F5FA] sm:text-[3rem]">
            Everything I've Built
          </h1>
          <p className="m-0 max-w-[560px] font-mono text-[0.95rem] text-[rgba(242,245,250,0.6)]">
            // a growing collection — completed projects I still refine as I learn
          </p>
        </Reveal>

        {/* All projects */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {projects.map((project, idx) => (
            <Reveal key={project.name} delay={(idx % 2) * 150}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
