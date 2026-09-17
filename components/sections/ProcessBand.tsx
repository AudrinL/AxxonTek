"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * The page's one high-contrast break: the orange band. It carries the
 * strongest argument (research first, built by the people who scoped it)
 * and a conversion point at the midpoint of the page.
 */
export function ProcessBand() {
  return (
    <section id="process" className="band-ember relative isolate overflow-hidden scroll-mt-20">
      {/* Large faint numeral as texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-24 -z-10 text-[26rem] leading-none font-semibold tracking-tighter text-white/[0.06] select-none"
      >
        01
      </div>

      <div className="container-x section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-white/80">How we work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-heading max-w-[14ch] text-white">
                We study the problem first. Then the people who scoped it build it.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/80">
                Most agencies start building on day one, because that is what gets billed. We start
                by understanding the problem — that is what makes the build worth paying for.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="/contact" variant="inverse" size="lg" strength={8}>
                  Book a call
                  <Icon name="arrow" size={16} />
                </MagneticButton>
                <MagneticButton
                  href="/about"
                  variant="ghost"
                  size="lg"
                  strength={6}
                  className="text-white hover:bg-white/10"
                >
                  Meet the team
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <motion.ol
            className="flex flex-col gap-3"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {processSteps.map((step) => (
              <motion.li
                key={step.n}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
                }}
                className="flex gap-5 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm sm:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[0.75rem] font-semibold text-ember-deep">
                  {step.n}
                </span>
                <span>
                  <span className="mb-1.5 block text-[1.125rem] font-semibold tracking-tight text-white">
                    {step.title}
                  </span>
                  <span className="block text-[0.9375rem] leading-relaxed text-white/75">
                    {step.body}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
