import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { processSteps } from "@/lib/site";

/**
 * How working together actually goes.
 *
 * The numbers are allowed here because this genuinely is a sequence and
 * the order carries information the reader needs. Each step carries the
 * promise it earns rather than a generic reassurance, which is the only
 * thing that separates this from every other three-step process band.
 */
export function Method() {
  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[18ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              How it goes
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">Small on purpose.</h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[44ch]">
            <p className="text-lede">
              A senior team with no account managers between you and the people
              building the thing. That is not a limitation we apologise for. It is
              the reason the work fits.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-line">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 70}>
              <div className="grid gap-x-12 gap-y-3 border-b border-line py-9 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)]">
                <span className="font-mono text-[0.75rem] text-accent">{step.n}</span>
                <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.024em]">
                  {step.title}
                </h3>
                <div>
                  <p className="text-[0.9375rem] leading-relaxed text-tone-mute">
                    {step.body}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.12em] text-moss uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
                    {step.promise}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
              Start with a call
            </Link>
            <p className="text-[0.9375rem] text-tone-mute">
              30 minutes, an engineer, no obligation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
