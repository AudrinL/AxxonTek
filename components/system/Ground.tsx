"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type GroundTone = "canvas" | "ink";

/**
 * The ground.
 *
 * One fixed surface behind the whole page. A chapter declares its tone
 * with `data-chapter-ground`, whichever chapter holds the middle of the
 * viewport wins, the attribute lands on <html>, and every contextual
 * token in globals.css is redefined against it. The whole window then
 * cross-fades over 620ms.
 *
 * There is no gradient between sections because there is no seam to
 * hide. Content stays exactly where it is and the world around it
 * changes colour.
 *
 * Three things are worth knowing before changing how this is triggered.
 *
 *   The tempting `rootMargin: "-50% 0px -50% 0px"` collapses the
 *   observer root to a rectangle of zero height. The intersection ratio
 *   is then zero against zero area and the callback never fires at all.
 *   The band here is deliberately 10% of the viewport so the root stays
 *   a real rectangle.
 *
 *   The entry the observer hands back is ignored on purpose. It only
 *   wakes `resolve`, which measures the midpoint itself. That stays
 *   correct when several chapters straddle the band at once, which the
 *   entry alone cannot tell you.
 *
 *   The root layout can mount before the page segment has streamed in,
 *   so the chapter list is re-queried on every pass rather than captured
 *   once, and the observer re-attaches on the first few frames until it
 *   finds something to watch.
 */
export function Ground() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    let frame = 0;
    let attach = 0;
    let observer: IntersectionObserver | null = null;

    const resolve = () => {
      frame = 0;
      const chapters = document.querySelectorAll<HTMLElement>("[data-chapter-ground]");
      if (chapters.length === 0) return;

      const middle = window.innerHeight / 2;
      let tone = chapters[0].dataset.chapterGround ?? "canvas";

      for (const chapter of chapters) {
        /* The last chapter whose top has passed the midline owns the
           ground. Chapters are in document order, so this settles on the
           one the reader is actually looking at. */
        if (chapter.getBoundingClientRect().top <= middle) {
          tone = chapter.dataset.chapterGround ?? tone;
        } else break;
      }

      if (root.dataset.ground !== tone) root.dataset.ground = tone;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(resolve);
    };

    /* Watch whatever chapters exist, and keep trying for a few frames
       while the page segment streams in. */
    let attempts = 0;
    const watch = () => {
      const chapters = document.querySelectorAll<HTMLElement>("[data-chapter-ground]");

      if (chapters.length > 0) {
        observer?.disconnect();
        observer = new IntersectionObserver(schedule, {
          rootMargin: "-45% 0px -45% 0px",
          threshold: [0, 1],
        });
        chapters.forEach((chapter) => observer!.observe(chapter));
        resolve();
        return;
      }

      if (attempts++ < 30) attach = requestAnimationFrame(watch);
    };

    watch();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (attach) cancelAnimationFrame(attach);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <div className="ground" aria-hidden />;
}
