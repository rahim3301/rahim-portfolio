import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ownGames, projects } from "../data/games";

/** App icons that float around the key art */
const floatingIcons = [
  { src: ownGames[0].icon, className: "top-[18%] left-[10%] h-20 w-20", depth: 40, delay: 0 },
  { src: ownGames[1].icon, className: "top-[16%] right-[14%] h-24 w-24", depth: 55, delay: 0.6 },
  { src: projects[2].icon, className: "bottom-[16%] left-[16%] h-16 w-16", depth: 30, delay: 1.2 },
  { src: projects[0].icon, className: "right-[18%] bottom-[12%] h-18 w-18", depth: 45, delay: 0.3 },
  { src: projects[1].icon, className: "top-[50%] right-[6%] h-14 w-14", depth: 25, delay: 0.9 },
];

function FloatingIcon({
  icon,
  x,
  y,
}: {
  icon: (typeof floatingIcons)[number];
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  // Closer icons drift further against the mouse
  const ix = useTransform(x, (v) => v * -icon.depth);
  const iy = useTransform(y, (v) => v * -icon.depth);
  return (
    <motion.div
      style={{ x: ix, y: iy, translateZ: 60 }}
      className={`absolute ${icon.className}`}
    >
      <img
        src={icon.src}
        alt=""
        className="animate-float h-full w-full rounded-2xl shadow-xl shadow-black/60 ring-1 ring-white/20"
        style={{ animationDelay: `${icon.delay}s` }}
      />
    </motion.div>
  );
}

/**
 * Hero visual: my own games' key art as tilted cards with the
 * app icons floating around them, all leaning toward the mouse.
 */
export default function HeroShowcase() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 18 });
  const y = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);

  return (
    <div className="relative h-full w-full [perspective:1200px]">
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* Back card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-[20%] left-[16%] w-[70%] rotate-[-6deg]"
          style={{ translateZ: -40 }}
        >
          <img
            src={ownGames[0].render}
            alt={`${ownGames[0].title} key art`}
            className="aspect-[16/10] w-full rounded-3xl object-cover object-right shadow-2xl shadow-black/60 ring-1 ring-white/15"
          />
        </motion.div>

        {/* Front card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-[46%] left-[26%] w-[66%] rotate-[4deg]"
          style={{ translateZ: 40 }}
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-blush/25 blur-3xl" />
          <img
            src={ownGames[1].render}
            alt={`${ownGames[1].title} key art`}
            className="relative aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl shadow-black/70 ring-1 ring-white/20"
          />
        </motion.div>

        {floatingIcons.map((icon) => (
          <FloatingIcon key={icon.src} icon={icon} x={x} y={y} />
        ))}
      </motion.div>
    </div>
  );
}
