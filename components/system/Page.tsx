import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";

/**
 * The building blocks every inner page is made of, so each one reads like
 * the homepage: Apple's product-page grammar on the AxxonTek palette.
 *
 *   Section      a chapter, on black or on the lifted #1d1d1f
 *   StoryHead    small heading, big headline, two-tone intro
 *   RowHead      48px headline on the left, a text link on the right
 *   Tile         the rounded card, flat, no glow
 *   TextLink     the orange "Learn more >" link
 *   Actions      a primary pill and a text link, side by side
 *
 * A two-tone intro: wrap the phrase that matters in <Strong>, the rest
 * stays grey.
 */

export function Section({
  children,
  alt = false,
  className = "",
  id,
}: {
  children: ReactNode;
  /** The lifted #1d1d1f ground instead of pure black. */
  alt?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-chapter-ground="ink"
      className={`chapter-y relative scroll-mt-16 ${alt ? "section-alt" : ""} ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function StoryHead({
  label,
  title,
  lede,
  children,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[52rem]">
      {label && (
        <Reveal as="p" className="label mb-3">
          {label}
        </Reveal>
      )}
      <Reveal delay={70}>
        <h2 className="text-display">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={140}>
          <p className="text-lede mt-6 max-w-[40ch]">{lede}</p>
        </Reveal>
      )}
      {children && <Reveal delay={200}>{children}</Reveal>}
    </div>
  );
}

export function RowHead({
  title,
  link,
}: {
  title: ReactNode;
  link?: { href: string; text: string };
}) {
  return (
    <Reveal className="section-row">
      <h2 className="text-chapter">{title}</h2>
      {link && <TextLink href={link.href}>{link.text}</TextLink>}
    </Reveal>
  );
}

/** Wraps the phrase that matters in a two-tone intro. */
export function Strong({ children }: { children: ReactNode }) {
  return <span className="text-tone">{children}</span>;
}

export function Tile({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`h-full rounded-[var(--r-card)] bg-surface-2 p-8 lg:p-10 ${className}`}>
      {children}
    </div>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5"
      >
        <Icon name="arrow" size={15} />
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-1 text-[1.0625rem] text-[#ff8a55] hover:underline ${className}`;
  return external || href.startsWith("mailto:") || href.startsWith("http") ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Actions({
  primary,
  secondary,
  center = false,
  className = "",
}: {
  primary?: { href: string; text: string };
  secondary?: { href: string; text: string };
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${center ? "justify-center" : ""} ${className}`}
    >
      {primary &&
        (primary.href.startsWith("http") || primary.href.startsWith("mailto:") ? (
          <a
            href={primary.href}
            className="pill pill-ember hover:bg-ember-deep"
            {...(primary.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {primary.text}
          </a>
        ) : (
          <Link href={primary.href} className="pill pill-ember hover:bg-ember-deep">
            {primary.text}
          </Link>
        ))}
      {secondary && <TextLink href={secondary.href}>{secondary.text}</TextLink>}
    </div>
  );
}

/** A small rounded tag, for categories and features. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.75rem] leading-4 tracking-[-0.01em] text-tone-mute">
      {children}
    </span>
  );
}

/** The closing ask most pages end on. */
export function CloseAsk({
  title,
  lede,
  primary = { href: "/contact", text: "Start a project" },
  secondary,
}: {
  title: ReactNode;
  lede?: ReactNode;
  primary?: { href: string; text: string };
  secondary?: { href: string; text: string };
}) {
  return (
    <Section alt>
      <div className="mx-auto max-w-[44rem] text-center">
        <Reveal>
          <h2 className="text-chapter">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={70}>
            <p className="text-lede mx-auto mt-5 max-w-[38ch]">{lede}</p>
          </Reveal>
        )}
        <Reveal delay={140}>
          <Actions primary={primary} secondary={secondary} center className="mt-8" />
        </Reveal>
      </div>
    </Section>
  );
}
