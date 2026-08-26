import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AxxonTek is a four-person team based in Kigali, founded in 2025 to bring real research and engineering discipline to technology problems across Africa.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "microscope",
    title: "Research first",
    body: "Before we touch a keyboard, we study the problem. Most of our best decisions happen before we start building.",
  },
  {
    icon: "users",
    title: "Small by design",
    body: "Four people means every project gets our full attention — not a rotating cast of account managers.",
  },
  {
    icon: "globe",
    title: "Rooted in Africa",
    body: "We are building from Kigali, for problems we understand firsthand, without lowering the bar.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={"A small team\nbuilding seriously."}
        accent={["seriously."]}
        lede="We are a four-person team based in Kigali, founded in 2025 to bring real research and engineering discipline to technology problems across Africa."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <Statement
        label="Why we exist"
        heading={"Most innovation is just repackaging."}
        accent={["repackaging."]}
        body="Too much of what gets called innovation in tech is the same product with a new logo. We started AxxonTek to do the harder thing: study a problem properly, then build the software, systems, or hardware it actually needs."
        image="/assets/rwanda.jpg"
        imageAlt="The Virunga mountains, Rwanda"
      />

      <Statement
        label="How we work"
        heading={"No layers between you and the build."}
        accent={["build."]}
        body="Four of us, with no management tier standing between you and the people writing the code. In our first year that has already meant four real projects delivered — each one researched properly before a single line was written."
      />

      <FeatureGrid
        eyebrow="What we stand for"
        heading={"Three commitments we do not trade away."}
        accent={["away."]}
        features={values}
        surface="band"
      />

      <div className="pb-[clamp(6rem,13vw,11rem)]">
        <CtaBanner
          heading={"We're early. We're serious. Let's build something worth building."}
          accent={["building."]}
          action={{ label: "Start a conversation", href: "/contact" }}
          secondary={{ label: "See open roles", href: "/careers" }}
        />
      </div>
    </>
  );
}
