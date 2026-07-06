import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";

// Home projects section — previews the first two projects and links to the full list.
export default function Projects() {
  const preview = projects.slice(0, 2);

  return (
    <section
      id="projects"
      className="relative flex justify-center bg-navy2 py-24 transition-[background] duration-1000"
    >
      <div className="w-full max-w-[1200px] px-6">
        <SectionHeading eyebrow="04 · projects" title="Things I've Shipped" variant="navy" />

        <div className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-2">
          {preview.map((project, idx) => (
            // Card 1 / Card 2
            <Reveal key={project.name} delay={idx * 150}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* See-all link with animated chevrons */}
        <Reveal className="text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-display text-[1.3rem] font-medium text-[#F2F5FA] transition-opacity duration-300 hover:opacity-80"
          >
            <span className="border-b-2 border-[#F2F5FA]">See All Projects</span>
            <span className="relative inline-block h-6 w-6">
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 transition-transform duration-[400ms] group-hover:translate-x-1.5"
              />
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 transition-transform duration-[400ms] group-hover:translate-x-3"
              />
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 transition-transform duration-[400ms] group-hover:translate-x-[18px]"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
