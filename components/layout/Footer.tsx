import Link from "next/link";
import { services, site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="container-x pt-[clamp(3.5rem,7vw,5.5rem)] pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-mute">
              An engineering team in Kigali building apps, websites and smart systems for African
              SMEs and individuals — and our own products, TalentLens and Floow.
            </p>
            <p className="mt-7 mb-3 text-[0.8125rem] font-medium text-bone">
              Occasional notes on engineering — no spam.
            </p>
            <NewsletterForm />
          </div>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {company.map((c) => (
              <FooterLink key={c.href} href={c.href}>
                {c.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <address className="text-sm leading-relaxed text-mute not-italic">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}
            </address>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-sm font-medium text-bone transition-colors hover:text-ember"
            >
              {site.email}
            </a>
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="text-sm text-mute transition-colors hover:text-ember"
              >
                {site.phone}
              </a>
            )}

            <div className="mt-5 flex gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-ink-raised text-[0.6875rem] font-semibold tracking-wide text-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="hairline-t mt-12 flex flex-col-reverse items-center justify-between gap-5 pt-7 sm:flex-row">
          <p className="text-[0.8125rem] text-faint">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <nav className="flex items-center gap-6" aria-label="Legal">
            <FooterLink href="/privacy" small>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" small>
              Terms of Service
            </FooterLink>
            <FooterLink href="/privacy#cookies" small>
              Cookies
            </FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <h3 className="mb-4 text-[0.75rem] font-semibold tracking-[0.14em] text-faint uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  small,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`w-fit text-mute transition-colors duration-300 hover:text-ember ${
        small ? "text-[0.8125rem]" : "text-sm"
      }`}
    >
      {children}
    </Link>
  );
}
