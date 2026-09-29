"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { scrollPageBy } from "@/lib/motion";
import { offerings } from "@/lib/site";

/** How long the slow push-in on a tile takes, which is also how long its dot fills. */
const CYCLE_MS = 7000;

/**
 * Our Products, built the way Apple builds "Get the highlights".
 *
 * A row header (headline left, text link right), then a horizontal slider of
 * rounded cards that snap into place, the next one always peeking in from the
 * right so it is obvious there is more. Each card is a single photograph with
 * its caption pinned to the top-left corner. Below the row sits a glass pill:
 * a play and pause button and one dot per card. While it plays, the dot for
 * the current card stretches and fills over seven seconds as the photograph
 * slowly pushes in, and when it is full the slider moves on to the next card
 * and loops. Drag or swipe to move by hand, click a dot to jump, press pause
 * to hold everything still.
 */
export function OurProducts() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  const scroller = useRef<HTMLUListElement | null>(null);
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const progress = useRef(0);
  const reduced = useRef(false);
  const dragging = useRef(false);
  const count = offerings.length;

  /* Where the scroller needs to be for a card to sit at the content edge. */
  const targetFor = useCallback((i: number) => {
    const el = scroller.current;
    const tile = tiles.current[i];
    if (!el || !tile) return 0;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    /* Measured, not offsetLeft, which ignores the scroller as an ancestor. */
    return tile.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - pad;
  }, []);

  const nearest = useCallback(() => {
    const el = scroller.current;
    if (!el) return 0;
    let best = 0;
    let bestDist = Infinity;
    tiles.current.forEach((_, i) => {
      const dist = Math.abs(targetFor(i) - el.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }, [targetFor]);

  const goTo = useCallback(
    (i: number) => {
      scroller.current?.scrollTo({
        left: targetFor(i),
        behavior: reduced.current ? "auto" : "smooth",
      });
    },
    [targetFor]
  );

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setPlaying(false);

    const el = scroller.current;
    if (!el) return;

    const onScroll = () => {
      const best = nearest();
      setActive((prev) => (prev === best ? prev : best));
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    /* Only play while the slider is actually on screen. */
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);

    /* Mouse drag, so it slides by hand on a desktop as well as by touch. */
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging.current = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging.current) return;
      dragging.current = false;
      el.style.scrollSnapType = "";
      el.style.cursor = "";
      el.scrollTo({ left: targetFor(nearest()), behavior: "smooth" });
    };
    /* A drag must not count as a click on the card underneath it. */
    const swallow = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", swallow, true);

    return () => {
      el.removeEventListener("scroll", onScroll);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", swallow, true);
    };
  }, [nearest, targetFor]);

  /* Restart the fill whenever the current card changes. */
  useEffect(() => {
    progress.current = 0;
  }, [active]);

  /* One rAF loop drives the fill and the push-in, writing straight to the
     DOM so a 60fps animation never re-renders the tree. When a dot is full,
     it hands over to the next card. */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const paint = () => {
      fills.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${i === active ? progress.current : 0})`;
      });
      photos.current.forEach((el, i) => {
        if (el) {
          const scale = i === active && !reduced.current ? 1 + 0.06 * progress.current : 1;
          el.style.transform = `scale(${scale})`;
        }
      });
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (playing && inView && !reduced.current && !dragging.current) {
        progress.current = Math.min(1, progress.current + dt / CYCLE_MS);
        if (progress.current >= 1) {
          progress.current = 0;
          goTo((active + 1) % count);
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, playing, inView, goTo, count]);

  return (
    <section
      id="products"
      data-chapter-ground="ink"
      className="section-alt relative overflow-hidden py-[var(--chapter)]"
    >
      <div className="container-x">
        <Reveal className="section-row">
          <h2 className="text-chapter">
            Six ways to <span className="text-serif">build</span>. One team to run it.
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

      {/* The slider. Full bleed, but its first card lines up with the content edge.
          The end padding lets the last card travel all the way to that edge too,
          otherwise the final dots could never become current. */}
      <ul
        ref={scroller}
        className="no-scrollbar m-0 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain p-0 [--card:82vw] sm:[--card:24rem] lg:[--card:27rem]"
        style={{
          ["--edge" as string]: "calc((100% - min(100% - 2 * var(--gutter), 78.75rem)) / 2)",
          paddingLeft: "var(--edge)",
          paddingRight: "max(var(--edge), calc(100% - var(--edge) - var(--card)))",
          scrollPaddingLeft: "var(--edge)",
        }}
      >
        {offerings.map((item, i) => (
          <li
            key={item.id}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            className="w-[var(--card)] shrink-0 snap-start list-none"
          >
            <Link
              href={item.href}
              draggable={false}
              className="group relative flex aspect-[27/35] flex-col overflow-hidden rounded-[var(--r-card)] bg-black"
            >
              {/* The copy has its own room at the top of the card. */}
              <div className="px-7 pt-8 pb-6 lg:px-8">
                <p className="text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.17] font-semibold tracking-[0.009em] text-white/[0.92]">
                  {item.name}. {lead(item.line)}
                </p>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-white/60">
                  {rest(item.line)}
                </p>
              </div>

              {/* The photograph sits below it, in its own rounded frame, all
                  tinted the same orange so six sources read as one set. */}
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
                    alt=""
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 432px, (min-width: 640px) 384px, 82vw"
                    priority={i < 3}
                    className="object-cover grayscale brightness-[1.3] contrast-[1.1]"
                    style={{ objectPosition: item.focus }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                      background:
                        "linear-gradient(160deg, var(--ember-deep) 0%, var(--ember) 50%, #ff8a55 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{ background: "var(--ember)", opacity: 0.55 }}
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

/** Apple's caption rhythm: the first sentence is the feature, the rest the benefit. */
const lead = (line: string) => line.slice(0, line.indexOf(". ") + 1);
const rest = (line: string) => line.slice(line.indexOf(". ") + 2);
