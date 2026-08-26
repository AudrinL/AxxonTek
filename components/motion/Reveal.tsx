"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variants?: Variants;
};

/**
 * Scroll-triggered entrance. Collapses to a plain fade (no movement) when the
 * visitor prefers reduced motion.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const resolved: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : variants;

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Wraps a group so its `Reveal` children cascade in sequence. */
export function RevealGroup({
  children,
  className,
  amount = 0.09,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  delayChildren?: number;
  as?: ElementType;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={stagger(amount, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
