import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/Icon";
import { ParticleField } from "@/components/system/ParticleField";
import { StageFrame } from "@/components/system/StageFrame";

/**
 * The footer opens with a brand moment: a reactive particle field that idles
 * as an organised constellation, scatters away from the cursor, and assembles
 * into the wordmark while hovered. Below it, the real work: one clear ask and
 * clean link columns. It keeps whatever ground the section above it arrived
 * on, and the particles take their colour from that ground.
 */
export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line">
      {/* Brand particle strip */}
      <ParticleField
        text="AXXONTEK"
        className="stage-frame min-h-[clamp(15rem,30vw,24rem)] text-accent"
      >
        <StageFrame />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-[var(--gutter)]">
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-tone-faint uppercase">
            {site.address.city}
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-tone-faint uppercase">
            Move your cursor
          </span>
        </div>
        {/* Sized spacer so the strip has height; the canvas fills it. */}
        <div className="h-[clamp(15rem,30vw,24rem)]" aria-hidden />
        <span className="sr-only">AxxonTek</span>
      </ParticleField>

      <div className="container-x py-16">
        {/* The ask */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-14 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.01em]">
            Have something <span className="text-serif text-accent">worth</span> building?
          </h2>
          <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
            Start a project
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-tone-mute">
              A technology company in Kigali. We build products, systems and the
              emerging technology that becomes both.
            </p>
          </div>

          <FooterColumn title="Explore">
            {primaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {secondaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li className="text-[0.75rem] leading-4 text-tone-mute">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[0.75rem] font-medium underline decoration-line-firm underline-offset-4 transition-colors duration-[var(--t-hover)] hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-2 pt-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-firm font-mono text-[0.6875rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:border-tone hover:text-tone"
                >
                  {social.short}
                </a>
              ))}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-tone-faint uppercase">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Legal">
            <FooterLink href="/privacy" inline>Privacy</FooterLink>
            <FooterLink href="/terms" inline>Terms</FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-[0.75rem] leading-4 font-semibold tracking-[-0.01em] text-tone">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  inline = false,
}: {
  href: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  const link = (
    <Link
      href={href}
      className="text-[0.75rem] leading-4 tracking-[-0.01em] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-tone"
    >
      {children}
    </Link>
  );
  return inline ? link : <li>{link}</li>;
}
