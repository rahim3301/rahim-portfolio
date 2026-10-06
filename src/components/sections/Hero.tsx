import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroStats, site } from "../../data/site";
import { ArrowDown, ArrowRight } from "../Icons";
import HeroShowcase from "../HeroShowcase";


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
    <span className="text-gradient" aria-hidden="true">
      {text}
      <span className="animate-pulse text-lilac-400">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Soft gradient blobs behind everything */}
      <div className="blob top-[-10%] left-[-10%] h-136 w-136 bg-lilac-700/30" />
      <div className="blob right-[-8%] bottom-[-15%] h-120 w-120 bg-blush/15" />
      <div className="blob top-[30%] right-[25%] h-80 w-80 bg-skysoft/10" />

      {/* Techy grid overlay */}
      <div className="grid-overlay absolute inset-0" />

      {/* Game showcase — right half on desktop, hidden on small screens.
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
        <HeroShowcase />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(24px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-lilac-200 sm:text-sm">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-400" />
              {site.availability}
            </span>
            <a
              href="#studio"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-lilac-300 transition-colors hover:text-white sm:text-sm"
            >
              Director @ {site.studio.name}
            </a>
          </div>

          <h1 className="font-display mt-6 text-4xl leading-[1.05] font-bold text-white sm:text-5xl md:text-7xl">
            Hi, I’m <span className="text-gradient">{site.shortName}</span>
            <br />I craft <span className="sr-only">games.</span>
            <TypeWord />
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
              className="press glow group inline-flex items-center gap-2 rounded-full bg-lilac-600 px-7 py-3.5 font-semibold text-white hover:bg-lilac-500"
            >
              View My Work
              <ArrowRight className="transition-transform duration-200 ease-fluid group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="press glass rounded-full px-7 py-3.5 font-semibold text-lilac-100 hover:border-lilac-300/50 hover:text-white"
            >
              Let’s Talk
            </a>
          </div>

          {/* Quick proof for recruiters skimming the fold */}
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4 border-t border-lilac-400/15 pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-slate-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium tracking-[0.25em] text-slate-500 uppercase transition-colors hover:text-lilac-300 md:flex"
        aria-label="Scroll to about"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
