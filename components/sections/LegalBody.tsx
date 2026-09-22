import { Reveal } from "@/components/system/Reveal";

export type LegalSection = {
  /** Optional stable anchor. Falls back to a slug of the heading. */
  id?: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Long-form legal copy. Narrow measure, generous leading, headings that
 * are findable by eye, and a sticky contents list on wide screens so a
 * reader can get to the clause they came for.
 */
export function LegalBody({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <section data-chapter-ground="canvas" className="chapter-y">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-5">
              <span className="label-dot" aria-hidden />
              Contents
            </p>
            <ol className="flex flex-col gap-2.5">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${section.id ?? slug(section.heading)}`}
                    className="text-[0.875rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-accent"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-line pt-5 font-mono text-[0.625rem] tracking-[0.12em] text-tone-faint uppercase">
              Updated {updated}
            </p>
          </aside>

          <div className="max-w-[66ch]">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i, 3) * 50}>
                <div className="mb-12 scroll-mt-28" id={section.id ?? slug(section.heading)}>
                  <h2 className="mb-4 font-display text-[1.5rem] font-semibold tracking-[-0.024em]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mb-4 leading-relaxed text-tone-mute"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {section.list.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-tone-mute">
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 flex-none rounded-full bg-ember"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const slug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
