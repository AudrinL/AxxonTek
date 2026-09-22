"use client";

import { useEffect, useRef } from "react";
import { useMotionTier } from "@/components/motion/MotionTier";

/**
 * The dust field behind the hero.
 *
 * rho.co calls theirs `dust` too, and measuring it is how this one got
 * its numbers rather than its look: particles 2.5–3px across on a 1.25
 * DPR screen, drawn in a near-white that varies a little per particle,
 * alpha spread wide, and about 68 of them per 100,000 CSS pixels. The spread in alpha is what makes it read as depth instead
 * of as a texture — a field at one opacity looks like noise.
 *
 * Two things are ours rather than theirs. The palette is warm, because
 * the panel underneath is a warm black and cool dust on it would silver;
 * and roughly one particle in thirty-four carries the ember, which at
 * this scale is a spark rather than a colour. That is the entire budget
 * for decoration on this page.
 *
 * It behaves, which on this site is the point. It renders on a 2D
 * context, not WebGL, so a mid-range Android pays a few hundred fillRect
 * calls a frame instead of a shader compile. DPR is capped at 1.75. It
 * stops when scrolled out of view, halves its own count on the `lite`
 * tier, and never mounts at all for `prefers-reduced-motion`
 * or Data Saver — which the motion tier already resolves.
 */

type Particle = {
  x: number;
  y: number;
  r: number;
  /** Base alpha; the drift multiplies a slow sine into this. */
  a: number;
  /** Radians per ms for the breathing, plus its starting phase. */
  w: number;
  phase: number;
  vx: number;
  vy: number;
  fill: string;
};

const WARM = [
  "246, 243, 238",
  "244, 240, 233",
  "248, 246, 242",
  "240, 235, 226",
];
const EMBER = "240, 88, 31";

export function Dust({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tier = useMotionTier();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || tier === "off") return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const host = canvas.parentElement;
    if (!host) return;

    /* A `lite` tier keeps the field but thins it, which costs less
       than half the fill calls and still reads as atmosphere. */
    const perHundredK = tier === "lite" ? 34 : 68;

    let particles: Particle[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let running = true;

    const build = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((w * h) / 100_000) * perHundredK);
      particles = Array.from({ length: count }, (_, i) => {
        const ember = i % 34 === 0;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          /* 1.25–1.6px reads as 2.5–3.2 device px, which is what the
             reference measures at. Below 1.2 it disappears on a phone. */
          r: 1 + Math.random() * 0.35,
          a: ember ? 0.22 + Math.random() * 0.2 : 0.14 + Math.random() * 0.46,
          w: (0.35 + Math.random() * 0.5) / 1000,
          phase: Math.random() * Math.PI * 2,
          /* Drift is deliberately below the threshold of attention: a
             particle crosses about 12px a minute. You notice it only if
             you stop and stare, which nobody does, and that is correct. */
          vx: (Math.random() - 0.5) * 0.0045,
          vy: -0.002 - Math.random() * 0.004,
          fill: ember ? EMBER : WARM[i % WARM.length],
        };
      });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running) return;

      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < -2) p.y = h + 2;
        if (p.x < -2) p.x = w + 2;
        else if (p.x > w + 2) p.x = -2;

        /* The breathing never takes a particle to zero — it moves each
           one within its own band, so the field shimmers without any
           single point blinking. */
        const a = p.a * (0.72 + 0.28 * Math.sin(p.phase + now * p.w));
        ctx.fillStyle = `rgba(${p.fill}, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    build();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(build);
    ro.observe(host);

    /* Off screen, stop entirely. The reference does the same thing —
       its hero canvas is empty once you have scrolled past it. */
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        last = 0;
      },
      { threshold: 0 },
    );
    io.observe(host);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      last = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tier]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
