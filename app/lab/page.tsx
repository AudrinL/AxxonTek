import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, RowHead, Section, StoryHead, Strong, Tile } from "@/components/system/Page";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "The AxxonTek Lab builds virtual science labs so schools across Africa can teach practical science without a building, and turns ideas that work into products.",
  alternates: { canonical: "/lab" },
};

const routes = [
  {
    kicker: "Route one",
    title: "Virtual reality.",
    body: "Full science practicals in a headset, for schools that can run them.",
    note: "The richest experience",
  },
  {
    kicker: "Route two",
    title: "In the browser.",
    body: "The same practicals on an old computer or a mid-range phone. Real physics and chemistry, calculated, not animated.",
    note: "Reaches almost every school",
  },
  {
    kicker: "What comes next",
    title: "New products.",
    body: "Floow and TalentLens both started here. Ideas that work become products we run.",
    note: "Two so far",
  },
];

/**
 * The Lab: where the future work happens, so it is where the tagline's
 * promise is most literal. Kept plain and honest: the problem, the two ways
 * we are solving it, and what has already come out of it.
 */
export default function LabPage() {
  return (
    <>
      <PageHero
        label="The Lab"
        title={
          <>
            A science lab without the <span className="text-serif">building</span>.
          </>
        }
        lede={
          <>
            <Strong>Most schools in Africa have no science lab.</Strong> Students read about
            experiments instead of doing them. We are changing that.
          </>
        }
        primary={{ href: "/contact", text: "Join the school pilot" }}
        secondary={{ href: "/products", text: "See what has shipped" }}
      />

      <Section alt>
        <StoryHead
          label="Think beyond tomorrow"
          title="Where our next products begin."
          lede={
            <>
              <Strong>The Lab is where we try new technology first.</Strong> AI, virtual
              reality and 3D on the web, worked out until they are useful to real schools and
              businesses.
            </>
          }
        />
      </Section>

      <Section>
        <RowHead title="Two ways to reach every school." />
        <ul className="grid gap-5 md:grid-cols-3">
          {routes.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 70} className="h-full">
              <Tile className="flex flex-col">
                <p className="text-[1.0625rem] font-semibold text-accent">{r.kicker}</p>
                <h3 className="mt-10 font-display text-[1.75rem] font-semibold leading-[1.14]">
                  {r.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{r.body}</p>
                <p className="mt-auto pt-8 text-[0.875rem] text-tone-faint">{r.note}</p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section alt>
        <RowHead title="Already out of the Lab." link={{ href: "/products", text: "See our products" }} />
        <ul className="grid gap-5 md:grid-cols-2">
          {products.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 70} className="h-full">
              <Tile>
                <p className="flex items-center gap-2 text-[0.875rem] font-semibold text-moss">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-moss" />
                  {product.status}
                </p>
                <h3 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1]">
                  {product.name}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{product.tagline}.</p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CloseAsk
        title="Run a school?"
        lede="Join the pilot and bring practical science to your students."
        primary={{ href: "/contact", text: "Join the school pilot" }}
      />
    </>
  );
}
