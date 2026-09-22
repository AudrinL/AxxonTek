import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { processSteps, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AxxonTek is a technology company in Kigali building software, AI, immersive learning and smart systems for organisations across Africa.",
  alternates: { canonical: "/about" },
};

/**
 * About, built on the model rho uses: trust earned from proof and
 * principles rather than from a founder gallery. There are no faces on
 * this page and it does not need any, which is what makes it possible
 * to ship before the real photography exists.
 */

const principles = [
  {
    k: "Build for the device, not the demo",
    v: "Your customers are on mid-range Android phones on mobile data. Anything that only works on a fast laptop has not been finished.",
  },
  {
    k: "Say no out loud",
    v: "A smaller project, a different approach, or a different company. If that is the right answer you will hear it on the first call.",
  },
  {
    k: "Own what we invent",
    v: "The Lab does not write papers. Ideas that survive become products we run and support, which is the only honest test of an idea.",
  },
  {
    k: "Solve here, not for here",
    v: "Imported software assumes infrastructure, habits and budgets that do not match how people actually live and work. We start from the place.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={
          <>
            Technology should arrive{" "}
            <span className="text-accent">everywhere</span>, not eventually.
          </>
        }
        lede="AxxonTek is a technology company based in Kigali. We build the systems that bring modern technology into the places it has not reached yet, and we run the products we invent."
        meta={`${site.address.line1} · ${site.address.city}`}
      />

      <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden">
        <span aria-hidden className="bloom-light -top-[22rem] -right-[18rem] opacity-55" />
        <div className="container-x">
          <Reveal as="p" className="label mb-6">
            <span className="label-dot" aria-hidden />
            How we work
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-chapter max-w-[16ch]">Four principles, applied literally.</h2>
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-line bg-line md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal key={principle.k} delay={Math.min(i, 3) * 60}>
                <div className="h-full bg-[var(--ground-veil)] p-8 transition-colors duration-[var(--t-ground)] ease-[var(--ease-gravity)]">
                  <dt className="font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {principle.k}
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {principle.v}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
            <div className="max-w-[20ch]">
              <Reveal as="p" className="label mb-6">
                <span className="label-dot" aria-hidden />
                Working together
              </Reveal>
              <Reveal delay={70}>
                <h2 className="text-chapter">Three steps, no handoffs.</h2>
              </Reveal>
            </div>
            <Reveal delay={140} className="max-w-[42ch]">
              <p className="text-lede">
                The engineer who scopes your project is the one who builds it, and
                you keep their direct contact after launch.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 70} className="h-full">
                <div className="card h-full p-7">
                  <p className="font-mono text-[0.75rem] text-accent">{step.n}</p>
                  <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={80}>
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Start a project
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
