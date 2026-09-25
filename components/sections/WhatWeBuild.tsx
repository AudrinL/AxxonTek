import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { whatWeBuild } from "@/lib/site";

/**
 * The spine of the argument, on canvas. Three levels the company works on,
 * as three heavy rows rather than three cards: rows read as a table of
 * contents for a company, cards read as a price list. The number on each
 * row is the register the studio uses everywhere, mono and quiet.
 *
 * This is the single clearest statement that AxxonTek is a technology
 * company and not an agency, so it comes first after the hero and it is
 * given room.
 */
export function WhatWeBuild() {
  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[22ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              What we build
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">
                One company, <span className="text-serif text-accent">three</span> levels.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[42ch]">
            <p className="text-lede">
              We build products we own, systems for the organisations that hire us,
              and the emerging technology that becomes both. Most companies do one
              of these. Doing all three is the point.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line">
          {whatWeBuild.map((level, i) => (
            <Reveal as="li" key={level.id} delay={Math.min(i, 3) * 70}>
              <Link
                href={level.href}
                className="group grid items-baseline gap-x-10 gap-y-4 border-b border-line py-10 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)_auto]"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-tone-faint uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                    {level.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                    {level.name}
                  </h3>
                </div>

                <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-tone-mute md:pt-6">
                  {level.lede}
                </p>

                <span
                  aria-hidden
                  className="flex items-center gap-3 self-center font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent"
                >
                  {level.cta}
                  <span className="inline-block transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1">
                    <Icon name="arrow" size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
