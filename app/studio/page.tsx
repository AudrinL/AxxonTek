import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { StudioGallery } from "@/components/studio/StudioGallery";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Explore what is possible. Concepts AxxonTek has designed for real industries: find a direction you like, and we will make it yours.",
  alternates: { canonical: "/studio" },
};

/**
 * The Studio, on canvas. It is deliberately separate from Work: Work is what
 * we have built for real organisations, the Studio is what we are capable of
 * building, shown as directions you can browse. Everything here is presented
 * honestly as a concept, never dressed up as a commission, which is exactly
 * why it can grow without pretending.
 */
export default function StudioPage() {
  return (
    <>
      <PageHero
        label="Studio"
        title={
          <>
            Explore what is <span className="text-serif text-accent">possible</span>.
          </>
        }
        lede="Not sure what your digital presence should look like? Browse concepts we have designed for different industries. Find a direction you like, then we will make it yours."
      />

      <section data-chapter-ground="canvas" className="pb-[var(--chapter)]">
        <div className="container-x">
          <Reveal>
            <StudioGallery />
          </Reveal>
        </div>
      </section>
    </>
  );
}
