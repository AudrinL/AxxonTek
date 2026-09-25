import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";

/**
 * A clean footer, not a sitemap. Two link columns, the brand line, contact
 * and legal. It keeps whatever ground the section above it arrived on, so a
 * page that ends dark ends dark all the way down rather than flickering back
 * to canvas for a few hundred pixels of links.
 */
export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line">
      <div className="container-x py-16">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.022em]">
              Technology for a changing Africa.
            </p>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-tone-mute">
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
            <li className="text-[0.9375rem] text-tone-mute">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[0.9375rem] font-medium underline decoration-line-firm underline-offset-4 transition-colors duration-[var(--t-hover)] hover:text-accent"
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
      <h2 className="label mb-5">
        <span className="label-dot" aria-hidden />
        {title}
      </h2>
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
      className="text-[0.9375rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-tone"
    >
      {children}
    </Link>
  );
  return inline ? link : <li>{link}</li>;
}
