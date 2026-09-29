import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, RowHead, Section, Strong, Tag, Tile } from "@/components/system/Page";
import { capabilityGroups, offerings } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "What AxxonTek can build for you: web and mobile apps, cloud and hosting, SaaS products, UX and UI design, smart home systems, and emerging technology.",
  alternates: { canonical: "/capabilities" },
};

/**
 * Capabilities. First the six services from the homepage, each with its
 * photograph, then the full range grouped into five families, described by
 * what you get rather than which tools we use.
 */
export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        label="Capabilities"
        title={
          <>
            From idea to <span className="text-serif">working</span> technology.
          </>
        }
        lede={
          <>
            <Strong>Tell us what you need.</Strong> We will tell you what it takes and who
            will build it, on the first call.
          </>
        }
        primary={{ href: "/contact", text: "Start a project" }}
        secondary={{ href: "/pricing", text: "See pricing" }}
      />

      <Section alt>
        <RowHead title="Our services." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 70} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[var(--r-card)] bg-black">
                <div className="px-7 pt-8 pb-6">
                  <h3 className="font-display text-[1.5rem] font-semibold leading-[1.17]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[1.0625rem] leading-[1.47] text-tone-mute">{item.line}</p>
                </div>
                <div className="relative mx-3 mb-3 mt-auto aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                    className="object-cover"
                    style={{ objectPosition: item.focus }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <RowHead title="Everything we can do." link={{ href: "/contact", text: "Ask about a project" }} />
        <div className="flex flex-col gap-5">
          {capabilityGroups.map((group, i) => (
            <Reveal key={group.id} delay={Math.min(i, 2) * 60}>
              <article id={group.id} className="scroll-mt-24">
                <Tile>
                  <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
                    <div>
                      <h3 className="font-display text-[1.75rem] font-semibold leading-[1.14]">
                        {group.name}
                      </h3>
                      <p className="mt-3 max-w-[40ch] text-[1.0625rem] leading-[1.47] text-tone-mute">
                        {group.lede}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {group.items.map((it) => (
                        <Tag key={it}>{it}</Tag>
                      ))}
                    </div>
                  </div>
                </Tile>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CloseAsk
        title="Not sure where to start?"
        lede="Tell us the problem. We will suggest the simplest thing that solves it."
        secondary={{ href: "/work", text: "See our work" }}
      />
    </>
  );
}
