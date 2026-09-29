"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { useParallax } from "@/lib/motion";

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
 * About us, on black. A short story header, then one large tile holding the
 * globe over Africa (already in the brand's ember), then three promises as cards. The globe drifts on a slow
 * scrubbed parallax inside its tile, so the tile stays put and the world in
 * it moves.
 */
export function AboutGoal() {
  const globe = useParallax<HTMLDivElement>(90);

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

        {/* The globe tile. */}
        <Reveal delay={80} className="mt-16 lg:mt-20">
          <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[var(--r-card)] bg-black sm:aspect-[16/9] lg:aspect-[1260/560]">
            <div ref={globe} aria-hidden className="absolute -inset-y-[10%] inset-x-0 -z-10">
              <Image
                src="/assets/home/globe.webp"
                alt=""
                fill
                sizes="(min-width: 1360px) 1260px, 92vw"
                className="object-cover object-[62%_center]"
              />
            </div>
            {/* Darken the left for the chip and let the globe glow on the right. */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 75%)",
              }}
            />

            <div className="absolute top-6 left-6 flex items-center gap-2.5 rounded-full bg-black/45 py-2 pr-4 pl-3 text-[0.8125rem] font-semibold text-white backdrop-blur-md sm:top-8 sm:left-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6a2e] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6a2e]" />
              </span>
              Kigali, Rwanda
            </div>
          </div>
        </Reveal>

        {/* Three promises. */}
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 70} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[var(--r-card)] bg-ink-soft p-8 lg:p-10">
                {/* A warm glow that wakes up on hover, the brand's bloom in miniature. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-0 transition-opacity duration-700 ease-[var(--ease-out)] group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(240,88,31,0.32) 0%, rgba(240,88,31,0) 70%)",
                  }}
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(240,88,31,0.14)] text-[#ff8a55]">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="relative mt-16 font-display text-[1.75rem] font-semibold leading-[1.14] tracking-[0.007em]">
                  {c.title}
                </h3>
                <p className="relative mt-3 max-w-[32ch] text-[1.0625rem] leading-[1.47] text-tone-mute">
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
