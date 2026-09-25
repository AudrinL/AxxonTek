"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * An organised, reactive particle field.
 *
 * Idle, the particles rest on a gently breathing grid, so the field reads as
 * deliberate rather than a screensaver. The cursor pushes nearby particles
 * away and strings the closest ones into constellation lines, so it reacts to
 * where you are. While the pointer is over the field, the particles fly into
 * the shape of `text` and hold it, then fall back to the grid when you leave.
 *
 * It is built to behave in production, not just in a demo:
 *   - Canvas 2D only, no dependency, no WebGL.
 *   - Particle count scales with area and is capped, and coarse pointers get
 *     fewer particles and no cursor interaction.
 *   - The loop is paused when the field scrolls out of view or the tab is
 *     hidden, so it never burns frames off-screen.
 *   - prefers-reduced-motion renders a single static grid and never animates.
 *   - Colour is read from the ground tokens and re-read on a ground change, so
 *     it stays correct across the light/dark cross-fade.
 *
 * Children render above the canvas inside the same hover region, so a headline
 * or button placed inside stays interactive while still driving the field.
 */
type ParticleFieldProps = {
  /** The shape the field forms while hovered. Omit for cursor reaction only. */
  text?: string;
  className?: string;
  children?: ReactNode;
  /** Roughly one particle per this many square pixels. Higher means fewer. */
  area?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number; // home (grid) position
  hy: number;
  tx: number; // shape-target position
  ty: number;
  seed: number;
};

export function ParticleField({ text, className = "", children, area = 5200 }: ParticleFieldProps) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = wrap.current;
    const cnv = canvas.current;
    if (!host || !cnv) return;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let colour = "rgba(200,120,60,1)";
    const pointer = { x: 0, y: 0, active: false, inside: false };

    // Colour follows the ground. text-accent on the host gives us the ember
    // that already shifts value between the canvas and ink grounds.
    const readColour = () => {
      colour = getComputedStyle(host).color || colour;
    };

    /** Sample the target shape from `text`, scaled to the current box. */
    const buildShape = () => {
      if (!text || w === 0 || h === 0) return [] as { x: number; y: number }[];
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return [];
      const size = Math.min(h * 0.62, (w / Math.max(text.length, 1)) * 1.5);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `800 ${size}px Outfit, system-ui, sans-serif`;
      octx.fillText(text, w / 2, h / 2);
      const data = octx.getImageData(0, 0, w, h).data;
      const step = 6;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return pts;
    };

    /** (Re)build the grid homes, the particle set, and the shape targets. */
    const layout = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cnv.width = Math.floor(w * dpr);
      cnv.height = Math.floor(h * dpr);
      cnv.style.width = `${w}px`;
      cnv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const divisor = coarse ? 9000 : area;
      const count = Math.max(24, Math.min(coarse ? 60 : 170, Math.round((w * h) / divisor)));

      // A jittered grid: organised, but not mechanical.
      const cols = Math.max(2, Math.round(Math.sqrt((count * w) / h)));
      const rows = Math.max(2, Math.ceil(count / cols));
      const cellW = w / cols;
      const cellH = h / rows;

      const shape = buildShape();
      const next: Particle[] = [];
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (i >= count) break;
          const hx = c * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.5;
          const hy = r * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.5;
          const prev = particles[i];
          const shapePt = shape.length ? shape[i % shape.length] : { x: hx, y: hy };
          next.push({
            x: prev?.x ?? hx,
            y: prev?.y ?? hy,
            vx: 0,
            vy: 0,
            hx,
            hy,
            tx: shapePt.x,
            ty: shapePt.y,
            seed: Math.random() * Math.PI * 2,
          });
          i++;
        }
      }
      particles = next;
      readColour();
    };

    // Static render for reduced motion: one calm grid, no loop, no listeners.
    if (reduced) {
      layout();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colour;
      for (const p of particles) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    const CONNECT = coarse ? 0 : 46; // constellation link distance
    const CURSOR_R = 130; // cursor influence radius

    let raf = 0;
    let running = false;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);

      const forming = pointer.inside && Boolean(text);
      const spring = forming ? 0.09 : 0.022;
      const time = t * 0.001;

      for (const p of particles) {
        const targetX = forming ? p.tx : p.hx + Math.sin(time * 0.6 + p.seed) * 6;
        const targetY = forming ? p.ty : p.hy + Math.cos(time * 0.5 + p.seed) * 6;
        p.vx += (targetX - p.x) * spring;
        p.vy += (targetY - p.y) * spring;

        // Cursor repulsion, always alive.
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < CURSOR_R) {
            const f = (1 - d / CURSOR_R) * (forming ? 2.2 : 5);
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Constellation lines between near neighbours, brighter while forming.
      if (CONNECT > 0) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < CONNECT * CONNECT) {
              const alpha = (1 - Math.sqrt(d2) / CONNECT) * (forming ? 0.5 : 0.28);
              ctx.strokeStyle = withAlpha(colour, alpha);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        // Lines from the cursor to the particles it is near.
        if (pointer.active && !forming) {
          for (const p of particles) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < CURSOR_R) {
              ctx.strokeStyle = withAlpha(colour, (1 - d / CURSOR_R) * 0.4);
              ctx.beginPath();
              ctx.moveTo(pointer.x, pointer.y);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            }
          }
        }
      }

      // The particles themselves.
      for (const p of particles) {
        ctx.fillStyle = withAlpha(colour, forming ? 0.95 : 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, forming ? 1.7 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Pointer, relative to the box.
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onEnter = () => {
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.active = false;
    };

    if (!coarse) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
    }

    // Only run while visible.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && document.visibilityState === "visible") start();
          else stop();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => layout());
    ro.observe(host);

    // Re-read colour when the ground flips.
    const groundObserver = new MutationObserver(readColour);
    groundObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-ground"],
    });

    layout();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      groundObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [text, area]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0" />
      {children}
    </div>
  );
}

/** Apply an alpha to a computed colour string (rgb/rgba), robust to either. */
function withAlpha(colour: string, alpha: number): string {
  const m = colour.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b] = m[1].split(",").map((n) => parseFloat(n));
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  }
  return colour;
}
