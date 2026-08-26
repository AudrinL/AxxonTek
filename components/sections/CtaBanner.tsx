"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";

type CtaBannerProps = {
  heading: string;
  accent?: string[];
  body?: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBanner({
  heading,
  accent = [],
  body,
  action = { label: "Contact Us", href: "/contact" },
  secondary,
}: CtaBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.85, 0.25]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-ink-raised px-8 py-[clamp(4rem,9vw,7.5rem)] text-center sm:px-14">
          {/* Warm bloom drifting behind the copy */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[130%] -translate-y-1/2"
            style={
              reduced
                ? { opacity: 0.4 }
                : { y: glowY, opacity: glowOpacity }
            }
          >
            <div className="mx-auto h-full w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(228,98,1,0.3),transparent)] blur-2xl" />
          </motion.div>

          {/* Fine grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
          />

          <MaskedWords
            as="h2"
            text={heading}
            accent={accent}
            className="text-heading mx-auto max-w-[20ch]"
          />

          {body && (
            <Reveal delay={0.12}>
              <p className="text-lede mx-auto mt-7 max-w-xl">{body}</p>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href={action.href} size="lg">
                {action.label}
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
              {secondary && (
                <MagneticButton href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </MagneticButton>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
