"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { services } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * The catalogue — the one place on the site that lists what you can buy.
 * Six cards, one line each, every card a link to its own page.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="section-y band scroll-mt-20">
      <div className="container-x">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-5">What we do</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={"Six services. One team that\nresearches before it builds."}
              accent={["researches"]}
              className="text-heading"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-mute">
              Not sure which one you need? Describe the problem on a call and we will tell you —
              including when the honest answer is none of them.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {services.map((service, index) => (
            <motion.li
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOutExpo } },
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="card group flex h-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ember/40 hover:shadow-card-hover sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-tint text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-white">
                    <Icon name={service.icon} />
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-widest text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-[1.25rem] leading-snug font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-mute">
                  {service.short}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ember">
                  Learn more
                  <Icon
                    name="arrow"
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
