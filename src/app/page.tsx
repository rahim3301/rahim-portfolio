import Hero from "@/components/sections/Hero";
import WordRows from "@/components/WordRows";
import About from "@/components/sections/About";
import MyGames from "@/components/sections/MyGames";
import Games from "@/components/sections/Games";
import Play from "@/components/sections/Play";
import Studio from "@/components/sections/Studio";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Flow: intro → who I am → my own games → professional work → play it → my studio → toolkit → hire me
export default function Home() {
  return (
    <>
      <Hero />
      <WordRows rows={["Gameplay · Systems · Mobile ·", "Unity · C# · Shipped to Play ·"]} />
      <About />
      <MyGames />
      <Games />
      <Play />
      <Studio />
      <Skills />
      <WordRows rows={["Let’s make games ·", "Open to remote work ·"]} quiet />
      <Contact />
    </>
  );
}
