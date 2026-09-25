import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { getProductDetail, productDetails, products } from "@/lib/site";

export function generateStaticParams() {
  return productDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const detail = getProductDetail(slug);
  const product = products.find((p) => p.slug === slug);
  if (!detail || !product) return {};
  return {
    title: product.name,
    description: detail.line,
    alternates: { canonical: `/products/${slug}` },
  };
}

/**
 * A product page, closer to a startup's own site than a case study, and on
 * ink the whole way because a product we own is the company speaking in its
 * own voice. The arc is fixed: the line, the problem, how it works, the two
 * people it serves, the technology, the vision, the ask.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const detail = getProductDetail(slug);
  const product = products.find((p) => p.slug === slug);
  if (!detail || !product) notFound();

  const other = products.find((p) => p.slug !== slug);

  return (
    <div data-chapter-ground="ink" className="text-white">
      {/* Hero */}
      <section className="bloom relative overflow-hidden pt-40 pb-[var(--chapter)] md:pt-48">
        <span aria-hidden className="bloom-light -top-[20rem] -left-[14rem] opacity-65" />
        <div className="container-x">
          <Link href="/products" className="label mb-10 inline-flex hover:text-accent">
            <span className="label-dot" aria-hidden />
            Products
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.038em]">
              {product.name}
            </h1>
            <span className="mb-2 inline-flex items-center gap-2 self-end rounded-full border border-line-firm px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-moss uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
              {product.status}
            </span>
          </div>

          <Reveal delay={90}>
            <p className="mt-6 max-w-[34ch] text-[clamp(1.25rem,2.4vw,1.875rem)] font-display leading-[1.15] tracking-[-0.02em] text-white/90">
              {detail.line}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="window mt-14 aspect-[16/9] w-full">
              <Image
                src={product.image}
                alt={`${product.name} interface`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-left-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <Chapter>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <SectionLabel n="01">{detail.problem.heading}</SectionLabel>
          <Reveal>
            <p className="text-[clamp(1.25rem,2vw,1.625rem)] font-display leading-[1.28] tracking-[-0.015em] text-white/85">
              {detail.problem.body}
            </p>
          </Reveal>
        </div>
      </Chapter>

      {/* How it works */}
      <Chapter>
        <SectionLabel n="02">{detail.how.heading}</SectionLabel>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {detail.how.steps.map((step, i) => (
            <Reveal as="div" key={step.title} delay={i * 70} className="h-full">
              <div className="card h-full p-7">
                <p className="font-mono text-[0.75rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* Audiences */}
      <Chapter>
        <SectionLabel n="03">Two sides, one system</SectionLabel>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {detail.audiences.map((a, i) => (
            <Reveal as="div" key={a.label} delay={i * 80} className="h-full">
              <div className="card h-full p-8 md:p-10">
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                  {a.label}
                </p>
                <h3 className="mt-4 font-display text-[1.75rem] font-semibold tracking-[-0.026em]">
                  {a.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-tone-mute">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* Technology + Vision */}
      <Chapter>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <SectionLabel n="04">Technology</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.technology.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line-firm px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.1em] text-tone-mute uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel n="05">The vision</SectionLabel>
            <Reveal>
              <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-display leading-[1.18] tracking-[-0.02em]">
                {detail.vision}
              </p>
            </Reveal>
          </div>
        </div>
      </Chapter>

      {/* Close */}
      <section className="chapter-y">
        <div className="container-x flex flex-col items-start gap-8 rounded-[var(--r-card)] border border-line p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="max-w-[20ch] font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Want something like {product.name} for your organisation?
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
              Start a project
              <Icon name="arrow" size={16} />
            </Link>
            {other && (
              <Link
                href={`/products/${other.slug}`}
                className="inline-flex h-[3.125rem] items-center rounded-full border border-line-firm px-7 text-[0.9375rem] font-semibold transition-colors duration-[var(--t-hover)] hover:border-white/70"
              >
                See {other.name}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Chapter({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-x">{children}</div>
    </section>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <Reveal as="div">
      <p className="label mb-3">
        <span className="label-dot" aria-hidden />
        {n}
      </p>
      <h2 className="text-chapter max-w-[16ch]">{children}</h2>
    </Reveal>
  );
}
