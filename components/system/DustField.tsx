"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Dust. A field of tiny square specks drifting behind a section, after the
 * one rho.co uses in its hero and footer.
 *
 * At rest the specks wander: a slow random drift plus a little jitter every
 * frame, wrapping off one edge and back in at the other. Each is a 1 or 2px
 * square snapped to whole pixels with its own opacity, so the field reads as
 * crisp grain rather than soft bokeh.
 *
 * What the cursor does depends on `shapes`:
 *
 *   - Without shapes, the specks near the cursor are drawn in and swirl round
 *     it, and any that get too close are flung back out (rho's behaviour).
 *   - With shapes, the dust assembles into one of them around the cursor,
 *     chosen at random. The nearest specks fly to the shape's dots and settle
 *     there, the shape follows the cursor softly, and the rest of the dust
 *     keeps a respectful distance. Every few seconds it morphs into a
 *     different shape. When the cursor leaves, the shape dissolves back into
 *     drifting dust. Shapes only form for a fine pointer, never on touch.
 *
 * Given an `attractor` element instead, the dust gathers in a loose,
 * breathing halo around it.
 *
 * Built to be cheap: canvas 2D, density scaled by area, paused when off
 * screen, and a single still frame under prefers-reduced-motion. It fills
 * its parent, which must be positioned, and never takes pointer events.
 */
export type DustPreset = "hero" | "footer";

export type DustShape = {
  /** A white-on-transparent image. Its opaque areas become the shape. */
  src: string;
  /** Dot spacing in px. Tighter reads better but needs more specks. */
  pitch: number;
  /** Alpha (0 to 255) a sampled cell needs to count as part of the shape. */
  threshold: number;
};

const PRESETS: Record<DustPreset, { count: number; alphaMin: number; alphaMax: number }> = {
  /** Denser and brighter, for an opening. */
  hero: { count: 340, alphaMin: 0.4, alphaMax: 1 },
  /** Sparser and fainter, for a quiet close. */
  footer: { count: 520, alphaMin: 0.18, alphaMax: 0.68 },
};

/** Density is quoted per 640 by 640 px, the area rho tunes against. */
const REF_AREA = 640 * 640;
/** A shape may use at most this share of the specks, so some dust always drifts. */
const SHAPE_BUDGET = 0.9;
/** How long a shape holds before it morphs into another. */
const SHAPE_HOLD_MS = 5200;

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number; // resting opacity
  glow: number; // 0 to 1, how lit it is as part of a shape
  off: number; // how far from the attractor's edge this one likes to sit
  ph: number; // breathing phase
  rate: number; // breathing speed
  spent: boolean; // flung out of the swirl, waiting to leave it
  tx: number; // offset of its dot from the shape's centre, when assigned
  ty: number;
  held: boolean; // part of the current shape
};

type DustFieldProps = {
  preset?: DustPreset;
  /** Specks per 640 by 640 px. Overrides the preset. */
  count?: number;
  /** Speck size in px. */
  cell?: number;
  /** How far the cursor reaches, in px. */
  radius?: number;
  /** Strength of the pull and swirl. */
  force?: number;
  /** Base distance of the halo from the attractor's edge, in px. */
  ringPad?: number;
  /** Speck colour. Defaults to the site's text colour. */
  color?: string;
  /** An element the dust gathers round. */
  attractor?: RefObject<HTMLElement | null>;
  /** Shapes the dust forms around the cursor, one at a time, at random. */
  shapes?: DustShape[];
  /** The larger side of a formed shape, in px. */
  shapeSize?: number;
  className?: string;
};

