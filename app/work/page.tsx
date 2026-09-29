import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, Section, Strong } from "@/components/system/Page";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects AxxonTek has designed, built and shipped: websites, applications, our own products and installed smart systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Our work"
        title={
          <>
            Built by us. Still <span className="text-serif">running</span>.
          </>
        }
        lede={
          <>
            <Strong>Every project here was built and is supported by the same team.</Strong>{" "}
            When a client asks us not to name them, we name the sector instead.
          </>
        }
      />

      <Section alt>
        <WorkIndex />
        <Reveal delay={80}>
          <p className="mt-12 text-[0.875rem] leading-5 text-tone-faint">
            {work.length} {work.length === 1 ? "project" : "projects"} so far. More are added as
            they go live.
          </p>
        </Reveal>
      </Section>

      <CloseAsk
        title="Want something like this?"
        lede="Tell us what you need and we will build it with you."
      />
    </>
  );
}
