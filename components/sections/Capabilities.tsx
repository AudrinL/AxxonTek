"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Split scroll: the text column scrolls normally while the image column is
 * pinned. GSAP drives the crossfade + scale of each layer from the scroll
 * position rather than toggling classes, so the transition tracks the scrub
 * exactly and reverses cleanly.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Initial state: only the first layer visible.
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        gsap.set(layer, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.06 });
      });

      const show = (index: number) => {
        setActive(index);
        layerRefs.current.forEach((layer, i) => {
          if (!layer) return;
          gsap.to(layer, {
            autoAlpha: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.06,
            duration: reduced ? 0 : 0.85,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      blockRefs.current.forEach((block, index) => {
        if (!block) return;
        ScrollTrigger.create({
          trigger: block,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => show(index),
          onEnterBack: () => show(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-y relative">
      <div className="container-x">
        <div className="mb-[clamp(4rem,8vw,7rem)] max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">Our services</p>
          </Reveal>
          <MaskedWords
            as="h2"
            text={"Comprehensive technology solutions."}
            accent={["solutions."]}
            className="text-heading"
          />
          <Reveal delay={0.15}>
            <p className="text-lede mt-7 max-w-xl">
              From custom applications to intelligent systems, security infrastructure, and scalable
              software platforms. We deliver complete solutions that drive innovation and growth
              across your organization.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-20 lg:grid-cols-2">
          {/* Text column */}
          <div className="flex flex-col">
            {capabilities.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                className="flex min-h-[70vh] flex-col justify-center py-14 lg:min-h-[85vh]"
              >
                {/* Inline image on small screens, where the pinned column collapses */}
                <div className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-xl lg:hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    /* Same `sizes` as the pinned desktop copy below: both render
                       the same src, so matching them means one download serves
                       both breakpoints instead of two derivatives. */
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>

                <span className="mb-6 flex items-center gap-4">
                  <span
                    className={`font-mono text-[0.6875rem] tracking-widest transition-colors duration-500 ${
                      active === index ? "text-ember" : "text-faint"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span
                    className={`h-px flex-1 transition-colors duration-500 ${
                      active === index ? "bg-ember/40" : "bg-hairline"
                    }`}
                  />
                </span>

                <Reveal>
                  <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-tight">
                    {item.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-lede mt-6 max-w-lg">{item.body}</p>
                </Reveal>
                <Reveal delay={0.14}>
                  <Link
                    href={item.href}
                    className="group mt-9 inline-flex items-center gap-3 text-sm text-bone"
                  >
                    <span className="relative">
                      Learn more
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline transition-all duration-500 group-hover:border-ember group-hover:bg-ember/10">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12h14m-6-6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-500 group-hover:translate-x-0.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Pinned visual column (desktop only) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[18vh] h-[64vh]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-hairline">
                {capabilities.map((item, index) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      layerRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                    />
                    <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-7">
                      <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-bone/80 uppercase">
                        {item.title}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-ember">{item.index}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress rail */}
              <div className="mt-6 flex gap-2" aria-hidden>
                {capabilities.map((item, index) => (
                  <span
                    key={item.id}
                    className={`h-px flex-1 transition-colors duration-500 ${
                      index === active ? "bg-ember" : "bg-hairline"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
