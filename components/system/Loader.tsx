"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * The front door. A warm ink curtain holds for a beat, counts itself in,
 * then lifts to reveal the page. It runs once per full page load and never
 * on in-app navigation, because the layout persists and it does not
 * remount. Under reduced motion, or if anything throws, it simply is not
 * there: the page underneath is always the real, finished page.
 */
export function Loader() {
  const root = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    /* Safety net: if the tab is loaded hidden, requestAnimationFrame is
       suspended and GSAP never ticks, so onComplete would never fire and the
       curtain would hang. setTimeout still runs (throttled) while hidden, so
       the page always reveals within a few seconds regardless. */
    const fallback = window.setTimeout(() => setDone(true), 2800);

    const counter = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        window.clearTimeout(fallback);
        setDone(true);
      },
    });

    tl.to(el.querySelectorAll("[data-loader-mark]"), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
    })
      .to(
        counter,
        {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            }
          },
        },
        0.1
      )
      .to(el.querySelectorAll("[data-loader-mark], [data-loader-meta]"), {
        opacity: 0,
        y: -14,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        el,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.15"
      );

    return () => {
      window.clearTimeout(fallback);
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-ink px-[var(--gutter)] py-8 text-[#f6f3ee]"
    >
      <div className="flex justify-between font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-white/45" data-loader-meta>
        <span>AxxonTek</span>
        <span>Technology, working now</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <h1 className="font-display text-[clamp(2.5rem,11vw,9rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
          {"AXXONTEK".split("").map((c, i) => (
            <span
              key={i}
              data-loader-mark
              className="inline-block translate-y-[110%] opacity-0"
            >
              {c}
            </span>
          ))}
        </h1>
        <span
          ref={countRef}
          data-loader-meta
          className="mb-2 font-mono text-[0.9375rem] tracking-[0.1em] text-[var(--ember)]"
        >
          000
        </span>
      </div>
    </div>
  );
}
