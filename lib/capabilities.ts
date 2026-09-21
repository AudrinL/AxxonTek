/**
 * Motion budget.
 *
 * Every expensive effect on the site asks for the visitor's tier before it
 * mounts, so a cheap Android phone on a metered 3G connection in Kigali gets
 * a fast, still page instead of a WebGL scene it cannot afford. This is a
 * brand promise, not just a performance setting — see the hero copy.
 *
 *   full  — desktop-class device on a decent connection: everything on.
 *   lite  — phones and low-memory devices: smooth scroll and text motion stay,
 *           3D runs at DPR 1 with fewer particles and no pointer effects.
 *   off   — reduced-motion preference, Data Saver, no WebGL2, or a 2G-class
 *           connection: no canvas, no smoothing, plain static content.
 *
 * Overridable from devtools for testing: localStorage["axxontek-motion"].
 */
export type MotionTier = "full" | "lite" | "off";

export const MOTION_OVERRIDE_KEY = "axxontek-motion";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };
type NavigatorExtra = Navigator & {
  connection?: NetworkInformation;
  deviceMemory?: number;
};

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

/** Client-only. On the server every visitor is "full" — nothing tier-specific renders there. */
export function detectMotionTier(): MotionTier {
  if (typeof window === "undefined") return "full";

  try {
    const override = window.localStorage.getItem(MOTION_OVERRIDE_KEY);
    if (override === "full" || override === "lite" || override === "off") return override;
  } catch {
    /* storage blocked — fall through to detection */
  }

  const nav = navigator as NavigatorExtra;
  const connection = nav.connection;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (connection?.saveData) return "off";
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return "off";
  if (!supportsWebGL2()) return "off";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const slow3g = connection?.effectiveType === "3g";

  if (coarse || lowMemory || slow3g || fewCores) return "lite";
  return "full";
}

/** Concrete numbers each tier is allowed to spend. */
export function motionBudget(tier: MotionTier) {
  return {
    /** Device pixel ratio cap for the shared WebGL canvas. */
    dpr: tier === "full" ? Math.min(2, typeof window === "undefined" ? 1 : window.devicePixelRatio) : 1,
    /** Grid step (degrees) when sampling the continent — larger = fewer points. */
    pointStep: tier === "full" ? 0.85 : 1.25,
    /** Pointer-driven effects only make sense with a fine pointer and spare GPU. */
    pointerEffects: tier === "full",
    /** Velocity skew, scramble text and other flourishes. */
    flourishes: tier !== "off",
  } as const;
}
