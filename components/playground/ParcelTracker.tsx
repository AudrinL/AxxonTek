"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Playground entry 01, in its compact form.
 *
 * The logic behind Floow tracking, running on sample data. A visitor
 * types a code and watches a delivery resolve across a route. It exists
 * because a screenshot proves nothing: anyone can produce a beautiful
 * mockup of a product that does not exist, and almost nobody can produce
 * one that works when you touch it.
 *
 * Deliberately plain state and CSS transitions. The whole thing is a few
 * kilobytes, it holds its shape at 360px, and it works on a throttled
 * connection, which matters on a page that argues for exactly that.
 */

const STOPS = [
  { what: "Order placed", where: "Kabeza, Kanombe", when: "08:14" },
  { what: "Collected by rider", where: "Giporoso hub", when: "09:02" },
  { what: "In transit", where: "Gitarama", when: "11:37" },
  { what: "Out for delivery", where: "Nyamabuye", when: "14:05" },
  { what: "Delivered", where: "Signed for by recipient", when: "15:22" },
];

const SAMPLE = "FLW-NUQ3-NWCA";

export function ParcelTracker() {
  const [code, setCode] = useState(SAMPLE);
  const [reached, setReached] = useState(-1);
  const [started, setStarted] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const track = useCallback(() => {
    clear();
    setStarted(true);
    setReached(-1);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduced ? 0 : 520;

    STOPS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setReached(i), 140 + i * step),
      );
    });
  }, [clear]);

  const done = reached === STOPS.length - 1;

  return (
    <div className="card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-5 py-4">
        <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em]">
          floow<span className="text-ember">.</span>
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-tone-faint uppercase">
          Sample parcel · real flow
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2.5">
          <label htmlFor="parcel-code" className="sr-only">
            Parcel code
          </label>
          <input
            id="parcel-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && track()}
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 flex-1 rounded-[var(--r-inner)] border border-line-firm bg-[color-mix(in_srgb,var(--c-ink)_4%,transparent)] px-4 py-3 font-mono text-[0.8125rem] tracking-[0.06em] text-tone"
          />
          <button
            type="button"
            onClick={track}
            className="pill pill-ember h-[2.875rem] px-6 text-sm hover:bg-ember-deep"
          >
            Track
          </button>
        </div>

        <p className="mt-3 text-[0.75rem] text-tone-faint">
          Any code resolves in this demo. The live network validates it.
        </p>

        {started && (
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
              <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.018em]">
                Giporoso <span className="text-ember">&#8594;</span> Kavumu
              </p>
              <p className="font-mono text-[0.75rem] text-tone-mute">3,000 RWF</p>
            </div>

            <ol className="relative mt-5">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-[5px] w-0.5 rounded bg-line-firm"
              />
              <span
                aria-hidden
                className="absolute left-[5px] w-0.5 rounded bg-ember transition-[height] duration-500 ease-out"
                style={{
                  top: "0.5rem",
                  height:
                    reached < 0
                      ? "0%"
                      : `calc(${(reached / (STOPS.length - 1)) * 100}% - ${
                          reached === STOPS.length - 1 ? "1rem" : "0rem"
                        })`,
                }}
              />

              {STOPS.map((stop, i) => {
                const passed = i <= reached;
                return (
                  <li
                    key={stop.what}
                    className={`relative flex items-baseline justify-between gap-3 py-2 pl-8 transition-opacity duration-300 ${
                      passed ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute top-[0.85rem] left-0 h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                        passed
                          ? "border-ember bg-ember"
                          : "border-line-firm bg-[var(--ground-veil)]"
                      } ${i === reached && !done ? "ring-4 ring-ember/20" : ""}`}
                    />
                    <span>
                      <span className="block text-[0.875rem] font-medium">
                        {stop.what}
                      </span>
                      <span className="mt-0.5 block text-[0.75rem] text-tone-mute">
                        {stop.where}
                      </span>
                    </span>
                    <span className="flex-none font-mono text-[0.6875rem] text-tone-faint">
                      {stop.when}
                    </span>
                  </li>
                );
              })}
            </ol>

            {done && (
              <p className="mt-4 rounded-[var(--r-inner)] bg-ember-wash px-4 py-3 text-[0.8125rem] font-medium text-ember-text">
                Delivered in 7h 08m across 2 handovers.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
