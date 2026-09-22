"use client";

import dynamic from "next/dynamic";
import { useMotionTier } from "@/components/motion/MotionTier";
import { useHydrated } from "@/components/motion/useHydrated";
import { useHasScenes } from "@/lib/scenes";

/**
 * three.js + React Three Fiber are ~230kB gzipped and purely decorative, so
 * they arrive after hydration, and only on pages where a scene has
 * registered (see lib/scenes.ts). The preloader waits for the canvas on
 * those pages (see `signalBoot`), so first-time visitors never see a scene
 * pop in.
 */
const GlobalCanvas = dynamic(() => import("./GlobalCanvas"), { ssr: false, loading: () => null });

export function GlobalCanvasLoader() {
  const tier = useMotionTier();
  const hydrated = useHydrated();
  const hasScenes = useHasScenes();
  // Nothing until hydration so the server and client agree; nothing for the
  // "off" tier; and nothing on pages without a scene — none of them download
  // three.js.
  if (!hydrated || tier === "off" || !hasScenes) return null;
  return <GlobalCanvas />;
}
