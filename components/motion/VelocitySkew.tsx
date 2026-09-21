"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useMotionBudget } from "@/components/motion/MotionTier";

type VelocitySkewProps = {
  children: ReactNode;
  className?: string;
  /** Degrees of skew at full tilt. Keep it small — 3° already reads as fast. */
  max?: number;
  /** How much scroll velocity (px/frame) it takes to reach `max`. */
  threshold?: number;
};

/**
 * Leans its children in the direction of travel while the page is scrolling
 * fast, and springs back upright as it settles. Opt-in per block: a skew on
 * the whole page would break every `position: fixed` descendant, so wrap
 * grids and cards, not layouts.
 *
 * Always renders the same element so the markup matches on the server; the
 * subscription is simply skipped for tiers without flourishes.
 */
export function VelocitySkew({ children, className, max = 3, threshold = 70 }: VelocitySkewProps) {
  const { flourishes } = useMotionBudget();
  const velocity = useMotionValue(0);

  useLenis((lenis) => {
    if (flourishes) velocity.set(lenis.velocity);
  });

  const target = useTransform(velocity, (v) => Math.max(-max, Math.min(max, (v / threshold) * max)));
  const skewY = useSpring(target, { stiffness: 260, damping: 30, mass: 0.7 });

  return (
    <motion.div className={className} style={{ skewY }}>
      {children}
    </motion.div>
  );
}
