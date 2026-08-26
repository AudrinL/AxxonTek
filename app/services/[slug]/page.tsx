import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService, services } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.lede,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.lede },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lede={service.lede}
        action={{ label: service.cta, href: "/contact" }}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <Statement
        label={service.introLabel}
        heading={service.introHeading}
        body={service.introBody}
        image={service.image}
        imageAlt={service.title}
      />

      <FeatureGrid heading={service.pillarsTitle} features={service.pillars} />

      {/* Cross-links keep every service one click from every other. */}
      <section className="section-y pt-0">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow hairline-t mb-8 w-full pt-8">Other services</p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-ink p-6 transition-colors duration-500 hover:bg-ink-raised"
                >
                  <span className="text-[0.6875rem] font-medium tracking-[0.18em] text-faint uppercase">
                    {other.eyebrow}
                  </span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="text-[1.0625rem] leading-tight tracking-tight text-mute transition-colors duration-300 group-hover:text-bone">
                      {other.title}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-faint transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-ember"
                    >
                      <path
                        d="M7 17L17 7m0 0H8m9 0v9"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pb-[clamp(6rem,13vw,11rem)]">
        <CtaBanner
          heading={service.closing}
          action={{ label: "Talk to us", href: "/contact" }}
          secondary={{ label: "About AxxonTek", href: "/about" }}
        />
      </div>
    </>
  );
}
