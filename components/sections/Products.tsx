"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InkPanel, Rule } from "@/components/layout/Rule";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { hasShot, work } from "@/lib/work";

/**
 * Proof that we ship, shown with the actual products rather than described.
 *
 * The one dark passage on the page. It fades in and out of the canvas over
 * nine rems at each end (see InkPanel) so it reads as a change of light
 * rather than a black block dropped onto the page — and the screenshots,
 * which are light, sit on it the way a print does on a gallery wall.
 */
export function Products() {
  const ours = work.filter((w) => w.category === "products");

  return (
    <InkPanel id="products" className="section-y scroll-mt-24">
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label label-dot mb-6 text-on-ink-mute">
                <span className="label-dot-mark" aria-hidden />
                Built in our lab
              </p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="We do not only build for clients."
              accent={["only"]}
              accentClassName="text-ember"
              className="text-heading max-w-[15ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-on-ink-mute">
              When we find a problem specific to Africa that nobody is solving,
              we build the product ourselves — and run it.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="grid gap-x-10 gap-y-16 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {ours.map((item) => (
            <motion.li
              key={item.slug}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
              }}
            >
              <Link href={`/work/${item.slug}`} className="group block">
                {hasShot(item) && (
                  <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-panel)] bg-ink-soft ring-1 ring-line-on-ink">
                    <Image
                      src={item.shot}
                      alt={`${item.name} interface`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                    />
                  </div>
                )}

                <h3 className="text-[clamp(1.5rem,2.6vw,2.125rem)]">{item.name}</h3>

                <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-on-ink-mute">
                  {item.summary}
                </p>

                <span className="label mt-7 flex items-center gap-3 text-on-ink transition-colors duration-500 group-hover:text-ember">
                  Read the case study
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.1}>
          <div className="mt-20">
            <Rule tone="ink" />
            <Link
              href="/work"
              className="label mt-7 inline-flex items-center gap-3 text-on-ink-mute transition-colors duration-300 hover:text-ember"
            >
              See all work
              <span aria-hidden>&#8594;</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </InkPanel>
  );
}
