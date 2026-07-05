import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { services } from "../data/services.js";

// Single service card — the featured one gets an accent top border and "new" badge.
function ServiceCard({ service }) {
  return (
    <div
      className="flex h-full flex-col gap-3.5 rounded-[20px] border border-[var(--chip-border)] bg-card p-8 shadow-[0_4px_16px_rgba(22,35,59,0.07)] transition-[transform,box-shadow,background] duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_rgba(22,35,59,0.16)]"
      style={service.featured ? { borderTop: "6px solid var(--accent)" } : undefined}
    >
      <div className="flex items-center justify-between">
        <img src={service.icon} alt="" className="w-[52px]" />
        {service.featured && (
          <span className="rounded-full bg-accent px-3 py-1 font-mono text-[0.8rem] text-white">
            new
          </span>
        )}
      </div>
      <h3 className="m-0 font-display text-[1.5rem] font-semibold text-ink transition-[color] duration-1000">
        {service.title}
      </h3>
      <p className="m-0 flex-1 text-[1.05rem] leading-[1.65] text-muted transition-[color] duration-1000">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--chip-border)] bg-chip-bg px-3 py-1 font-mono text-[0.85rem] text-ink"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Services section — three offerings, staggered in as they scroll into view.
export default function Services() {
  return (
    <section
      id="services"
      className="relative flex justify-center bg-paper py-24 transition-[background] duration-1000"
    >
      <div className="w-full max-w-[1200px] px-6">
        <SectionHeading eyebrow="03 · services" title="What I Can Do for You" variant="paper" />

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
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
