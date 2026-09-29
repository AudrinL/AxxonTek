"use client";

import { useEffect, useRef } from "react";

/**
 * A mark drawn in dots that part around the cursor, the way rho.co draws the
 * wordmark at the foot of its site.
 *
 * The image is sampled onto a grid (`cell` px dots, `gap` px apart) and every
 * filled cell becomes a dot with a home. The cursor pushes dots within
 * `radius` away, and a spring pulls each one home with heavy damping, so the
 * mark ripples and settles rather than wobbling. Dots are whole-pixel squares
 * in a single colour, or in the image's own colours when `color` is
 * "image", so a two-tone logo keeps its accent.
 *
 * It fills its parent and fits the image inside it, keeping the aspect
 * ratio. Paused off screen, still under prefers-reduced-motion.
 */
type DotMarkProps = {
  /** Any image the browser can draw: png, svg, webp. Transparent areas stay empty. */
  src: string;
  /** A CSS colour for every dot, or "image" to take each dot's colour from the image. */
  color?: string;
  cell?: number;
  gap?: number;
  radius?: number;
  force?: number;
  /** Empty space kept round the mark inside the canvas, so dots the cursor
      pushes outwards are never clipped at the edge. */
  pad?: number;
  className?: string;
};

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; c: string };

export function DotMark({
  src,
  color = "#f5f5f7",
  cell = 2,
  gap = 3,
  radius = 110,
  force = 1,
  pad = 32,
  className = "",
}: DotMarkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = { x: -1e6, y: -1e6 };
    let dots: Dot[] = [];
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let image: HTMLImageElement | null = null;

    const layout = () => {
      if (!image) return;
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      /* Fit the image inside the box, less the padding. */
      const ratio = image.naturalWidth / image.naturalHeight;
      /* The padding shrinks with the box, so a small band never starves the mark. */
      const p = Math.min(pad, h * 0.1, w * 0.04);
      const aw = Math.max(1, w - p * 2);
      const ah = Math.max(1, h - p * 2);
      let fw = aw;
      let fh = aw / ratio;
      if (fh > ah) {
        fh = ah;
        fw = ah * ratio;
      }
      const ox = (w - fw) / 2;
      const oy = (h - fh) / 2;

      /* Sample it at one pixel per grid cell. */
      const pitch = cell + gap;
      const cols = Math.max(1, Math.floor(fw / pitch));
      const rows = Math.max(1, Math.floor(fh / pitch));
      const probe = document.createElement("canvas");
      probe.width = cols;
      probe.height = rows;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      if (!pctx) return;
      pctx.drawImage(image, 0, 0, cols, rows);
      const data = pctx.getImageData(0, 0, cols, rows).data;

      dots = [];
      const cx = ox + (fw - cols * pitch) / 2;
      const cy = oy + (fh - rows * pitch) / 2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          if (data[i + 3] > 110) {
            const c = color === "image" ? `rgb(${data[i]},${data[i + 1]},${data[i + 2]})` : color;
            dots.push({ hx: cx + x * pitch, hy: cy + y * pitch, x: 0, y: 0, vx: 0, vy: 0, c });
          }
        }
      }
      draw();
      start();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      let last = "";
      for (const d of dots) {
        if (d.c !== last) ctx.fillStyle = last = d.c;
        ctx.fillRect(Math.round(d.hx + d.x), Math.round(d.hy + d.y), cell, cell);
      }
    };

    const loop = () => {
      raf = visible ? requestAnimationFrame(loop) : 0;
      const r2 = radius * radius;
      for (const d of dots) {
        const dx = d.hx + d.x - cursor.x;
        const dy = d.hy + d.y - cursor.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const dist = Math.sqrt(d2) || 0.001;
          const push = (1 - dist / radius) * force * 14;
          d.vx += (dx / dist) * push * 0.1;
          d.vy += (dy / dist) * push * 0.1;
        }
        /* Spring home, heavily damped. */
        d.vx = (d.vx - 0.1 * d.x) * 0.74;
        d.vy = (d.vy - 0.1 * d.y) * 0.74;
        d.x += d.vx;
        d.y += d.vy;
      }
      draw();
    };
    const start = () => {
      if (reduced || raf || !visible) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const box = host.getBoundingClientRect();
      cursor.x = e.clientX - box.left;
      cursor.y = e.clientY - box.top;
    };
    const onLeave = () => {
      cursor.x = -1e6;
      cursor.y = -1e6;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(layout);
    ro.observe(host);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    io.observe(host);

    const img = new Image();
    img.onload = () => {
      image = img;
      layout();
    };
    img.src = src;

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [src, color, cell, gap, radius, force, pad]);

  return (
    <div aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
