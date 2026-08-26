"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import { Icon } from "@/components/Icon";
import { services } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, viewportOnce } from "@/lib/motion";

const icons: Record<string, string> = {
  sourcing: "users",
  interviews: "clipboard",
  analytics: "chart",
  security: "lock",
  infrastructure: "server",
  cloud: "cloud",
};

/**
 * Every service on one scannable screen, each a direct link to its page.
 * The split-scroll narrative below is persuasive but slow; a buyer who already
 * knows what they need should be one click from it.
 */
export function ServicesGrid() {
  return (
    <section className="band">
      <div className="container-x py-[clamp(5rem,10vw,8rem)]">
        <div className="mb-[clamp(3rem,6vw,4.5rem)] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-6">What we do</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={"Six ways we can help."}
              accent={["help."]}
              className="text-heading"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lede max-w-sm text-[0.9375rem]">
              Pick the one closest to your problem — or tell us the problem and we will point you at
              the right place.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {services.map((service) => (
            <motion.li key={service.slug} variants={fadeUp}>
              <ServiceCard
                href={`/services/${service.slug}`}
                icon={icons[service.slug] ?? "target"}
                eyebrow={service.eyebrow}
                title={service.title}
                body={service.lede}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCard({
  href,
  icon,
  eyebrow,
  title,
  body,
}: {
  href: string;
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgba(228,98,1,0.12), transparent 62%)`;

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <Link
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(-300);
        mouseY.set(-300);
      }}
      className="group relative flex h-full flex-col justify-between gap-10 bg-surface-1 p-8 transition-colors duration-500 hover:bg-surface-2 sm:p-9"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <span className="relative">
        <span className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-white/[0.02] text-ember transition-colors duration-500 group-hover:border-ember/40 group-hover:bg-ember/10">
          <Icon name={icon} />
        </span>
        <span className="mb-2.5 block text-[0.6875rem] font-medium tracking-[0.18em] text-faint uppercase">
          {eyebrow}
        </span>
        <span className="mb-3 block text-[1.375rem] leading-tight tracking-tight text-bone">
          {title}
        </span>
        <span className="block text-[0.9375rem] leading-relaxed text-mute">{body}</span>
      </span>

      <span className="relative flex items-center gap-2.5 text-sm text-mute transition-colors duration-300 group-hover:text-ember">
        Explore
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          <path
            d="M5 12h14m-6-6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
