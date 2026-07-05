import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Stack from "../components/Stack.jsx";
import Services from "../components/Services.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import MiniMe from "../components/MiniMe.jsx";

// Home page — the full one-page scroll through every section.
export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Stack />
        <Services />
        <Projects />
        <Contact />
      </main>
      <MiniMe />
    </>
  );
}
