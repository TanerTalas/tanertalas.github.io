import "./ProjectCard.css";

// A project shown as a mock browser window: traffic-light chrome + URL bar, a
// screenshot that zooms slightly on hover, then title, tech pills and links.
// Shared by the home preview and the full projects page.
export default function ProjectCard({ project }) {
  const { name, tagline, urlLabel, image, live, github, tech } = project;

  return (
    <div className="pcard">
      {/* Browser chrome */}
      <div className="pcard__chrome">
        <span className="pcard__dot pcard__dot--red" />
        <span className="pcard__dot pcard__dot--amber" />
        <span className="pcard__dot pcard__dot--green" />
        <span className="pcard__url">{urlLabel}</span>
      </div>

      {/* Screenshot */}
      <div className="pcard__shot-wrap">
        <img src={image} alt={`${name} project screenshot`} className="pcard__shot" />
      </div>

      {/* Body */}
      <div className="pcard__body">
        <div className="pcard__head">
          <h3 className="pcard__title">{name}</h3>
          <div className="pcard__tagline">
            <span className="pcard__tagline-dot" />
            <span className="pcard__tagline-text">{tagline}</span>
          </div>
        </div>

        <div className="pcard__foot">
          <div className="pcard__tech">
            <span className="pcard__tech-label">// built with</span>
            <div className="pcard__tech-list">
              {tech.map((item) => (
                <span key={item} className="pcard__tech-item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pcard__links">
            <a href={live} target="_blank" rel="noopener noreferrer" className="pcard__live">
              Live Website
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="pcard__source">
              <img src="/img/icons/social/github-contact.svg" alt="" className="pcard__source-icon" />
              source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
