import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The technology AxxonTek builds and operates itself. Floow, a national parcel system for Rwanda, and TalentLens, reasoning assessment for hiring and practice.",
  alternates: { canonical: "/products" },
};

/**
 * Products, on ink from the first pixel. This is the page that makes
 * AxxonTek read as a technology company rather than an agency, so it opens
 * in the product register and stays there: the company showing the things
 * it owns, not the jobs it took.
 */
export default function ProductsPage() {
  return (
    <>
      <section
        data-chapter-ground="ink"
        className="bloom relative overflow-hidden pt-40 pb-[var(--chapter)] text-white md:pt-48"
      >
        <span aria-hidden className="bloom-light -top-[22rem] -right-[14rem] opacity-65" />
        <div className="container-x">
          <Reveal as="p" className="label mb-7">
            <span className="label-dot" aria-hidden />
            We build our own
          </Reveal>
          <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <Reveal delay={70}>
              <h1 className="text-display max-w-[14ch]">
                Products we build <span className="text-serif text-[#ffb98f]">and</span> run.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lede max-w-[44ch] text-white/80">
                Not client work. Technology we designed, own and operate ourselves,
                used every day by people who have never heard of us. It is how we
                learn what actually holds up, and it is the reason to trust us with
                yours.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-chapter-ground="ink" className="relative overflow-hidden pb-[var(--chapter)]">
        <div className="container-x flex flex-col gap-6">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={Math.min(i, 3) * 80}>
              <Link
                href={`/products/${product.slug}`}
                className="group grid items-center gap-x-12 gap-y-8 lg:grid-cols-2"
              >
                <div className={`window aspect-[16/10] w-full ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={product.image}
                    alt={`${product.name} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-left-top transition-transform duration-[var(--t-reveal)] ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-[-0.03em]">
                      {product.name}
                    </h2>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line-firm px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-moss uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
                    {product.tagline}
                  </p>
                  <p className="mt-5 max-w-[48ch] text-lede text-white/80">{product.outcome}</p>
                  <span className="mt-7 inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                    Explore {product.name}
                    <span aria-hidden className="transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1">
                      <Icon name="arrow" size={15} />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="mt-8 flex flex-col items-start gap-6 rounded-[var(--r-card)] border border-line p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
                  Next
                </p>
                <p className="mt-2 max-w-[40ch] text-lede text-white/80">
                  More products are in the Lab. The ones that survive real use become
                  the next entries here.
                </p>
              </div>
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Build one with us
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
