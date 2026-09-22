"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Rule } from "@/components/layout/Rule";
import { easeOutExpo } from "@/lib/motion";
import {
  hasShot,
  work,
  workCategories,
  type WorkCategory,
  type WorkItem,
} from "@/lib/work";

type Filter = WorkCategory | "all";

/**
 * The work index. A typed list, not a card grid: the project name is the
 * largest thing on the row, the metadata is mono, and the row separator is
 * the site's chevron seam — which fills ember as the row is pointed at.
 *
 * Hovering a row with a screenshot floats it beside the cursor. That is
 * the only place on the site where imagery is revealed rather than placed,
 * and it earns its keep: it lets the page stay a readable list at rest and
 * still show the work without sending anyone to a detail page first.
 *
 * Projects are not numbered. They are not a sequence — numbering them
 * would imply an order that does not exist.
 */
export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<WorkItem | null>(null);
  const reduced = useReducedMotion();

  const pointer = useRef({ x: 0, y: 0 });
  const [peek, setPeek] = useState({ x: 0, y: 0 });

  const shown = filter === "all" ? work : work.filter((w) => w.category === filter);

  const track = (e: React.MouseEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    setPeek(pointer.current);
  };

  return (
    <section className="section-y" onMouseMove={active ? track : undefined}>
      <div className="container-x">
        {/* Filters. Counts are real, so an empty category says so. */}
        <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <FilterButton
            label="All"
            count={work.length}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {workCategories.map((c) => (
            <FilterButton
              key={c.id}
              label={c.label}
              count={work.filter((w) => w.category === c.id).length}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            />
          ))}
        </div>

        <Rule />

        {shown.length === 0 ? (
          <p className="text-lede py-20">
            Nothing published in this category yet. The work exists — ask on a
            call and we will walk you through it.
          </p>
        ) : (
          <ul onMouseLeave={() => setActive(null)}>
            {shown.map((item) => (
              <li key={item.slug}>
                <Row item={item} onEnter={() => setActive(item)} />
                <Rule />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* The floating peek. Fixed, pointer-events-none, so it never blocks
          the row underneath it. Suppressed for reduced-motion visitors and
          for projects with no screenshot yet. */}
      <AnimatePresence>
        {active && hasShot(active) && !reduced && (
          <motion.div
            key={active.slug}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-40 hidden w-[26rem] lg:block"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            style={{ x: peek.x + 32, y: peek.y - 140 }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-deep">
              <Image
                src={active.shot}
                alt=""
                fill
                sizes="26rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`label flex items-baseline gap-2 transition-colors duration-300 hover:text-body ${
        active ? "text-ember-text" : ""
      }`}
    >
      {label}
      <span className="text-[0.625rem] opacity-60">{count}</span>
    </button>
  );
}

/**
 * One row. The whole row is the link; the seam above it is what lights up,
 * which is handled by the group-hover rule on the rule that follows it in
 * the list markup (see `peer`-free approach below — the rule is a sibling,
 * so the row sets a data attribute the CSS variable reads).
 */
function Row({ item, onEnter }: { item: WorkItem; onEnter: () => void }) {
  const category = workCategories.find((c) => c.id === item.category);

  return (
    <Link
      href={`/work/${item.slug}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-8 transition-colors duration-500 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto_auto] md:py-10"
    >
      <h3 className="text-[clamp(1.75rem,3.4vw,2.875rem)] leading-none transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
        <span className="transition-colors duration-500 group-hover:text-ember-text-text">
          {item.name}
        </span>
      </h3>

      <p className="max-w-lg text-[0.9375rem] leading-relaxed text-mute">
        {item.summary}
      </p>

      <span className="label md:text-right">{category?.label}</span>

      <span className="label flex items-center gap-4 md:justify-end">
        {item.year}
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-ember-text-text">
          &#8594;
        </span>
      </span>
    </Link>
  );
}
