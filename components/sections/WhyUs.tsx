"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { hasPhoto, photos } from "@/lib/site";

const reasons: readonly Feature[] = [
  {
    icon: "microscope",
    title: "Researched before quoted",
    body: "You are never priced on a guess. We study the problem first, then put a number on a scope we understand.",
  },
  {
    icon: "users",
    title: "No handoffs",
    body: "The engineer on your first call is the engineer who builds it, and you keep their direct contact throughout.",
  },
  {
    icon: "shield",
    title: "Supported past launch",
    body: "We stay involved after delivery, because the version that ships is rarely the version that lasts.",
  },
];

const heading = "Small on purpose. Senior by default.";
const lede =
  "Four engineers, no account managers. That is not a limitation we apologise for — it is the reason the work fits.";

/**
 * "Are you real?" — answered with a photograph of the team next to the three
 * reasons to choose a small senior shop. Falls back to the card grid until a
 * team photo exists.
 */
export function WhyUs() {
  if (!hasPhoto(photos.team)) {
    return (
      <FeatureGrid
        id="why"
        eyebrow="Why AxxonTek"
        heading={heading}
        accent={["purpose."]}
        lede={lede}
        features={reasons}
      />
    );
  }

  return (
    <section id="why" className="section-y scroll-mt-20">
      <div className="container-x">
        <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: easeOutExpo }}
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src={photos.team}
                alt="The AxxonTek team at Norrsken Kigali"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-full border border-hairline bg-ink-raised py-2 pr-5 pl-2 shadow-card">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-white">
                <Icon name="pin" size={15} />
              </span>
              <span className="text-[0.8125rem] leading-tight">
                <span className="block font-semibold text-body">Norrsken Kigali</span>
                <span className="text-mute">where we work — come and visit</span>
              </span>
            </div>
          </motion.div>

          <div>
            <Reveal>
              <p className="eyebrow mb-5">Why AxxonTek</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={heading}
              accent={["purpose."]}
              className="text-heading max-w-[14ch]"
            />
            <Reveal delay={0.1}>
              <p className="text-lede mt-6 max-w-md">{lede}</p>
            </Reveal>

            <motion.ul
              className="mt-9 flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {reasons.map((reason) => (
                <motion.li
                  key={reason.title}
                  className="flex gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOutExpo } },
                  }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-tint text-ember-text">
                    <Icon name={reason.icon} size={20} />
                  </span>
                  <span>
                    <span className="block text-[1.0625rem] font-semibold tracking-tight">
                      {reason.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-mute">
                      {reason.body}
                    </span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
