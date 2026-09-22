import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/system/Reveal";
import { site } from "@/lib/site";

/**
 * The ask, on ink.
 *
 * The last ground change of the page. Everything above has been an
 * argument; this is the one place a visitor does something, and giving
 * it its own light is the cheapest way to say so. The promise sits next
 * to the form rather than under it, because it is the thing that decides
 * whether the form gets filled.
 */
export function ContactSection() {
  return (
    <section
      data-chapter-ground="ink"
      id="contact"
      className="bloom chapter-y relative overflow-hidden"
    >
      <span aria-hidden className="bloom-light -top-[22rem] -right-[18rem] opacity-60" />

      <div className="container-x">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              Start something
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter max-w-[13ch]">
                Tell us what you are trying to make possible.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lede mt-7 max-w-[44ch]">
                We will tell you honestly whether we are the right team, and if we
                are not, who might be.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-12 grid gap-7 border-t border-line pt-9">
                <Detail k="Prefer email" v={site.email} href={`mailto:${site.email}`} />
                <Detail
                  k="Visit"
                  v={`${site.address.line1}, ${site.address.line2}, ${site.address.city}`}
                />
                <Detail k="Response time" v="Within one business day, from an engineer" />
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="card p-6 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Detail({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div>
      <dt className="label mb-2">{k}</dt>
      <dd className="text-[0.9375rem] font-medium">
        {href ? (
          <a
            href={href}
            className="underline decoration-line-firm underline-offset-4 transition-colors duration-[var(--t-hover)] hover:text-accent"
          >
            {v}
          </a>
        ) : (
          v
        )}
      </dd>
    </div>
  );
}
