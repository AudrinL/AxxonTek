import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a four-person team in Kigali building serious technology for Africa. Real ownership, research-driven work, no ladder to climb.",
  alternates: { canonical: "/careers" },
};

const culture = [
  {
    icon: "tools",
    title: "Real ownership",
    body: "Every hire shapes how we build, not just what we ship.",
  },
  {
    icon: "microscope",
    title: "Research-driven",
    body: "We would rather you spend a week understanding a problem than a day guessing at a solution.",
  },
  {
    icon: "globe",
    title: "Building from Kigali",
    body: "For Africa, in Africa — held to the same standard as anywhere else in the world.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={"Be the fifth."}
        accent={["fifth."]}
        lede="We are a four-person team in Kigali, looking for people who would rather build something real than sit in a big company doing small things."
        action={{ label: "Reach out", href: "/contact" }}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      <Statement
        label="Join us"
        heading={"Small team, real ownership."}
        accent={["ownership."]}
        body="There is no ladder to climb here yet — there is just work that matters, and a team small enough that your name is on all of it. If you want to be the fifth person building serious technology for Africa from day one, we want to hear from you."
        image="/assets/custom-development.png"
        imageAlt="Working at AxxonTek"
      />

      <FeatureGrid
        eyebrow="What it's like here"
        heading={"How the work actually feels."}
        accent={["feels."]}
        features={culture}
      />

      <div className="pb-[clamp(6rem,13vw,11rem)]">
        <CtaBanner
          heading={"Don't see a listed role? Reach out anyway."}
          accent={["anyway."]}
          body="Tell us what you are good at and what you want to build. If there is a fit, we will find it."
          action={{ label: "Get in touch", href: "/contact" }}
          secondary={{ label: "About us", href: "/about" }}
        />
      </div>
    </>
  );
}
