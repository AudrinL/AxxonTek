"use client";

import { Children, type ReactNode } from "react";

/**
 * An endless horizontal ribbon. The track is rendered twice and translated
 * by exactly half its width, so the loop is seamless with pure CSS and no
 * measurement. Reversed direction and speed are props. It holds still under
 * reduced motion, where a marquee is noise rather than signal.
 */
export function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const items = Children.toArray(children);
  const Track = (
    <div className="marquee-track flex shrink-0 items-center gap-[3.5rem] pr-[3.5rem]" aria-hidden>
      {items.map((child, i) => (
        <span key={i} className="shrink-0">
          {child}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee group relative flex overflow-hidden ${className}`}>
      <div
        className="marquee-lane flex"
        style={{
          ["--marquee-dur" as string]: `${speed}s`,
          ["--marquee-dir" as string]: reverse ? "reverse" : "normal",
        }}
      >
        {Track}
        {Track}
      </div>
    </div>
  );
}
