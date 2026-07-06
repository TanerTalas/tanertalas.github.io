import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Stack from "../components/sections/Stack.jsx";
import Services from "../components/sections/Services.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";
import MiniMe from "../components/effects/MiniMe.jsx";

// Home page: the full one-page scroll through every section.
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
