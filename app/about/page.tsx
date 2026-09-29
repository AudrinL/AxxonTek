import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, RowHead, Section, StoryHead, Strong, Tile } from "@/components/system/Page";
import { processSteps, products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AxxonTek is a technology company in Kigali. We build software, cloud and smart systems for businesses, schools and clinics across Africa. Think Beyond Tomorrow.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Built for the phones people have.",
    body: "Most of your customers use mid-range phones on mobile data. We design for that first.",
  },
  {
    title: "Honest from the first call.",
    body: "If a smaller project or a different approach suits you better, we will say so.",
  },
  {
    title: "We run what we build.",
    body: "Floow and TalentLens are ours, and we host and support what we make for clients too.",
  },
  {
    title: "Made for where you are.",
    body: "We start from how people here live and work, not from software made for somewhere else.",
  },
];

/**
 * About, and the home of the tagline. The page opens on "Think beyond
 * tomorrow" as the headline, then says plainly who we are, how we work and
 * what we have shipped. No founder gallery: trust comes from principles and
 * proof, the way rho.co earns it.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About AxxonTek"
        title={
          <>
            Think beyond <span className="text-serif">tomorrow</span>.
          </>
        }
        lede={
          <>
            <Strong>AxxonTek is a technology company in Kigali.</Strong> We build
            software, cloud and smart systems for businesses, schools and clinics
            across Africa.
          </>
        }
        primary={{ href: "/contact", text: "Start a project" }}
        secondary={{ href: "/products", text: "See our products" }}
      />

      <Section alt>
        <StoryHead
          label="What we believe"
          title="Technology should work for everyone."
          lede={
            <>
              <Strong>New technology gets announced everywhere and used in very few places.</Strong>{" "}
              We build the systems that close that gap, so schools, clinics and businesses
              can use it today.
            </>
          }
        />
      </Section>

      <Section>
        <RowHead title="How we work." />
        <ul className="grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 70} className="h-full">
              <Tile>
                <h3 className="font-display text-[1.75rem] font-semibold leading-[1.14] tracking-[0.007em]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[1.0625rem] leading-[1.47] text-tone-mute">
                  {p.body}
                </p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section alt>
        <RowHead title="Working with us." link={{ href: "/contact", text: "Start a project" }} />
        <ol className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 70} className="h-full">
              <Tile>
                <p className="text-[1.0625rem] font-semibold text-accent">{step.n}</p>
                <h3 className="mt-10 font-display text-[1.5rem] font-semibold leading-[1.17]">
                  {step.title}.
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{step.body}</p>
              </Tile>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <RowHead title="What we have shipped." link={{ href: "/products", text: "See our products" }} />
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
        title="Have a project in mind?"
        lede={`Tell us what you need. We reply within one business day at ${site.email}.`}
        secondary={{ href: `mailto:${site.email}`, text: "Email us" }}
      />
    </>
  );
}
