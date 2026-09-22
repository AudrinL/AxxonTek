"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The trace.
 *
 * A single circuit line that runs the full height of every page, drawn
 * by scroll position rather than by a timer, so it is always exactly
 * where the reader is. It crosses every chapter boundary, which is the
 * job: a ground change removes the seam, and something still travelling
 * through the boundary is what stops the page reading as stacked blocks.
 *
 * It is taken from the mark rather than invented beside it. The logo is
 * an A built from circuit traces with an arrow rising out of it, so a
 * fine trace with right-angled jogs and a node at each junction is the
 * same drawing continued down the page.
 *
 * It sits in the left gutter, behind everything, and it is removed
 * entirely below 1024px where there is no gutter to give it.
 */

/* Right-angled jogs with rounded corners, in a 40 wide by 1000 tall box
   that gets stretched to the viewport. Kept deliberately sparse: this is
   a circuit, not a decoration, and it should read as one line with a few
   deliberate turns rather than a maze. */
const PATH =
  "M20,0 L20,132 Q20,150 34,150 L34,286 Q34,304 20,304 L20,470 " +
  "Q20,488 34,488 L34,636 Q34,654 20,654 L20,820 Q20,838 34,838 L34,1000";

const NODES = [
  { x: 34, y: 150 },
  { x: 20, y: 304 },
  { x: 34, y: 488 },
  { x: 20, y: 654 },
  { x: 34, y: 838 },
];

export function Trace() {
  const pathname = usePathname();
  const drawnRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawn = drawnRef.current;
    const wrap = wrapRef.current;
    if (!drawn || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawn.style.strokeDashoffset = "0";
      wrap.dataset.on = "1";
      return;
    }

    const length = drawn.getTotalLength();
    drawn.style.strokeDasharray = `${length}`;
    drawn.style.strokeDashoffset = `${length}`;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      /* A little ahead of the reader rather than level with them. A line
         that arrives exactly at the fold looks like it is chasing. */
      const drawnTo = Math.min(1, progress * 1.08 + 0.06);
      drawn.style.strokeDashoffset = `${length * (1 - drawnTo)}`;
      wrap.style.setProperty("--trace-progress", drawnTo.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    wrap.dataset.on = "1";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      data-on="0"
      className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden w-[clamp(1.25rem,4.5vw,3.5rem)] opacity-0 transition-opacity duration-500 data-[on=1]:opacity-100 lg:block"
    >
      <svg
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d={PATH}
          fill="none"
          stroke="var(--c-line)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={drawnRef}
          d={PATH}
          fill="none"
          stroke="var(--ember)"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.75"
        />
        {NODES.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r="2"
            fill="var(--ember)"
            opacity="0.75"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}
