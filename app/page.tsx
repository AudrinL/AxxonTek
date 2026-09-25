import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { StudioTeaser } from "@/components/sections/StudioTeaser";
import { CapabilitiesStrip } from "@/components/sections/CapabilitiesStrip";
import { Method } from "@/components/sections/Method";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The homepage, as the masterplan's arc: a technology company introducing
 * itself on three levels, then the evidence, then the ask.
 *
 *   Hero          ink.    the thesis, in the company's own voice
 *   What we build  canvas. products, systems, emerging technology
 *   Products      ink.    the two we own and run
 *   Studio        canvas. what we could build for you
 *   Capabilities  canvas. the range, as a moving ribbon
 *   Method        canvas. how working together actually goes
 *   FAQ           canvas. the remaining objections
 *   Contact       ink.    the ask
 *
 * The ground follows one rule now, not a rhythm: ink is a product or the
 * company's own voice, canvas is the customer's world and our evidence. So
 * it drops to ink exactly twice, for the products and for the close, and
 * holds one long calm light stretch in between. Nothing alternates.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <FeaturedProducts />
      <StudioTeaser />
      <CapabilitiesStrip />
      <Method />
      <Faq />
      <ContactSection />
    </>
  );
}
