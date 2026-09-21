"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/components/motion/MotionTier";

/** Height of the fixed header; anchor jumps land just below it. */
const ANCHOR_OFFSET = -88;

/**
 * Drives Lenis from GSAP's ticker so the scroll position, every
 * ScrollTrigger and every scrubbed timeline advance in the same frame.
 * Reads the instance through context: ReactLenis creates it in an effect
 * and publishes it via state, so a parent's mount effect would see nothing.
 */
function TickerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

/**
 * Lenis smooth scroll on the window. Lenis scrolls the *real* window, so
 * framer-motion's `useScroll`, IntersectionObserver and
 * `getBoundingClientRect` all keep working unchanged.
 *
 * Touch devices keep native scrolling (`syncTouch: false`) — it is cheaper
 * and what the platform's scrollbars and overscroll expect. Reduced-motion
 * visitors get native wheel scrolling too.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const tier = useMotionTier();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: tier !== "off",
        syncTouch: false,
        anchors: { offset: ANCHOR_OFFSET },
      }}
    >
      <TickerSync />
      {children}
    </ReactLenis>
  );
}
