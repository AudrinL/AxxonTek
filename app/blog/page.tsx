import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Research notes, build logs, and perspectives on building technology for Africa — from the AxxonTek team in Kigali.",
  alternates: { canonical: "/blog" },
};

const topics = [
  {
    icon: "microscope",
    title: "Research notes",
    body: "The problems we studied and what we learned before building.",
  },
  {
    icon: "tools",
    title: "Build logs",
    body: "Real decisions from real projects — what worked, what did not.",
  },
  {
    icon: "globe",
    title: "Tech in Africa",
    body: "Perspectives on building technology for the continent, from the continent.",
  },
] as const;

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={"Notes from\nthe workbench."}
        accent={["workbench."]}
        lede="We are a new company — this is where we will write about the research, the trade-offs, and the lessons behind what we build."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <Statement
        label="Coming soon"
        heading={"Our first posts are on the way."}
        accent={["way."]}
        body="We would rather publish something worth reading than fill this page with placeholders. When we write, it will be about the real research and decisions behind our projects — not generic tech takes."
      />

      <FeatureGrid
        eyebrow="What we will write about"
        heading={"Three things worth your time."}
        accent={["time."]}
        features={topics}
        surface="band"
      />

      <div className="pb-[clamp(6rem,13vw,11rem)]">
        <CtaBanner
          heading={"Get new posts by email."}
          accent={["email."]}
          body="No cadence promises, no filler. We write when we have something worth sending — subscribe in the footer below."
          action={{ label: "Talk to us instead", href: "/contact" }}
        />
      </div>
    </>
  );
}
