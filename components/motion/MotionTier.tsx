"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { detectMotionTier, motionBudget, type MotionTier } from "@/lib/capabilities";

const TierContext = createContext<MotionTier>("full");

/**
 * Detects the visitor's motion tier once, during the first client render.
 * The server always sees "full"; components must not branch their *markup*
 * on the tier (that would be a hydration mismatch) — only what they mount
 * after hydration, which options they pass, and how hard they animate.
 */
export function MotionTierProvider({ children }: { children: ReactNode }) {
  const [tier] = useState<MotionTier>(() => detectMotionTier());
  return <TierContext.Provider value={tier}>{children}</TierContext.Provider>;
}

export function useMotionTier() {
  return useContext(TierContext);
}

export function useMotionBudget() {
  return motionBudget(useContext(TierContext));
}
