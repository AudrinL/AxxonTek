import Image from "next/image";
import type { StudioConcept } from "@/lib/site";

/**
 * A concept's picture. Where we have a designed screen for it, that screen;
 * otherwise a flat, quiet tile with the industry, honest that the
 * design is still coming. No gradients or glows, so the real screens are
 * always the brightest thing on the shelf.
 */
export function ConceptPoster({
  concept,
  className = "",
  large = false,
  priority = false,
}: {
  concept: StudioConcept;
  className?: string;
  large?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--r-card)] bg-surface-2 ${
        large ? "aspect-[16/11]" : "aspect-[4/3]"
      } ${className}`}
    >
      {concept.image ? (
        <Image
          src={concept.image}
          alt={`${concept.industry} website concept: ${concept.title}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 760px, 92vw" : "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <p
            className={`font-display font-semibold text-tone ${
              large ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.3125rem]"
            }`}
          >
            {concept.industry}
          </p>
          <p className="mt-2 text-[0.875rem] text-tone-faint">Preview coming soon</p>
        </div>
      )}
      <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[0.75rem] font-semibold text-white backdrop-blur-md">
        Concept
      </span>
    </div>
  );
}
