import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessBand } from "@/components/sections/ProcessBand";
import { WhyUs } from "@/components/sections/WhyUs";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

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
      <WhyUs />
      <Faq />
      <ContactSection />
    </>
  );
}
