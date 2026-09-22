import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { positioning, site } from "@/lib/site";

/**
 * The opening.
 *
 * The positioning line is the headline, the way a masthead works. The
 * paragraph under it does the customer's job: three things that are
 * possible now, stated concretely enough to be checked, before any
 * mention of the company.
 *
 * It opens on the canvas rather than on ink. Both products open on this
 * warm off-white, the ground is going to turn to ink twice further down
 * the page, and spending that change in the first three seconds wastes
 * it. The bloom is here instead, which is the same material at a lower
 * volume.
 */
export function Hero() {
  return (
    <section
      data-chapter-ground="canvas"
      className="bloom relative flex min-h-[86svh] flex-col justify-center overflow-hidden pt-36 pb-[var(--chapter)]"
    >
      <span
        aria-hidden
        className="bloom-light -top-[24rem] -right-[14rem] opacity-70"
      />

      <div className="container-x">
        <Reveal as="p" className="label mb-9">
          <span className="label-dot" aria-hidden />
          Technology company · {site.address.city}
        </Reveal>

        <Reveal delay={70}>
          <h1 className="text-display max-w-[13ch]">
            What&rsquo;s next,{" "}
            <span className="text-accent">working now</span>.
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal delay={140}>
            <p className="text-lede max-w-xl">
              A school with no laboratory can still run a chemistry practical. A
              business in Kigali can send a parcel across the country and watch it
              move. A team drowning in spreadsheets can have one system instead.
              We build the technology that makes those things ordinary.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Start a project
                <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                  &#8594;
                </span>
              </Link>
              <Link href="/playground" className="pill pill-quiet hover:border-tone">
                Try something we built
              </Link>
            </div>
          </Reveal>

          {/* The promise, and the three things a buyer checks before they
              write. Each one is verifiable, which is the only reason it
              is on the page. */}
          <Reveal delay={210} className="self-end">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-tone-mute">
              {positioning.promise}
            </p>
            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-7">
              <Fact k="You talk to" v="An engineer" note="Not a salesperson" />
              <Fact k="We reply in" v="1 business day" note="Every enquiry" />
              <Fact k="Built in" v="Kigali" note="Norrsken" />
              <Fact k="Running now" v="Two products" note="Floow, TalentLens" />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Fact({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <div>
      <dt className="label mb-2">{k}</dt>
      <dd>
        <span className="block font-display text-[1.1875rem] font-semibold tracking-[-0.02em]">
          {v}
        </span>
        <span className="mt-1 block text-[0.8125rem] text-tone-faint">{note}</span>
      </dd>
    </div>
  );
}
