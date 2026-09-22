import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { ParcelTracker } from "@/components/playground/ParcelTracker";

/**
 * The moment the page stops describing and starts demonstrating.
 *
 * One live entry, embedded, with the rest of the catalogue one click
 * away. Everything above this point is a claim. This is the first thing
 * on the page a visitor can disprove by touching it, which is exactly
 * why it earns its space.
 */
export function PlaygroundTaste() {
  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              The Playground
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter max-w-[14ch]">Go on. Touch something.</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lede mt-7 max-w-[50ch]">
                A catalogue of things we have built to find out whether they were
                possible. None of it is client work. All of it runs, right now, in
                your browser, including a full chemistry practical with real
                equilibrium maths behind it.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/playground" className="pill pill-ember hover:bg-ember-deep">
                  Open the Playground
                </Link>
              </div>
              <p className="mt-7 font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
                01 Parcel tracker · 02 Reasoning under time · 03 Titration
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ParcelTracker />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
