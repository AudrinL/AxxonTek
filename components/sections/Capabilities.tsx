import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { capabilities, hosting, services } from "@/lib/site";

/**
 * The four service cards with imagery, shown under the row list. Hosting
 * is included so the homepage carries a taste of the one priced service
 * and can hand the visitor straight to /pricing.
 */
const showcase = [
  ...services,
  {
    name: hosting.name,
    blurb: hosting.lede,
    image: hosting.image,
    href: "/pricing",
  },
];

/**
 * The range, on ink.
 *
 * This is the first ground change on the page, and it is spent here on
 * purpose: the argument shifts from "we understand your problem" to
 * "here is the full width of what is available to you", and a change of
 * light is the cheapest way to signal a change of subject without a
 * heading that says "now a different subject".
 *
 * Rows rather than cards. Five capabilities as five cards reads as a
 * price list; as five rows with real weight on the name it reads as a
 * contents page for a company.
 */
export function Capabilities() {
  return (
    <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden">
      <span aria-hidden className="bloom-light -right-[18rem] -bottom-[26rem] opacity-60" />

      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[20ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              What we can bring
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">Five ways in.</h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[46ch]">
            <p className="text-lede">
              Most projects use two or three of these together. You do not have to
              know which ones before you call, and working that out is part of what
              the first conversation is for.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line">
          {capabilities.map((capability, i) => (
            <Reveal as="li" key={capability.id} delay={Math.min(i, 3) * 60}>
              <Link
                href={`/solutions#${capability.id}`}
                className="group grid gap-x-12 gap-y-4 border-b border-line py-9 transition-colors duration-[var(--t-base)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto]"
              >
                <div>
                  <h3 className="font-display text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.028em] transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                    {capability.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-tone-mute lg:hidden">
                    {capability.lede}
                  </p>
                </div>

                <div className="hidden lg:block">
                  <p className="text-[0.9375rem] leading-relaxed text-tone-mute">
                    {capability.lede}
                  </p>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {capability.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="self-center font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent"
                >
                  Read
                  <span className="ml-3 inline-block transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1">
                    &#8594;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* The services, with imagery. The row list above is the contents
            page; this is the shelf. */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map((service, i) => (
            <Reveal as="li" key={service.name} delay={Math.min(i, 3) * 60} className="h-full">
              <Link
                href={service.href}
                className="group card flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[var(--t-base)] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.02em] transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-tone-mute">
                    {service.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
