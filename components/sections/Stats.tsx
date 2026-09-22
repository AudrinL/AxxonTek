"use client";

import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * Honest snapshot. Static numbers — no count-up, so the values are in the
 * HTML for search engines and never render as zero before JavaScript runs.
 * Update these as the company grows.
 */
const stats = [
  { value: "2025", label: "Founded, Norrsken Kigali" },
  { value: "4", label: "Senior engineers, no middle layer" },
  { value: "4", label: "Projects delivered in year one" },
  { value: "1 day", label: "Typical reply time" },
];

export function Stats() {
  return (
    <section aria-label="Company snapshot" className="border-b border-hairline">
      <motion.dl
        className="container-x grid grid-cols-2 divide-hairline py-8 md:grid-cols-4 md:divide-x"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
            }}
            className="px-2 py-3 md:px-8 md:first:pl-0 md:last:pr-0"
          >
            <dd className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-semibold tracking-tight text-body tabular-nums">
              {stat.value}
            </dd>
            <dt className="mt-2 text-[0.8125rem] leading-snug text-mute">{stat.label}</dt>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
