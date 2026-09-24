import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { HeroIllustration } from "@/components/sections/HeroIllustration";

/**
 * The hero asks for one thing: a call. Headline, one sentence, one button,
 * one line of reassurance, nothing else competes.
 *
 * Full-viewport and edge to edge. A photograph sits under an orange wash
 * across the whole section; a white slice cuts in from the right on a
 * diagonal and the illustration sits across that edge, anchored to the
 * corner so it fills wide displays and bleeds off the bottom like a real
 * object rather than sitting in a box. On phones the slice becomes a
 * bottom band with a diagonal top.
 *
 * The ground is declared as ink so the fixed nav reads as light over the
 * orange without the nav needing a second variant. This is a faithful
 * rebuild of the original orange hero using only the current system:
 * Reveal for the entrance, Icon for the marks, CSS for the drift.
 */
export function Hero() {
  return (
    <section
      data-chapter-ground="ink"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-white lg:min-h-[max(100svh,44rem)]"
    >
      {/* Backdrop: the photo, desaturated, under a warm orange wash. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <Image
          src="/assets/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_center] grayscale brightness-[1.3] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(112deg, var(--ember-deep) 0%, var(--ember) 44%, #ff7a45 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--ember) 60%, transparent)" }} />
      </div>

      {/* Desktop: the white slice, cut on a diagonal from the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] bg-canvas [clip-path:polygon(52%_0,100%_0,100%_100%,0_100%)] lg:block"
      />

      {/* Copy */}
      <div className="container-x flex flex-1 flex-col justify-center pt-32 pb-8 lg:pb-32">
        <div className="max-w-[30rem] xl:max-w-[34rem]">
          <Reveal delay={80}>
            <h1 className="max-w-[12ch] text-[clamp(2.75rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Software built for how Africa{" "}
              <span className="italic text-[#ffd8c7]">actually</span> works.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-[28rem] text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-relaxed text-white/85">
              Apps, websites and smart systems for businesses in Rwanda and across
              Africa, scoped by the engineers who build them, and priced before the
              build starts.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9">
              <Link
                href="/contact"
                className="group inline-flex h-[3.125rem] items-center gap-2 rounded-full bg-white px-7 text-[0.9375rem] font-semibold text-ink transition-[background-color,transform] duration-[var(--t-hover)] ease-[var(--ease-out)] hover:bg-white/90"
              >
                Book a call
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1"
                >
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
              <p className="mt-4 text-[0.875rem] text-white/70">
                30 minutes with an engineer, not a salesperson · Reply within one
                business day
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Illustration. In flow under the copy on phones, inside its own white
          band; anchored to the bottom-right corner on desktop so it fills
          wide screens and bleeds off the edges. */}
      <Reveal
        delay={380}
        className="relative max-lg:container-x max-lg:pb-12 lg:absolute lg:-right-[1vw] lg:-bottom-[1.5vw] lg:w-[min(48vw,56rem)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-[var(--gutter)] -top-6 bottom-0 -z-10 bg-canvas [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] lg:hidden"
        />
        <HeroIllustration className="mx-auto mt-12 max-w-[26rem] lg:mt-0 lg:max-w-none" />
      </Reveal>
    </section>
  );
}
