"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { useParallax } from "@/lib/motion";

const commitments = [
  {
    title: "Built for the conditions",
    body: "Light pages, mid-range phones, mobile data and mobile money. We design for how people here actually connect, not for a demo laptop.",
  },
  {
    title: "Kept running",
    body: "We host, watch and support what we ship, so launch day is the start of the relationship rather than the end of it.",
  },
  {
    title: "Honest about fit",
    body: "If a smaller project or a different approach serves you better, we say so, even when the answer is not us.",
  },
];

/**
 * About us and our goal, on ink because this is the company speaking in its
 * own voice. The backdrop is the globe over Africa, already in the brand's
 * ember, drifting on a scrubbed parallax so the words sit in front of a world
 * that moves. The goal is set large, the way the hero sets its thesis, and
 * the three commitments underneath are the working proof of it.
 */
export function AboutGoal() {
  const backdrop = useParallax<HTMLDivElement>(140);

  return (
    <section
      data-chapter-ground="ink"
      className="bloom chapter-y relative overflow-hidden text-white"
    >
      <div ref={backdrop} aria-hidden className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-30">
        <Image
          src="/assets/home/globe.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--ink) 0%, color-mix(in srgb, var(--ink) 70%, transparent) 45%, color-mix(in srgb, var(--ink) 25%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--ink) 0%, transparent 22%, transparent 78%, var(--ink) 100%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <Reveal as="p" className="label mb-6 !text-white/60">
              <span className="label-dot" aria-hidden />
              About us
            </Reveal>
            <Reveal delay={70}>
              <p className="max-w-[34ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.55] text-white/85">
                AxxonTek is a technology company in Kigali. We design, build and
                operate software, cloud infrastructure and smart systems for
                businesses, schools and clinics across Africa, and we run two
                products of our own, Floow and TalentLens.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <Link
                href="/about"
                className="group mt-10 inline-flex h-[3.125rem] items-center gap-2 rounded-full border border-white/30 px-7 text-[0.9375rem] font-semibold transition-colors duration-[var(--t-hover)] hover:border-white/70"
              >
                More about us
                <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            </Reveal>
          </div>

          <div>
            <Reveal as="p" className="label mb-6 !text-white/60">
              <span className="label-dot" aria-hidden />
              Our goal
            </Reveal>
            <Reveal delay={70}>
              <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.035em]">
                <span className="text-serif text-[1.06em] text-[#ffd8c7]">Working</span> technology
                in every place that needs it.
              </h2>
            </Reveal>
          </div>
        </div>

        <ul className="mt-20 grid border-t border-white/15 md:grid-cols-3 md:gap-x-12">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 70} className="border-b border-white/15 py-8 md:border-b-0">
              <p className="font-mono text-[0.75rem] tracking-[0.14em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em]">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/70">
                {c.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
