"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import { Icon } from "@/components/Icon";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeUp } from "@/lib/motion";

export type Feature = { icon: string; title: string; body: string };

type FeatureGridProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  accent?: string[];
  lede?: string;
  features: readonly Feature[];
  /** "band" lifts the section onto the raised surface, so pages alternate. */
  surface?: "ink" | "band";
};

export function FeatureGrid({
  id,
  eyebrow,
  heading,
  accent = [],
  lede,
  features,
  surface = "ink",
}: FeatureGridProps) {
  return (
    <section id={id} className={`section-y relative ${surface === "band" ? "band" : ""}`}>
      <div className="container-x">
        <div className="mb-[clamp(3rem,6vw,5rem)] max-w-2xl">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-6">{eyebrow}</p>
            </Reveal>
          )}
          <MaskedWords as="h2" text={heading} accent={accent} className="text-heading" />
          {lede && (
            <Reveal delay={0.12}>
              <p className="text-lede mt-7">{lede}</p>
            </Reveal>
          )}
        </div>

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <SpotlightCard feature={feature} />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Card with a cursor-tracked spotlight and a border that lights toward the pointer. */
function SpotlightCard({ feature }: { feature: Feature }) {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(228,98,1,0.13), transparent 62%)`;
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(228,98,1,0.55), transparent 70%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleLeave() {
    mouseX.set(-200);
    mouseY.set(-200);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-surface-2 p-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:p-9"
    >
      {/* Lit border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderGlow,
          maskImage: "linear-gradient(#000, #000)",
          WebkitMaskImage: "linear-gradient(#000, #000)",
          padding: "1px",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Spotlight wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative">
        <span className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-white/[0.02] text-ember transition-colors duration-500 group-hover:border-ember/40 group-hover:bg-ember/10">
          <Icon name={feature.icon} />
        </span>
        <h3 className="mb-3 text-[1.1875rem] tracking-tight">{feature.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-mute">{feature.body}</p>
      </div>
    </div>
  );
}
