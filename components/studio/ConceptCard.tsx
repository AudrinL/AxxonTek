import Link from "next/link";
import { ConceptPoster } from "@/components/studio/ConceptPoster";
import type { StudioConcept } from "@/lib/site";

/**
 * A linked Studio concept: the poster plus its caption row, with the hover
 * lift. This is the one place the concept card is defined, so the teaser, the
 * gallery and the "more directions" strip all stay identical and a change to
 * the card is made once.
 */
export function ConceptCard({
  concept,
  large = false,
  trailing,
}: {
  concept: StudioConcept;
  large?: boolean;
  /** Optional right-aligned caption, e.g. a "View concept" affordance. */
  trailing?: React.ReactNode;
}) {
  return (
    <Link href={`/studio/${concept.slug}`} className="group block">
      <ConceptPoster
        concept={concept}
        large={large}
        className="transition-transform duration-[var(--t-base)] ease-out group-hover:-translate-y-1.5"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent">
          {concept.industry} / {concept.number}
        </p>
        {trailing && (
          <p className="font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase">
            {trailing}
          </p>
        )}
      </div>
    </Link>
  );
}
