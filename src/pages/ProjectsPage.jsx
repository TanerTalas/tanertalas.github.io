import { useState } from "react";
import Reveal from "../components/ui/Reveal.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import "./ProjectsPage.css";

// Filters offered above the grid. `tech` narrows the list to projects using it.
const filters = [
  { id: "all", label: "All projects" },
  { id: "three", label: "Three.js", tech: "Three.js" },
];

// Projects page: the full catalogue, reusing the same browser-frame card as the home preview.
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const tech = filters.find((f) => f.id === activeFilter)?.tech;
  const shown = tech ? projects.filter((project) => project.tech.includes(tech)) : projects;

  return (
    <main className="projects-page">
      <div className="projects-page__inner">
        {/* Page heading */}
        <Reveal className="projects-page__heading">
          <h1 className="projects-page__title">Everything I've Built</h1>
          <p className="projects-page__subtitle">
            A growing collection of completed projects I still refine as I learn
          </p>
        </Reveal>

        {/* Filters */}
        <div className="projects-page__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              className={`projects-filter${
                activeFilter === filter.id ? " projects-filter--active" : ""
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* All projects */}
        <div className="projects-page__grid">
          {shown.map((project, idx) => (
            <Reveal key={project.name} delay={(idx % 3) * 150}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
