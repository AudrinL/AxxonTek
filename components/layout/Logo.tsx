import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The wordmark.
 *
 * The mark is the original and is not being redesigned. What changed is
 * the text beside it: it now reads the full name. Previously the live
 * text was "xxon-Tek" and the mark was expected to supply the A, which
 * it cannot do at nav size, so the brand read as "xxon-Tek" on every
 * page. A mark sits beside a name. It does not work as a letter inside
 * one.
 *
 * It takes its colour from the ground, so it inverts with the chapter
 * rather than needing a second copy for dark.
 */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex items-center gap-2.5 text-tone transition-colors duration-[var(--t-ground)] ease-[var(--ease-gravity)] ${className}`}
    >
      <Image
        src="/assets/icon.png"
        alt=""
        width={36}
        height={36}
        priority
        className={`w-auto transition-all duration-300 ${compact ? "h-7" : "h-8"}`}
      />
      <span
        className={`font-display font-semibold tracking-[-0.03em] transition-all duration-300 ${
          compact ? "text-[1.0625rem]" : "text-[1.1875rem]"
        }`}
      >
        {site.name}
      </span>
    </Link>
  );
}
