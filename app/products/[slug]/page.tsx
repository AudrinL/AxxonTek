import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/system/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CloseAsk, RowHead, Section, StoryHead, Strong, Tag, Tile } from "@/components/system/Page";
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
 * A product page in Apple's order: the name and the one line, the product
 * itself, then the problem, how it works, who it serves, what it is built
 * on, and where it is going.
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
    <>
      <PageHero
        label={product.name}
        title={detail.line}
        primary={
          detail.url
            ? { href: detail.url, text: `Open ${product.name}` }
            : { href: "/contact", text: "Talk to us" }
        }
        secondary={other ? { href: `/products/${other.slug}`, text: `See ${other.name}` } : undefined}
      >
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[64rem] overflow-hidden rounded-[var(--r-card)] bg-surface-2">
          <Image
            src={product.image}
            alt={`${product.name} interface`}
            fill
            priority
            sizes="(min-width: 1100px) 1024px, 92vw"
            className="object-cover object-left-top"
          />
        </div>
      </PageHero>

      <Section alt>
        <StoryHead
          label="The problem"
          title={detail.problem.heading}
          lede={<Strong>{detail.problem.body}</Strong>}
        />
      </Section>

      <Section>
        <RowHead title={detail.how.heading} />
        <ol className="grid gap-5 md:grid-cols-3">
          {detail.how.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 70} className="h-full">
              <Tile>
                <p className="text-[1.0625rem] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-10 font-display text-[1.5rem] font-semibold leading-[1.17]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{step.body}</p>
              </Tile>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section alt>
        <RowHead title="Who it is for." />
        <div className="grid gap-5 md:grid-cols-2">
          {detail.audiences.map((a, i) => (
            <Reveal key={a.label} delay={i * 70} className="h-full">
              <Tile>
                <p className="text-[1.0625rem] font-semibold text-accent">{a.label}</p>
                <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.14]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{a.body}</p>
              </Tile>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <p className="label mb-3">Built with</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {detail.technology.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
          <Reveal delay={70}>
            <p className="label mb-3">Where it is going</p>
            <p className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.17]">
              {detail.vision}
            </p>
          </Reveal>
        </div>
      </Section>

      <CloseAsk
        title={`Want something like ${product.name}?`}
        lede="We can design, build and run a product like this for your organisation."
        secondary={other ? { href: `/products/${other.slug}`, text: `See ${other.name}` } : undefined}
      />
    </>
  );
}
