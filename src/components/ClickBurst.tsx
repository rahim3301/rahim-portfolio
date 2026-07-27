import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Burst = { id: number; x: number; y: number };

const COLORS = ["#a078f0", "#e879f9", "#7dd3fc", "#d0b8fd"];

/** Sparkle burst wherever the visitor clicks */
export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    let nextId = 0;
    const onDown = (e: PointerEvent) => {
      const burst = { id: nextId++, x: e.clientX, y: e.clientY };
      setBursts((prev) => [...prev.slice(-4), burst]);
      setTimeout(
        () => setBursts((prev) => prev.filter((b) => b.id !== burst.id)),
        900,
      );
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="absolute"
          style={{ left: burst.x, top: burst.y }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const distance = 34 + (i % 3) * 14;
            return (
              <motion.span
                key={i}
                className="absolute block h-1.5 w-1.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            );
          })}
        </span>
      ))}
    </div>
  );
}
