"use client";

import { motion } from "framer-motion";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { easeOutExpo, lineMask, viewportOnce, wordMask } from "@/lib/motion";
import { useBootReady } from "@/components/motion/Boot";

type MaskedWordsProps = {
  text: string;
  className?: string;
  /** Words matching these (case-insensitive) get the italic accent treatment. */
  accent?: string[];
  /** Colour class for accent words. Ember by default; pass a light one over the orange hero. */
  accentClassName?: string;
  delay?: number;
  /** Render immediately (once the preloader has lifted) rather than waiting for the element to scroll into view. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /**
   * "words" staggers every word; "lines" measures where the text wraps and
   * lifts each line as one piece — calmer, and what big display type wants.
   */
  mode?: "words" | "lines";
};

/**
 * Headline reveal: each word sits in its own overflow-hidden mask and rises
 * into place on an expo curve. Line breaks are preserved by wrapping on real
 * spaces, so long headlines still reflow responsively.
 *
 * Markup is identical on the server and the client on purpose: branching on
 * `useReducedMotion` here caused a hydration mismatch for reduced-motion
 * visitors. The root `MotionConfig reducedMotion="user"` neutralises the
 * transform animation for them instead. Line indices only affect timing,
 * never markup, so measuring them after hydration is safe.
 */
export function MaskedWords({
  text,
  className,
  accent = [],
  accentClassName = "text-ember-text",
  delay = 0,
  immediate = false,
  as = "h2",
  mode = "words",
}: MaskedWordsProps) {
  // Every allowed tag has the same props here; the cast keeps the ref typed.
  const Tag = motion[as] as typeof motion.h2;
  const accentSet = new Set(accent.map((w) => w.toLowerCase()));
  const ready = useBootReady();

  // Preserve author-provided hard breaks written as "\n".
  const lines = text.split("\n");

  /* ---------- line measurement (mode="lines") ---------- */
  const ref = useRef<HTMLHeadingElement>(null);
  const [lineOf, setLineOf] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (mode !== "lines") return;
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const masks = el.querySelectorAll<HTMLElement>("[data-mask]");
      const tops: number[] = [];
      const next: number[] = [];
      masks.forEach((m) => {
        const top = m.offsetTop;
        let idx = tops.findIndex((t) => Math.abs(t - top) < 4);
        if (idx === -1) {
          tops.push(top);
          idx = tops.length - 1;
        }
        next.push(idx);
      });
      setLineOf((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode, text]);

  const animateProps = immediate
    ? { animate: ready ? ("show" as const) : ("hidden" as const) }
    : { whileInView: "show" as const, viewport: viewportOnce };

  const parentVariants =
    mode === "lines"
      ? { hidden: {}, show: {} }
      : { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } };

  let wordIndexGlobal = 0;

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      {...animateProps}
      variants={parentVariants}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden>
          {line.split(" ").map((word, wordIndex, allWords) => {
            const clean = word.replace(/[.,—:;!?]/g, "").toLowerCase();
            const isAccent = accentSet.has(clean);
            const i = wordIndexGlobal++;
            return (
              <Fragment key={`${lineIndex}-${wordIndex}`}>
                {/* The mask is `overflow-hidden` at the heading's own
                    line-height, which display type sets below 1 — so the
                    glyphs are taller than the box clipping them and
                    descenders get cut. The padding opens the box up; the
                    matching negative margin keeps the line rhythm. Nothing
                    leaks while hidden: the word sits at y:110%, clear of
                    the mask entirely. */}
                <span
                  data-mask
                  className="inline-block overflow-hidden align-bottom pt-[0.14em] pb-[0.26em] -mt-[0.14em] -mb-[0.26em]"
                >
                  <motion.span
                    className={`inline-block ${isAccent ? `font-medium ${accentClassName}` : ""}`}
                    variants={mode === "lines" ? lineMask : wordMask}
                    custom={mode === "lines" ? { line: lineOf[i] ?? 0, base: delay } : undefined}
                    transition={mode === "lines" ? undefined : { duration: 1, ease: easeOutExpo }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* Real space between masks: keeps the DOM text readable and
                    lets the line wrap naturally. */}
                {wordIndex < allWords.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
