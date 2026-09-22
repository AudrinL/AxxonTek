"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rule } from "@/components/layout/Rule";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * How we work — and, folded into it, why us.
 *
 * These used to be two sections making the same argument in different
 * clothes: "no handoffs" appeared in the trust line, the process, the
 * reasons and the FAQ, four times on one page. Repetition reads as filler
 * however well each sentence is written, so the promise now lives on the
 * step that earns it.
 *
 * These are numbered because they genuinely are a sequence — the order is
 * information a buyer needs, not decoration.
 */
const steps = [
  {
    n: "01",
    title: "We study the problem",
    body: "Before scoping or quoting, we spend real time understanding what you are trying to fix — and whether you need what you think you need.",
    promise: "You are never priced on a guess",
  },
  {
    n: "02",
    title: "We tell you the truth",
    body: "You get a clear recommendation, including when the answer is a smaller project, a different approach, or not us at all.",
    promise: "Including when the answer is no",
  },
  {
    n: "03",
    title: "We build it ourselves",
    body: "The engineer who scoped it writes the code and installs the systems, and you keep their direct contact after launch.",
    promise: "No handoffs, no junior bench",
  },
] as const;

export function ProcessBand() {
  return (
    <section id="process" className="section-y scroll-mt-24">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label mb-6">How we work</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="Small on purpose. Senior by default."
              accent={["purpose."]}
              className="text-heading max-w-[13ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-mute">
              Four engineers, no account managers. That is not a limitation we
              apologise for — it is the reason the work fits.
            </p>
          </Reveal>
        </div>

        <Rule />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {steps.map((step) => (
            <motion.li
              key={step.n}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
              }}
            >
              <div className="grid gap-x-10 gap-y-4 py-10 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)] md:py-12">
                <span className="label pt-2 text-ember-text">{step.n}</span>

                <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none">
                  {step.title}
                </h3>

                <div>
                  <p className="max-w-lg text-[0.9375rem] leading-relaxed text-mute">
                    {step.body}
                  </p>
                  <p className="mt-4 flex items-center gap-3 text-[0.8125rem] text-body">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 shrink-0 bg-moss"
                    />
                    {step.promise}
                  </p>
                </div>
              </div>
              <Rule />
            </motion.li>
          ))}
        </motion.ol>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-ember-deep px-8 py-4 font-medium text-white transition-colors duration-300 hover:bg-ember-deep"
            >
              Start with a call
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                &#8594;
              </span>
            </Link>
            <p className="text-[0.8125rem] text-faint">
              30 minutes, an engineer, no obligation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
