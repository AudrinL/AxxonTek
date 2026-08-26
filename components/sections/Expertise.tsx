"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { expertise } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";

/**
 * Scroll-spy: GSAP ScrollTrigger tracks which entry is centred in the viewport
 * and the matching glass panel cross-fades in. Entries are also buttons, so
 * the section is operable by keyboard and pointer, not scroll alone.
 */
export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 45%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="section-y relative">
      <div className="container-x">
        <div className="mb-[clamp(3rem,6vw,5rem)] max-w-2xl">
          <p className="eyebrow mb-6">Expertise</p>
          <MaskedWords
            as="h2"
            text={"Depth where it counts."}
            accent={["counts."]}
            className="text-heading"
          />
        </div>

        <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr]">
          <ul className="flex flex-col">
            {expertise.map((item, index) => {
              const isActive = index === active;
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={isActive}
                    className="group block w-full border-t border-hairline py-9 text-left transition-colors last:border-b"
                  >
                    <span
                      aria-hidden
                      className={`absolute top-0 left-0 h-px bg-ember transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                    <span className="flex items-baseline gap-5">
                      <span
                        className={`font-mono text-[0.6875rem] tracking-widest transition-colors duration-500 ${
                          isActive ? "text-ember" : "text-faint"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight tracking-tight transition-colors duration-500 ${
                            isActive ? "text-bone" : "text-mute group-hover:text-bone"
                          }`}
                        >
                          {item.title}
                        </span>
                        <motion.span
                          className="block overflow-hidden"
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.6, ease: easeOutExpo }}
                        >
                          <span className="block max-w-md pt-3 text-[0.9375rem] leading-relaxed text-mute">
                            {item.body}
                          </span>
                        </motion.span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative aspect-4/3 w-full lg:sticky lg:top-28">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={expertise[active].id}
                className="glass absolute inset-0 overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
              >
                <figcaption className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between border-b border-hairline bg-ink/50 px-5 py-3 backdrop-blur-md">
                  <span className="text-[0.6875rem] font-medium tracking-[0.18em] text-mute uppercase">
                    {expertise[active].panelLabel}
                  </span>
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
                  </span>
                </figcaption>
                <Image
                  src={expertise[active].image}
                  alt={expertise[active].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover pt-11"
                />
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
