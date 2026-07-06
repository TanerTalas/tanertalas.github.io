import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import "./ProjectsPage.css";

// Projects page: the full catalogue, reusing the same browser-frame card as the home preview.
export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <div className="projects-page__inner">
        {/* Page heading */}
        <Reveal className="projects-page__heading">
          <Link to="/" className="projects-page__back">
            ← back-home
          </Link>
          <h1 className="projects-page__title">Everything I've Built</h1>
          <p className="projects-page__subtitle">
            // a growing collection of completed projects I still refine as I learn
          </p>
        </Reveal>

        {/* All projects */}
        <div className="projects-page__grid">
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
