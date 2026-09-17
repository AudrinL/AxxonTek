"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

type CtaBannerProps = {
  heading: string;
  /** Kept for call-site compatibility; the orange band renders plain white type. */
  accent?: string[];
  body?: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBanner({
  heading,
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
        <div className="band-ember relative overflow-hidden rounded-[1.75rem] px-8 py-[clamp(3.5rem,8vw,6.5rem)] text-center sm:px-14">
          {/* Soft highlight drifting behind the copy */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[130%] -translate-y-1/2"
            style={reduced ? { opacity: 0.4 } : { y: glowY, opacity: glowOpacity }}
          >
            <div className="mx-auto h-full w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.22),transparent)] blur-2xl" />
          </motion.div>

          <Reveal>
            <h2 className="text-heading mx-auto max-w-[20ch] text-white">{heading}</h2>
          </Reveal>

          {body && (
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
                {body}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href={action.href} variant="inverse" size="lg">
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
                <MagneticButton
                  href={secondary.href}
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
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
