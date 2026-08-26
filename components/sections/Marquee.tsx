"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  "Custom Software",
  "Smart Buildings",
  "Security Systems",
  "Cloud Architecture",
  "Data & Analytics",
  "IT Infrastructure",
  "Technical Sourcing",
  "SaaS Platforms",
];

/**
 * Continuous capability ticker. The track holds two identical copies and
 * translates by exactly -50%, so the loop is seamless at any width.
 */
export function Marquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="hairline-t border-b border-hairline py-6">
        <div className="container-x flex flex-wrap justify-center gap-x-8 gap-y-2">
          {items.map((item) => (
            <span key={item} className="text-sm text-faint">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="hairline-t relative flex overflow-hidden border-b border-hairline py-7 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden
    >
      <motion.div
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-12">
            <span className="text-[0.8125rem] font-medium tracking-[0.16em] whitespace-nowrap text-faint uppercase">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-ember/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
