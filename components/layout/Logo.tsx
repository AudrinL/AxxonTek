import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark: the orange "A" mark is an image, the rest of the name is live
 * text in `currentColor`. `inverted` turns the whole thing white for use
 * over the orange hero.
 */
export function Logo({
  className = "",
  compact = false,
  inverted = false,
}: {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex items-center gap-2 transition-colors duration-300 ${
        inverted ? "text-white" : "text-bone"
      } ${className}`}
    >
      <Image
        src="/assets/icon.png"
        alt=""
        width={36}
        height={36}
        priority
        className={`w-auto transition-all duration-300 ${compact ? "h-7" : "h-8"} ${
          inverted ? "brightness-0 invert" : ""
        }`}
      />
      <span
        className={`font-semibold tracking-[-0.03em] transition-all duration-300 ${
          compact ? "text-[1.125rem]" : "text-[1.25rem]"
        }`}
      >
        xxon<span className={inverted ? "text-white/70" : "text-ember"}>-</span>Tek
      </span>
    </Link>
  );
}
