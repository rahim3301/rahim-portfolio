"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);
// Phones resize the viewport as the address bar shows and hides; don't recalculate every scene for that.
ScrollTrigger.config({ ignoreMobileResize: true });

const EXPO = "expo.out";
const FINE = "(hover: hover) and (pointer: fine)";

/**
 * The site's motion layer. Everything here only adds arrival and response: content is in the HTML
 * and readable before script runs, and under prefers-reduced-motion nothing travels.
 * Components mark elements with data-* attributes; this file brings them to life.
 */
export default function Motion() {
  // Smooth scrolling with weight, desktop pointers only, kept in step with ScrollTrigger.
  useEffect(() => {
    const fine = window.matchMedia(FINE).matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];
    let started = false;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (started) return;
      started = true;
      // Fonts change line breaks, so split headings only once they are in.
      document.fonts.ready.then(() => {
        if (!cancelled) timer = setTimeout(run, 80);
      });
    };

    const run = () => {
      if (cancelled) return;
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 900px) and (min-height: 620px)",
          fine: FINE,
        },
        (ctx) => {
          const { motion, wide, fine } = ctx.conditions as { motion: boolean; wide: boolean; fine: boolean };
          if (!motion) return;

          const fold = window.innerHeight * 0.92;
          const below = (el: Element) => el.getBoundingClientRect().top > fold;

          // Headings: letters spring up from behind their baseline one after another, then the plain
          // text is given back so it rewraps normally.
          gsap.utils.toArray<HTMLElement>("[data-split]").filter(below).forEach((el) => {
            const split = SplitText.create(el, { type: "lines,words,chars", mask: "lines" });
            splits.push(split);
            gsap.from(split.chars, {
              yPercent: 120,
              rotate: 8,
              duration: 0.9,
              ease: "back.out(1.6)",
              stagger: { each: 0.018 },
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              onComplete: () => split.revert(),
            });
          });

          // Statements fill from part-ink to full ink as they are read.
          gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
            const split = SplitText.create(el, { type: "words" });
            splits.push(split);
            gsap.fromTo(
              split.words,
              { opacity: 0.25 },
              { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } },
            );
          });

          // Everything else marked to arrive: rises and fades in, staggered within its batch.
          const els = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(below);
          gsap.set(els, { opacity: 0, y: 40 });
          ScrollTrigger.batch(els, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: EXPO, stagger: 0.08, overwrite: true }),
          });

          // Pictures open behind a curtain and settle from a slight zoom as they enter.
          gsap.utils.toArray<HTMLElement>("[data-curtain]").filter(below).forEach((frame) => {
            const img = frame.querySelector("img");
            const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
            tl.fromTo(frame, { clipPath: "inset(18% 10% 18% 10% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.2, ease: EXPO });
            if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: EXPO }, 0);
          });

          // Pictures drift a few percent inside their frames as the page scrolls past.
          gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((img) => {
            gsap.fromTo(img, { scale: 1.12, yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
          });

          // Giant word rows slide sideways with the scroll, in opposite directions.
          gsap.utils.toArray<HTMLElement>("[data-scroll-x]").forEach((row) => {
            const amount = parseFloat(row.dataset.scrollX || "0");
            gsap.fromTo(
              row,
              { xPercent: amount > 0 ? -amount : 0 },
              { xPercent: amount > 0 ? 0 : amount, ease: "none", scrollTrigger: { trigger: row.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 } },
            );
          });

          // Work columns drift against each other while the section passes (multi-column layouts only).
          if (window.innerWidth >= 1024) {
            gsap.utils.toArray<HTMLElement>("[data-col-speed]").forEach((col) => {
              const speed = parseFloat(col.dataset.colSpeed || "0");
              gsap.fromTo(
                col,
                { y: -speed * 6 },
                { y: speed * 6, ease: "none", scrollTrigger: { trigger: col.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
              );
            });
          }

          // Hero (wide screens): the first screen holds while the game art sweeps forward and grows,
          // the headline lines fly up one after another and the rest fades, then the page carries on.
          const hero = document.querySelector<HTMLElement>("[data-hero]");
          if (hero) {
            const lines = hero.querySelectorAll("[data-hero-line]");
            const fade = hero.querySelectorAll("[data-hero-fade]");
            const art = hero.querySelector("[data-hero-art]");
            if (wide) {
              const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=90%", pin: true, pinSpacing: true, scrub: 1, anticipatePin: 1 } });
              tl.to(lines, { yPercent: -140, opacity: 0, rotate: -4, stagger: 0.1, ease: "power2.in", duration: 1 }, 0)
                .to(fade, { y: -80, opacity: 0, stagger: 0.05, ease: "power2.in", duration: 0.7 }, 0)
                .to(art, { scale: 1.12, yPercent: -6, ease: "power2.inOut", duration: 1.4 }, 0)
                .to(art, { opacity: 0, ease: "power2.in", duration: 0.4 }, 1.1);
            } else {
              // Phones: no hold, the lines peel upward at different speeds as the hero scrolls away.
              const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
              lines.forEach((line, i) => tl.to(line, { yPercent: -40 - i * 35, ease: "none" }, 0));
            }
          }

          // My games: each game holds while its screenshots ride past sideways (wide screens).
          // Phones keep a native swipe row instead.
          if (wide) {
            gsap.utils.toArray<HTMLElement>("[data-rail]").forEach((rail) => {
              const track = rail.querySelector<HTMLElement>("[data-rail-track]");
              if (!track) return;
              const bar = rail.querySelector<HTMLElement>("[data-rail-bar]");
              gsap.set(track, { overflow: "visible" });
              // The track's last item should end at the right page margin.
              const last = track.lastElementChild as HTMLElement | null;
              const distance = () => Math.max(0, (last ? last.offsetLeft + last.offsetWidth : track.scrollWidth) + 24 - window.innerWidth);
              const ride = gsap.to(track, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                  trigger: rail,
                  start: "top top",
                  end: () => `+=${distance() * 0.9}`,
                  pin: true,
                  // GSAP turns spacing off by default when the parent is a flex box; we always want it.
                  pinSpacing: true,
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
                },
              });
              // Each shot swings up into place as it rides into view.
              gsap.utils.toArray<HTMLElement>("[data-shot]", track).forEach((shot) => {
                gsap.from(shot, {
                  yPercent: 16,
                  rotate: 5,
                  opacity: 0.3,
                  ease: "power2.out",
                  scrollTrigger: { trigger: shot, containerAnimation: ride, start: "left 100%", end: "left 70%", scrub: true },
                });
              });
            });
          }

          // Speed skew: cards bend with fast scrolling and spring back when it slows.
          const skews = gsap.utils.toArray<HTMLElement>("[data-skew]");
          if (skews.length) {
            const setters = skews.map((el) => gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3.out" }));
            const st = ScrollTrigger.create({
              onUpdate: (self) => {
                const skew = gsap.utils.clamp(-5, 5, self.getVelocity() / -350);
                setters.forEach((set) => set(skew));
              },
            });
            const calm = () => {
              if (Math.abs(st.getVelocity()) < 40) setters.forEach((set) => set(0));
            };
            gsap.ticker.add(calm);
            cleanups.push(() => {
              st.kill();
              gsap.ticker.remove(calm);
            });
          }

          // Page progress bar along the top edge.
          const progress = document.querySelector<HTMLElement>("[data-progress]");
          if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

          // The footer wordmark rises up from below its own baseline.
          const wordmark = document.querySelector<HTMLElement>("[data-wordmark]");
          if (wordmark) {
            const split = SplitText.create(wordmark, { type: "chars", mask: "chars" });
            splits.push(split);
            gsap.from(split.chars, { yPercent: 110, duration: 1.1, ease: EXPO, stagger: 0.05, scrollTrigger: { trigger: wordmark, start: "top bottom", once: true } });
          }

          if (fine) {
            // Cards tilt toward the pointer in 3D and settle back when it leaves.
            gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
              const inner = card.firstElementChild as HTMLElement | null;
              if (!inner) return;
              gsap.set(card, { perspective: 900 });
              const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
              const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = card.getBoundingClientRect();
                ry(((e.clientX - r.left) / r.width - 0.5) * 12);
                rx(((e.clientY - r.top) / r.height - 0.5) * -10);
              };
              const leave = () => (rx(0), ry(0));
              card.addEventListener("pointermove", move);
              card.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                card.removeEventListener("pointermove", move);
                card.removeEventListener("pointerleave", leave);
              });
            });

            // Magnetic actions: the main buttons lean toward the pointer and spring back.
            gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((btn) => {
              const x = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
              const y = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = btn.getBoundingClientRect();
                x((e.clientX - r.left - r.width / 2) * 0.25);
                y((e.clientY - r.top - r.height / 2) * 0.35);
              };
              const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
              btn.addEventListener("pointermove", move);
              btn.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                btn.removeEventListener("pointermove", move);
                btn.removeEventListener("pointerleave", leave);
              });
            });
          }

          // Pins are created in page order here; recalculate every start and end once all exist.
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        },
      );
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    // Late-loading images change heights; settle the triggers once more.
    const t = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      cancelled = true;
      clearTimeout(t);
      clearTimeout(timer);
      window.removeEventListener("load", start);
      cleanups.forEach((c) => c());
      mm.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
