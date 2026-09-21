import { AFRICA, HUBS, MADAGASCAR, project } from "./africa-geo";

const toPath = (poly: [number, number][]) =>
  poly
    .map(([lon, lat], i) => {
      const { x, y } = project(lon, lat);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${(-y).toFixed(2)}`;
    })
    .join(" ") + "Z";

const AFRICA_PATH = toPath(AFRICA);
const MADAGASCAR_PATH = toPath(MADAGASCAR);
const KIGALI = project(HUBS[0].lon, HUBS[0].lat);

/**
 * The continent as a flat dotted silhouette, in the same projection as the
 * WebGL scene. It is in the server HTML so the hero is never empty: on the
 * "off" tier it is the visual; otherwise it shows until the scene's first
 * frame and fades out underneath it. No JavaScript, one path, one pattern.
 */
export function AfricaStatic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-6.2 -6.2 12.4 12.4"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <pattern id="africa-dots" width="0.28" height="0.28" patternUnits="userSpaceOnUse">
          <circle cx="0.14" cy="0.14" r="0.055" fill="var(--color-faint)" opacity="0.75" />
        </pattern>
      </defs>
      <g transform="rotate(-6)">
        <path d={AFRICA_PATH} fill="url(#africa-dots)" />
        <path d={MADAGASCAR_PATH} fill="url(#africa-dots)" />
        {HUBS.slice(1).map((h) => {
          const { x, y } = project(h.lon, h.lat);
          return <circle key={h.name} cx={x} cy={-y} r="0.11" fill="var(--color-ember)" />;
        })}
        <circle cx={KIGALI.x} cy={-KIGALI.y} r="0.17" fill="var(--color-ember)" />
        <circle
          cx={KIGALI.x}
          cy={-KIGALI.y}
          r="0.5"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="0.04"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
