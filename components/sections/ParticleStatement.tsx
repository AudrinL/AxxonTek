"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { LazyParticleField } from "@/components/three/LazyParticleField";

export function ParticleStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fieldOpacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      ref={ref}
      id="technology"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { opacity: fieldOpacity }}
      >
        <LazyParticleField
          className="absolute inset-0"
          count={4200}
          spread={44}
          size={2.4}
          opacity={0.9}
          includeRing
          interactive
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,transparent_30%,var(--color-ink)_100%)]"
      />

      <motion.div
        className="container-x relative text-center"
        style={reduced ? undefined : { y: textY }}
      >
        <p className="eyebrow mb-8 justify-center">The AxxonTek approach</p>
        <MaskedWords
          as="h2"
          text={
            "We design and deploy everything you need to compete, automate, and scale in today's digital economy."
          }
          accent={["scale."]}
          className="text-heading mx-auto max-w-[19ch]"
        />
        <motion.p
          className="mx-auto mt-8 max-w-md text-sm text-faint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Move your cursor through the field — click to send a ripple.
        </motion.p>
      </motion.div>
    </section>
  );
}
