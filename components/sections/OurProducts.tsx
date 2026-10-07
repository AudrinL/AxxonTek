"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { offerings } from "@/lib/site";

/** How long each card holds, which is also how long its dot takes to fill. */
const CYCLE_MS = 4500;
/** Card gap in px, matching the 20px rhythm Apple uses between tiles. */
const GAP = 20;
/** How far the front card's photograph is pushed in, at rest and while it plays. */
const HOLD_ZOOM = 0.06;
const PLAY_ZOOM = 0.03;

const n = offerings.length;
const mod = (a: number, m: number) => ((a % m) + m) % m;

/**
 * Our Products, built the way Apple builds "Get the highlights", made endless.
 *
 * A row header, then a slider of rounded cards, two to a screen on a desktop.
 * The slider is a ring: one continuous position drives every card, and a card
 * that slides off the left edge wraps round to the back of the queue, so it
 * never runs out and never rewinds. The position eases towards wherever it
 * has been told to go, which is what makes every move (autoplay, a dot, a
 * drag, an arrow key) glide the same way instead of snapping.
 *
 * The card at the front is zoomed in a little, and as it plays a dot in the
 * pill below fills over seven seconds while its photograph pushes in a touch
 * further. When the dot is full the ring advances. Drag or swipe to move by
 * hand, click a dot to go straight there by the shortest way round, press
 * pause to hold everything still.
 */
