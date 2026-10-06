import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

type Mode = "default" | "link" | "text";

const TRAIL_COLORS = ["#a078f0", "#e879f9", "#7dd3fc"];

/**
 * Game-style crosshair cursor: a snappy core dot, a trailing reticle that
 * stretches with speed and locks onto links, plus a sparkle trail.
 * Only renders on precise pointers (mouse).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 30, mass: 0.5 });

  // Reticle swells a little when the mouse is moving fast
  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);
  const whoosh = useTransform(() => 1 + Math.min(Math.hypot(vx.get(), vy.get()) / 6000, 0.35));

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const particles: {
      x: number; y: number; vx: number; vy: number; life: number; size: number; color: string;
    }[] = [];
    let last = { x: -100, y: -100 };
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (reduced) return;
      // Spawn sparkles proportional to distance moved
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      const count = Math.min(Math.floor(dist / 14), 3);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 + 0.3,
          life: 1,
          size: 1.5 + Math.random() * 2.5,
          color: TRAIL_COLORS[(Math.random() * TRAIL_COLORS.length) | 0],
        });
      }
      last = { x: e.clientX, y: e.clientY };
      if (!raf && particles.length) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      // Sleep when the trail has faded — no work while the mouse is still
      raf = particles.length ? requestAnimationFrame(tick) : 0;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) setMode("text");
      else if (target.closest("a, button, [role='button']")) setMode("link");
      else setMode("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const link = mode === "link";
  const hidden = mode === "text";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[98] h-full w-full"
        aria-hidden="true"
      />

      {/* Trailing reticle — swells with speed, locks onto links */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99]"
        style={{ x: ringX, y: ringY, scale: whoosh }}
        aria-hidden="true"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: hidden ? 0 : pressed ? 0.7 : link ? 1.6 : 1,
            rotate: link ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
        >
          <div className={`relative h-10 w-10 ${link ? "animate-[spin_3s_linear_infinite]" : ""}`}>
            {/* corner brackets */}
            {["top-0 left-0 border-t-2 border-l-2 rounded-tl-lg", "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg", "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg", "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg"].map((c) => (
              <span
                key={c}
                className={`absolute h-3 w-3 transition-colors duration-200 ${c} ${link ? "border-blush" : "border-lilac-300"}`}
                style={{ filter: `drop-shadow(0 0 6px ${link ? "#e879f9" : "#a078f0"})` }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Snappy core dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <motion.div
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#e879f9,0_0_20px_#a078f0]"
          animate={{ scale: hidden ? 0 : pressed ? 2.2 : link ? 0.6 : 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
