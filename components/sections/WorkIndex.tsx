import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { work, workCategories, hasShot } from "@/lib/work";

/**
 * The work index.
 *
 * Outcome first, technology second, in the same voice as the rest of the
 * site. Categories are shown as labels on each row rather than as a
 * filter: with a short list a filter is a control that mostly produces
 * empty states, and an empty state here costs credibility.
 */
export function WorkIndex() {
  return (
    <section data-chapter-ground="canvas" className="pb-[var(--chapter)]">
      <div className="container-x">
        <ul className="border-t border-line">
          {work.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={Math.min(i, 3) * 60}>
              <Link
                href={`/work/${item.slug}`}
                className="group grid items-center gap-x-10 gap-y-6 border-b border-line py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-[1.875rem] leading-[1.06] font-semibold tracking-[-0.03em] transition-colors duration-[var(--t-hover)] group-hover:text-accent md:text-[2.25rem]">
                      {item.name}
                    </h2>
                    {item.year && (
                      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
                        {item.year}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-tone-mute">
                    {item.summary}
                  </p>
                  <span className="mt-5 flex flex-wrap gap-1.5">
                    {workCategories
                      .filter((category) => category.id === item.category)
                      .map((category) => (
                        <span
                          key={category.id}
                          className="rounded-full border border-line-firm px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
                        >
                          {category.label}
                        </span>
                      ))}
                  </span>
                </div>

                {hasShot(item) && (
                  <div className="window aspect-[16/10] w-full">
                    <Image
                      src={item.shot}
                      alt={`${item.name} interface`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover object-left-top transition-transform duration-[var(--t-reveal)] ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
