"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { easeOutExpo } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedWords } from "@/components/motion/MaskedWords";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  const reduced = useReducedMotion();
  const [email, setEmail] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax: background drifts slowest, content lifts and fades out.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    router.push(trimmed ? `/contact?email=${encodeURIComponent(trimmed)}` : "/contact");
  }

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
      >
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </motion.div>

      {/* Vignette + warm floor glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_10%,rgba(3,3,3,0.55)_55%,var(--color-ink)_92%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(60%_100%_at_50%_120%,rgba(228,98,1,0.22),transparent_70%)]"
      />

      <motion.div
        className="container-x relative pt-32 pb-24"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_var(--color-ember)]" />
          Kigali, Rwanda
        </motion.p>

        <MaskedWords
          as="h1"
          text={"Next-generation\ndigital innovation."}
          accent={["innovation"]}
          className="text-display max-w-[16ch]"
          immediate
          delay={0.25}
        />

        <motion.p
          className="text-lede mt-8 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.7 }}
        >
          A technology partner delivering researched, engineered solutions across software,
          intelligent systems, security, and cloud — built for enterprises that cannot afford to
          guess.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.85 }}
        >
          <form
            onSubmit={handleSubmit}
            className="group flex h-14 w-full max-w-md items-center gap-2 rounded-full border border-hairline bg-ink/40 p-1.5 pl-6 backdrop-blur-md transition-colors duration-300 focus-within:border-ember/60 hover:border-hairline-strong"
          >
            <label htmlFor="hero-email" className="sr-only">
              Your work email
            </label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-bone outline-none placeholder:text-faint"
            />
            <MagneticButton type="submit" size="md" strength={8}>
              Let&rsquo;s build it
            </MagneticButton>
          </form>

          <MagneticButton href="/#services" variant="ghost" size="md">
            Explore services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 5v14m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-20 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-ember to-transparent" />
          <p className="text-[0.6875rem] font-medium tracking-[0.22em] text-faint uppercase">
            Engineering excellence. Global reach.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <div className="flex h-11 w-6 justify-center rounded-full border border-hairline-strong pt-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-ember"
            animate={reduced ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
