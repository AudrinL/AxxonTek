"use client";

import { useEffect, useState } from "react";
import { DustField, type DustShape } from "@/components/system/DustField";
import { DotMark } from "@/components/system/DotMark";

/** Phones get fewer specks and a tighter reach, as rho does. */
function useSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

/**
 * What the dust can become. The robot, code and UI/UX shapes are baked dot
 * grids made from the icons in public/assets/shapes, each checked by eye at
 * this spacing; to change one, edit its icon and re-bake its grid, one pixel
 * per dot. The globe is built live as a turning sphere wrapped in rows of
 * binary, so it can rotate.
 */
const SHAPES: DustShape[] = [
  { kind: "grid", src: "/assets/shapes/robot-grid.png", pitch: 6 },
  { kind: "grid", src: "/assets/shapes/code-grid.png", pitch: 5 },
  { kind: "grid", src: "/assets/shapes/uiux-grid.png", pitch: 5 },
  { kind: "globe", radius: 110, rows: 15, spacing: 5, tilt: 0.38, speed: 0.45 },
];

/**
 * Faint dust drifting behind the whole footer. With a mouse, resting on
 * empty space gathers the dust into a random shape there.
 *
 * On phones it is deliberately quiet: roughly a third as many specks, at half
 * the brightness and half the speed, and no shapes, so it never competes with
 * the links and text a visitor came to the footer for.
 */
export function FooterDust() {
  const small = useSmall();
  return small ? (
    <DustField preset="footer" count={90} cell={2} dim={0.5} speed={0.5} />
  ) : (
    <DustField preset="footer" count={320} cell={2} radius={240} shapes={SHAPES} />
  );
}

/** The logo drawn in dots at the foot of the page, parting round the cursor. */
export function FooterMark() {
  const small = useSmall();
  return (
    <DotMark
      src="/assets/logo-dots.png"
      color="image"
      cell={2}
      gap={small ? 1 : 3}
      radius={small ? 70 : 110}
      className="absolute inset-0"
    />
  );
}
