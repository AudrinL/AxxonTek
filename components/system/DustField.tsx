"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Dust. A field of tiny square specks drifting behind a section, after the
 * one rho.co uses in its hero and footer.
 *
 * At rest the specks wander: a slow random drift plus a little jitter every
 * frame, wrapping off one edge and back in at the other. Each is a small
 * square snapped to whole device pixels with its own opacity, so the field
 * reads as crisp grain rather than soft bokeh.
 *
 * What the cursor does depends on `shapes`:
 *
 *   - Without shapes, the specks near the cursor are drawn in and swirl round
 *     it, and any that get too close are flung back out (rho's behaviour).
 *   - With shapes, when the cursor comes to rest over empty space, one of
 *     them forms right there, chosen at random, in three beats so it never
 *     arrives out of nowhere: faint specks gather and circle the spot, then
 *     flow into the shape from its centre outwards, then brighten as they
 *     settle, about two and a half seconds in all. A shape brings its own
 *     finer specks, so the dust already drifting is left exactly as it was.
 *     The shape stays where it formed. Rest somewhere else and a different
 *     shape forms there while the old one dissolves. Pointing at text or a
 *     link never forms one, so nothing gathers over what you are reading.
 *     When the cursor leaves, the shape dissolves back into drifting dust.
 *     Shapes only form for a fine pointer, never on touch.
 *
 * Given an `attractor` element instead, the dust gathers in a loose,
 * breathing halo around it.
 *
 * Built to be cheap: canvas 2D, density scaled by area, paused when off
 * screen, and a single still frame under prefers-reduced-motion. It fills
 * its parent, which must be positioned, and never takes pointer events.
 */
export type DustPreset = "hero" | "footer";

export type DustShape =
  | {
      kind: "grid";
      /**
       * A baked dot grid: one image pixel per dot, opaque where a dot goes.
       * Made ahead of time so the shape is exactly the one that was checked,
       * rather than whatever a browser's resampling makes of an icon.
       */
      src: string;
      /** Spacing between dots on screen, in px. */
      pitch: number;
    }
  | {
      kind: "globe";
      /** Sphere radius in px. */
      radius: number;
      /** Number of latitude rows, like lines of binary text wrapped round it. */
      rows: number;
      /** Spacing between dots along a row, in px at the equator. */
      spacing: number;
      /** Forward tilt of the axis, in radians, so it reads as a sphere. */
      tilt: number;
      /** Turning speed, in radians per second. */
      speed: number;
    };

const PRESETS: Record<DustPreset, { count: number; alphaMin: number; alphaMax: number }> = {
  /** Denser and brighter, for an opening. */
  hero: { count: 340, alphaMin: 0.4, alphaMax: 1 },
  /** Sparser and fainter, for a quiet close. */
  footer: { count: 520, alphaMin: 0.18, alphaMax: 0.68 },
};

/** Density is quoted per 640 by 640 px, the area rho tunes against. */
const REF_AREA = 640 * 640;
/** Shape dots are drawn at this size in px, finer than the loose dust. */
const SHAPE_CELL = 1;
/** Shape specks fade in from anywhere between these distances from the spot. */
const SPAWN_NEAR = 110;
const SPAWN_FAR = 300;
/** Beat one: how long the specks only gather and circle before any head in. */
const GATHER_MS = 650;
/** Beat two: the spread of start times, centre dots first, outer dots last. */
const STAGGER_MS = 800;
/** How bright the specks get while they are still only gathering. */
const GATHER_GLOW = 0.55;
/** How long the cursor must rest before a shape forms under it. */
const DWELL_MS = 320;
/** Movement smaller than this, in px, still counts as resting. */
const STILL_PX = 6;
/** How bright a formed shape gets. Its dots are fine, so it needs a little more light than the dust, but never full. */
const SHAPE_ALPHA = 0.9;
/** Anything a reader is looking at. Resting on these never forms a shape. */
const READABLE = "a, button, input, textarea, select, label, p, h1, h2, h3, h4, li, dt, dd, span, svg, img";

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number; // resting opacity
  glow: number; // 0 to 1, how far it has turned into a shape dot
  off: number; // how far from the attractor's edge this one likes to sit
  ph: number; // breathing phase
  rate: number; // breathing speed
  spent: boolean; // flung out of the swirl, waiting to leave it
  held: boolean; // part of the current shape
  mote: boolean; // brought in by a shape, and gone again once it fades
  go: number; // when this mote stops gathering and heads for its dot
  tx: number; // grid shapes: offset of its dot from the shape's centre
  ty: number;
  lat: number; // globe: the latitude of its row
  mu: number; // globe: its screen longitude, front half only, in [-PI/2, PI/2)
  row: number; // globe: row index, for the binary pattern
  vis: number; // how visible its dot is right now (globe back side and blanks are 0)
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
  /** Multiplies every speck's opacity. Lower for a quieter field. */
  dim?: number;
  /** Multiplies the drift. Lower for a calmer field. */
  speed?: number;
  /** An element the dust gathers round. */
  attractor?: RefObject<HTMLElement | null>;
  /** Shapes the dust forms where the cursor rests, one at a time, at random. */
  shapes?: DustShape[];
  className?: string;
};

