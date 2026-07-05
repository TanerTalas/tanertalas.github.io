// Site footer — signature line and social icons on a navy bar.
export default function Footer() {
  return (
    <footer className="relative flex justify-center bg-navy transition-[background] duration-1000">
      <div className="flex w-full max-w-[1200px] items-center px-6 py-8 text-[#F2F5FA]">
        <p className="m-0 flex items-center gap-1.5 font-display font-semibold">
          <span>Made with</span>
          <img src="/img/icons/heart.svg" alt="heart" className="w-5" />
          <span>by Taner Talas</span>
        </p>
        <div className="ml-auto flex gap-4">
          <a
            href="https://github.com/TanerTalas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-300 hover:scale-110"
          >
            <img
              src="/img/icons/githubhero.svg"
              alt="Link to Github icon"
              className="[filter:brightness(0)_invert(1)]"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/taner-talas-a43a2236a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-300 hover:scale-110"
          >
            <img
              src="/img/icons/linkedinhero.svg"
              alt="Link to Linkedin icon"
              className="[filter:brightness(0)_invert(1)]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
