import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The logo.
 *
 * This is the supplied lockup exactly as designed: the mark, the divider,
 * the name and the tagline "Think Beyond Tomorrow", white on transparent,
 * so it sits straight on the black site. Nothing is redrawn or retyped, so
 * the brand is always the real artwork. The source is 1000 by 300.
 *
 * The tagline is part of the artwork, which means it is only legible when
 * the logo is big enough. In the nav it is a quiet detail, and in the
 * footer, where the logo is larger, it reads clearly.
 */
export function Logo({
  className = "",
  compact = false,
  large = false,
}: {
  className?: string;
  /** Shrinks the logo slightly once the page has scrolled. */
  compact?: boolean;
  /** The bigger size used in the footer. */
  large?: boolean;
}) {
  const height = large ? "h-20" : compact ? "h-10" : "h-12";

  return (
    <Link
      href="/"
      aria-label={`${site.name}, ${site.tagline}. Home`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/assets/logo.png"
        alt=""
        width={1000}
        height={300}
        priority
        className={`w-auto transition-[height] duration-300 ${height}`}
      />
    </Link>
  );
}