export function OurProducts() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  const stage = useRef<HTMLUListElement | null>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  const pos = useRef(0); // where the ring is right now, in cards
  const target = useRef(0); // where it is heading
  const step = useRef(0); // card width plus gap, in px
  const progress = useRef(0);
  const reduced = useRef(false);
  const drag = useRef({ on: false, moved: false, startX: 0, startTarget: 0, lastX: 0, lastT: 0, v: 0 });
  const activeRef = useRef(0);

  const goTo = useCallback((i: number) => {
    /* The shortest way round the ring, in either direction. */
    let delta = mod(i - mod(Math.round(target.current), n), n);
    if (delta > n / 2) delta -= n;
    target.current = Math.round(target.current) + delta;
  }, []);

  const nudge = useCallback((by: number) => {
    target.current = Math.round(target.current) + by;
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setPlaying(false);

    const el = stage.current;
    if (!el) return;

    const measure = () => {
      const first = cards.current[0];
      if (first) step.current = first.offsetWidth + GAP;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);

    /* Pointer drag, for mouse and touch alike. Vertical swipes still scroll
       the page because the stage only claims pan-y for the browser. */
    const d = drag.current;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      d.on = true;
      d.moved = false;
      d.startX = e.clientX;
      d.startTarget = target.current;
      d.lastX = e.clientX;
      d.lastT = performance.now();
      d.v = 0;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!d.on || !step.current) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 6) d.moved = true;
      target.current = d.startTarget - dx / step.current;
      const now = performance.now();
      const dt = Math.max(1, now - d.lastT);
      d.v = (e.clientX - d.lastX) / dt; // px per ms
      d.lastX = e.clientX;
      d.lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!d.on) return;
      d.on = false;
      el.style.cursor = "";
      el.releasePointerCapture?.(e.pointerId);
      /* A flick carries on a little, then it settles on the nearest card. */
      const carry = step.current ? (-d.v * 220) / step.current : 0;
      target.current = Math.round(target.current + Math.max(-1, Math.min(1, carry)));
    };
    /* A drag must not count as a click on the card underneath it. */
    const swallow = (e: MouseEvent) => {
      if (d.moved) {
        e.preventDefault();
        e.stopPropagation();
        d.moved = false;
      }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", swallow, true);

    return () => {
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", swallow, true);
    };
  }, []);

  /* One rAF loop owns everything that moves. It eases the ring towards its
     target, lays every card out from the single position, zooms the front
     card, fills the dot, and hands over to the next card when the dot is
     full. It writes straight to the DOM so nothing re-renders at 60fps. */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      /* Exponential ease: quick off the mark, long soft landing. */
      const k = reduced.current ? 1 : 1 - Math.exp(-dt / 190);
      pos.current += (target.current - pos.current) * k;
      if (Math.abs(target.current - pos.current) < 0.0005) pos.current = target.current;

      const current = mod(Math.round(target.current), n);
      if (current !== activeRef.current) {
        activeRef.current = current;
        progress.current = 0;
        setActive(current);
      }

      if (playing && inView && !reduced.current && !drag.current.on) {
        progress.current = Math.min(1, progress.current + dt / CYCLE_MS);
        if (progress.current >= 1) {
          progress.current = 0;
          nudge(1);
        }
      }

      const s = step.current;
      for (let i = 0; i < n; i++) {
        const card = cards.current[i];
        if (!card) continue;
        /* Wrap each card into the window [-2, n-2). A card slides all the way
           off the left of the screen before it rejoins at the back, and the
           one just behind the front card peeks in from the left, mirroring
           the one that peeks in from the right. */
        const rel = mod(i - pos.current + 2, n) - 2;
        const front = Math.max(0, 1 - Math.abs(rel));
        card.style.transform = `translate3d(${(rel - i) * s}px,0,0)`;
        card.style.pointerEvents = rel < -1.05 || rel > 2.6 ? "none" : "";
        const photo = photos.current[i];
        if (photo) {
          const push = i === activeRef.current && !reduced.current ? PLAY_ZOOM * progress.current : 0;
          photo.style.transform = `scale(${1 + HOLD_ZOOM * front + push})`;
        }
      }
      fills.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${i === activeRef.current ? progress.current : 0})`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, nudge]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    }
  };

  return (
    <section
      id="products"
      data-chapter-ground="ink"
      className="section-alt relative overflow-hidden py-[var(--chapter)]"
    >
      <div className="container-x">
        <Reveal className="section-row">
          <h2 className="text-chapter">
            Our <span className="text-serif">products</span>.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] hover:underline"
          >
            Start a project
            <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5">
              <Icon name="arrow" size={15} />
            </span>
          </Link>
        </Reveal>
      </div>

      {/* The stage. Full bleed, but the front card lines up with the content edge. */}
      <ul
        ref={stage}
        tabIndex={0}
        aria-label="Our products"
        onKeyDown={onKey}
        className="relative m-0 h-[33rem] cursor-grab touch-pan-y list-none p-0 outline-offset-4 select-none [--card:82vw] sm:h-[34rem] md:[--card:calc((min(100%-2*var(--gutter),78.75rem)-1.25rem)/2)] lg:h-[34rem]"
        style={{ ["--edge" as string]: "calc((100% - min(100% - 2 * var(--gutter), 78.75rem)) / 2)" }}
      >
        {offerings.map((item, i) => (
          <li
            key={item.id}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="absolute top-0 bottom-0 w-[var(--card)] will-change-transform"
            /* Each card is parked at its own slot with `left`, where a percentage
               resolves against the stage. The ring then moves it with a transform
               measured from that slot. */
            style={{ left: `calc(var(--edge) + ${i} * (var(--card) + ${GAP}px))` }}
          >
            <Link
              href={item.href}
              draggable={false}
              className="group relative flex h-full flex-col overflow-hidden rounded-[var(--r-card)] bg-black"
            >
              {/* The copy has its own room at the top of the card. */}
              <div className="px-7 pt-8 pb-6 lg:px-9 lg:pt-9">
                <p className="max-w-[20ch] text-[clamp(1.375rem,2.2vw,2rem)] leading-[1.125] font-semibold tracking-[0.004em] text-white/[0.92]">
                  {item.name}
                </p>
                <p className="mt-3 max-w-[32ch] text-[1.0625rem] leading-[1.47] text-white/60">
                  {item.line}
                </p>
              </div>

              {/* The photograph sits below it, in its own rounded frame,
                  in its natural colours. */}
              <div className="relative mx-3 mb-3 min-h-0 flex-1 overflow-hidden rounded-[1.25rem]">
                <div
                  ref={(el) => {
                    photos.current[i] = el;
                  }}
                  aria-hidden
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    draggable={false}
                    sizes="(min-width: 768px) 620px, 82vw"
                    priority={i < 3}
                    className="object-cover"
                    style={{ objectPosition: item.focus }}
                  />
                </div>

                {/* The round affordance every Apple media card carries. */}
                <span
                  aria-hidden
                  className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(42,42,45,0.72)] text-white backdrop-blur-md transition-[background-color,transform] duration-[var(--t-base)] ease-out group-hover:scale-105 group-hover:bg-white group-hover:text-black"
                >
                  <Icon name="arrow" size={18} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* The pill: play or pause, and one dot per card. */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(42,42,45,0.72)] text-white transition-colors duration-[var(--t-hover)] hover:bg-[rgba(60,60,64,0.9)]"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M4 2.6v10.8a.6.6 0 0 0 .9.5l8.6-5.4a.6.6 0 0 0 0-1L4.9 2.1a.6.6 0 0 0-.9.5Z" />
            </svg>
          )}
        </button>

        <div
          role="tablist"
          aria-label="Products"
          className="flex h-14 items-center rounded-full bg-[rgba(42,42,45,0.72)] px-3"
        >
          {offerings.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={item.name}
              onClick={() => goTo(i)}
              className="relative flex h-10 cursor-pointer items-center px-1"
            >
              <span
                className={`relative block h-2 overflow-hidden rounded-full bg-[rgba(245,245,247,0.42)] transition-[width] duration-500 ease-[var(--ease-out)] ${
                  i === active ? "w-12" : "w-2"
                }`}
              >
                <span
                  ref={(el) => {
                    fills.current[i] = el;
                  }}
                  className="absolute inset-0 origin-left rounded-full bg-[rgba(245,245,247,0.92)]"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
