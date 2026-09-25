import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { ParcelTracker } from "@/components/playground/ParcelTracker";

export const metadata: Metadata = {
  title: "The Playground",
  description:
    "A catalogue of things AxxonTek built to find out whether they were possible. None of it is client work. All of it runs, right now, in your browser.",
  alternates: { canonical: "/playground" },
};

const experiments = [
  {
    n: "01",
    name: "Parcel tracker",
    body: "The tracking view from Floow, running live below. Move the parcel and watch both ends update on one code.",
    status: "Live below",
  },
  {
    n: "02",
    name: "Reasoning under time",
    body: "A single question from TalentLens, timed the way the real assessment is, so you can feel the pressure the score measures.",
    status: "In the catalogue",
  },
  {
    n: "03",
    name: "Titration",
    body: "A full chemistry practical with real equilibrium maths behind it, running in a browser on a mid-range phone.",
    status: "In the catalogue",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <PageHero
        label="The Playground"
        title={
          <>
            Go on. <span className="text-accent">Touch something</span>.
          </>
        }
        lede="A catalogue of things we built to find out whether they were possible. None of it is client work. All of it runs, right now, in your browser, including a full chemistry practical with real equilibrium maths behind it."
      />

      <section data-chapter-ground="canvas" className="chapter-y pt-0">
        <div className="container-x">
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.05fr)]">
            <div>
              <Reveal as="p" className="label mb-6">
                <span className="label-dot" aria-hidden />
                01 · Parcel tracker
              </Reveal>
              <Reveal delay={70}>
                <h2 className="text-chapter max-w-[14ch]">One code, both ends.</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-lede mt-7 max-w-[46ch]">
                  This is the live tracking view from Floow, the national parcel
                  system. Everything above this point is a claim. This is the first
                  thing you can disprove by touching it.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <ParcelTracker />
            </Reveal>
          </div>
        </div>
      </section>

      <section data-chapter-ground="canvas" className="chapter-y pt-0">
        <div className="container-x">
          <Reveal as="p" className="label mb-6">
            <span className="label-dot" aria-hidden />
            The catalogue
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {experiments.map((experiment, i) => (
              <Reveal as="li" key={experiment.n} delay={i * 70} className="h-full">
                <div className="card h-full p-7">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[0.75rem] text-accent">{experiment.n}</p>
                    <span className="font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase">
                      {experiment.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {experiment.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {experiment.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={80}>
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Build something real with us
              </Link>
              <Link
                href="/lab"
                className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
              >
                See what the Lab is working on
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
