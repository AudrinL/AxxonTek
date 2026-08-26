"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";

type Crumb = { label: string; href: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  accent?: string[];
  lede?: string;
  action?: { label: string; href: string };
  crumbs?: Crumb[];
};

/** Shared inner-page opener: generous top space, masked headline, thin rule. */
export function PageHero({ eyebrow, title, accent = [], lede, action, crumbs }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-[clamp(9rem,18vh,13rem)] pb-[clamp(3.5rem,7vw,6rem)]">
      {/* Ambient top-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1/3 -z-10 h-[70vh] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,98,1,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:88px_100%] [mask-image:linear-gradient(to_bottom,#000,transparent)]"
      />

      <div className="container-x">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-[0.8125rem] text-faint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={crumb.href} className="transition-colors hover:text-bone">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p
            className="eyebrow mb-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.05 }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
            {eyebrow}
          </motion.p>
        )}

        <MaskedWords
          as="h1"
          text={title}
          accent={accent}
          className="text-display max-w-[14ch]"
          immediate
          delay={0.12}
        />

        {lede && (
          <motion.p
            className="text-lede mt-8 max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: reduced ? 0 : 0.45 }}
          >
            {lede}
          </motion.p>
        )}

        {action && (
          <motion.div
            className="mt-11"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: reduced ? 0 : 0.6 }}
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
