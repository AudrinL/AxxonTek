import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { products } from "@/lib/site";

/**
 * Proof.
 *
 * The products return to the canvas, because they are the part of the
 * page a reader is most likely to scrutinise and dark panels make people
 * squint. Each one leads with what changed for the person using it
 * rather than with what it is built from, which is the same rule as
 * everywhere else on the site.
 *
 * The screenshots sit in windows: the frame is the thing that makes an
 * arbitrary image look deliberate, and it is the same frame the
 * Playground and Lab use.
 */
export function Proof() {
  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[22ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              Already running
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">Not prototypes. Products.</h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[44ch]">
            <p className="text-lede">
              Both of these started as questions in the Lab and both are now used
              by people who have never heard of us. That is the whole test.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 80}>
              <Link href={`/work/${product.slug}`} className="group block">
                <div className="window aspect-[16/10] w-full">
                  <Image
                    src={product.image}
                    alt={`${product.name} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-left-top transition-transform duration-[var(--t-reveal)] ease-out group-hover:scale-[1.015]"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[1.625rem] font-semibold tracking-[-0.026em]">
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
                  Read the case study
                  <span
                    aria-hidden
                    className="transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1"
                  >
                    &#8594;
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
