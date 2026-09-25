import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { capabilityGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "From idea to working technology. Product engineering, digital experiences, infrastructure, product design and emerging technology, described by outcome rather than by tool.",
  alternates: { canonical: "/capabilities" },
};

/**
 * Capabilities, on canvas the whole way. Five families, described by what a
 * client gets rather than by which framework we reach for. The rule from the
 * content model holds: a client asks what can you build for me, so the
 * technologies stay out of this page and live in the case studies.
 */
export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        label="Capabilities"
        title={
          <>
            From idea to <span className="text-serif text-accent">working</span> technology.
          </>
        }
        lede="Five families of work. You tell us the outcome you are after. We tell you what it takes, and who does it, on the first call."
        cta={{ href: "/contact", text: "Start a project" }}
      />

      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x flex flex-col gap-4">
          {capabilityGroups.map((group, i) => (
            <Reveal as="div" key={group.id} delay={Math.min(i, 3) * 60}>
              <article id={group.id} className="card scroll-mt-28 p-8 md:p-10">
                <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                  <div>
                    <p className="label mb-5">
                      <span className="label-dot" aria-hidden />
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.028em] md:text-[2.25rem]">
                      {group.name}
                    </h2>
                    <p className="mt-4 text-lede max-w-[34ch]">{group.lede}</p>
                  </div>

                  <ul className="grid content-start gap-px self-start overflow-hidden rounded-[var(--r-inner)] border border-line bg-line sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 bg-[var(--ground-veil)] px-5 py-4 transition-colors duration-[var(--t-ground)] ease-[var(--ease-gravity)]"
                      >
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-ember" aria-hidden />
                        <span className="text-[0.9375rem] text-tone">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Start a project
                <Icon name="arrow" size={16} />
              </Link>
              <Link
                href="/work"
                className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
              >
                See the work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
