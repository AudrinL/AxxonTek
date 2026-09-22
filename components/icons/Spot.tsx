import type { SVGProps } from "react";

/**
 * Spot illustrations — the large, friendly pieces that head a service card
 * or feature block at 64-120px. The counterpart to components/Icon.tsx,
 * which is the 24px line set used inline.
 *
 * The family rules, so the set reads as one hand:
 *   - 120x120 grid. Every subject sits on the same ground line (y=102) and
 *     is drawn wide rather than tall, so the four line up across a row.
 *   - Two warm tones for the object, one coral for the single thing the
 *     eye should land on, and exactly two loose dots for rhythm.
 *   - Flat fills. No gradients, no shadows, no stroke under 3 units.
 *   - The coral element is always *part of* the object — a cursor, a lens,
 *     a reagent — never a badge stuck in the corner.
 */

const C = {
  body: "#F9A03F",      // subject fill — warm amber
  bodyDeep: "#D97A22",  // shade, one step down
  screen: "#FFF6EA",    // screen / paper
  accent: "#E8503A",    // the one coral element
  ground: "#EFE9E0",    // ground line
  dotGrey: "#DCD7D0",
  dotGreen: "#3FAE6A",
};

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Frame({ size = 112, children, ...rest }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden {...rest}>
      {children}
      <rect x="22" y="102" width="76" height="6" rx="3" fill={C.ground} />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Software Development — a desktop screen with code on it. The caret
 * is the coral: the one thing on the card that looks alive.
 * ------------------------------------------------------------------ */
export function SpotSoftware(props: Props) {
  return (
    <Frame {...props}>
      <circle cx="17" cy="20" r="5" fill={C.dotGrey} />
      <circle cx="104" cy="88" r="4.5" fill={C.dotGreen} />

      {/* Stand, drawn first so the screen sits over it. */}
      <rect x="53" y="80" width="14" height="16" fill={C.bodyDeep} />
      <rect x="38" y="94" width="44" height="8" rx="4" fill={C.bodyDeep} />

      <rect x="14" y="16" width="92" height="66" rx="9" fill={C.body} />
      <rect x="21" y="23" width="78" height="46" rx="4" fill={C.screen} />

      {/* Code: two brackets, a slash, and three ragged lines. */}
      <g stroke={C.bodyDeep} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 36 L36 46 L44 56" />
        <path d="M76 36 L84 46 L76 56" />
      </g>
      <path d="M66 34 L54 58" stroke={C.accent} strokeWidth="3.4" strokeLinecap="round" />
      <rect x="29" y="62" width="16" height="3.4" rx="1.7" fill={C.dotGrey} />
      <rect x="49" y="62" width="10" height="3.4" rx="1.7" fill={C.dotGrey} />
      <rect x="63" y="62" width="4" height="3.4" rx="1.7" fill={C.accent} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * IT Consultation — a report with findings, read under a lens.
 * ------------------------------------------------------------------ */
export function SpotConsulting(props: Props) {
  return (
    <Frame {...props}>
      <circle cx="102" cy="22" r="5" fill={C.dotGrey} />
      <circle cx="16" cy="84" r="4.5" fill={C.dotGreen} />

      {/* The second sheet, peeking out behind. */}
      <rect x="40" y="12" width="46" height="76" rx="7" fill={C.bodyDeep} />
      <rect x="26" y="20" width="52" height="82" rx="7" fill={C.body} />

      {/* Findings: a heading rule, three lines, one flagged. */}
      <rect x="35" y="32" width="26" height="4.4" rx="2.2" fill={C.screen} />
      <rect x="35" y="45" width="34" height="3.6" rx="1.8" fill={C.screen} opacity="0.7" />
      <rect x="35" y="55" width="28" height="3.6" rx="1.8" fill={C.screen} opacity="0.7" />
      <rect x="35" y="65" width="34" height="3.6" rx="1.8" fill={C.screen} opacity="0.7" />

      {/* The lens — the recommendation you came for. */}
      <circle cx="78" cy="68" r="17" fill={C.screen} />
      <circle cx="78" cy="68" r="17" stroke={C.accent} strokeWidth="4.5" fill="none" />
      <path d="M90 80 L100 90" stroke={C.accent} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M71 68 l5 5 l10 -11" stroke={C.accent} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * Innovation Lab — a flask mid-reaction. The reagent is the coral.
 * ------------------------------------------------------------------ */
export function SpotLab(props: Props) {
  return (
    <Frame {...props}>
      <circle cx="18" cy="26" r="5" fill={C.dotGrey} />
      <circle cx="100" cy="86" r="4.5" fill={C.dotGreen} />

      <rect x="48" y="12" width="24" height="8" rx="4" fill={C.bodyDeep} />
      <path d="M52 20 h16 v24 l20 44 a7 7 0 0 1 -6.3 10 H38.3 a7 7 0 0 1 -6.3 -10 l20 -44 Z" fill={C.body} />
      {/* Liquid line, flat across the widest part. */}
      <path d="M41 70 h38 l8.7 18 a7 7 0 0 1 -6.3 10 H38.3 a7 7 0 0 1 -6.3 -10 Z" fill={C.bodyDeep} />

      {/* Bubbles rising out of the neck. */}
      <circle cx="52" cy="82" r="4" fill={C.screen} />
      <circle cx="66" cy="78" r="2.6" fill={C.screen} />
      <circle cx="60" cy="90" r="2" fill={C.screen} />

      <circle cx="60" cy="34" r="5.5" fill={C.accent} />
      <circle cx="60" cy="18" r="3.5" fill={C.accent} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * Smart Homes & Cameras — a house with a camera on the wall, watching.
 * ------------------------------------------------------------------ */
export function SpotSmartHome(props: Props) {
  return (
    <Frame {...props}>
      <circle cx="104" cy="24" r="5" fill={C.dotGrey} />
      <circle cx="16" cy="88" r="4.5" fill={C.dotGreen} />

      <path d="M60 14 L100 46 v50 a6 6 0 0 1 -6 6 H26 a6 6 0 0 1 -6 -6 V46 Z" fill={C.body} />
      {/* Shaded lower storey, so the house has a horizon of its own. */}
      <path d="M20 96 a6 6 0 0 0 6 6 h68 a6 6 0 0 0 6 -6 V76 H20 Z" fill={C.bodyDeep} />

      <rect x="36" y="54" width="18" height="15" rx="3.5" fill={C.screen} />
      <rect x="52" y="82" width="16" height="20" rx="2" fill={C.screen} />

      {/* Wall-mounted camera, angled down at the door. */}
      <g transform="rotate(18 82 54)">
        <rect x="68" y="47" width="26" height="14" rx="7" fill={C.accent} />
        <rect x="88" y="43" width="5" height="22" rx="2.5" fill={C.accent} />
        <circle cx="76" cy="54" r="4" fill={C.screen} />
      </g>
      <rect x="93" y="50" width="9" height="4" rx="2" fill={C.bodyDeep} />
    </Frame>
  );
}

export const spots = {
  software: SpotSoftware,
  consulting: SpotConsulting,
  lab: SpotLab,
  "smart-homes": SpotSmartHome,
} as const;
