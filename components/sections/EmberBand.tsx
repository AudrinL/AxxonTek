"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const steps = [
  {
    n: "01",
    title: "We study the problem",
    body: "Before scoping or quoting, we spend real time understanding what you are actually trying to fix.",
  },
  {
    n: "02",
    title: "We tell you the truth",
    body: "Including when the answer is a smaller project, a different approach, or not us at all.",
  },
  {
    n: "03",
    title: "We build it ourselves",
    body: "The people who scoped it write the code. Nothing is handed to a junior bench you never meet.",
  },
];

/**
 * The page's one high-contrast break. A run of near-black sections flattens
 * out visually; this band resets the eye and carries the strongest argument
 * plus a conversion point at roughly the page's midpoint.
 */
export function EmberBand() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section ref={ref} className="band-ember relative isolate overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-1/4 top-0 -z-10 h-full"
        style={reduced ? undefined : { y: glowY }}
      >
        <div className="mx-auto h-full w-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,61,0.28),transparent)] blur-3xl" />
      </motion.div>

      <div className="container-x py-[clamp(5rem,10vw,8.5rem)]">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[0.95fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-ember-soft">How we work</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={"Research first.\nAlways."}
              accent={["Always."]}
              className="text-heading max-w-[12ch]"
            />
            <Reveal delay={0.12}>
              <p className="text-lede mt-7 max-w-md text-bone/70">
                Most agencies start building on day one because that is what gets billed. We start by
                understanding the problem, because that is what makes the build worth paying for.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="/contact" size="lg">
                  Start a conversation
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12h14m-6-6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </MagneticButton>
                <MagneticButton href="/about" variant="outline" size="lg">
                  How we think
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <motion.ol
            className="flex flex-col"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {steps.map((step) => (
              <motion.li
                key={step.n}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo } },
                }}
                className="flex gap-7 border-t border-ember/25 py-8 last:border-b"
              >
                <span className="font-mono text-[0.75rem] text-ember-soft">{step.n}</span>
                <span>
                  <span className="mb-2 block text-[1.1875rem] tracking-tight text-bone">
                    {step.title}
                  </span>
                  <span className="block text-[0.9375rem] leading-relaxed text-bone/60">
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
