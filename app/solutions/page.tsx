import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { capabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Software and platforms, AI and automation, immersive and virtual, smart systems and technology advisory, built for how Africa actually works.",
  alternates: { canonical: "/solutions" },
};

/**
 * The full range, one anchored section per capability so the footer and
 * homepage links (/solutions#software and so on) land where they say.
 * Kept on the canvas the whole way down: the reader disliked the ground
 * flipping in every section, so the structure comes from the cards, not
 * from the light.
 */
export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions"
        title={
          <>
            Five ways in, <span className="text-accent">two or three at a time</span>.
          </>
        }
        lede="Most projects use a few of these together. You do not have to know which before you call. Working that out is part of what the first conversation is for."
        cta={{ href: "/contact", text: "Start a project" }}
      />

      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x flex flex-col gap-4">
          {capabilities.map((capability, i) => (
            <Reveal as="div" key={capability.id} delay={Math.min(i, 3) * 60}>
              <article
                id={capability.id}
                className="card scroll-mt-28 p-8 md:p-10"
              >
                <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                  <div>
                    <p className="label mb-5">
                      <span className="label-dot" aria-hidden />
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.028em] md:text-[2rem]">
                      {capability.name}
                    </h2>
                    <p className="mt-4 text-lede max-w-[34ch]">{capability.lede}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {capability.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-tone-mute">
                      {capability.body}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {capability.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3.5">
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ember-wash text-ember-text">
                            <Icon name="check" size={15} />
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-tone-mute">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Start a project
              </Link>
              <Link
                href="/pricing"
                className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
              >
                See hosting pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
