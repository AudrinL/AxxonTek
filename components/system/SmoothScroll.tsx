"use client";

import { useSmoothScroll } from "@/lib/motion";

/**
 * Mounts Lenis + GSAP for the whole document. Renders nothing. Lenis still
 * scrolls the real window, so the Ground observer and every native scroll
 * listener keep working; it only smooths the motion and gives ScrollTrigger
 * a virtual position to measure pins and scrubs against.
 */
export function SmoothScroll() {
  useSmoothScroll();
  return null;
}
