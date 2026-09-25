"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ConceptPoster } from "@/components/studio/ConceptPoster";
import {
  studioCategories,
  studioConcepts,
  studioStyles,
  type StudioStyle,
} from "@/lib/site";

/**
 * The browsable shelf. Two filters, industry and style, applied together.
 * Everything is client-side because the set is small and instant filtering
 * is the whole point: a visitor who does not know what they want should be
 * able to flick through directions with no page loads.
 */
export function StudioGallery() {
  const [industry, setIndustry] = useState<string>("All");
  const [style, setStyle] = useState<StudioStyle | "All">("All");

  const shown = useMemo(
    () =>
      studioConcepts.filter(
        (c) =>
          (industry === "All" || c.industry === industry) &&
          (style === "All" || c.style === style)
      ),
    [industry, style]
  );

  return (
    <div>
      {/* Industry filter */}
      <div className="flex flex-wrap gap-2">
        {studioCategories.map((cat) => (
          <FilterPill key={cat} active={industry === cat} onClick={() => setIndustry(cat)}>
            {cat}
          </FilterPill>
        ))}
      </div>

      {/* Style filter */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.625rem] tracking-[0.14em] text-tone-faint uppercase">
          Style
        </span>
        <FilterPill active={style === "All"} onClick={() => setStyle("All")} small>
          All
        </FilterPill>
        {studioStyles.map((s) => (
          <FilterPill key={s} active={style === s} onClick={() => setStyle(s)} small>
            {s}
          </FilterPill>
        ))}
      </div>

      {/* Count */}
      <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase">
        {shown.length} {shown.length === 1 ? "concept" : "concepts"}
      </p>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
          {shown.map((concept) => (
            <Link key={concept.slug} href={`/studio/${concept.slug}`} className="group block">
              <ConceptPoster
                concept={concept}
                className="transition-transform duration-[var(--t-base)] ease-out group-hover:-translate-y-1.5"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                  {concept.industry} / {concept.number}
                </p>
                <p className="font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase">
                  View concept
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-lede">
          No concept in that combination yet. The shelf grows every month, and we
          can build one to order in the meantime.
        </p>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border transition-colors duration-[var(--t-hover)] ${
        small ? "px-3 py-1.5 text-[0.75rem]" : "px-4 py-2 text-[0.875rem]"
      } ${
        active
          ? "border-transparent bg-ink text-canvas"
          : "border-line-firm text-tone-mute hover:border-tone hover:text-tone"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
