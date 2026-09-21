import type { Variants, Transition } from "framer-motion";

/** Shared easing curves — these match the CSS custom properties in globals.css. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};

/** Default viewport config: fire once, slightly before the element is centered. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: easeOutExpo } },
};

/** Parent that staggers its children's `hidden` -> `show` transition. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Per-word headline reveal — words rise out of an overflow-hidden mask. */
export const wordMask: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: easeOutExpo },
  },
};

/**
 * Per-line headline reveal. Every word still sits in its own mask, but words
 * on the same measured line share a delay, so each line rises as one piece.
 * `custom` is `{ line, base }` — the word's line index and the headline's
 * own delay — supplied by MaskedWords in `mode="lines"`.
 */
export const LINE_STAGGER = 0.09;
export const lineMask: Variants = {
  hidden: { y: "110%" },
  show: ({ line = 0, base = 0 }: { line?: number; base?: number } = {}) => ({
    y: "0%",
    transition: { duration: 1.1, ease: easeOutExpo, delay: base + line * LINE_STAGGER },
  }),
};

/** Clip-path wipe used for imagery. */
export const imageWipe: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};
