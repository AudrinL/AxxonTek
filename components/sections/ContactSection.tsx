"use client";

import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/Icon";
import { MaskedWords } from "@/components/motion/MaskedWords";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

/**
 * The ask, with the form right there. Putting the form on the homepage
 * removes a page load between "I'm interested" and "I've told you".
 */
export function ContactSection() {
  return (
    <section id="contact" className="section-y band scroll-mt-20">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Start a conversation</p>
            </Reveal>
            <MaskedWords
              as="h2"
              text={"Tell us what you are\ntrying to solve."}
              accent={["solve."]}
              className="text-heading max-w-[14ch]"
            />
            <Reveal delay={0.1}>
              <p className="text-lede mt-6 max-w-md">
                We will tell you honestly whether we are the right team for it — and if we are not,
                who might be.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mt-9 flex flex-col gap-5">
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-tint text-ember">
                    <Icon name="mail" size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] text-faint">Prefer email?</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[0.9375rem] font-medium text-bone transition-colors hover:text-ember"
                    >
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-tint text-ember">
                    <Icon name="pin" size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] text-faint">Visit us</span>
                    <span className="text-[0.9375rem] font-medium text-bone">
                      {site.address.line1}, {site.address.line2}, {site.address.city}
                    </span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-tint text-ember">
                    <Icon name="clock" size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] text-faint">Response time</span>
                    <span className="text-[0.9375rem] font-medium text-bone">
                      Within one business day, from an engineer
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
