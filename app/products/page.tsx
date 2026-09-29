import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, Section, Strong, TextLink } from "@/components/system/Page";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The products AxxonTek builds and runs itself: Floow, a national parcel system for Rwanda, and TalentLens, reasoning assessment for hiring and practice.",
  alternates: { canonical: "/products" },
};

/**
 * The products we own. Each one gets a full-width tile in Apple's product
 * style: status, name, one line, a text link, and the product itself below.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products"
        title={
          <>
            Products we build <span className="text-serif">and</span> run.
          </>
        }
        lede={
          <>
            <Strong>Not client work.</Strong> Technology we designed, own and operate
            ourselves, used every day.
          </>
        }
      />

      <Section alt>
        <ul className="flex flex-col gap-5">
          {products.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={Math.min(i, 2) * 70}>
              <Link
                href={`/products/${product.slug}`}
                className="group block overflow-hidden rounded-[var(--r-card)] bg-black"
              >
                <div className="px-8 pt-12 text-center md:px-12 md:pt-16">
                  <p className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-moss">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-moss" />
                    {product.status}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05]">
                    {product.name}
                  </h2>
                  <p className="text-lede mx-auto mt-4 max-w-[34ch]">{product.tagline}.</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] group-hover:underline">
                    Learn more about {product.name}
                    <span aria-hidden>&#8250;</span>
                  </span>
                </div>
                <div className="relative mx-auto mt-12 aspect-[16/9] w-[92%] overflow-hidden rounded-t-[1.25rem] md:w-[84%]">
                  <Image
                    src={product.image}
                    alt={`${product.name} interface`}
                    fill
                    sizes="(min-width: 1024px) 1060px, 92vw"
                    className="object-cover object-left-top transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={80}>
          <p className="mt-12 text-center text-[1.0625rem] text-tone-mute">
            More products are on the way from our Lab.{" "}
            <TextLink href="/lab">Visit the Lab</TextLink>
          </p>
        </Reveal>
      </Section>

      <CloseAsk
        title="Want a product like these?"
        lede="We can design, build and run one for your organisation."
      />
    </>
  );
}
