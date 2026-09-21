"use client";

import { useInView } from "framer-motion";
import { createElement, useEffect, useRef, type ElementType } from "react";
import { useBootReady } from "@/components/motion/Boot";
import { useMotionBudget } from "@/components/motion/MotionTier";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&<>/_-";

type ScrambleProps = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Seconds before the decode starts. */
  delay?: number;
  /** Milliseconds for the whole string to resolve. */
  duration?: number;
  /** Run as soon as the preloader lifts, rather than when scrolled into view. */
  immediate?: boolean;
};

/**
 * Decoding label: characters churn through a glyph set and lock in from
 * left to right, like a terminal resolving a string. The final text is in
 * the server HTML and is what assistive tech reads; only the visible
 * characters are swapped, through the DOM, with no re-renders.
 */
export function Scramble({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 900,
  immediate = false,
}: ScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useBootReady();
  const { flourishes } = useMotionBudget();

  const shouldRun = flourishes && (immediate ? ready : inView);

  useEffect(() => {
    if (!shouldRun) return;
    const el = ref.current;
    if (!el) return;

    const chars = Array.from(text);
    let raf = 0;
    let start = 0;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / duration;
      let out = "";
      let settled = true;
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === " " || c === "·" || c === "—") {
          out += c;
          continue;
        }
        // Each character locks in a little after the one before it.
        const lockAt = (i / chars.length) * 0.75;
        if (t >= lockAt) {
          out += c;
        } else {
          settled = false;
          out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      }
      el.textContent = out;
      if (!settled) raf = requestAnimationFrame(frame);
      else el.textContent = text;
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(frame);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [shouldRun, text, delay, duration]);

  return createElement(Tag, { ref, className, "aria-label": text }, text);
}
