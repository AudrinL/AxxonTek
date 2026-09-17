"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="relative isolate overflow-hidden pt-[clamp(7.5rem,16vh,10.5rem)] pb-[clamp(3rem,6vw,5rem)]">
      {/* Ambient top-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--color-ember-tint),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(var(--color-hairline)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000_10%,transparent_80%)]"
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
            className="eyebrow mb-6"
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
            className="text-lede mt-7 max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.45 }}
          >
            {lede}
          </motion.p>
        )}

        {action && (
          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.6 }}
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
