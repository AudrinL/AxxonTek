import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { ParticleStatement } from "@/components/sections/ParticleStatement";
import { Expertise } from "@/components/sections/Expertise";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Capabilities } from "@/components/sections/Capabilities";
import { EmberBand } from "@/components/sections/EmberBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

const whyUs = [
  {
    icon: "bulb",
    title: "Strategic Innovation",
    body: "We build future-proof architectures that align technology with your core business objectives.",
  },
  {
    icon: "globe",
    title: "Global Capabilities",
    body: "Our solutions scale across borders, delivering enterprise-grade performance wherever you operate.",
  },
  {
    icon: "target",
    title: "Uncompromising Quality",
    body: "From complex cloud deployments to intelligent security, we execute with precision and reliability.",
  },
] as const;

/**
 * Section order is deliberate. Surfaces alternate (ink -> band -> ink -> ember)
 * so the page has vertical rhythm rather than reading as one continuous black
 * scroll, and there is a conversion point roughly every two screens: hero,
 * services grid, ember band, and the closing banner.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <ParticleStatement />
      <Expertise />
      <ServicesGrid />
      <Capabilities />
      <EmberBand />
      <FeatureGrid
        id="why"
        eyebrow="Why AxxonTek"
        heading={"Built on judgment, not guesswork."}
        accent={["guesswork."]}
        lede="We are a small, senior team. That means the people who scope your project are the people who build it — and the standard never changes between the two."
        features={whyUs}
      />
      <div className="pb-[clamp(6rem,13vw,11rem)]">
        <CtaBanner
          heading={"Your success is our mission. Let's build it together."}
          accent={["together."]}
          body="Tell us what you are trying to solve. We will tell you honestly whether we are the right team for it."
          action={{ label: "Start a conversation", href: "/contact" }}
          secondary={{ label: "About us", href: "/about" }}
        />
      </div>
    </>
  );
}
