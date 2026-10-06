import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Spark = {
  dx: number;
  dy: number;
  size: number;
  color: string;
  spin: number;
  star: boolean;
};
type Burst = { id: number; x: number; y: number; sparks: Spark[] };

/** Random spray of stars and dots, so no two clicks look the same */
function makeSparks(): Spark[] {
  return Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 30 + Math.random() * 45;
    const star = Math.random() > 0.45;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: star ? 10 + Math.random() * 8 : 5 + Math.random() * 3,
      color: COLORS[i % COLORS.length],
      spin: (Math.random() - 0.5) * 360,
      star,
    };
  });
}

const COLORS = ["#a078f0", "#e879f9", "#7dd3fc", "#d0b8fd"];

/** Shockwave + star burst wherever the visitor clicks */
export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    let nextId = 0;
    const onDown = (e: PointerEvent) => {
      const burst = {
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
        sparks: makeSparks(),
      };
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
          {/* shockwave ring */}
          <motion.span
            className="absolute block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blush"
            style={{ boxShadow: "0 0 16px #e879f9" }}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          />
          {/* flash */}
          <motion.span
            className="absolute block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ filter: "blur(4px)" }}
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {burst.sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute block -translate-x-1/2 -translate-y-1/2 leading-none"
              style={{
                color: spark.color,
                fontSize: spark.size,
                textShadow: `0 0 8px ${spark.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1.4, rotate: 0 }}
              animate={{
                x: spark.dx,
                y: [0, spark.dy, spark.dy + 18],
                opacity: [1, 1, 0],
                scale: 0.3,
                rotate: spark.spin,
              }}
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            >
              {spark.star ? "✦" : "●"}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}
