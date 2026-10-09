"use client";

import { useMemo, useState } from "react";
import { ConceptCard } from "@/components/studio/ConceptCard";
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
        <span className="mr-1 text-[0.875rem] text-tone-faint">Style</span>
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
      <p className="mt-8 text-[0.875rem] text-tone-faint">
        {shown.length} {shown.length === 1 ? "design" : "designs"}
      </p>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-5 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((concept) => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-lede">
          No design matches both yet. Try another filter, or ask us to design one for you.
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
        small
          ? "px-3.5 py-2.5 text-[0.8125rem] lg:px-3 lg:py-1.5 lg:text-[0.75rem]"
          : "px-4 py-2.5 text-[0.875rem] lg:py-2"
      } ${
        active
          ? "border-transparent bg-white text-black"
          : "border-line-firm text-tone-mute hover:border-tone hover:text-tone"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
