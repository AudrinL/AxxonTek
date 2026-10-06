"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Icon } from "@/components/Icon";
import { useParallax } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * The front door, on ink because this is the company speaking in its own
 * voice. A desaturated photograph under a warm ember wash, a headline that
 * rises line by line from behind its own mask, and one emphasised word set
 * in the serif so the sentence is spoken rather than merely displayed.
 *
 * The backdrop drifts on scroll through a scrubbed parallax, so the words
 * sit in front of a world that moves rather than on a flat plate. Under
 * reduced motion the headline is simply present and nothing drifts.
 */
export function Hero() {
  const backdrop = useParallax<HTMLDivElement>(120);
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* The loader covers the hero for the opening beat, so we can set the
       hidden state explicitly here without any flash, and skip the CSS
       hidden rules that fight React's dev double-mount. No JS, or reduced
       motion, means the headline is simply present. */
    const lines = el.querySelectorAll("[data-hero-line] > span");
    const rises = el.querySelectorAll("[data-hero-rise]");

    gsap.set(lines, { yPercent: 110 });
    gsap.set(rises, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.35 });
    tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 }).to(
      rises,
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
      "-=0.7"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      data-chapter-ground="ink"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--gutter)] pt-28 pb-20 text-center text-white lg:min-h-[max(100svh,46rem)]"
    >
      {/* Backdrop: the photo, desaturated, under a warm ember wash, drifting,
          and fading to true black at the foot so the page continues seamlessly. */}
      <div ref={backdrop} aria-hidden className="pointer-events-none absolute inset-0 -z-30 scale-110">
        <Image
          src="/assets/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_center] grayscale brightness-[1.15] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(118deg, var(--ember-deep) 0%, var(--ember) 46%, #ff7a45 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 55%, #000 100%)" }}
        />
      </div>

      {/* The tagline, as Apple sets a product name above its headline. */}
      <p data-hero-rise className="mb-3 text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.14] font-semibold tracking-[0.007em] text-white">
        {site.tagline}
      </p>
      <h1 className="max-w-[14ch] text-display">
        <Line>Technology for</Line>
        <Line>
          a <span className="text-serif">changing</span> Africa.
        </Line>
      </h1>

      <p
        data-hero-rise
        className="mt-7 max-w-[30ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.19] font-semibold tracking-[0.007em] text-white/70"
      >
        <span className="text-white">We build software, cloud and smart systems</span> for
        businesses across Africa.
      </p>

      <div data-hero-rise className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <Link
          href="/contact"
          className="pill pill-ember hover:bg-ember-deep"
        >
          Start a project
        </Link>
        <Link
          href="#products"
          className="group inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] transition-colors duration-[var(--t-hover)] hover:underline"
        >
          Learn more
          <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5">
            <Icon name="arrow" size={15} />
          </span>
        </Link>
      </div>
    </section>
  );
}

/** One headline line, masked so it rises from behind its own edge. */
function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]" data-hero-line>
      <span className="block will-change-transform">{children}</span>
    </span>
  );
}
