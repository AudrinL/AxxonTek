"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { useParallax } from "@/lib/motion";

const commitments = [
  {
    title: "Built for Africa.",
    body: "Fast on basic phones and slow internet, with mobile money built in.",
  },
  {
    title: "Always supported.",
    body: "We host and look after everything we build.",
  },
  {
    title: "Honest advice.",
    body: "If a smaller or cheaper option fits you better, we will tell you.",
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
        <div className="mx-auto max-w-[52rem]">
          <Reveal as="p" className="label mb-3">
            About us
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-display">
              Technology that <span className="text-serif">works</span> for everyone.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-lede mt-6 max-w-[40ch]">
              <span className="text-tone">
                AxxonTek is a technology company in Kigali.
              </span>{" "}
              We build software, cloud and smart systems for businesses, schools and
              clinics across Africa. We also run two products of our own:{" "}
              <span className="text-tone">Floow and TalentLens</span>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] transition-colors duration-[var(--t-hover)] hover:underline"
            >
              Learn more about us
              <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5">
                <Icon name="arrow" size={15} />
              </span>
            </Link>
          </Reveal>
        </div>

        <ul className="mt-24 grid gap-5 md:grid-cols-3">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 70} className="h-full">
              <div className="h-full rounded-[var(--r-card)] bg-ink-soft p-8 lg:p-10">
                <h3 className="font-display text-[1.75rem] font-semibold leading-[1.14] tracking-[0.007em]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-[1.47] text-tone-mute">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
