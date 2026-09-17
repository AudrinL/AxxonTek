import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessBand } from "@/components/sections/ProcessBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

const whyUs = [
  {
    icon: "microscope",
    title: "Researched before quoted",
    body: "You are never priced on a guess. We study the problem first, then put a number on a scope we understand.",
  },
  {
    icon: "users",
    title: "No handoffs",
    body: "The engineer on your first call is the engineer who builds it, and you keep their direct contact throughout.",
  },
  {
    icon: "shield",
    title: "Supported past launch",
    body: "We stay involved after delivery, because the version that ships is rarely the version that lasts.",
  },
] as const;

/**
 * Homepage, ordered for conversion. Each section answers the question the
 * previous one raises, and the ask is never more than one screen away:
 *
 *   Hero      - what we sell, for whom, one CTA        -> "what exactly?"
 *   Stats     - honest snapshot strip                   -> "are you real?"
 *   Services  - the catalogue, six cards                -> "how do you work?"
 *   Process   - research first, built by scopers (CTA)  -> "why you?"
 *   Why us    - three concrete reasons                  -> "any catches?"
 *   FAQ       - objections answered                     -> "ok, how do I start?"
 *   Contact   - the form, right here
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <ProcessBand />
      <FeatureGrid
        id="why"
        eyebrow="Why AxxonTek"
        heading={"Small on purpose. Senior by default."}
        accent={["purpose."]}
        lede="Four engineers, no account managers. That is not a limitation we apologise for — it is the reason the work fits."
        features={whyUs}
      />
      <Faq />
      <ContactSection />
    </>
  );
}
