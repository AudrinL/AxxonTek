import Link from "next/link";
import { ConceptPoster } from "@/components/studio/ConceptPoster";
import type { StudioConcept } from "@/lib/site";

/**
 * A linked concept: the picture, then the industry and name, with the same
 * caption style as the homepage's Inspiration section. Defined once so the
 * gallery and the "more designs" strip always match.
 */
export function ConceptCard({ concept }: { concept: StudioConcept }) {
  return (
    <Link href={`/studio/${concept.slug}`} className="group block">
      <ConceptPoster
        concept={concept}
        className="transition-transform duration-[var(--t-base)] ease-out group-hover:-translate-y-1"
      />
      <div className="mt-4">
        <p className="text-[0.75rem] text-tone-faint transition-colors duration-[var(--t-hover)] group-hover:text-accent">
          {concept.industry} &middot; {concept.style}
        </p>
        <h3 className="mt-1.5 font-display text-[1.3125rem] font-semibold leading-[1.19]">
          {concept.title}
        </h3>
      </div>
    </Link>
  );
}
