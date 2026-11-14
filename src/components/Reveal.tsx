import type { ReactNode } from "react";

/**
 * Marks content to rise into view as it is scrolled to (animated by Motion).
 * Content stays visible without JavaScript and under reduced motion.
 */
export default function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
