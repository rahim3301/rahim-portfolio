import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      // Full transform strings stay on the compositor; x/y shorthands don't
      // Springy pop-in: rises, un-blurs and settles with a little overshoot
      initial={{
        opacity: 0,
        transform: "translateY(40px) scale(0.96)",
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        transform: { type: "spring", stiffness: 140, damping: 14, mass: 0.8, delay },
        opacity: { duration: 0.5, delay },
        filter: { duration: 0.5, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