export function DustField({
  preset = "hero",
  count,
  cell = 2,
  radius = 220,
  force = 1,
  ringPad = 26,
  color = "#f5f5f7",
  attractor,
  shapes,
  shapeSize = 240,
  className = "",
}: DustFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapesKey = JSON.stringify(shapes ?? []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const { alphaMin, alphaMax, count: presetCount } = PRESETS[preset];
    const density = count ?? presetCount;
    const shapeList: DustShape[] = JSON.parse(shapesKey);
    const useShapes = shapeList.length > 0 && finePointer;

    const cursor = { x: -1e5, y: -1e5, live: false, inside: false };
    let specks: Speck[] = [];
    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    /* ---------------- shapes ---------------- */

    const images: (HTMLImageElement | null)[] = shapeList.map(() => null);
    const shape = {
      active: -1, // index into shapeList, -1 when none is formed
      last: -1,
      since: 0, // when the current shape formed
      cx: 0, // where it is centred, easing towards the cursor
      cy: 0,
      reach: 0, // half its diagonal, for keeping loose dust clear of it
    };

    /* Sample an image into dot offsets around its centre. Averaging while
       downscaling (rather than point sampling) keeps thin strokes whole. */
    const sample = (img: HTMLImageElement, pitch: number, threshold: number) => {
      const scale = shapeSize / Math.max(img.naturalWidth, img.naturalHeight);
      const cols = Math.max(1, Math.floor((img.naturalWidth * scale) / pitch));
      const rows = Math.max(1, Math.floor((img.naturalHeight * scale) / pitch));
      const probe = document.createElement("canvas");
      probe.width = cols;
      probe.height = rows;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      if (!pctx) return [];
      pctx.imageSmoothingEnabled = true;
      pctx.imageSmoothingQuality = "high";
      pctx.drawImage(img, 0, 0, cols, rows);
      const data = pctx.getImageData(0, 0, cols, rows).data;
      const dots: { x: number; y: number }[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (data[(y * cols + x) * 4 + 3] > threshold) {
            dots.push({ x: (x - (cols - 1) / 2) * pitch, y: (y - (rows - 1) / 2) * pitch });
          }
        }
      }
      return dots;
    };

    /* The finest spacing that fits in the speck budget, so a shape never
       breaks for lack of dust; it just gets a little coarser. */
    const targetsFor = (i: number) => {
      const img = images[i];
      if (!img) return [];
      const { pitch, threshold } = shapeList[i];
      const budget = Math.floor(specks.length * SHAPE_BUDGET);
      for (let p = pitch; p <= pitch * 3; p += 1) {
        const dots = sample(img, p, threshold);
        if (dots.length <= budget) return dots;
      }
      return [];
    };

    const release = () => {
      for (const s of specks) {
        if (!s.held) continue;
        s.held = false;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.6;
        s.vx = Math.cos(angle) * speed;
        s.vy = Math.sin(angle) * speed;
      }
      shape.active = -1;
    };

    const form = (now: number) => {
      /* A random shape, never the one just shown. */
      const ready = shapeList.map((_, i) => i).filter((i) => images[i] && i !== shape.last);
      if (ready.length === 0) return;
      const pick = ready[Math.floor(Math.random() * ready.length)];
      const dots = targetsFor(pick);
      if (dots.length === 0) return;

      if (shape.active < 0) {
        shape.cx = cursor.x;
        shape.cy = cursor.y;
      }
      for (const s of specks) s.held = false;

      /* The nearest specks answer the call, each flying to the closest free dot. */
      const byDistance = specks
        .map((s) => ({ s, d: (s.x - shape.cx) ** 2 + (s.y - shape.cy) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, dots.length)
        .map((e) => e.s);
      const free = dots.slice();
      for (const s of byDistance) {
        let best = 0;
        let bestD = Infinity;
        for (let j = 0; j < free.length; j++) {
          const dx = shape.cx + free[j].x - s.x;
          const dy = shape.cy + free[j].y - s.y;
          const d = dx * dx + dy * dy;
          if (d < bestD) {
            bestD = d;
            best = j;
          }
        }
        const dot = free[best];
        free[best] = free[free.length - 1];
        free.pop();
        s.tx = dot.x;
        s.ty = dot.y;
        s.held = true;
      }

      let reach = 0;
      for (const d of dots) reach = Math.max(reach, Math.hypot(d.x, d.y));
      shape.reach = reach;
      shape.active = pick;
      shape.last = pick;
      shape.since = now;
    };

    /* ---------------- field ---------------- */

    const seed = () => {
      const box = host.getBoundingClientRect();
      w = Math.max(1, Math.round(box.width));
      h = Math.max(1, Math.round(box.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const n = Math.round((density * w * h) / REF_AREA);
      specks = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        a: alphaMin + Math.random() * (alphaMax - alphaMin),
        glow: 0,
        off: Math.pow(Math.random(), 3), // most sit close, a few drift far out
        ph: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 0.9,
        spent: false,
        tx: 0,
        ty: 0,
        held: false,
      }));
      shape.active = -1;
      draw();
      start();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const s of specks) {
        ctx.globalAlpha = s.a + (1 - s.a) * s.glow;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), cell, cell);
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      /* Shapes: form when the cursor arrives, morph while it stays, dissolve when it goes. */
      if (useShapes) {
        if (cursor.inside) {
          if (shape.active < 0 || now - shape.since > SHAPE_HOLD_MS) form(now);
        } else if (shape.active >= 0) {
          release();
        }
        if (shape.active >= 0) {
          /* Follow the cursor softly, but keep the whole shape on the field. */
          const m = shapeSize / 2 + 8;
          const gx = clamp(cursor.x, m, Math.max(m, w - m));
          const gy = clamp(cursor.y, m, Math.max(m, h - m));
          shape.cx += (gx - shape.cx) * 0.08;
          shape.cy += (gy - shape.cy) * 0.08;
        }
      }

      const r2 = radius * radius;

      /* The attractor's box, in the field's own coordinates. */
      let box: { l: number; t: number; r: number; b: number } | null = null;
      const el = attractor?.current;
      if (el) {
        const a = el.getBoundingClientRect();
        const f = host.getBoundingClientRect();
        if (a.width > 1 && a.height > 1) {
          box = { l: a.left - f.left, t: a.top - f.top, r: a.right - f.left, b: a.bottom - f.top };
        }
      }

      for (const s of specks) {
        /* Part of a shape: spring to its dot, lightly damped, with a breath of jitter. */
        if (s.held && shape.active >= 0) {
          const gx = shape.cx + s.tx;
          const gy = shape.cy + s.ty;
          s.vx = (s.vx + (gx - s.x) * 0.055) * 0.8;
          s.vy = (s.vy + (gy - s.y) * 0.055) * 0.8;
          s.x += s.vx + (Math.random() - 0.5) * 0.08;
          s.y += s.vy + (Math.random() - 0.5) * 0.08;
          s.glow = Math.min(1, s.glow + 0.04);
          continue;
        }
        s.glow = Math.max(0, s.glow - 0.03);

        if (useShapes) {
          /* Loose dust keeps clear of a formed shape, so its outline stays clean. */
          if (shape.active >= 0) {
            const dx = s.x - shape.cx;
            const dy = s.y - shape.cy;
            const d = Math.hypot(dx, dy) || 0.001;
            const clear = shape.reach + 24;
            if (d < clear) {
              const push = ((clear - d) / clear) * 0.35;
              s.vx += (dx / d) * push;
              s.vy += (dy / d) * push;
            }
          }
        } else if (cursor.live) {
          /* No shapes: pull in, swirl round, fling out anything too close. */
          const dx = cursor.x - s.x;
          const dy = cursor.y - s.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.001;
            const nx = dx / d;
            const ny = dy / d;
            if (s.spent) {
              if (d > radius * 0.98) s.spent = false;
            } else if (d < 70) {
              s.spent = true;
              const angle = Math.atan2(s.vy, s.vx) + (Math.random() - 0.5) * 1.2;
              const speed = 0.6 + Math.random() * 0.7;
              s.vx = Math.cos(angle) * speed;
              s.vy = Math.sin(angle) * speed;
            } else {
              const pull = 1 - d / radius;
              s.vx += nx * pull * force * 0.11 - ny * pull * force * 0.05;
              s.vy += ny * pull * force * 0.11 + nx * pull * force * 0.05;
            }
          }
        } else if (s.spent) {
          s.spent = false;
        }

        /* The attractor: out through the nearest edge, then into a breathing halo. */
        if (box) {
          if (s.x > box.l && s.x < box.r && s.y > box.t && s.y < box.b) {
            const toL = s.x - box.l;
            const toR = box.r - s.x;
            const toT = s.y - box.t;
            const toB = box.b - s.y;
            const m = Math.min(toL, toR, toT, toB);
            s.vx += (m === toL ? -1 : m === toR ? 1 : 0) * 0.42;
            s.vy += (m === toT ? -1 : m === toB ? 1 : 0) * 0.42;
          } else {
            const ex = s.x - clamp(s.x, box.l, box.r);
            const ey = s.y - clamp(s.y, box.t, box.b);
            const d = Math.hypot(ex, ey) || 0.001;
            const breathe = 1 + 0.16 * Math.sin(now * 0.0009 * s.rate + s.ph);
            const want = 0.35 * ringPad + s.off * ringPad * 7 * breathe;
            const k = clamp(0.0016 * (d - want), -0.1, 0.1);
            s.vx -= (ex / d) * k;
            s.vy -= (ey / d) * k;
            const v = Math.hypot(s.vx, s.vy);
            if (v > 0.55) {
              s.vx = (s.vx / v) * 0.55;
              s.vy = (s.vy / v) * 0.55;
            }
          }
        }

        /* Drag and a little jitter, so nothing ever quite settles. */
        const drag = box ? 0.94 : 0.985;
        s.vx *= drag;
        s.vy *= drag;
        const jitter = box ? 0.075 : 0.09;
        s.vx += (Math.random() - 0.5) * jitter;
        s.vy += (Math.random() - 0.5) * jitter;
        const v = Math.hypot(s.vx, s.vy);
        if (v > 2.2) {
          s.vx = (s.vx / v) * 2.2;
          s.vy = (s.vy / v) * 2.2;
        }
        s.x += s.vx;
        s.y += s.vy;

        /* Wrap round the edges, or bounce softly when there is a halo to keep. */
        if (box) {
          if (s.x < 0 || s.x > w) {
            s.x = clamp(s.x, 0, w);
            s.vx *= -0.4;
          }
          if (s.y < 0 || s.y > h) {
            s.y = clamp(s.y, 0, h);
            s.vy *= -0.4;
          }
        } else {
          if (s.x < 0) s.x += w;
          else if (s.x > w) s.x -= w;
          if (s.y < 0) s.y += h;
          else if (s.y > h) s.y -= h;
        }
      }
    };

    const loop = (now: number) => {
      step(now);
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
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
      cursor.live = cursor.y > -160 && cursor.y < box.height + 160;
      cursor.inside = cursor.x >= 0 && cursor.x <= box.width && cursor.y >= 0 && cursor.y <= box.height;
    };
    const onLeave = () => {
      cursor.live = false;
      cursor.inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    /* Load every shape up front, so the first hover forms one straight away. */
    if (useShapes) {
      shapeList.forEach((sh, i) => {
        const img = new Image();
        img.onload = () => {
          images[i] = img;
        };
        img.src = sh.src;
      });
    }

    let resizeFrame = 0;
    const ro = new ResizeObserver(() => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        seed();
      });
    });
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

    seed();

    /* Development only: a handle for stepping the simulation in tests. */
    if (process.env.NODE_ENV !== "production") {
      (host as HTMLElement & { __dust?: unknown }).__dust = {
        step: (frames: number, at = performance.now()) => {
          for (let f = 0; f < frames; f++) step(at + f * 16);
          draw();
        },
        state: () => ({ specks: specks.length, held: specks.filter((s) => s.held).length, shape: shape.active, loaded: images.filter(Boolean).length }),
      };
    }

    return () => {
      stop();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [preset, count, cell, radius, force, ringPad, color, attractor, shapesKey, shapeSize]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
