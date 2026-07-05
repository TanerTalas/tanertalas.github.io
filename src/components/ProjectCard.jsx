// A project shown as a mock browser window: traffic-light chrome + URL bar, a
// screenshot that zooms slightly on hover, then title, tech pills and links.
// Shared by the home preview and the full projects page.
export default function ProjectCard({ project }) {
  const { name, tagline, urlLabel, image, live, github, tech } = project;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#F6F8FC] shadow-[0_6px_24px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#D8E0EE] bg-[#E7ECF4] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2.5 truncate rounded-md border border-[#D8E0EE] bg-white px-3 py-[3px] font-mono text-[0.8rem] text-[#5A6B84]">
          {urlLabel}
        </span>
      </div>

      {/* Screenshot */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={`${name} project screenshot`}
          className="block w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-[7px]">
          <h3 className="m-0 font-display text-[1.5rem] font-semibold text-[#16233B]">{name}</h3>
          <div className="flex items-center gap-2.5">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[0.95rem] text-[#5A6B84]">{tagline}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-[18px]">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[0.78rem] tracking-wide text-[#5A6B84] opacity-70">
              // built with
            </span>
            <div className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#D8E0EE] bg-[#EDF1F8] px-3 py-1 font-mono text-[0.8rem] text-[#16233B]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-accent px-6 py-2.5 font-display text-[0.95rem] font-semibold text-white transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Live Website
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.9rem] text-[#16233B] transition-opacity duration-300 hover:opacity-60"
            >
              <img src="/img/icons/githubcontact.svg" alt="" className="w-[22px] [filter:invert(1)]" />
              source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
