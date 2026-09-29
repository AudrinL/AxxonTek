import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/Icon";
import { SocialIcon } from "@/components/SocialIcon";
import { FooterDust, FooterMark } from "@/components/layout/FooterParticles";

/**
 * The footer, after rho.co: faint dust drifting behind everything, which
 * swirls round the cursor, then the ask and the link columns, and at the very
 * foot the logo drawn in dots that part as the cursor passes over them.
 */
export function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden border-t border-line">
      <FooterDust />

      <div className="container-x relative py-16">
        {/* The ask */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-14 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.01em]">
            Have a <span className="text-serif">project</span> in mind?
          </h2>
          <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
            Start a project
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo large />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-tone-mute">
              A technology company in Kigali. We build software, cloud and smart systems.
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
            <li className="flex flex-wrap gap-2 pt-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-firm text-tone-mute transition-colors duration-[var(--t-hover)] hover:border-tone hover:text-tone"
                >
                  <SocialIcon name={social.label} />
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

      {/* The logo in dots, the last thing on the page. */}
      <div className="relative pb-6">
        <div className="relative mx-auto aspect-[958/310] w-full max-w-[calc(78.75rem+2*var(--gutter))]">
          <FooterMark />
          <span className="sr-only">AxxonTek</span>
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
