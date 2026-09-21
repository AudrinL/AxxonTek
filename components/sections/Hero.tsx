"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { easeOutExpo } from "@/lib/motion";
import { hasPhoto, photos, trustPoints } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { useBootReady } from "@/components/motion/Boot";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Scramble } from "@/components/motion/Scramble";
import { HeroField } from "@/components/three/HeroField";

const hidden = { opacity: 0, y: 18 };
const shown = { opacity: 1, y: 0 };

/**
 * The hero has one job: tell a stranger what we sell and give them one clear
 * next step. Copy on the left; on the right, the continent as a living
 * network with Kigali at its centre — or a real photo of us, once we have one.
 *
 * Entrances wait for the preloader (`useBootReady`) so they play in front of
 * the visitor rather than behind the overlay. Scrolling scrubs a timeline:
 * the copy drifts up and dims while the 3D field (HeroField) tilts, pulls
 * back and scatters.
 *
 * Not `isolate`: the ambient layers sit at `-z-10` in the root stacking
 * context so the shared WebGL canvas (z-0) draws above them and below the
 * positioned badges.
 */
export function Hero() {
  const ready = useBootReady();
  const section = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  const rise = (delay: number) => ({
    initial: hidden,
    animate: ready ? shown : hidden,
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  });

  useGSAP(
    () => {
      if (!copy.current) return;
      gsap.to(copy.current, {
        y: -72,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative flex min-h-[min(92svh,58rem)] items-center overflow-hidden pt-28 pb-[clamp(4rem,8vw,7rem)]"
    >
      {/* Warm bloom + a dot grid that fades out downwards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-12%] -z-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--color-ember-tint),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(var(--color-hairline)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_85%)]"
      />

      <div className="container-x w-full">
        <div className="grid items-center gap-x-12 gap-y-16 lg:grid-cols-[1fr_1fr]">
          {/* Copy */}
          <div ref={copy} className="max-w-[36rem]">
            <motion.p className="eyebrow mb-7" {...rise(0.05)}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
              <Scramble
                text={`Kigali, Rwanda · Taking on projects for ${new Date().getFullYear()}`}
                immediate
                delay={0.2}
                duration={1100}
              />
            </motion.p>

            <MaskedWords
              as="h1"
              mode="lines"
              text="Software built for how Africa actually works."
              accent={["actually"]}
              className="text-display max-w-[14ch]"
              immediate
              delay={0.15}
            />

            <motion.p className="text-lede mt-7 max-w-[32rem]" {...rise(0.55)}>
              Apps, websites and smart systems for SMEs and individuals — designed for the phones,
              connections and budgets people here really have. Researched first, built by the people
              who scoped it.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              {...rise(0.7)}
            >
              <MagneticButton href="/contact" size="lg" strength={8}>
                Book a call
                <Icon name="arrow" size={16} />
              </MagneticButton>
              <MagneticButton href="/#services" variant="ghost" size="lg" strength={6}>
                See what we do
              </MagneticButton>
            </motion.div>

            <motion.ul
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.875rem] text-mute"
              {...rise(0.85)}
            >
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ember-tint text-ember">
                    <Icon name="check" size={11} strokeWidth={2.2} />
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.35 }}
          >
            {hasPhoto(photos.hero) ? <HeroPhoto src={photos.hero} /> : <HeroMap />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Africa as a network, Kigali at the centre. Says "built here, for the
 * continent" without a word of copy.
 */
function HeroMap() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem] lg:mr-0">
      <HeroField className="absolute inset-0" />

      <div className="pointer-events-none absolute bottom-0 left-0 flex items-center gap-3 rounded-full border border-hairline bg-ink-raised/90 py-2 pr-5 pl-2 shadow-card backdrop-blur">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-white">
          <Icon name="pin" size={15} />
        </span>
        <span className="text-[0.8125rem] leading-tight">
          <span className="block font-semibold text-bone">Built in Kigali</span>
          <span className="text-mute">for the whole continent</span>
        </span>
      </div>
      <ReplyBadge className="top-2 right-0" />
    </div>
  );
}

/**
 * The photo variant: a portrait of one of us, with the reply-time badge and
 * a compact "after your first call" card overlaid.
 */
function HeroPhoto({ src }: { src: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:mr-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
        <Image
          src={src}
          alt="An AxxonTek engineer at work at Norrsken Kigali"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
        />
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
          <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
            After your first call
          </p>
          <p className="mt-1.5 text-[1.0625rem] leading-snug font-semibold">
            A written read on your problem, which service fits, and a first step with a price.
          </p>
        </div>
      </div>
      <ReplyBadge className="-top-4 -right-3 sm:-right-6" />
    </div>
  );
}

function ReplyBadge({ className = "" }: { className?: string }) {
  const ready = useBootReady();
  return (
    <motion.div
      className={`pointer-events-none absolute flex items-center gap-3 rounded-full border border-hairline bg-ink-raised/90 py-2 pr-5 pl-2 shadow-card backdrop-blur ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-white">
        <Icon name="clock" size={15} />
      </span>
      <span className="text-[0.8125rem] leading-tight">
        <span className="block font-semibold text-bone">Reply in 1 business day</span>
        <span className="text-mute">from an engineer, not a bot</span>
      </span>
    </motion.div>
  );
}
