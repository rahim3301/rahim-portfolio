"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ownGames, projects } from "../data/games";

const [shm, bloop, kitten] = ownGames;

/** App icons that float around the key art; deeper ones drift further against the pointer */
const floatingIcons = [
  { src: shm.icon, className: "top-[0%] right-[2%] h-20 w-20", depth: 40, delay: 0 },
  { src: bloop.icon, className: "bottom-[2%] right-[4%] h-20 w-20", depth: 55, delay: 0.6 },
  { src: kitten.icon, className: "top-[38%] -left-[2%] h-16 w-16", depth: 50, delay: 1.2 },
  { src: projects[0].icon, className: "bottom-[0%] left-[8%] h-14 w-14", depth: 35, delay: 0.3 },
];

const cards = [
  { game: shm, className: "top-[6%] left-[2%] w-[76%] rotate-[-6deg]", z: -50, delay: "0.15s" },
  { game: kitten, className: "top-[31%] right-[0%] w-[74%] rotate-[4deg]", z: -10, delay: "0.3s" },
  { game: bloop, className: "top-[56%] left-[8%] w-[76%] rotate-[-2deg]", z: 40, delay: "0.45s" },
];

/**
 * Hero visual: my own games' key art as tilted cards with the app icons floating around them,
 * all leaning toward the pointer.
 */
export default function HeroShowcase() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 1, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 1, ease: "power3.out" });
    const icons = gsap.utils.toArray<HTMLElement>("[data-depth]", el).map((icon) => ({
      x: gsap.quickTo(icon, "x", { duration: 1, ease: "power3.out" }),
      y: gsap.quickTo(icon, "y", { duration: 1, ease: "power3.out" }),
      depth: Number(icon.dataset.depth),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      ry(nx * 14);
      rx(ny * -10);
      icons.forEach((i) => (i.x(nx * -i.depth), i.y(ny * -i.depth)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative h-full w-full [perspective:1200px]">
      <div ref={stage} className="absolute inset-0 [transform-style:preserve-3d]">
        {cards.map(({ game, className, z, delay }) => (
          <div key={game.title} className={`absolute ${className}`} style={{ transform: `translateZ(${z}px)` }}>
            <img
              src={game.render}
              alt={`${game.title} key art`}
              className="enter-rise aspect-[2/1] w-full rounded-3xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/20"
              style={{ animationDelay: delay }}
            />
          </div>
        ))}

        {floatingIcons.map((icon) => (
          <div key={icon.src} data-depth={icon.depth} className={`absolute ${icon.className}`} style={{ transform: "translateZ(70px)" }}>
            <img
              src={icon.src}
              alt=""
              className="animate-float h-full w-full rounded-2xl shadow-xl shadow-black/60 ring-1 ring-white/20"
              style={{ animationDelay: `${icon.delay}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
