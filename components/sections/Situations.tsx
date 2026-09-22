import Link from "next/link";
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
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="max-w-[62ch]">
          <Reveal as="p" className="label mb-6">
            <span className="label-dot" aria-hidden />
            Where we come in
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-chapter max-w-[16ch]">
              You already know what is not working.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-lede mt-6">
              Find yours below. If none of them fit, describe the problem on a call
              and we will tell you honestly whether it is one we should take.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation, i) => (
            <Reveal
              as="li"
              key={situation.said}
              delay={(i % 3) * 70}
              className="h-full"
            >
              <Link
                href={situation.href}
                className="card group flex h-full flex-col p-7 transition-[transform,border-color] duration-[var(--t-base)] ease-out hover:-translate-y-0.5 hover:border-line-firm"
              >
                <p className="font-display text-[1.1875rem] leading-[1.24] font-semibold tracking-[-0.02em]">
                  {situation.said}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-tone-mute">
                  {situation.answer}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                  <span className="flex flex-wrap gap-1.5">
                    {situation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line-firm px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
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
      </div>
    </section>
  );
}
