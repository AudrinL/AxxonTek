import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { OurProducts } from "@/components/sections/OurProducts";
import { AboutGoal } from "@/components/sections/AboutGoal";
import { Inspiration } from "@/components/sections/Inspiration";
import { Situations } from "@/components/sections/Situations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  /* What people type into Google, not the tagline. */
  title: { absolute: `${site.name} | Software and Technology Company in Kigali, Rwanda` },
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The homepage, in five movements, with the footer as the close.
 *
 *   Hero          ink.    the thesis, in the company's own voice
 *   Our products  canvas. the six things we build and run
 *   About + goal  ink.    who we are and what we are for
 *   Inspiration   canvas. directions we could build for you
 *   Solutions     canvas. problems a visitor recognises, and our answer
 *   Footer                the ask, and the way to reach us
 *
 * The ground follows one rule: ink is the company speaking, canvas is the
 * customer's world and our evidence. So it drops to ink twice, for the
 * opening and for the company's own story, and stays light around them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OurProducts />
      <AboutGoal />
      <Inspiration />
      <Situations />
    </>
  );
}
