"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline read-progress bar pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-ember-deep via-ember to-ember-soft"
    />
  );
}