/** A stable pseudo-random number in [0, 1) for a pair of integers. */
const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export function DustField({
  preset = "hero",
  count,
  cell = 2,
  radius = 220,
  force = 1,
  ringPad = 26,
  color = "#f5f5f7",
  dim = 1,
  speed = 1,
  attractor,
  shapes,
  className = "",
}: DustFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapesKey = JSON.stringify(shapes ?? []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const { alphaMin, alphaMax, count: presetCount } = PRESETS[preset];
    const density = count ?? presetCount;
    const shapeList: DustShape[] = JSON.parse(shapesKey);
    const useShapes = shapeList.length > 0 && finePointer;

    const cursor = {
      x: -1e5,
      y: -1e5,
      live: false,
      inside: false,
      restX: -1e5, // where the cursor last came to rest
      restY: -1e5,
      movedAt: 0, // when it last moved more than STILL_PX
      readable: false, // resting on text or a control
    };
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
      cx: 0, // where it formed, and stays
      cy: 0,
      reach: 0, // distance from its centre to its furthest dot
      theta: 0, // globe: how far it has turned
      lastT: 0,
    };

    type Slot = { x: number; y: number; lat?: number; mu?: number; row?: number };

    /* Read a baked grid exactly: no smoothing, one pixel per dot. */
    const gridSlots = (i: number, pitch: number): { slots: Slot[]; hw: number; hh: number } => {
      const img = images[i];
      if (!img) return { slots: [], hw: 0, hh: 0 };
      const cols = img.naturalWidth;
      const rows = img.naturalHeight;
      const probe = document.createElement("canvas");
      probe.width = cols;
      probe.height = rows;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      if (!pctx) return { slots: [], hw: 0, hh: 0 };
      pctx.imageSmoothingEnabled = false;
      pctx.drawImage(img, 0, 0);
      const data = pctx.getImageData(0, 0, cols, rows).data;
      const slots: Slot[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (data[(y * cols + x) * 4 + 3] > 127) {
            slots.push({ x: (x - (cols - 1) / 2) * pitch, y: (y - (rows - 1) / 2) * pitch });
          }
        }
      }
      return { slots, hw: ((cols - 1) / 2) * pitch, hh: ((rows - 1) / 2) * pitch };
    };

    /* The globe's front half, as slots along latitude rows. Each speck owns a
       slot for good; the sphere turning under it changes which binary digit
       it shows, and it hops from the right limb to the left one unseen. */
    const globeSlots = (g: Extract<DustShape, { kind: "globe" }>) => {
      const slots: Slot[] = [];
      for (let r = 0; r < g.rows; r++) {
        const lat = ((r + 0.5) / g.rows - 0.5) * Math.PI * 0.86;
        const n = Math.max(2, Math.round((Math.PI * g.radius * Math.cos(lat)) / g.spacing));
        for (let k = 0; k < n; k++) {
          const mu = -Math.PI / 2 + ((k + 0.5) / n) * Math.PI;
          const p = globePoint(g, lat, mu);
          slots.push({ x: p.x, y: p.y, lat, mu, row: r });
        }
      }
      return { slots, hw: g.radius, hh: g.radius };
    };

    const globePoint = (g: Extract<DustShape, { kind: "globe" }>, lat: number, mu: number) => {
      const cl = Math.cos(lat);
      const x = g.radius * cl * Math.sin(mu);
      const y3 = g.radius * Math.sin(lat);
      const z3 = g.radius * cl * Math.cos(mu);
      const ct = Math.cos(g.tilt);
      const st = Math.sin(g.tilt);
      return { x, y: -(y3 * ct - z3 * st), z: y3 * st + z3 * ct };
    };

    /* Binary text round the globe: short runs of digits with a gap between
       words, fixed to the sphere's own longitude so it turns with it. */
    const globeDigitOn = (row: number, lon: number, spacing: number, radius: number) => {
      const idx = Math.floor((lon * radius) / spacing);
      if (((idx % 5) + 5) % 5 === 4) return false; // the gap between digits
      return hash(row, idx) > 0.18;
    };

    const release = () => {
      for (const s of specks) {
        if (!s.held) continue;
        s.held = false; // it fades out and is removed in step()
        const angle = Math.random() * Math.PI * 2;
        const sp = (0.3 + Math.random() * 0.6) * speed;
        s.vx = Math.cos(angle) * sp;
        s.vy = Math.sin(angle) * sp;
      }
      shape.active = -1;
    };

    const form = (now: number) => {
      /* A random shape, never the one just shown. */
      const ready = shapeList
        .map((_, i) => i)
        .filter((i) => (shapeList[i].kind === "globe" || images[i]) && i !== shape.last);
      if (ready.length === 0) return;
      const pick = ready[Math.floor(Math.random() * ready.length)];
      const def = shapeList[pick];
      const built = def.kind === "globe" ? globeSlots(def) : gridSlots(pick, def.pitch);
      const slots = built.slots;
      if (slots.length === 0) return;

      release();

      /* Where the cursor rests, kept whole on the field. */
      const mx = built.hw + 12;
      const my = built.hh + 12;
      shape.cx = clamp(cursor.restX, mx, Math.max(mx, w - mx));
      shape.cy = clamp(cursor.restY, my, Math.max(my, h - my));
      shape.theta = 0;
      shape.lastT = now;

      let reach = 0;
      for (const sl of slots) reach = Math.max(reach, Math.hypot(sl.x, sl.y));
      shape.reach = reach;

      /* Fresh specks for every dot, fading in round the spot and flying in.
         The dust already drifting is never touched. */
      for (const slot of slots) {
        const angle = Math.random() * Math.PI * 2;
        const dist = SPAWN_NEAR + Math.random() * (SPAWN_FAR - SPAWN_NEAR);
        specks.push({
          x: shape.cx + Math.cos(angle) * dist,
          y: shape.cy + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          a: 0,
          glow: 0,
          off: 0,
          ph: 0,
          rate: 0,
          spent: false,
          held: true,
          mote: true,
          /* Centre dots set off first and the outline follows, so the shape
             draws itself outwards rather than landing all at once. */
          go:
            now +
            GATHER_MS +
            (Math.hypot(slot.x, slot.y) / Math.max(1, reach)) * STAGGER_MS * 0.8 +
            Math.random() * STAGGER_MS * 0.2,
          tx: slot.x,
          ty: slot.y,
          lat: slot.lat ?? 0,
          mu: slot.mu ?? 0,
          row: slot.row ?? 0,
          vis: 1,
        });
      }

      shape.active = pick;
      shape.last = pick;
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
        vx: (Math.random() - 0.5) * 0.9 * speed,
        vy: (Math.random() - 0.5) * 0.9 * speed,
        a: (alphaMin + Math.random() * (alphaMax - alphaMin)) * dim,
        glow: 0,
        off: Math.pow(Math.random(), 3), // most sit close, a few drift far out
        ph: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 0.9,
        spent: false,
        held: false,
        mote: false,
        go: 0,
        tx: 0,
        ty: 0,
        lat: 0,
        mu: 0,
        row: 0,
        vis: 1,
      }));
      shape.active = -1;
      draw();
      start();
    };

    /* Drawn in device pixels, so every speck is a crisp square. Shape dots
       are the same size as loose dust, just a little brighter. */
    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      const size = Math.max(1, Math.round(cell * dpr));
      const fine = Math.max(1, Math.round(SHAPE_CELL * dpr));
      for (const s of specks) {
        const alpha = s.mote ? SHAPE_ALPHA * dim * s.glow * s.vis : s.a;
        if (alpha < 0.01) continue;
        ctx.globalAlpha = alpha;
        /* Motes keep the dust's size while they gather and fly, so the
           build-up is easy to see, and sharpen to fine dots as they land. */
        const px = s.mote && s.glow > 0.9 ? fine : size;
        ctx.fillRect(Math.round(s.x * dpr), Math.round(s.y * dpr), px, px);
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      /* Shapes: form where the cursor rests on empty space, dissolve when it leaves. */
      if (useShapes) {
        if (!cursor.inside) {
          if (shape.active >= 0) release();
        } else if (!cursor.readable && now - cursor.movedAt > DWELL_MS) {
          const away =
            shape.active < 0 ||
            Math.hypot(cursor.restX - shape.cx, cursor.restY - shape.cy) > Math.max(150, shape.reach * 0.9);
          if (away) form(now);
        }
      }

      /* The globe turns. */
      const def = shape.active >= 0 ? shapeList[shape.active] : null;
      let dTheta = 0;
      if (def && def.kind === "globe") {
        const dt = clamp(now - shape.lastT, 0, 64) / 1000;
        dTheta = def.speed * dt;
        shape.theta += dTheta;
      }
      shape.lastT = now;

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
        /* Beat one: a mote still gathering circles the spot slowly, drifting a
           little closer, faint, so you can see something collecting there. */
        if (s.held && def && s.mote && now < s.go) {
          /* The globe keeps turning meanwhile, so its dot turns too. */
          if (def.kind === "globe") {
            s.mu += dTheta;
            if (s.mu >= Math.PI / 2) s.mu -= Math.PI;
          }
          const dx = s.x - shape.cx;
          const dy = s.y - shape.cy;
          const d = Math.hypot(dx, dy) || 0.001;
          const swirl = 0.55;
          s.vx = (s.vx + (-dy / d) * swirl * 0.08 - (dx / d) * 0.02) * 0.94;
          s.vy = (s.vy + (dx / d) * swirl * 0.08 - (dy / d) * 0.02) * 0.94;
          s.x += s.vx;
          s.y += s.vy;
          s.glow += (GATHER_GLOW - s.glow) * 0.04;
          continue;
        }

        /* Beats two and three: ease to its dot and brighten as it settles. */
        if (s.held && def) {
          let gx: number;
          let gy: number;
          if (def.kind === "globe") {
            const before = globePoint(def, s.lat, s.mu);
            s.mu += dTheta;
            let hopped = false;
            if (s.mu >= Math.PI / 2) {
              s.mu -= Math.PI;
              hopped = true;
            }
            const p = globePoint(def, s.lat, s.mu);
            /* Carry the sphere's own turn, so the spring only has to close
               the gap and a settled dot sits exactly on its digit. */
            if (!hopped) {
              s.x += p.x - before.x;
              s.y += p.y - before.y;
            }
            gx = shape.cx + p.x;
            gy = shape.cy + p.y;
            /* Its digit is fixed to the sphere, so read it at the sphere's own longitude. */
            const on = globeDigitOn(s.row, s.mu - shape.theta, def.spacing, def.radius);
            /* Fade by depth, and to nothing right at the edge of its half, so
               the hop from one limb to the other can never be seen. */
            const depth = clamp(p.z / def.radius, 0, 1);
            const edge = Math.cos(s.mu) * 5;
            s.vis = on ? clamp(Math.min(depth * 2.2, edge), 0, 1) : 0;
            if (hopped) {
              /* Leaving at one limb, arriving at the other: both invisible, so jump. */
              s.x = gx;
              s.y = gy;
              s.vx = 0;
              s.vy = 0;
            }
          } else {
            gx = shape.cx + s.tx;
            gy = shape.cy + s.ty;
            s.vis = 1;
          }
          /* A soft spring with a speed limit: it glides in and lands without
             overshooting, rather than snapping into place. */
          s.vx = (s.vx + (gx - s.x) * 0.018) * 0.86;
          s.vy = (s.vy + (gy - s.y) * 0.018) * 0.86;
          const v = Math.hypot(s.vx, s.vy);
          if (v > 4) {
            s.vx = (s.vx / v) * 4;
            s.vy = (s.vy / v) * 4;
          }
          s.x += s.vx;
          s.y += s.vy;
          /* Brighten as it closes in, fully lit once it has arrived. */
          const near = 1 - Math.min(1, Math.hypot(gx - s.x, gy - s.y) / 60);
          s.glow = Math.max(s.glow, GATHER_GLOW + (1 - GATHER_GLOW) * near);
          continue;
        }
        if (s.mote) s.glow = Math.max(0, s.glow - 0.012);

        /* With shapes, the field's own dust just keeps drifting. Without
           them, it swirls round the cursor. */
        if (!useShapes && cursor.live) {
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
              const sp = 0.6 + Math.random() * 0.7;
              s.vx = Math.cos(angle) * sp;
              s.vy = Math.sin(angle) * sp;
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
        const jitter = (box ? 0.075 : 0.09) * speed;
        s.vx += (Math.random() - 0.5) * jitter;
        s.vy += (Math.random() - 0.5) * jitter;
        const vmax = 2.2 * speed;
        const v = Math.hypot(s.vx, s.vy);
        if (v > vmax) {
          s.vx = (s.vx / v) * vmax;
          s.vy = (s.vy / v) * vmax;
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

    /* Released shape specks that have faded away are gone for good. */
    const sweep = () => {
      if (specks.some((s) => s.mote && !s.held && s.glow <= 0)) {
        specks = specks.filter((s) => !(s.mote && !s.held && s.glow <= 0));
      }
    };

    const loop = (now: number) => {
      step(now);
      sweep();
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
      if (Math.hypot(cursor.x - cursor.restX, cursor.y - cursor.restY) > STILL_PX) {
        cursor.restX = cursor.x;
        cursor.restY = cursor.y;
        cursor.movedAt = performance.now();
        const under = e.target instanceof Element ? e.target : null;
        cursor.readable = !!under?.closest(READABLE);
      }
    };
    const onLeave = () => {
      cursor.live = false;
      cursor.inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    /* Load every grid up front, so the first rest forms a shape straight away. */
    if (useShapes) {
      shapeList.forEach((sh, i) => {
        if (sh.kind !== "grid") return;
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
          for (let f = 0; f < frames; f++) {
            step(at + f * 16);
            sweep();
          }
          draw();
        },
        rest: (x: number, y: number, at: number, readable = false) => {
          cursor.x = cursor.restX = x;
          cursor.y = cursor.restY = y;
          cursor.inside = cursor.live = true;
          cursor.readable = readable;
          cursor.movedAt = at;
        },
        leave: () => onLeave(),
        state: () => {
          const held = specks.filter((s) => s.held);
          const field = specks.filter((s) => !s.mote);
          const d = shape.active >= 0 ? shapeList[shape.active] : null;
          const errs =
            d && d.kind === "grid"
              ? held.map((s) => Math.hypot(shape.cx + s.tx - s.x, shape.cy + s.ty - s.y))
              : [];
          return {
            specks: field.length,
            motes: specks.length - field.length,
            held: held.length,
            shape: shape.active,
            kind: d?.kind ?? null,
            centre: [Math.round(shape.cx), Math.round(shape.cy)],
            theta: +shape.theta.toFixed(3),
            visibleDots: held.filter((s) => s.vis > 0.05).length,
            gathering: held.filter((s) => shape.lastT < s.go).length,
            arrived: held.filter((s) => s.glow > 0.97).length,
            avgErr: errs.length ? errs.reduce((a, b) => a + b, 0) / errs.length : null,
          };
        },
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
  }, [preset, count, cell, radius, force, ringPad, color, dim, speed, attractor, shapesKey]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
