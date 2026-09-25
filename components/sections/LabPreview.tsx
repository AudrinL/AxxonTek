import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";

/**
 * The Lab, on ink. The single dark beat in the middle of the homepage:
 * the ground has been calm and light since the Hero, and it drops here
 * once, deliberately, before returning to light for the rest.
 *
 * The rule for this section is that a reader has to finish it knowing
 * something specific they did not know before. A list of technologies
 * teaches nobody anything, so the copy names the problem, the number,
 * the two delivery routes and the honest limit of each one. The half
 * that most companies would cut is the admission that VR will not reach
 * most schools, and it is the half that makes the rest believable.
 */
export function LabPreview() {
  return (
    <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden">
      <span aria-hidden className="bloom-light -top-[20rem] -left-[20rem] opacity-50" />

      <div className="container-x">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              The Lab
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter max-w-[15ch]">
                A laboratory that does not need a building.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lede mt-7 max-w-[52ch]">
                Most schools across Africa have no proper access to a physical
                laboratory. Practical science gets described instead of performed,
                and students are still assessed on it. That is the problem the Lab
                spends most of its time on.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/lab" className="pill pill-ember hover:bg-ember-deep">
                  Inside the Lab
                </Link>
                <Link href="/contact" className="pill pill-quiet hover:border-tone">
                  Join the school pilot
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ul className="grid gap-px overflow-hidden rounded-[var(--r-card)] border border-line bg-line">
              <Route
                k="Route one"
                name="Virtual reality"
                body="Full practicals in headsets for the schools and training centres that can run them. The richest version of the experience."
                limit="Reaches the fewest schools"
              />
              <Route
                k="Route two"
                name="Browser simulation"
                body="The same practical running in a browser on a mid-range phone or an old classroom computer. Real physics and real chemistry, calculated rather than animated."
                limit="Reaches nearly everyone"
                emphasis
              />
              <Route
                k="What graduates"
                name="Products, eventually"
                body="TalentLens and Floow both started in this Lab as questions and both now run in the world. That is the evidence the Lab ships rather than daydreams."
                limit="Two so far"
              />
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Route({
  k,
  name,
  body,
  limit,
  emphasis = false,
}: {
  k: string;
  name: string;
  body: string;
  limit: string;
  emphasis?: boolean;
}) {
  return (
    <li className="bg-[var(--ground-veil)] p-7 transition-colors duration-[var(--t-ground)] ease-[var(--ease-gravity)]">
      <p className="label mb-3">{k}</p>
      <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
        {name}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-tone-mute">{body}</p>
      <p
        className={`mt-4 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
          emphasis ? "text-accent" : "text-tone-faint"
        }`}
      >
        {limit}
      </p>
    </li>
  );
}
