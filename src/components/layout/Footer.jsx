import "./Footer.css";

// Site footer: signature line and social icons on a navy bar.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__sig">
          <span>Made with</span>
          <img src="/img/icons/ui/heart.svg" alt="heart" className="site-footer__heart" />
          <span>by Taner Talas</span>
        </p>
        <div className="site-footer__socials">
          <a
            href="https://github.com/TanerTalas"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__social"
          >
            <img
              src="/img/icons/social/github-hero.svg"
              alt="Link to Github icon"
              className="site-footer__social-icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/tanertalas/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__social"
          >
            <img
              src="/img/icons/social/linkedin-hero.svg"
              alt="Link to Linkedin icon"
              className="site-footer__social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
