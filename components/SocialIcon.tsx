import type { SVGProps } from "react";

/**
 * Line icons for the social links, drawn on the same 24px grid and stroke
 * weight as the rest of the icon set so the row looks like one family. They
 * are simplified glyphs rather than the platforms' full logos.
 */
export type SocialName = "Instagram" | "X" | "LinkedIn" | "YouTube" | "GitHub";

export function SocialIcon({
  name,
  size = 18,
  ...props
}: SVGProps<SVGSVGElement> & { name: SocialName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {name === "Instagram" && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.9" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "X" && (
        <>
          <path d="M4.5 4.5h3.6l11.4 15h-3.6L4.5 4.5Z" />
          <path d="M19 4.5l-6.2 7M5 19.5l6.2-7" />
        </>
      )}
      {name === "LinkedIn" && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8 10.5v6" />
          <circle cx="8" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
          <path d="M12 16.5v-6m0 3c0-1.7 1.1-2.7 2.5-2.7s2 1 2 2.7v3" />
        </>
      )}
      {name === "YouTube" && (
        <>
          <rect x="2.75" y="5.5" width="18.5" height="13" rx="4" />
          <path d="M10.2 9.4v5.2l4.5-2.6-4.5-2.6Z" />
        </>
      )}
      {name === "GitHub" && (
        <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3a2.6 2.6 0 0 0-.7-2c2.5-.3 5.2-1.2 5.2-5.5a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.1 1.2a10.7 10.7 0 0 0-5.6 0C6.9 3.7 5.9 4 5.9 4a4 4 0 0 0-.1 3 4.3 4.3 0 0 0-1.2 3c0 4.3 2.7 5.2 5.2 5.5a2.6 2.6 0 0 0-.7 2V21" />
      )}
    </svg>
  );
}
