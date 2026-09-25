import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { products } from "@/lib/site";

/**
 * The products, on ink, because this is the register where the company
 * stops describing itself and shows the things it actually made and runs.
 * Dark is not decoration here: it is the rule that ink means a product or
 * the company's own voice, and these are both.
 *
 * Editorial, not portfolio. Each product leads with what it does for a
 * person, carries a live badge, and opens onto its own product page rather
 * than a case study, because a product we own is a product, not a job.
 */
export function FeaturedProducts() {
  return (
    <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden">
      <span aria-hidden className="bloom-light -top-[18rem] -right-[16rem] opacity-60" />

      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[24ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              We build our own
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">
                Products, not <span className="text-serif text-[#ffb98f]">prototypes</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[44ch]">
            <p className="text-lede">
              Both of these are live and used by people who have never heard of us.
              That is the whole test, and it is the reason to trust us with yours.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="window aspect-[16/10] w-full">
                  <Image
                    src={product.image}
                    alt={`${product.name} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-left-top transition-transform duration-[var(--t-reveal)] ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[1.75rem] font-semibold tracking-[-0.028em]">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
                      {product.tagline}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex flex-none items-center gap-2 rounded-full border border-line-firm px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-moss uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
                    {product.status}
                  </span>
                </div>

                <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-tone-mute">
                  {product.outcome}
                </p>

                <span className="mt-5 inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                  Explore {product.name}
                  <span aria-hidden className="transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1">
                    <Icon name="arrow" size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
