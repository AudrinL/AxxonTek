"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { easeOutExpo } from "@/lib/motion";
import { hasPhoto, photos } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { useBootReady } from "@/components/motion/Boot";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { HeroIllustration } from "@/components/sections/HeroIllustration";

const hidden = { opacity: 0, y: 18 };
const shown = { opacity: 1, y: 0 };

/**
 * The hero asks for one thing: a call. Headline, one sentence, one button,
 * one line of reassurance — nothing else competes.
 *
 * Full-viewport and edge to edge. A photograph of one of us at work sits
 * under an orange duotone across the whole section; a white slice cuts in
 * from the right on a diagonal and the illustration (HeroIllustration) sits
 * across the edge, anchored to the corner of the screen so it fills wide
 * displays and bleeds off the bottom like a real object rather than sitting
 * in a box. On phones the slice becomes a bottom band with a diagonal top.
 *
 * Entrances wait for the preloader (`useBootReady`). Scrolling scrubs a
 * timeline: the photo drifts, the copy lifts and dims, the illustration
 * lags behind for depth.
 *
 * Deliberately not `isolate`: the backdrop and slice sit at negative z in
 * the root stacking context so the shared WebGL canvas (z-0), when a page
 * has one, still draws above them.
 */
export function Hero() {
  const ready = useBootReady();
  const section = useRef<HTMLElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);

  const rise = (delay: number) => ({
    initial: hidden,
    animate: ready ? shown : hidden,
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  });

  useGSAP(
    () => {
      const trigger = { trigger: section.current, start: "top top", end: "bottom top", scrub: true };
      if (copy.current) gsap.to(copy.current, { y: -72, opacity: 0.25, ease: "none", scrollTrigger: trigger });
      if (backdrop.current) gsap.to(backdrop.current, { yPercent: 14, scale: 1.06, ease: "none", scrollTrigger: trigger });
      if (art.current) gsap.to(art.current, { y: 90, ease: "none", scrollTrigger: trigger });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-white lg:min-h-[max(100svh,44rem)]"
    >
      {/* Backdrop: the photo, desaturated, under a multiplied orange gradient,
          then lifted toward the brand orange so the shadows stay warm. */}
      <div ref={backdrop} aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        {hasPhoto(photos.hero) && (
          <Image
            src={photos.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[28%_center] grayscale brightness-[1.35] contrast-[1.05]"
          />
        )}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(112deg, var(--color-ember-deep) 0%, var(--color-ember) 42%, var(--color-ember-soft) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-ember/60" />
      </div>

      {/* Desktop: the white slice, cut on a diagonal from the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] bg-ink [clip-path:polygon(52%_0,100%_0,100%_100%,0_100%)] lg:block"
      />

      {/* Copy */}
      <div className="container-x flex flex-1 flex-col justify-center pt-32 pb-8 lg:pb-32">
        <div ref={copy} className="max-w-[30rem] xl:max-w-[34rem]">
          <MaskedWords
            as="h1"
            mode="lines"
            text="Software built for how Africa actually works."
            accent={["actually"]}
            accentClassName="text-ember-tint"
            className="max-w-[12ch] text-[clamp(2.75rem,5.4vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
            immediate
            delay={0.15}
          />

          <motion.p className="mt-7 max-w-[28rem] text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-relaxed text-white/85" {...rise(0.5)}>
            Apps, websites and smart systems for businesses in Rwanda and across Africa — scoped by
            the engineers who build them, and priced before the build starts.
          </motion.p>

          <motion.div className="mt-9" {...rise(0.65)}>
            <MagneticButton href="/contact" variant="inverse" size="lg" strength={8}>
              Book a call
              <Icon name="arrow" size={16} />
            </MagneticButton>
            <p className="mt-4 text-[0.875rem] text-white/70">
              30 minutes with an engineer, not a salesperson · Reply within one business day
            </p>
          </motion.div>
        </div>
      </div>

      {/* Illustration. In flow under the copy on phones, inside its own white
          band; anchored to the bottom-right corner of the section on desktop
          so it fills wide screens and bleeds off the edges. */}
      <div
        ref={art}
        className="relative max-lg:container-x max-lg:pb-12 lg:absolute lg:-right-[1vw] lg:-bottom-[1.5vw] lg:w-[min(48vw,56rem)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-[var(--spacing-gutter)] -top-6 bottom-0 -z-10 bg-ink [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] lg:hidden"
        />
        <HeroIllustration className="mx-auto mt-12 max-w-[26rem] lg:mt-0 lg:max-w-none" />
      </div>
    </section>
  );
}
