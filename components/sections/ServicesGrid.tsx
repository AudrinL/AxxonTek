"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import { Icon } from "@/components/Icon";
import { services } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const icons: Record<string, string> = {
  sourcing: "users",
  interviews: "clipboard",
  analytics: "chart",
  security: "lock",
  infrastructure: "server",
  cloud: "cloud",
};

/**
 * The catalogue: what you can actually buy, one generous row per service.
 *
 * Rows rather than a compact card grid, because this is the section that has
 * to make the offer concrete — each service gets room to state its case, and
 * the whole list still scans in one pass.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="band">
      <div className="container-x py-[clamp(5rem,10vw,8rem)]">
        <div className="mb-[clamp(3rem,6vw,5rem)] max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-6">What we do</p>
          </Reveal>
          <MaskedWords
            as="h2"
            text={"Six engagements. One standard."}
            accent={["standard."]}
            className="text-heading"
          />
          <Reveal delay={0.12}>
            <p className="text-lede mt-7">
              Pick the one closest to your problem — or describe the problem and we will tell you
              which of these actually fits, including when the answer is none of them.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="flex flex-col border-t border-hairline"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {services.map((service, index) => (
            <motion.li
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
              }}
            >
              <ServiceRow
                href={`/services/${service.slug}`}
                index={String(index + 1).padStart(2, "0")}
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

function ServiceRow({
  href,
  index,
  icon,
  eyebrow,
  title,
  body,
}: {
  href: string;
  index: string;
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const mouseX = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px 50%, rgba(228,98,1,0.08), transparent 60%)`;

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    mouseX.set(event.clientX - event.currentTarget.getBoundingClientRect().left);
  }

  return (
    <Link
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => mouseX.set(-400)}
      className="group relative flex flex-col gap-6 border-b border-hairline py-9 md:flex-row md:items-center md:gap-12 md:py-11"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <span className="relative flex items-center gap-6 md:w-[34%] md:shrink-0">
        <span className="font-mono text-[0.6875rem] tracking-widest text-faint transition-colors duration-500 group-hover:text-ember">
          {index}
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-white/[0.02] text-ember transition-colors duration-500 group-hover:border-ember/40 group-hover:bg-ember/10">
          <Icon name={icon} />
        </span>
        <span>
          <span className="mb-1 block text-[0.6875rem] font-medium tracking-[0.18em] text-faint uppercase">
            {eyebrow}
          </span>
          <span className="block text-[clamp(1.375rem,2.2vw,1.75rem)] leading-tight tracking-tight text-bone">
            {title}
          </span>
        </span>
      </span>

      <span className="relative flex-1 text-[0.9375rem] leading-relaxed text-mute">{body}</span>

      <span
        aria-hidden
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-faint transition-all duration-500 group-hover:border-ember group-hover:bg-ember/10 group-hover:text-ember"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-500 group-hover:translate-x-0.5"
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
