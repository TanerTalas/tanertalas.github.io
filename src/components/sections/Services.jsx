import Reveal from "../ui/Reveal.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import { services } from "../../data/services.js";
import "./Services.css";

// Single service card; the featured one gets an accent top border.
function ServiceCard({ service }) {
  return (
    <div className={`service-card${service.featured ? " service-card--featured" : ""}`}>
      <div className="service-card__head">
        <img src={service.icon} alt="" className="service-card__icon" />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <div className="service-card__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="service-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Services section: three offerings, staggered in as they scroll into view.
export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services__inner">
        <SectionHeading eyebrow="03 · services" title="What I Can Do for You" variant="paper" />

        <div className="services__grid">
          {services.map((service, idx) => (
            // Card 1 / Card 2 / Card 3
            <Reveal key={service.title} delay={idx * 120}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
