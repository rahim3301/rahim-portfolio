import { motion, useScroll, useSpring } from "framer-motion";

/** Gradient reading-progress bar pinned to the top of the page */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-1 origin-left bg-linear-to-r from-lilac-600 via-lilac-400 to-blush"
      style={{ scaleX }}
    />
  );
}
