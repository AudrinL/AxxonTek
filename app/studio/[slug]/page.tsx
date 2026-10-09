import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, RowHead, Section, Tag } from "@/components/system/Page";
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
    title: concept.title,
    description: concept.blurb,
    alternates: { canonical: `/studio/${concept.slug}` },
  };
}

/**
 * One design. The name and what it does, the design itself, what is built
 * in, and a single clear next step: ask for your own version.
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
      <PageHero
        label={`${concept.industry} · ${concept.style}`}
        title={concept.title}
        lede={concept.blurb}
        primary={{ href: `/contact?concept=${concept.slug}`, text: "Get this design" }}
        secondary={{ href: "/studio", text: "Browse all designs" }}
      >
        <div className="mx-auto max-w-[64rem]">
          {concept.preview ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--r-card)] bg-surface-2 sm:aspect-[16/10]">
              {/* A preview is third-party content, so it runs in a locked-down
                  frame: scripts and same-origin for the demo, nothing else. */}
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
            <ConceptPoster concept={concept} large priority />
          )}
        </div>
      </PageHero>

      <Section alt>
        <div className="mx-auto grid max-w-[52rem] gap-10 md:grid-cols-2">
          <Reveal>
            <p className="label mb-3">What is built in</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {concept.features.map((f) => (
                <Tag key={f}>{f}</Tag>
              ))}
            </div>
          </Reveal>
          <Reveal delay={70}>
            <p className="label mb-3">How it works</p>
            <p className="mt-2 text-[1.0625rem] leading-[1.47] text-tone-mute">
              We take this design and make it yours: your brand, your content, your customers.
              Then we host it and look after it for you.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <RowHead title="More designs." link={{ href: "/studio", text: "See all designs" }} />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((c) => (
            <ConceptCard key={c.slug} concept={c} />
          ))}
        </div>
      </Section>

      <CloseAsk
        title="Like this design?"
        lede="Tell us about your business and we will build your version."
        primary={{ href: `/contact?concept=${concept.slug}`, text: "Get this design" }}
      />
    </>
  );
}
