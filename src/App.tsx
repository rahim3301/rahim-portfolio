import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ClickBurst from "./components/ClickBurst";
import Marquee from "./components/Marquee";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Games from "./components/sections/Games";
import Studio from "./components/sections/Studio";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

function App() {
  // Buttery smooth scrolling + anchor link handling
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ClickBurst />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Studio />
        <Games />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default App;
