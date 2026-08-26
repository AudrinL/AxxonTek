"use client";

import { Reveal } from "@/components/motion/Reveal";

export type LegalSection = {
  id?: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Narrow measure, generous leading — legal copy is meant to be read, so it
 * gets a proper reading column rather than the full page width.
 */
export function LegalBody({ sections, updated }: { sections: LegalSection[]; updated: string }) {
  return (
    <section className="pb-[clamp(6rem,13vw,11rem)]">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.32fr_1fr]">
          {/* Sticky contents rail */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow hairline-t mb-5 w-full pt-6">Contents</p>
            <ol className="flex flex-col gap-2.5">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#${section.id ?? slugify(section.heading)}`}
                    className="group flex gap-3 text-[0.8125rem] text-mute transition-colors hover:text-bone"
                  >
                    <span className="font-mono text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[0.75rem] text-faint">Last updated {updated}</p>
          </nav>

          <div className="max-w-2xl">
            {sections.map((section, i) => (
              <Reveal key={section.heading}>
                <div
                  id={section.id ?? slugify(section.heading)}
                  className="hairline-t scroll-mt-28 py-10 first:pt-0 first:border-t-0"
                >
                  <h2 className="mb-5 flex items-baseline gap-4 text-[1.375rem] tracking-tight">
                    <span className="font-mono text-[0.6875rem] text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-[0.9375rem] leading-[1.75] text-mute">
                        {p}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="mt-2 flex flex-col gap-2.5">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed text-mute"
                          >
                            <span
                              aria-hidden
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ember"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
