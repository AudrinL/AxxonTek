"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { useBootReady } from "@/components/motion/Boot";
import { Dust } from "@/components/motion/Dust";
import { site } from "@/lib/site";

const hidden = { opacity: 0, y: 16 };
const shown = { opacity: 1, y: 0 };

/**
 * The hero states the thesis and asks for the call. Nothing else.
 *
 * It opens on ink rather than on canvas now. Three reasons, in order of
 * how much they mattered. The dust only exists on a dark ground — warm
 * particles on an off-white page are invisible, and the atmosphere is
 * the one piece of decoration this page gets. The products both put
 * their own structure in near-black panels, so arriving in that black
 * and resolving up into the canvas is the studio introducing itself in
 * the material its work is made of. And it gives the page somewhere to
 * go: ink, then canvas, then ink again for the work.
 *
 * No stock photograph under a duotone and no invented product mockup —
 * the two fastest ways to look like every other agency. What is left is
 * the sentence, set large at 400, and the handful of facts a buyer
 * actually checks before agreeing to talk to anyone.
 */
export function Hero() {
  const ready = useBootReady();

  const rise = (delay: number) => ({
    initial: hidden,
    animate: ready ? shown : hidden,
    transition: { duration: 0.9, ease: easeOutExpo, delay },
  });

  return (
    <section className="panel-ink relative isolate flex min-h-[94svh] flex-col justify-center overflow-hidden pt-40 pb-[var(--spacing-section)]">
      <Dust />

      {/* The panel resolves into the canvas at the bottom edge only —
          the top is under the nav, where there is nothing to resolve. */}
      <div className="panel-fade-bottom z-10" aria-hidden />

      <div className="container-x relative z-10">
        <motion.p
          className="label label-dot mb-10 text-on-ink-mute"
          {...rise(0.05)}
        >
          <span className="label-dot-mark" aria-hidden />
          Kigali, Rwanda
        </motion.p>

        <MaskedWords
          as="h1"
          mode="lines"
          text="Software that survives the last mile."
          accent={["last", "mile."]}
          accentClassName="text-ember"
          className="text-display max-w-[15ch] text-on-ink"
          immediate
          delay={0.15}
        />

        <div className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <motion.div {...rise(0.6)}>
            <p className="max-w-xl text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.6] text-on-ink-mute">
              Four engineers in Kigali building apps, websites and smart systems
              for businesses across Africa — designed for mid-range Android on
              mobile data, because that is what your customers are holding.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-x-4 gap-y-4">
              <Link
                href="/contact"
                className="control group bg-ember text-white hover:bg-ember-deep"
              >
                Book a call
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </Link>
              <Link
                href="/work"
                className="control border border-line-on-ink text-on-ink hover:bg-tint"
              >
                See the work
              </Link>
            </div>
          </motion.div>

          {/* The facts a buyer checks before booking. Each one is
              verifiable, which is the only reason it is here. They sit
              in a tinted well rather than floating, so the column has an
              edge to align to instead of drifting in the dark. */}
          <motion.dl
            className="card-ink grid grid-cols-2 gap-x-8 gap-y-8 self-end p-7"
            {...rise(0.72)}
          >
            <Fact term="You talk to" value="An engineer" note="Not a salesperson" />
            <Fact term="We reply in" value="1 business day" note="Every enquiry" />
            <Fact term="Team size" value="Four" note="Who also build it" />
            <Fact term="Based at" value={site.address.line1} note={site.address.city} />
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function Fact({ term, value, note }: { term: string; value: string; note: string }) {
  return (
    <div>
      <dt className="label mb-2.5 text-on-ink-mute">{term}</dt>
      <dd>
        <span className="block text-[1.1875rem] leading-tight font-medium tracking-[-0.01em] text-on-ink">
          {value}
        </span>
        <span className="mt-1.5 block text-[0.8125rem] text-on-ink-mute">{note}</span>
      </dd>
    </div>
  );
}
