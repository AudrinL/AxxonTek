import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { CloseAsk, Section, Strong } from "@/components/system/Page";
import { StudioGallery } from "@/components/studio/StudioGallery";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Browse website designs AxxonTek has made for different industries. Pick a style you like and we will build it for your business.",
  alternates: { canonical: "/studio" },
};

/**
 * Inspiration: designs we have made for real industries, to browse when you
 * do not know yet what you want. Kept separate from Work and always labelled
 * as concepts, because none of it is client work.
 */
export default function StudioPage() {
  return (
    <>
      <PageHero
        label="Inspiration"
        title={
          <>
            Find your <span className="text-serif">direction</span>.
          </>
        }
        lede={
          <>
            <Strong>Not sure what your website should look like?</Strong> Browse our designs,
            pick one you like, and we will build it for your business.
          </>
        }
      />

      <Section alt>
        <Reveal>
          <StudioGallery />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-12 text-[0.875rem] leading-5 text-tone-faint">
            These are concepts designed by us, not client work.
          </p>
        </Reveal>
      </Section>

      <CloseAsk
        title="Have your own idea?"
        lede="Tell us about your business and we will design something just for you."
      />
    </>
  );
}
