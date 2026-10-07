import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, RowHead, Section, StoryHead, Strong, Tile } from "@/components/system/Page";
import { getWorkItem, hasShot, work, workCategories } from "@/lib/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = getWorkItem((await params).slug);
  if (!item) return {};
  return {
    title: `${item.name} case study`,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
  };
}

/**
 * A case study, kept short: what it is, the facts, what we did, and the
 * story once there is something true to tell. A project can go live the day
 * it ships and gain its write-up later without the page looking unfinished.
 */
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getWorkItem((await params).slug);
  if (!item) notFound();

  const category = workCategories.find((c) => c.id === item.category);
  const facts = [
    { k: "Client", v: item.nda ? `${item.client} (name withheld)` : item.client },
    { k: "Category", v: category?.label ?? "" },
    { k: "Year", v: String(item.year) },
  ];

  return (
    <>
      <PageHero
        label="Case study"
        title={item.name}
        lede={item.summary}
        primary={item.url ? { href: item.url, text: `Visit ${item.name}` } : undefined}
        secondary={{ href: "/work", text: "All work" }}
      >
        {hasShot(item) && (
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[64rem] overflow-hidden rounded-[var(--r-card)] bg-surface-2">
            <Image
              src={item.shot}
              alt={`${item.name} interface`}
              fill
              priority
              sizes="(min-width: 1100px) 1024px, 92vw"
              className="object-cover object-left-top"
            />
          </div>
        )}
      </PageHero>

      <Section alt>
        <dl className="mx-auto grid max-w-[52rem] grid-cols-2 gap-y-8 md:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[0.875rem] text-tone-faint">{f.k}</dt>
              <dd className="mt-1 font-display text-[1.3125rem] font-semibold">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <RowHead title="What we did." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {item.scope.map((line, i) => (
            <Reveal as="li" key={line} delay={(i % 4) * 60} className="h-full">
              <Tile>
                <p className="text-[1.0625rem] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-8 font-display text-[1.3125rem] font-semibold leading-[1.19]">
                  {line}
                </p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      {item.study && (
        <Section alt>
          <StoryHead
            label="The story"
            title="From problem to launch."
            lede={<Strong>{item.study.problem}</Strong>}
          >
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-[1.3125rem] font-semibold">What we did</h3>
                <p className="mt-2 text-[1.0625rem] leading-[1.47] text-tone-mute">{item.study.approach}</p>
              </div>
              <div>
                <h3 className="font-display text-[1.3125rem] font-semibold">Where it landed</h3>
                <p className="mt-2 text-[1.0625rem] leading-[1.47] text-tone-mute">{item.study.outcome}</p>
              </div>
            </div>
          </StoryHead>
        </Section>
      )}

      <CloseAsk
        title="Want something like this?"
        lede="Tell us what you need and we will build it with you."
        secondary={{ href: "/work", text: "See all work" }}
      />
    </>
  );
}
