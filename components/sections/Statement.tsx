"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { imageWipe, viewportOnce } from "@/lib/motion";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";

type StatementProps = {
  label: string;
  heading: string;
  accent?: string[];
  body: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Editorial statement block. With an image it becomes a two-column layout
 * where the art parallaxes gently against the copy.
 */
export function Statement({ label, heading, accent = [], body, image, imageAlt }: StatementProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="section-y relative">
      <div className="container-x">
        <div
          className={
            image
              ? "grid items-center gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.85fr]"
              : "mx-auto max-w-3xl"
          }
        >
          <div>
            <Reveal>
              <p className="eyebrow mb-7">{label}</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={heading}
              accent={accent}
              className="text-heading max-w-[18ch]"
            />
            <Reveal delay={0.12}>
              <p className="text-lede mt-8 max-w-xl">{body}</p>
            </Reveal>
          </div>

          {image && (
            <motion.div
              className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-hairline"
              variants={imageWipe}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.div
                className="absolute inset-[-8%]"
                style={reduced ? undefined : { y: imageY }}
              >
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
