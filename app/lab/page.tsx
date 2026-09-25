import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "The Lab builds virtual laboratories so schools across Africa can teach practical science without a building, and turns the ideas that survive into products it runs.",
  alternates: { canonical: "/lab" },
};

const routes = [
  {
    k: "Route one",
    name: "Virtual reality",
    body: "Full practicals in headsets for the schools and training centres that can run them. The richest version of the experience.",
    limit: "Reaches the fewest schools",
    emphasis: false,
  },
  {
    k: "Route two",
    name: "Browser simulation",
    body: "The same practical running in a browser on a mid-range phone or an old classroom computer. Real physics and real chemistry, calculated rather than animated.",
    limit: "Reaches nearly everyone",
    emphasis: true,
  },
  {
    k: "What graduates",
    name: "Products, eventually",
    body: "TalentLens and Floow both started in this Lab as questions, and both now run in the world. That is the evidence the Lab ships rather than daydreams.",
    limit: "Two so far",
    emphasis: false,
  },
];

export default function LabPage() {
  return (
    <>
      <PageHero
        label="The Lab"
        title={
          <>
            A laboratory that does not need a <span className="text-accent">building</span>.
          </>
        }
        lede="Most schools across Africa have no proper access to a physical laboratory. Practical science gets described instead of performed, and students are still assessed on it. That is the problem the Lab spends most of its time on."
        cta={{ href: "/contact", text: "Join the school pilot" }}
      />

      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <Reveal as="p" className="label mb-6">
            <span className="label-dot" aria-hidden />
            Two routes, one honest limit each
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-chapter max-w-[18ch]">
              We build both, because most schools can only run one.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {routes.map((route, i) => (
              <Reveal as="li" key={route.name} delay={i * 70} className="h-full">
                <div className="card h-full p-7">
                  <p className="label mb-3">{route.k}</p>
                  <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {route.name}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {route.body}
                  </p>
                  <p
                    className={`mt-4 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
                      route.emphasis ? "text-accent" : "text-tone-faint"
                    }`}
                  >
                    {route.limit}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={80}>
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Join the school pilot
              </Link>
              <Link
                href="/playground"
                className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
              >
                Try a prototype in the Playground
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section data-chapter-ground="canvas" className="chapter-y pt-0">
        <div className="container-x">
          <Reveal as="p" className="label mb-6">
            <span className="label-dot" aria-hidden />
            Already graduated
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {products.map((product, i) => (
              <Reveal as="li" key={product.slug} delay={i * 70} className="h-full">
                <div className="card h-full p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.024em]">
                      {product.name}
                    </h3>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-accent uppercase">
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] font-medium text-tone">
                    {product.tagline}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {product.outcome}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
