import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { studioConcepts } from "@/lib/site";

/**
 * Inspiration, on canvas: the studio's shelf of directions for real
 * industries, for the visitor who does not yet know what they want. It stays
 * light because it is evidence of range, not a product of ours, and each
 * frame is labelled a concept so nothing is dressed up as client work.
 */
export function Inspiration() {
  const shown = studioConcepts.filter((c) => c.image).slice(0, 4);

  return (
    <section data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="mx-auto max-w-[44rem] text-center">
          <Reveal as="p" className="label mb-4">
            Inspiration
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-chapter">
              Not sure yet?<br />Find your <span className="text-serif">direction</span>.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-lede mt-6">
              <span className="text-tone">Directions we have designed for real industries.</span>{" "}
              Find one you like and we will make it yours. The shelf grows every month.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5">
          {shown.map((concept, i) => (
            <Reveal key={concept.slug} delay={(i % 4) * 70}>
              <Link href={`/studio/${concept.slug}`} className="group block">
                <div className="window aspect-[4/3] transition-transform duration-[var(--t-base)] ease-out group-hover:-translate-y-1.5">
                  <Image
                    src={concept.image!}
                    alt={`${concept.industry} website concept: ${concept.title}`}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.035]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[0.75rem] font-semibold text-white backdrop-blur-md">
                    Concept
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.75rem] tracking-[-0.01em] text-tone-faint transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                      {concept.industry} / {concept.number}
                    </p>
                    <h3 className="mt-2 max-w-[22ch] font-display text-[1.3125rem] font-semibold leading-[1.19] tracking-[0.011em]">
                      {concept.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 text-accent transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1"
                  >
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/studio" className="pill pill-ember hover:bg-ember-deep">
              Explore Inspiration
              <Icon name="arrow" size={16} />
            </Link>
            <span className="text-[0.875rem] text-tone-faint">
              {studioConcepts.length} concepts and counting
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
