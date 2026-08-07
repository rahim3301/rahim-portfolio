import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../../data/site";

const HeroScene = lazy(() => import("../three/HeroScene"));

const WORDS = ["games.", "worlds.", "adventures.", "experiences."];

/** Typewriter that cycles through words */
function TypeWord() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[index];
    let delay = deleting ? 45 : 95;
    if (!deleting && text === word) delay = 1700;
    if (deleting && text === "") delay = 250;

    const t = setTimeout(() => {
      if (!deleting) {
        if (text === word) setDeleting(true);
        else setText(word.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % WORDS.length);
        } else setText(word.slice(0, text.length - 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient">
      {text}
      <span className="animate-pulse text-lilac-400">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Soft gradient blobs behind everything */}
      <div className="blob top-[-10%] left-[-10%] h-136 w-136 bg-lilac-700/30" />
      <div className="blob right-[-8%] bottom-[-15%] h-120 w-120 bg-blush/15" />
      <div className="blob top-[30%] right-[25%] h-80 w-80 bg-skysoft/10" />

      {/* Techy grid overlay */}
      <div className="grid-overlay absolute inset-0" />

      {/* 3D scene — right half on desktop, hidden on small screens.
          Soft mask fades the edges so nothing ever looks "cut off". */}
      <div
        className="absolute top-0 right-0 hidden h-full w-1/2 lg:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-lilac-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              {site.availability}
            </span>
            <a
              href="#studio"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-lilac-300 transition-transform hover:scale-105"
            >
              Director @ {site.studio.name}
            </a>
          </div>

          <h1 className="font-display mt-6 text-5xl leading-[1.05] font-bold text-white md:text-7xl">
            Hi, I’m <span className="text-gradient">{site.shortName}</span>
            <br />I craft <TypeWord />
          </h1>

          <p className="mt-4 font-display text-xl font-semibold text-lilac-200 md:text-2xl">
            Unity Game Developer · Gameplay & Game Systems
          </p>

          <p className="mt-4 text-lg text-slate-400 md:text-xl">
            {site.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="glow rounded-full bg-lilac-600 px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-7 py-3.5 font-semibold text-lilac-200 transition-transform hover:scale-105"
            >
              Let’s Talk
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
        aria-label="Scroll down"
      >
        <motion.svg
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
