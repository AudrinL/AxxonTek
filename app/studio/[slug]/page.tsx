import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { ConceptPoster } from "@/components/studio/ConceptPoster";
import { ConceptCard } from "@/components/studio/ConceptCard";
import { getStudioConcept, studioConcepts } from "@/lib/site";

export function generateStaticParams() {
  return studioConcepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const concept = getStudioConcept((await params).slug);
  if (!concept) return {};
  return {
    title: `${concept.industry} / ${concept.number}`,
    description: concept.blurb,
    alternates: { canonical: `/studio/${concept.slug}` },
  };
}

/**
 * A single concept. It opens into the direction itself and is honest about
 * what it is: where a live, explorable build exists it is embedded; until
 * then the poster stands in and the page says so plainly rather than faking
 * a screenshot. The whole page exists to end on one question, would you like
 * this made yours, and to make saying yes a single click.
 */
export default async function StudioConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const concept = getStudioConcept((await params).slug);
  if (!concept) notFound();

  const more = studioConcepts.filter((c) => c.slug !== concept.slug).slice(0, 3);

  return (
    <>
      <section data-chapter-ground="canvas" className="pt-40 pb-14 md:pt-48">
        <div className="container-x">
          <Link href="/studio" className="label mb-10 inline-flex hover:text-accent">
            <span className="label-dot" aria-hidden />
            Studio
          </Link>

          <p className="font-mono text-[0.75rem] tracking-[0.16em] text-accent uppercase">
            {concept.industry} / {concept.number} · {concept.style}
          </p>
          <h1 className="mt-4 text-display max-w-[18ch]">{concept.title}</h1>
          <p className="mt-6 max-w-[52ch] text-lede">{concept.blurb}</p>
        </div>
      </section>

      {/* The direction itself */}
      <section data-chapter-ground="canvas" className="pb-[var(--chapter)]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <Reveal>
              {concept.preview ? (
                <div className="window aspect-[16/10] w-full">
                  {/* A concept preview is third-party content, so it runs in a
                      locked-down frame: scripts and same-origin for the demo to
                      work, nothing else, and no referrer leakage. */}
                  <iframe
                    src={concept.preview}
                    title={`${concept.title} live preview`}
                    className="h-full w-full"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <ConceptPoster concept={concept} large />
              )}
            </Reveal>

            <Reveal delay={90}>
              <div className="lg:sticky lg:top-28">
                <p className="label mb-4">
                  <span className="label-dot" aria-hidden />
                  {concept.preview ? "Live preview" : "Live preview in progress"}
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-tone-mute">
                  {concept.preview
                    ? "Explore the concept as a real, working site. Everything you see can become yours, adapted to your brand, your content and your customers."
                    : "This is a designed direction, not a live site yet. We are building explorable previews for the Studio; in the meantime, tell us this is the direction you want and we will build it around your business."}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-card)] border border-line bg-line">
                  <Cell k="Industry" v={concept.industry} />
                  <Cell k="Style" v={concept.style} />
                </dl>

                <p className="mt-6 mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-tone-faint uppercase">
                  Built in
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {concept.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The ask */}
      <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden text-white">
        <span aria-hidden className="bloom-light -bottom-[22rem] -right-[14rem] opacity-55" />
        <div className="container-x">
          <Reveal>
            <p className="label mb-6">
              <span className="label-dot" aria-hidden />
              Like this direction?
            </p>
            <h2 className="text-chapter max-w-[18ch]">Start with this concept.</h2>
            <p className="mt-5 max-w-[46ch] text-lede text-white/80">
              We take this direction and make it yours: your brand, your content, your
              customers, on infrastructure we run. Tell us about your business and we
              will come back with a plan.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact?concept=${concept.slug}`}
                className="pill pill-ember hover:bg-ember-deep"
              >
                Request a custom version
                <Icon name="arrow" size={16} />
              </Link>
              <Link
                href="/studio"
                className="inline-flex h-[3.125rem] items-center rounded-full border border-line-firm px-7 text-[0.9375rem] font-semibold transition-colors duration-[var(--t-hover)] hover:border-white/70"
              >
                Keep browsing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More concepts */}
      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <p className="label mb-8">
            <span className="label-dot" aria-hidden />
            More directions
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
            {more.map((c) => (
              <ConceptCard key={c.slug} concept={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[var(--ground-veil)] p-5">
      <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-tone-faint uppercase">{k}</dt>
      <dd className="mt-1.5 text-[0.9375rem] font-medium text-tone">{v}</dd>
    </div>
  );
}
