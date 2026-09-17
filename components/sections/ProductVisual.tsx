"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * Abstract product "screens" built from CSS, so the product cards show
 * something without us faking a screenshot. Each is a stylised gesture at
 * what the product does — a ranked candidate list, a parcel moving along a
 * route — in the brand's own colours.
 */
export function ProductVisual({ name }: { name: string }) {
  if (name === "TalentLens") return <TalentLensVisual />;
  if (name === "Floow") return <FloowVisual />;
  return null;
}

const row = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

/** A shortlist: four candidates, scores filling in, the top one highlighted. */
function TalentLensVisual() {
  const candidates = [
    { score: 92, top: true },
    { score: 78 },
    { score: 64 },
    { score: 51 },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-ink-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="h-2 w-20 rounded-full bg-hairline-strong" />
        <span className="rounded-full bg-ember-tint px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.12em] text-ember uppercase">
          Shortlist
        </span>
      </div>
      <motion.ul
        className="flex flex-col gap-2"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
      >
        {candidates.map((c, i) => (
          <motion.li
            key={i}
            variants={row}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
              c.top ? "bg-ink-raised shadow-card ring-1 ring-ember/30" : "bg-ink-raised/60"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold ${
                c.top ? "bg-ember text-white" : "bg-hairline text-mute"
              }`}
            >
              {i + 1}
            </span>
            <span className="flex flex-1 flex-col gap-1.5">
              <span className={`h-2 rounded-full bg-hairline-strong ${i % 2 ? "w-2/5" : "w-1/2"}`} />
              <span className="h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                <motion.span
                  className={`block h-full rounded-full ${c.top ? "bg-ember" : "bg-faint"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.score}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.4 + i * 0.12 }}
                />
              </span>
            </span>
            <span className={`w-8 text-right text-[0.75rem] font-semibold tabular-nums ${c.top ? "text-ember" : "text-mute"}`}>
              {c.score}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/** A parcel travelling a route across three stops, with a live status pill. */
function FloowVisual() {
  const stops = ["Kigali", "Muhanga", "Huye"];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-ink-panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="h-2 w-16 rounded-full bg-hairline-strong" />
        <span className="flex items-center gap-1.5 rounded-full bg-ember-tint px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.12em] text-ember uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
          </span>
          In transit
        </span>
      </div>

      {/* Route */}
      <div className="relative px-3 pt-3 pb-1">
        <div className="absolute top-[1.35rem] right-6 left-6 h-px bg-hairline-strong" />
        <motion.div
          className="absolute top-[1.35rem] left-6 h-px bg-ember"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 3rem)" }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.3 }}
        />
        {/* Parcel */}
        <motion.span
          className="absolute top-[0.55rem] left-6 -ml-3 flex h-6 w-6 items-center justify-center rounded-lg bg-ember text-white shadow-[0_6px_14px_-6px_var(--color-ember)]"
          initial={{ left: "1.5rem" }}
          whileInView={{ left: "calc(100% - 1.5rem)" }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.3 }}
        >
          <Icon name="pin" size={12} />
        </motion.span>

        <ul className="relative flex justify-between">
          {stops.map((stop, i) => (
            <li key={stop} className="flex flex-col items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 ${
                  i === 0 ? "border-ember bg-ember" : "border-hairline-strong bg-ink-panel"
                }`}
              />
              <span className="text-[0.6875rem] font-medium text-mute">{stop}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Sent", "Tracked", "Delivered"].map((label, i) => (
          <div key={label} className="rounded-lg bg-ink-raised/70 px-2.5 py-2">
            <span className={`block h-1.5 rounded-full ${i === 2 ? "w-1/3 bg-hairline" : "w-2/3 bg-ember/70"}`} />
            <span className="mt-1.5 block text-[0.625rem] font-medium text-faint">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
