"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionBudget, useMotionTier } from "@/components/motion/MotionTier";
import { useHydrated } from "@/components/motion/useHydrated";
import { AfricaStatic } from "./AfricaStatic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

/**
 * The hero visual. A static dotted continent is in the server HTML from the
 * first byte; once the WebGL scene has drawn a frame it fades out beneath
 * it. The scene reads the hero's scroll position through a ref that a
 * ScrollTrigger writes every frame — no React re-renders on scroll.
 *
 * `className` must position and size the box (e.g. `absolute inset-0`); the
 * layers inside fill it.
 */
export function HeroField({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const tier = useMotionTier();
  const hydrated = useHydrated();
  const { pointStep, pointerEffects } = useMotionBudget();
  const [live, setLive] = useState(false);

  useGSAP(
    () => {
      const section = root.current?.closest("section");
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className} aria-hidden>
      <AfricaStatic
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${
          live ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Mounted after hydration (see useHydrated) and never for the "off" tier. */}
      {hydrated && tier !== "off" && (
        <HeroScene
          progress={progress}
          pointStep={pointStep}
          pointerEffects={pointerEffects}
          onLive={() => setLive(true)}
        />
      )}
    </div>
  );
}
