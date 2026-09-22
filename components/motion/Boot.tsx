"use client";

import { useLenis } from "lenis/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/components/motion/MotionTier";
import { BOOT_SESSION_KEY } from "@/lib/boot";
import { sceneCount } from "@/lib/scenes";

/* ------------------------------------------------------------------ *
 * Signals — things the preloader waits for. Anything heavy that lands
 * after hydration calls `signalBoot("<key>")` when it is ready.
 * ------------------------------------------------------------------ */
export type BootSignal = "canvas";

const settled = new Set<BootSignal>();

/** The preloader's frame loop polls this set; there is nothing to notify. */
export function signalBoot(key: BootSignal) {
  settled.add(key);
}

/* ------------------------------------------------------------------ *
 * Ready state — hero entrances wait for this instead of page load.
 * ------------------------------------------------------------------ */
const BootContext = createContext(false);

/** True once the preloader has lifted (immediately, when it was skipped). */
export function useBootReady() {
  return useContext(BootContext);
}

/** Timing, in ms. The floor stops a fast connection from flashing the overlay. */
const MIN_DURATION = 1000;
const MAX_DURATION = 2400;
const EXIT_DURATION = 900;

/**
 * First-visit preloader in the spirit of a studio site: a wordmark, a bar and
 * a rolling counter that tracks real work (system fonts settling, the WebGL
 * bundle arriving) rather than a fake timer. It is part of the server HTML
 * so it paints before any JavaScript runs; `app/layout.tsx` sets
 * `html[data-boot]` before first paint so repeat visits in a session, and
 * reduced-motion visitors, never see it.
 */
export function BootProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const tier = useMotionTier();
  const lenis = useLenis();
  // Read at call time inside `finish`: Lenis mounts after this component's
  // first effect, so a captured value would still be undefined.
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const barRef = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Hold the page still while the overlay is up.
  useEffect(() => {
    if (!lenis || ready) return;
    if (document.documentElement.dataset.boot !== "loading") return;
    lenis.stop();
  }, [lenis, ready]);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.boot !== "loading") {
      // Missing entirely means React regenerated <html> (a hydration failure
      // somewhere) and dropped the attribute; make sure the overlay hides.
      if (!html.dataset.boot) html.dataset.boot = "skip";
      setReady(true);
      return;
    }

    // No canvas is coming for the "off" tier, nor on pages without a scene
    // (scenes register in their mount effects, which run before this one).
    if (tier === "off" || sceneCount() === 0) settled.add("canvas");

    let fontsReady = false;
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });

    const start = performance.now();
    let shown = 0;
    let raf = 0;
    let finished = false;

    const paint = (value: number) => {
      const pct = Math.round(value * 100);
      if (barRef.current) barRef.current.style.transform = `scaleX(${value})`;
      const text = String(pct).padStart(3, "0");
      digitsRef.current.forEach((col, i) => {
        if (col) col.style.transform = `translateY(-${Number(text[i]) * 10}%)`;
      });
    };

    const finish = () => {
      finished = true;
      paint(1);
      if (labelRef.current) labelRef.current.textContent = "Ready";
      window.setTimeout(() => {
        rootRef.current?.setAttribute("data-state", "exit");
        setReady(true);
        lenisRef.current?.start();
        window.setTimeout(() => {
          html.dataset.boot = "done";
          try {
            sessionStorage.setItem(BOOT_SESSION_KEY, "1");
          } catch {
            /* storage blocked */
          }
          ScrollTrigger.refresh();
        }, EXIT_DURATION);
      }, 180);
    };

    const frame = () => {
      if (finished) return;
      const elapsed = performance.now() - start;
      const canvasReady = settled.has("canvas");

      // Real work drives the target; the time floor keeps it moving.
      let target = 0.12 + (fontsReady ? 0.28 : 0) + (canvasReady ? 0.6 : 0);
      target = Math.max(target, Math.min(0.92, elapsed / MAX_DURATION));

      const done = fontsReady && canvasReady;
      const canFinish = (done && elapsed >= MIN_DURATION) || elapsed >= MAX_DURATION;
      if (canFinish) target = 1;

      shown += (target - shown) * (canFinish ? 0.22 : 0.09);
      paint(shown);

      if (canFinish && shown > 0.995) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    // Browsers pause rAF in background tabs; never leave a visitor who opened
    // the site behind another tab staring at the counter when they come back.
    const cap = window.setTimeout(() => {
      if (!finished) finish();
    }, MAX_DURATION + 400);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
    };
  }, [tier]);

  return (
    <BootContext.Provider value={ready}>
      {children}
      <div ref={rootRef} className="boot" aria-hidden data-state="loading">
        <div className="boot-inner">
          <span className="boot-mark">
            Axxon<span className="text-ember">Tek</span>
          </span>

          <span className="boot-bar">
            <span ref={barRef} className="boot-bar-fill" />
          </span>

          <span className="boot-counter" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="boot-digit">
                <span
                  className="boot-digit-col"
                  ref={(el) => {
                    if (el) digitsRef.current[i] = el;
                  }}
                >
                  {Array.from({ length: 10 }, (_, d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              </span>
            ))}
          </span>

          <span ref={labelRef} className="boot-label">
            Loading
          </span>
        </div>
      </div>
    </BootContext.Provider>
  );
}
