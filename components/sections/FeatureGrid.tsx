"use client";

import { motion } from "framer-motion";
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
    <section
      id={id}
      className={`section-y relative scroll-mt-20 ${surface === "band" ? "band" : ""}`}
    >
      <div className="container-x">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] max-w-2xl">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-5">{eyebrow}</p>
            </Reveal>
          )}
          <MaskedWords as="h2" text={heading} accent={accent} className="text-heading" />
          {lede && (
            <Reveal delay={0.12}>
              <p className="text-lede mt-6">{lede}</p>
            </Reveal>
          )}
        </div>

        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp} className="h-full">
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="card group h-full p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ember/40 hover:shadow-card-hover sm:p-8">
      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ember-tint text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-white">
        <Icon name={feature.icon} />
      </span>
      <h3 className="mb-2.5 text-[1.1875rem] font-semibold tracking-tight">{feature.title}</h3>
      <p className="text-[0.9375rem] leading-relaxed text-mute">{feature.body}</p>
    </div>
  );
}
