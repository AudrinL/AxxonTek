"use client";

import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon, type IconName } from "@/components/Icon";

const commitments: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "globe",
    title: "Built for Africa.",
    body: "Fast on basic phones and slow internet, with mobile money built in.",
  },
  {
    icon: "shield",
    title: "Always supported.",
    body: "We host and look after everything we build.",
  },
  {
    icon: "handshake",
    title: "Honest advice.",
    body: "If a smaller or cheaper option fits you better, we will tell you.",
  },
];

/**
 * About us, on black. A short story header, then three promises as cards.
 * No photograph: the words and the cards carry it.
 */
export function AboutGoal() {
  return (
    <section data-chapter-ground="ink" className="chapter-y relative overflow-hidden text-white">
      <div className="container-x">
        {/* The story header. */}
        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal as="p" className="label mb-3">
              About us
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-display">
                Technology that <span className="text-serif">works</span> for everyone.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-lede max-w-[40ch]">
              <span className="text-tone">AxxonTek is a technology company in Kigali.</span> We
              build software, cloud and smart systems for businesses, schools and clinics across
              Africa. We also run two products of our own:{" "}
              <span className="text-tone">Floow and TalentLens</span>.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] transition-colors duration-[var(--t-hover)] hover:underline"
            >
              Learn more about us
              <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5">
                <Icon name="arrow" size={15} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Three promises. */}
        <ul className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 70} className="h-full">
              <div className="h-full rounded-[var(--r-card)] bg-ink-soft p-8 lg:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(240,88,31,0.14)] text-[#ff8a55]">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-16 font-display text-[1.75rem] font-semibold leading-[1.14] tracking-[0.007em]">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-[1.0625rem] leading-[1.47] text-tone-mute">
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
