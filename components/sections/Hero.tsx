"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { services, trustPoints } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easeOutExpo, delay },
});

/**
 * The hero has one job: tell a stranger what we sell and give them one clear
 * next step. Copy on the left, a preview of the engagement on the right so
 * the page shows the product instead of a stock photo.
 */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-[clamp(7.5rem,16vh,10rem)] pb-[clamp(3.5rem,7vw,6rem)]">
      {/* Warm bloom top-right, and a faint dot grid that fades out downwards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,var(--color-ember-tint),transparent)] opacity-90 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(var(--color-hairline)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_85%)]"
      />

      <div className="container-x">
        <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.p className="eyebrow mb-7" {...rise(0.05)}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
              Kigali, Rwanda · Taking on projects for {new Date().getFullYear()}
            </motion.p>

            <MaskedWords
              as="h1"
              text="Software, security and cloud — built after we understand your problem."
              accent={["understand"]}
              className="text-display max-w-[17ch]"
              immediate
              delay={0.15}
            />

            <motion.p className="text-lede mt-7 max-w-[34rem]" {...rise(0.55)}>
              AxxonTek is a senior engineering team in Kigali. We build custom software, security
              and IT systems, and cloud platforms for businesses across East Africa — and we research
              the problem before we quote on it.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
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
              className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.875rem] text-mute"
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

          {/* Engagement preview */}
          <motion.div
            className="relative lg:justify-self-end"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.35 }}
          >
            <EngagementCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * A stylised "what you get" panel — a first-call summary, a checklist of the
 * six services, and a reply-time badge. It stands in for a screenshot
 * because the product is an engagement, not an app.
 */
function EngagementCard() {
  return (
    <div className="relative w-full max-w-[34rem]">
      {/* Backing card, slightly offset, for depth */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] border border-hairline bg-surface-1"
      />

      <div className="card relative overflow-hidden rounded-[1.5rem] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-faint uppercase">
              After your first call
            </p>
            <h2 className="mt-2 text-[1.375rem] leading-tight font-semibold tracking-tight">
              A written read on your problem
            </h2>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-tint text-ember">
            <Icon name="clipboard" />
          </span>
        </div>

        <ul className="mt-6 flex flex-col gap-3 text-[0.9375rem]">
          {[
            "What you are actually trying to fix",
            "Which of our services fits — or none",
            "A proposed first step, with a price",
          ].map((line, i) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember text-[0.6875rem] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-bone">{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-hairline pt-6">
          <p className="mb-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-faint uppercase">
            What we can take on
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2.5 rounded-lg border border-hairline bg-ink px-3 py-2 text-[0.8125rem] text-mute transition-colors duration-300 hover:border-ember/50 hover:text-bone"
                >
                  <Icon name={s.icon} size={15} className="shrink-0 text-ember" />
                  <span className="truncate">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-full border border-hairline bg-ink-raised py-2 pr-5 pl-2 shadow-card sm:-left-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
