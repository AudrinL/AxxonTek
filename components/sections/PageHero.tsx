import type { ReactNode } from "react";
import { Reveal } from "@/components/system/Reveal";
import { Actions } from "@/components/system/Page";

/**
 * The opening of every inner page, in the homepage's own grammar: a small
 * heading, a very large headline, a two-tone intro and, when there is one,
 * the next step. Centred and on black, so arriving anywhere on the site
 * feels like arriving in the same place.
 *
 * `children` renders under the text, for a product shot or a key visual.
 */
export function PageHero({
  label,
  title,
  lede,
  primary,
  secondary,
  children,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  primary?: { href: string; text: string };
  secondary?: { href: string; text: string };
  children?: ReactNode;
}) {
  return (
    <section data-chapter-ground="ink" className="relative pt-36 pb-[var(--chapter)] md:pt-44">
      <div className="container-x">
        <div className="mx-auto max-w-[56rem] text-center">
          <Reveal as="p" className="label mb-4 justify-center">
            {label}
          </Reveal>
          <Reveal delay={70}>
            <h1 className="text-display mx-auto max-w-[16ch]">{title}</h1>
          </Reveal>
          {lede && (
            <Reveal delay={140}>
              <p className="text-lede mx-auto mt-7 max-w-[38ch]">{lede}</p>
            </Reveal>
          )}
          {(primary || secondary) && (
            <Reveal delay={200}>
              <Actions primary={primary} secondary={secondary} center className="mt-9" />
            </Reveal>
          )}
        </div>
        {children && (
          <Reveal delay={240} className="mt-16 lg:mt-20">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
