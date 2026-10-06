import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ClickBurst from "./components/ClickBurst";
import Marquee from "./components/Marquee";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import MyGames from "./components/sections/MyGames";
import Games from "./components/sections/Games";
import Play from "./components/sections/Play";
import Studio from "./components/sections/Studio";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only z-[200] rounded-full bg-lilac-600 px-5 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <ClickBurst />
      <Navbar />
      <main>
        {/* Flow: intro → who I am → my own games → professional work → play it → my studio → toolkit → hire me */}
        <Hero />
        <Marquee />
        <About />
        <MyGames />
        <Games />
        <Play />
        <Studio />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
