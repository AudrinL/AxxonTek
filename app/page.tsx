import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ParticleStatement } from "@/components/sections/ParticleStatement";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Proof } from "@/components/sections/Proof";
import { Capabilities } from "@/components/sections/Capabilities";
import { EmberBand } from "@/components/sections/EmberBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Stats } from "@/components/sections/Stats";
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
 * Homepage narrative. Each section answers the question the previous one
 * raises, so the value proposition sharpens on the way down:
 *
 *   Hero          - what we do, broadly            -> "like what?"
 *   Marquee       - the shape of the offering
 *   Statement     - the thesis, in one sentence    -> "so what can I buy?"
 *   Services      - the catalogue, six engagements -> "does it actually work?"
 *   Proof         - track record + evidence        -> "what do you build?"
 *   Capabilities  - the four delivery domains      -> "how do you work?"
 *   EmberBand     - research-first process         -> "why you?"
 *   Why AxxonTek  - the differentiators            -> "are you real?"
 *   Stats         - credibility numbers            -> "ok, how do I start?"
 *   CtaBanner     - the ask
 *
 * CTAs are deliberately sparse - hero, proof, ember band, closing. The
 * catalogue rows link to their own pages and do not compete with them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ParticleStatement />
      <ServicesGrid />
      <Proof />
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
      <Stats />
      <div className="pt-[clamp(6rem,13vw,11rem)] pb-[clamp(6rem,13vw,11rem)]">
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
