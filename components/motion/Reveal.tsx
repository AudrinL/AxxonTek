"use client";

import { motion, type Variants } from "framer-motion";
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
 * Scroll-triggered entrance. The root `MotionConfig reducedMotion="user"`
 * collapses it to a plain fade for visitors who prefer reduced motion — the
 * markup itself must not depend on that preference, or SSR and the client
 * disagree and React reports a hydration mismatch.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
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
