import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InkPanel, Rule } from "@/components/layout/Rule";
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
    title: item.name,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
  };
}

/**
 * A case study. Deliberately short: what it is, what we did, and the work
 * itself. The `study` block only renders when there is something true to
 * put in it, so a project can go live the day it ships and gain its
 * write-up later without the page looking unfinished.
 */
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getWorkItem((await params).slug);
  if (!item) notFound();

  const category = workCategories.find((c) => c.id === item.category);

  return (
    <>
      <header className="container-x pt-40 pb-16 md:pt-48">
        <Link href="/work" className="label mb-10 inline-block hover:text-accent">
          &#8592; All work
        </Link>

        <h1 className="text-display max-w-[14ch]">{item.name}</h1>

        <p className="text-lede mt-8 max-w-xl">{item.summary}</p>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-y-8 md:grid-cols-4">
          <Meta term="Client" value={item.nda ? `${item.client} (under NDA)` : item.client} />
          <Meta term="Category" value={category?.label ?? ""} />
          <Meta term="Year" value={String(item.year)} />
          <Meta
            term="Live"
            value={
              item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Visit &#8599;
                </a>
              ) : (
                "Not public"
              )
            }
          />
        </dl>
      </header>

      {hasShot(item) && (
        <div className="container-x pb-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-deep">
            <Image
              src={item.shot}
              alt={`${item.name} interface`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 88rem"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <InkPanel className="section-y">
        <div className="container-x grid gap-x-16 gap-y-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <div>
            <p className="label text-on-ink-mute">
              What we did
            </p>
          </div>
          <ul className="max-w-2xl">
            {item.scope.map((line) => (
              <li key={line}>
                <Rule tone="ink" />
                <span className="block py-5 text-[1.0625rem]">{line}</span>
              </li>
            ))}
            <Rule tone="ink" />
          </ul>
        </div>

        {item.study && (
          <div className="container-x mt-20 grid gap-x-16 gap-y-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <p className="label text-on-ink-mute">
              The story
            </p>
            <div className="max-w-2xl space-y-10">
              <Passage heading="The problem" body={item.study.problem} />
              <Passage heading="What we did" body={item.study.approach} />
              <Passage heading="Where it landed" body={item.study.outcome} />
            </div>
          </div>
        )}
      </InkPanel>

      <section className="section-y">
        <div className="container-x">
          <h2 className="text-heading max-w-[16ch]">
            Want something like this for your business?
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-ember-deep px-8 py-4 font-medium text-white transition-colors duration-300 hover:bg-ember-deep"
          >
            Book a call
            <span aria-hidden>&#8594;</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function Meta({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="label mb-2">{term}</dt>
      <dd className="text-[0.9375rem]">{value}</dd>
    </div>
  );
}

function Passage({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h3 className="mb-3 text-[1.25rem]">{heading}</h3>
      <p className="text-[1.0625rem] leading-relaxed text-on-ink-mute">
        {body}
      </p>
    </div>
  );
}
