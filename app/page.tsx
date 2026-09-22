import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Products } from "@/components/sections/Products";
import { ProcessBand } from "@/components/sections/ProcessBand";
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
 *   Hero      - the thesis, the facts a buyer checks, one CTA
 *   Services  - the catalogue        -> "have you shipped anything?"
 *   Products  - TalentLens + Floow   -> "how do you work, and why you?"
 *   Process   - the sequence, with the promise on the step that earns it
 *   FAQ       - remaining objections -> "ok, how do I start?"
 *   Contact   - the form, right here
 *
 * Stats and Why-us were removed rather than rewritten: both restated the
 * process section's argument, and four sections making one point reads as
 * padding no matter how well each sentence is written.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Products />
      <ProcessBand />
      <Faq />
      <ContactSection />
    </>
  );
}
