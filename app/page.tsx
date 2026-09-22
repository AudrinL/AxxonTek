import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Situations } from "@/components/sections/Situations";
import { Capabilities } from "@/components/sections/Capabilities";
import { Proof } from "@/components/sections/Proof";
import { LabPreview } from "@/components/sections/LabPreview";
import { PlaygroundTaste } from "@/components/sections/PlaygroundTaste";
import { Method } from "@/components/sections/Method";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The homepage, as an arc rather than a list.
 *
 *   Hero        the thesis, and what is possible now
 *   Situations  the visitor's own problem, in their words
 *   Capabilities  ink. the full width of what is available
 *   Proof       canvas. two products that already run
 *   Lab         ink. what is being worked out next
 *   Playground  canvas. the first thing they can touch
 *   Method      how working together actually goes
 *   FAQ         the remaining objections
 *   Contact     ink. the ask
 *
 * The ground changes four times across the whole page. Each change marks
 * a genuine shift in what is being argued, which is the only thing that
 * earns one.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <Capabilities />
      <Proof />
      <LabPreview />
      <PlaygroundTaste />
      <Method />
      <Faq />
      <ContactSection />
    </>
  );
}
