"use client";

import dynamic from "next/dynamic";
import { useMotionTier } from "@/components/motion/MotionTier";
import { useHydrated } from "@/components/motion/useHydrated";

/**
 * three.js + React Three Fiber are ~200kB and purely decorative, so they
 * arrive after hydration instead of in the initial payload. The preloader
 * waits for the canvas (see `signalBoot`), so first-time visitors never see
 * the hero pop from flat to 3D.
 */
const GlobalCanvas = dynamic(() => import("./GlobalCanvas"), { ssr: false, loading: () => null });

export function GlobalCanvasLoader() {
  const tier = useMotionTier();
  const hydrated = useHydrated();
  // Nothing until hydration so the server and client agree, then nothing
  // at all for the "off" tier — it never downloads three.js.
  if (!hydrated || tier === "off") return null;
  return <GlobalCanvas />;
}
