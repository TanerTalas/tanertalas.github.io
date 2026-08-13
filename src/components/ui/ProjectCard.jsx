import "./ProjectCard.css";

// A project shown as a mock browser window: an address bar with a padlock, a
// screenshot that zooms slightly on hover, then title, tagline and links.
// Shared by the home preview and the full projects page.
export default function ProjectCard({ project }) {
  const { name, tagline, urlLabel, image, live, github } = project;

  return (
    <div className="pcard">
      {/* Browser chrome */}
      <div className="pcard__chrome">
        <span className="pcard__url">
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none" className="pcard__lock">
            <path
              d="M2.2 5.5V3.6a3.3 3.3 0 0 1 6.6 0v1.9"
              stroke="#8A99B0"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <rect x="0.8" y="5.4" width="9.4" height="6.9" rx="1.8" fill="#8A99B0" />
          </svg>
          <span className="pcard__url-text">{urlLabel}</span>
        </span>
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
