"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * The proof slot: evidence that the offer above actually works.
 *
 * NOTE FOR THE TEAM — this is currently written from what is verifiably true
 * today (first year, four delivered projects, research-first process). The
 * single highest-leverage upgrade to this page is replacing it with a named
 * case study: client, problem, what was built, measurable outcome, and a real
 * quote. The layout below takes that content as-is.
 */
const evidence = [
  {
    k: "Researched first",
    v: "Every project so far began with study, not scoping. The decisions that mattered were made before anyone opened an editor.",
  },
  {
    k: "Built by the people who scoped it",
    v: "No handoff to a bench you never meet. The person who understood your problem is the person who solved it.",
  },
  {
    k: "Supported past launch",
    v: "We stay involved after delivery, because the version that ships is rarely the version that lasts.",
  },
];

export function Proof() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Track record</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={"Four projects.\nFour problems studied first."}
              accent={["first."]}
              className="text-heading max-w-[15ch]"
            />
            <Reveal delay={0.12}>
              <p className="text-lede mt-7 max-w-lg">
                We are one year old, and we would rather tell you that plainly than dress it up.
                What we can point to is how every engagement has run — and why the clients who chose
                a four-person team over a large agency got something that actually fit.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <MagneticButton href="/contact" size="lg">
                  Talk about your project
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
              </div>
            </Reveal>
          </div>

          <motion.dl
            className="flex flex-col"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ show: { transition: { staggerChildren: 0.11 } } }}
          >
            {evidence.map((item) => (
              <motion.div
                key={item.k}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo } },
                }}
                className="border-t border-hairline py-8 last:border-b"
              >
                <dt className="mb-2.5 flex items-center gap-3 text-[1.0625rem] tracking-tight text-bone">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {item.k}
                </dt>
                <dd className="pl-[1.125rem] text-[0.9375rem] leading-relaxed text-mute">
                  {item.v}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
