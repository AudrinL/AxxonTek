"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/site";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { easeOutExpo } from "@/lib/motion";

/**
 * Objection handling. Every question here is one a buyer would otherwise
 * have to email us to ask — answering it on the page removes a reason not
 * to book the call.
 */
export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="section-y scroll-mt-20">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-5">Before you ask</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text="Questions we get on the first call."
              accent={["first"]}
              className="text-heading max-w-[14ch]"
            />
            <Reveal delay={0.1}>
              <p className="text-lede mt-6 max-w-sm">
                Straight answers, so the call itself can be about your project.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="card divide-y divide-hairline overflow-hidden rounded-2xl">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.0625rem] font-medium tracking-tight transition-colors hover:text-ember-text-text sm:px-7"
                      >
                        {item.q}
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                            isOpen
                              ? "rotate-45 border-ember bg-ember text-white"
                              : "border-hairline text-faint"
                          }`}
                          aria-hidden
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 5v14M5 12h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: easeOutExpo }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-mute sm:px-7 sm:pr-20">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
