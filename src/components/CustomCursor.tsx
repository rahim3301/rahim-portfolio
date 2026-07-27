import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Glowing dot + trailing ring cursor. Only renders on precise pointers (mouse). */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-lilac-300"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Trailing glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-9 w-9 rounded-full border border-lilac-400/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 18px rgba(160, 120, 240, 0.45)",
        }}
        animate={{ scale: hovering ? 2 : 1, opacity: hovering ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
