"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Icon } from "@/components/Icon";
import { ScrollCue } from "@/components/system/ScrollCue";
import { useParallax } from "@/lib/motion";

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
      className="bloom relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-8 text-white lg:min-h-[max(100svh,44rem)]"
    >
      {/* Backdrop: the photo, desaturated, under a warm ember wash, drifting. */}
      <div ref={backdrop} aria-hidden className="pointer-events-none absolute inset-0 -z-30 scale-110">
        <Image
          src="/assets/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_center] grayscale brightness-[1.25] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(118deg, var(--ember-deep) 0%, var(--ember) 46%, #ff7a45 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "color-mix(in srgb, var(--ink) 46%, transparent)" }}
        />
      </div>
      <span aria-hidden className="bloom-light -top-[16rem] -left-[14rem] opacity-70" />

      {/* Top meta row: the studio's mono coordinates. */}
      <div
        data-hero-rise
        className="container-x flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.16em] text-white/70 uppercase"
      >
        <span>Kigali, Rwanda</span>
        <span className="hidden sm:block">Technology, working now</span>
        <span>Est. 2026</span>
      </div>

      {/* Headline + copy. */}
      <div className="container-x">
        <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,7.4vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.038em]">
          <Line>Technology for</Line>
          <Line>
            a <span className="text-serif text-[1.06em] text-[#ffd8c7]">changing</span> Africa.
          </Line>
        </h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between">
          <p data-hero-rise className="max-w-[38ch] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed text-white/85">
            AxxonTek designs, builds and operates digital products, platforms and
            systems for businesses and communities across Africa, and runs the
            products it invents.
          </p>

          <div data-hero-rise className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="group inline-flex h-[3.125rem] items-center gap-2 rounded-full bg-white px-7 text-[0.9375rem] font-semibold text-ink transition-[background-color,transform] duration-[var(--t-hover)] ease-[var(--ease-out)] hover:bg-white/90"
            >
              See our products
              <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
                <Icon name="arrow" size={16} />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-[3.125rem] items-center rounded-full border border-white/30 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-[var(--t-hover)] hover:border-white/70"
            >
              Build with us
            </Link>
          </div>
        </div>
      </div>

      {/* Foot: scroll cue. */}
      <div data-hero-rise className="container-x flex items-center justify-between">
        <ScrollCue />
        <span className="hidden font-mono text-[0.625rem] tracking-[0.16em] text-white/45 uppercase sm:block">
          Products · Systems · Emerging tech
        </span>
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
