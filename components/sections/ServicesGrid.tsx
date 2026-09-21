"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { hasPhoto, services } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { VelocitySkew } from "@/components/motion/VelocitySkew";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * The catalogue — the one place on the site that lists what you can buy.
 * Four cards, one line each, every card a link to its own page.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="section-y band scroll-mt-20">
      <div className="container-x">
        <div className="mb-[clamp(3rem,6vw,5rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-5">What we do</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="Four things we do well."
              accent={["well."]}
              className="text-heading max-w-[18ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-mute">
              Not sure which you need? Describe the problem on a call. We will
              tell you — even when the honest answer is none of them.
            </p>
          </Reveal>
        </div>

        <VelocitySkew>
        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: easeOutExpo },
                },
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ember/40 hover:shadow-card-hover"
              >
                {/* Photo header when we have a real shot; the icon well
                    otherwise. Both keep the card the same height. */}
                {hasPhoto(service.photo) ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={service.photo}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-ember shadow-sm backdrop-blur">
                      <Icon name={service.icon} size={19} />
                    </span>
                    <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[0.6875rem] tracking-widest text-white/90 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start justify-between px-6 pt-6 sm:px-7 sm:pt-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-tint text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-white">
                      <Icon name={service.icon} />
                    </span>
                    <span className="font-mono text-[0.6875rem] tracking-widest text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col px-6 pt-5 pb-6 sm:px-7 sm:pb-7">
                  <h3 className="text-[1.25rem] leading-snug font-semibold tracking-tight">
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
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        </VelocitySkew>
      </div>
    </section>
  );
}
