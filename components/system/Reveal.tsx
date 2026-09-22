"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * The single entrance used across the site.
 *
 * It starts visible. `data-reveal` only becomes "pending" once this
 * component has mounted, which means the server-rendered first frame is
 * always readable and nothing is stranded at zero opacity if JavaScript
 * fails or an observer never fires. That ordering is the whole point;
 * the animation is incidental.
 *
 * One rule for the stagger: three items, 70ms apart, no more. A longer
 * stagger reads as the page loading slowly rather than as choreography.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.dataset.reveal = "shown";
      return;
    }

    node.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
