import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";

/**
 * The opening block every page other than the homepage uses.
 *
 * It always opens on the canvas, so arriving anywhere on the site feels
 * like arriving in the same building, and it leaves the ground changes
 * for the chapters that earn them further down.
 */
export function PageHero({
  label,
  title,
  lede,
  cta,
  meta,
}: {
  label: string;
  title: React.ReactNode;
  lede?: string;
  cta?: { href: string; text: string };
  meta?: string;
}) {
  return (
    <section
      data-chapter-ground="canvas"
      className="bloom relative overflow-hidden pt-40 pb-[var(--chapter)] md:pt-48"
    >
      <span aria-hidden className="bloom-light -top-[28rem] -right-[16rem] opacity-50" />

      <div className="container-x">
        <Reveal as="p" className="label mb-7">
          <span className="label-dot" aria-hidden />
          {label}
        </Reveal>

        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <Reveal delay={70}>
            <h1 className="text-display max-w-[15ch]">{title}</h1>
          </Reveal>

          {lede && (
            <Reveal delay={140}>
              <p className="text-lede max-w-[46ch]">{lede}</p>
              {cta && (
                <Link href={cta.href} className="pill pill-ember mt-7 hover:bg-ember-deep">
                  {cta.text}
                </Link>
              )}
            </Reveal>
          )}
        </div>

        {meta && (
          <Reveal delay={200}>
            <p className="mt-14 border-t border-line pt-6 font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase">
              {meta}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
