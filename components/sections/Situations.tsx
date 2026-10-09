import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/system/Reveal";
import { situations } from "@/lib/site";

/**
 * Six situations, written in the visitor's own words.
 *
 * This is the section that replaces the service catalogue. A catalogue
 * asks the reader to translate what they need into our vocabulary and
 * then compare us on price. A list of situations lets them recognise
 * themselves in about ten seconds, which is the only thing this part of
 * the page has to achieve.
 *
 * The technology is named last, in the tags, and never in the sentence
 * the reader identifies with.
 */
export function Situations() {
  return (
    <section data-chapter-ground="ink" className="chapter-y relative">
      <div className="container-x">
        <Reveal className="section-row">
          <h2 className="text-chapter">
            Our <span className="text-serif">solutions</span>.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] hover:underline"
          >
            Talk to us
            <span aria-hidden className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5">
              <Icon name="arrow" size={15} />
            </span>
          </Link>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation, i) => (
            <Reveal
              as="li"
              key={situation.said}
              delay={(i % 3) * 70}
              className="h-full"
            >
              <Link
                href={situation.href}
                className="card group flex h-full flex-col p-6 sm:p-8 lg:p-10 transition-[transform,border-color] duration-[var(--t-base)] ease-out hover:-translate-y-0.5 hover:border-line-firm"
              >
                <p className="font-display text-[1.3125rem] leading-[1.19] font-semibold tracking-[0.011em]">
                  {situation.said}
                </p>
                <p className="mt-4 text-[1.0625rem] leading-[1.47] text-tone-mute">
                  {situation.answer}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                  <span className="flex flex-wrap gap-1.5">
                    {situation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-2 px-3 py-1 text-[0.75rem] leading-4 tracking-[-0.01em] text-tone-mute"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={80}>
          <p className="mt-12 text-[0.875rem] leading-5 text-tone-faint">
            Do not see your problem here? Tell us about it and we will say honestly whether we can help.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
