"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { products } from "@/lib/site";

/**
 * Proof we ship. Two products built in the lab, each a large card. This is
 * the closest thing the site has to a case study until a client one exists,
 * so it sits right after the catalogue.
 */
export function Products() {
  return (
    <section id="products" className="section-y scroll-mt-20">
      <div className="container-x">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-5">Built in our lab</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="Products we built, because the problem was real."
              accent={["real."]}
              className="text-heading"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-mute">
              We do not only build for clients. When we find a problem specific to Africa that
              nobody is solving, the lab builds the product.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {products.map((product) => {
            const href = product.href || "/contact";
            const external = product.href.startsWith("http");
            const linkLabel = product.href ? `Visit ${product.name}` : "Ask for a demo";

            return (
              <motion.li
                key={product.name}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
                }}
              >
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="card group relative flex h-full flex-col overflow-hidden p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ember/40 hover:shadow-card-hover sm:p-9"
                >
                  {/* Warm corner bloom */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,var(--color-ember-tint),transparent)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ember text-white shadow-[0_8px_20px_-8px_var(--color-ember)]">
                      <Icon name={product.icon} size={24} />
                    </span>
                    {product.status && (
                      <span className="rounded-full border border-ember/30 bg-ember-tint px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-ember uppercase">
                        {product.status}
                      </span>
                    )}
                  </div>

                  <h3 className="relative mt-8 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <p className="relative mt-2 text-[0.9375rem] font-medium text-ember">
                    {product.tagline}
                  </p>
                  <p className="relative mt-4 flex-1 text-[1rem] leading-relaxed text-mute">
                    {product.body}
                  </p>

                  <span className="relative mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-bone">
                    {linkLabel}
                    <Icon
                      name={external ? "arrow-up-right" : "arrow"}
                      size={16}
                      className="text-ember transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
