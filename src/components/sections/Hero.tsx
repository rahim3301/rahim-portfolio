"use client";

import { useEffect, useState } from "react";
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
    <section id="home" data-hero className="relative flex min-h-svh items-center overflow-hidden">
      {/* Soft gradient blobs behind everything */}
      <div className="blob top-[-10%] left-[-10%] h-136 w-136 bg-lilac-700/30" />
      <div className="blob right-[-8%] bottom-[-15%] h-120 w-120 bg-blush/15" />
      <div className="blob top-[30%] right-[25%] h-80 w-80 bg-skysoft/10" />
      <div className="grid-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-28 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:pt-24 lg:pb-12">
        <div className="enter-rise min-w-0">
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
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

          <h1 className="font-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.05] font-bold text-white">
            <span data-hero-line className="block">
              Hi, I’m <span className="text-gradient">{site.shortName}</span>
            </span>
            <span data-hero-line className="block">
              I craft <span className="sr-only">games.</span>
              <TypeWord />
            </span>
          </h1>

          <p data-hero-line className="mt-4 font-display text-lg font-semibold text-lilac-200 md:text-xl">
            Unity Game Developer · Gameplay & Game Systems
          </p>

          <p data-hero-fade className="mt-4 max-w-xl text-base text-slate-400 md:text-lg">
            {site.tagline}
          </p>

          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#games"
              data-magnetic
              className="glow group inline-flex items-center gap-2 rounded-full bg-lilac-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-lilac-500"
            >
              See My Games
              <ArrowRight className="transition-transform duration-200 ease-fluid group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              data-magnetic
              className="glass rounded-full px-7 py-3.5 font-semibold text-lilac-100 transition-colors hover:border-lilac-300/50 hover:text-white"
            >
              Let’s Talk
            </a>
          </div>

          {/* Quick proof for recruiters skimming the fold */}
          <dl data-hero-fade className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-lilac-400/15 pt-6 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white md:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-slate-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* My games' key art in its own column, so it never sits under the text */}
        <div data-hero-art className="relative hidden h-[min(68svh,600px)] lg:block">
          <HeroShowcase />
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        data-hero-fade
        className="enter-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium tracking-[0.25em] text-slate-500 uppercase transition-colors hover:text-lilac-300 md:flex"
        aria-label="Scroll to about"
      >
        Scroll
        <span className="animate-bounce">
          <ArrowDown size={20} />
        </span>
      </a>
    </section>
  );
}
