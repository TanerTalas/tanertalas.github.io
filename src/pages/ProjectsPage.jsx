import { useState } from "react";
import Reveal from "../components/ui/Reveal.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import "./ProjectsPage.css";

// Filters offered above the grid; every id but "all" matches a tag in projects.js.
const filters = [
  { id: "all", label: "All projects" },
  { id: "web", label: "Web" },
  { id: "three", label: "Three.js" },
  { id: "other", label: "Other" },
];

// Projects page: the full catalogue, reusing the same browser-frame card as the home preview.
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const shown =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(activeFilter));

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
