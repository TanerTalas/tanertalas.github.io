import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import MiniMe from "./components/MiniMe.jsx";
import Footer from "./components/Footer.jsx";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { toggle } = useTheme();

  return (
    <>
      <Navbar onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Stack />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <MiniMe />
    </>
  );
}
