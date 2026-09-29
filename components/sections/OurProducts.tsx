"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { offerings } from "@/lib/site";

/**
 * Our Products, on canvas: the six things a visitor can ask us for.
 *
 * A wide list on the left, one large photograph on the right. The row under
 * the cursor (or focus) opens and its photograph takes the frame, so the
 * section is a single object that responds rather than six cards to scan.
 * Below the desktop breakpoint there is no cursor to follow, so every row
 * simply carries its own picture and stays open.
 *
 * Every photograph gets the same treatment, a desaturated plate under a warm
 * ember wash, so six unrelated stock sources read as one art-directed set.
 */
export function OurProducts() {
  const [active, setActive] = useState(0);

  return (
    <section id="products" data-chapter-ground="canvas" className="chapter-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[20ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              Our products
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">
                Six things we build, and <span className="text-serif text-accent">run</span> for you.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[42ch]">
            <p className="text-lede">
              Ask for one, or a few that work together. Each is designed, built and
              looked after by the same team, so nothing falls between suppliers.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <ul className="border-t border-line">
            {offerings.map((item, i) => {
              const open = i === active;
              return (
                <Reveal as="li" key={item.id} delay={Math.min(i, 3) * 70}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block border-b border-line py-7 lg:py-8"
                  >
                    <div className="flex items-baseline gap-6">
                      <span
                        className={`font-mono text-[0.75rem] tracking-[0.14em] uppercase transition-colors duration-[var(--t-base)] ${
                          open ? "text-accent" : "text-tone-faint"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`flex-1 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] transition-colors duration-[var(--t-base)] ${
                          open ? "text-tone" : "lg:text-tone-faint"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <span
                        aria-hidden
                        className={`hidden transition-[opacity,transform,color] duration-[var(--t-base)] ease-out lg:block ${
                          open ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0"
                        }`}
                      >
                        <Icon name="arrow" size={20} />
                      </span>
                    </div>

                    {/* The photograph, for touch and narrow screens. */}
                    <div className="window mt-6 aspect-[16/10] lg:hidden">
                      <Plate item={item} sizes="(min-width: 1024px) 0px, 92vw" />
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-[var(--t-reveal)] ease-[var(--ease-out)] max-lg:!grid-rows-[1fr] max-lg:!opacity-100 ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-5 lg:pl-[calc(0.75rem+1.5rem+1ch)]">
                          <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-tone-mute">
                            {item.line}
                          </p>
                          <p className="mt-4 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-line-firm px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-tone-faint uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          {/* The stage: every photograph is mounted, one is lit. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="window aspect-[4/5] xl:aspect-[5/6]" aria-hidden>
                {offerings.map((item, i) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                  >
                    <Plate item={item} sizes="40vw" priority={i === 0} />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6 font-mono text-[0.625rem] tracking-[0.16em] text-white/85 uppercase">
                  <span>{offerings[active].name}</span>
                  <span>
                    {String(active + 1).padStart(2, "0")} / {String(offerings.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One photograph with the house treatment: desaturated, ember wash, shade. */
function Plate({
  item,
  sizes,
  priority = false,
}: {
  item: (typeof offerings)[number];
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={item.image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale contrast-[1.05] brightness-[1.05]"
        style={{ objectPosition: item.focus }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(160deg, var(--ember-deep) 0%, var(--ember) 55%, #ff8a55 100%)",
          opacity: 0.82,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,17,16,0.62) 0%, rgba(18,17,16,0) 45%)",
        }}
      />
    </>
  );
}
