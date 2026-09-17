"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { easeOutExpo, viewportOnce, wordMask } from "@/lib/motion";

type MaskedWordsProps = {
  text: string;
  className?: string;
  /** Words matching these (case-insensitive) get the ember gradient treatment. */
  accent?: string[];
  delay?: number;
  /** Render immediately rather than waiting for the element to scroll into view. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Headline reveal: each word sits in its own overflow-hidden mask and rises
 * into place on a staggered expo curve. Line breaks are preserved by wrapping
 * on real spaces, so long headlines still reflow responsively.
 *
 * Markup is identical on the server and the client on purpose: branching on
 * `useReducedMotion` here caused a hydration mismatch for reduced-motion
 * visitors. The root `MotionConfig reducedMotion="user"` neutralises the
 * transform animation for them instead.
 */
export function MaskedWords({
  text,
  className,
  accent = [],
  delay = 0,
  immediate = false,
  as = "h2",
}: MaskedWordsProps) {
  const Tag = motion[as];
  const accentSet = new Set(accent.map((w) => w.toLowerCase()));

  // Preserve author-provided hard breaks written as "\n".
  const lines = text.split("\n");

  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: viewportOnce };


  return (
    <Tag
      className={className}
      initial="hidden"
      {...animateProps}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden>
          {line.split(" ").map((word, wordIndex, allWords) => {
            const clean = word.replace(/[.,—:;!?]/g, "").toLowerCase();
            const isAccent = accentSet.has(clean);
            return (
              <Fragment key={`${lineIndex}-${wordIndex}`}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block ${isAccent ? "font-display text-ember italic font-normal" : ""}`}
                    variants={wordMask}
                    transition={{ duration: 1, ease: easeOutExpo }}
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
