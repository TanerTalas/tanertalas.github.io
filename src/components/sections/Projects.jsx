import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import ProjectCard from "../ui/ProjectCard.jsx";
import { projects } from "../../data/projects.js";
import "./Projects.css";

// Home projects section: previews the first two projects and links to the full list.
export default function Projects() {
  const preview = projects.slice(0, 2);

  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <SectionHeading eyebrow="04 · projects" title="Things I've Shipped" variant="navy" />

        <div className="projects__grid">
          {preview.map((project, idx) => (
            // Card 1 / Card 2
            <Reveal key={project.name} delay={idx * 150}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* See-all link with animated chevrons */}
        <Reveal className="projects__more">
          <Link to="/projects" className="see-all">
            <span className="see-all__label">See All Projects</span>
            <span className="see-all__chevrons">
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="see-all__chevron see-all__chevron--1"
              />
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="see-all__chevron see-all__chevron--2"
              />
              <img
                src="/img/icons/ui/chevron-right.svg"
                alt=""
                className="see-all__chevron see-all__chevron--3"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
