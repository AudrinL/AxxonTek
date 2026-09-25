import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { ConceptPoster } from "@/components/studio/ConceptPoster";
import { studioConcepts } from "@/lib/site";

/**
 * The Studio, teased on canvas. This is the differentiator: a growing shelf
 * of directions a visitor can browse when they do not yet know what they
 * want, then ask us to make theirs. It stays light because it is evidence
 * of range, not a product of ours, and it is kept honest as concepts, never
 * dressed up as client work.
 */
export function StudioTeaser() {
  const shown = studioConcepts.slice(0, 4);

  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[24ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              The Studio
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">
                Not sure yet? <span className="text-serif text-accent">Explore</span> what is possible.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[42ch]">
            <p className="text-lede">
              Browse directions we have designed for real industries. Find one you
              like, and we will make it yours. The shelf grows every month.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {shown.map((concept, i) => (
            <Reveal key={concept.slug} delay={Math.min(i, 3) * 70}>
              <Link href={`/studio/${concept.slug}`} className="group block">
                <ConceptPoster
                  concept={concept}
                  className="transition-transform duration-[var(--t-base)] ease-out group-hover:-translate-y-1.5"
                />
                <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                  {concept.industry}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/studio" className="pill pill-ember hover:bg-ember-deep">
              Explore the Studio
              <Icon name="arrow" size={16} />
            </Link>
            <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase">
              {studioConcepts.length} concepts and counting
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
