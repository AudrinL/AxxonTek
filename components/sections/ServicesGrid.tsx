"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rule } from "@/components/layout/Rule";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/site";

/**
 * The catalogue — the one place that lists what you can buy.
 *
 * A seam-divided list rather than a card grid. Four cards of equal weight
 * make a visitor compare instead of choose; a list with the name set large
 * and the sentence beside it lets them scan and commit. The chevron rule
 * between rows is the same one the work index uses, so the two pages read
 * as one site.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="section-y scroll-mt-24">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label mb-6">What we do</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="Four things, done properly."
              accent={["properly."]}
              className="text-heading max-w-[13ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-mute">
              Not sure which you need? Describe the problem on a call. We will
              tell you — including when the honest answer is none of them.
            </p>
          </Reveal>
        </div>

        <Rule />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((service) => (
            <motion.li
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group grid grid-cols-1 items-baseline gap-x-10 gap-y-3 py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:py-11"
              >
                <h3 className="text-[clamp(1.625rem,3.2vw,2.75rem)] leading-none transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  <span className="transition-colors duration-500 group-hover:text-ember-text-text">
                    {service.title}
                  </span>
                </h3>

                <p className="max-w-lg text-[0.9375rem] leading-relaxed text-mute">
                  {service.short}
                </p>

                <span className="label flex items-center gap-4 md:justify-end">
                  {service.eyebrow}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-ember-text-text"
                  >
                    &#8594;
                  </span>
                </span>
              </Link>
              <Rule />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
