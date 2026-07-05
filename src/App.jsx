import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { toggle } = useTheme();

  return (
    <>
      <Navbar onToggleTheme={toggle} />
      <main>
        <Hero />
      </main>
    </>
  );
}
