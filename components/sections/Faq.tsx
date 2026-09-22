import { Reveal } from "@/components/system/Reveal";
import { faqs } from "@/lib/site";

/**
 * Objections, answered before they have to be asked.
 *
 * Native <details> rather than a scripted accordion. It is keyboard
 * operable and findable by in-page search for free, it works with
 * JavaScript off, and the browser animates the disclosure itself where
 * `interpolate-size` is supported. A hand-rolled version of this is a
 * classic place to spend a kilobyte on something worse.
 */
export function Faq() {
  return (
    <section data-chapter-ground="canvas" className="chapter-y relative" id="faq">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              Before you ask
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter max-w-[12ch]">The first call, answered early.</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lede mt-6 max-w-[38ch]">
                So the call itself can be about your project instead of our process.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="card divide-y divide-[var(--c-line)] overflow-hidden">
              {faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[1rem] font-medium transition-colors duration-[var(--t-hover)] hover:text-accent sm:px-7">
                    {faq.q}
                    <span
                      aria-hidden
                      className="relative h-3 w-3 flex-none text-tone-faint"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-[var(--t-base)] ease-out group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-tone-mute sm:px-7">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
