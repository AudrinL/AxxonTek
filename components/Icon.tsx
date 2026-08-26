import type { SVGProps } from "react";

/**
 * Line-icon set. Single stroke weight, 24px grid — replaces the emoji the
 * original site used, which rendered inconsistently across platforms.
 */
const paths: Record<string, string> = {
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  check: "M4 12.5l5 5L20 6.5",
  handshake: "M8 13l3 3 2-2 3 3M3 10l4-4 3 2h4l3-2 4 4-4 8H7l-4-8z",
  brain: "M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8V15a3 3 0 003 3h1V4H9zm6 0a3 3 0 013 3 3 3 0 011 5.8V15a3 3 0 01-3 3h-1V4h0z",
  clipboard: "M9 4h6v3H9V4zM7 5.5H6a2 2 0 00-2 2V19a2 2 0 002 2h12a2 2 0 002-2V7.5a2 2 0 00-2-2h-1M8.5 12h7M8.5 16h4",
  loop: "M4 9h11a4 4 0 010 8h-2m7-2h-11a4 4 0 010-8h2M6 6L3 9l3 3m12 3l3 3-3 3",
  chart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zm5.5-1.5L21 21",
  gear: "M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M19.4 13a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2v.2a2 2 0 11-4 0v-.1a1.7 1.7 0 00-3-1.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.7 1.7 0 004.6 13H4.4a2 2 0 110-4h.1a1.7 1.7 0 001.3-3l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 003-1.3V1.8a2 2 0 114 0v.1a1.7 1.7 0 003 1.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 001.2 2.9h.2a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  camera: "M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zm8 9.5a4 4 0 100-8 4 4 0 000 8z",
  lock: "M7 10V7a5 5 0 0110 0v3M5.5 10h13a1 1 0 011 1v9a1 1 0 01-1 1h-13a1 1 0 01-1-1v-9a1 1 0 011-1zm6.5 5v2",
  alert: "M12 3l9 16H3l9-16zm0 6v4.5m0 3v.5",
  network: "M12 8V5m0 3a3 3 0 100 6 3 3 0 000-6zm0 6v3m-7 4h4v-4H5v4zm10 0h4v-4h-4v4zM7 17v-2h10v2",
  server: "M4 5h16v5H4V5zm0 9h16v5H4v-5zm3.5-6.5h.01M7.5 16.5h.01",
  tools: "M14.5 6.5a3.5 3.5 0 004.7 3.3l-9 9a2.1 2.1 0 01-3-3l9-9a3.5 3.5 0 00-1.7-.3zM6 6l3 3M4.5 9.5l3-3",
  cloud: "M7 18a4 4 0 01-.5-8 5.5 5.5 0 0110.6-1.4A4 4 0 0117 18H7z",
  puzzle: "M10 4h4v2a2 2 0 104 0h2v4h-2a2 2 0 100 4h2v4h-4v-2a2 2 0 10-4 0v2H6v-4h2a2 2 0 100-4H6V6h4V4z",
  growth: "M4 19l5-5 3.5 3.5L20 10m0 0h-4.5M20 10v4.5",
  bulb: "M9.5 18h5m-4.5 3h4M12 3a6 6 0 00-3.5 10.9c.6.5.9 1.2.9 1.9V16h5.2v-.2c0-.7.3-1.4.9-1.9A6 6 0 0012 3z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.4 3.8-5.4 3.8-9S14.5 5.4 12 3c-2.5 2.4-3.8 5.4-3.8 9s1.3 6.6 3.8 9zM3.5 9h17m-17 6h17",
  microscope: "M10 6l4 6m-6.5-2.5l4.5 3M6 20h13M8 20a5 5 0 019.5-2.2M12.5 4.5l1.7-1 2.5 4-1.7 1",
  users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm7.5.5a3 3 0 100-6 3 3 0 000 6zM3 20v-1.5A4.5 4.5 0 017.5 14h3a4.5 4.5 0 014.5 4.5V20m2-6a4 4 0 014 4v2",
};

type IconProps = SVGProps<SVGSVGElement> & { name: string; size?: number };

export function Icon({ name, size = 22, ...props }: IconProps) {
  const d = paths[name] ?? paths.target;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={d} />
    </svg>
  );
}
