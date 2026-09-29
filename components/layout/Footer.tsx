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
 *
 * On a desktop the footer is exactly one screen tall: the content keeps its
 * natural size and the dotted logo takes whatever height is left, resizing
 * itself to fit. On a very short window it grows past a screen instead of
 * squashing the logo to nothing.
 */
export function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden border-t border-line lg:flex lg:min-h-[100svh] lg:flex-col">
      <FooterDust />

      <div className="container-x relative w-full py-10 lg:pt-[5.5rem] lg:pb-6">
        {/* The ask. Desktop only: on a phone every page already ends with
            its own ask just above, and repeating it only makes the footer long. */}
        <div className="hidden items-center justify-between gap-8 border-b border-line pb-8 lg:flex">
          <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.005em]">
            Have a <span className="text-serif">project</span> in mind?
          </h2>
          <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
            Start a project
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        {/* Columns */}
        {/* Phones: logo on top, then each list two links to a row, then contact.
            Desktop: four columns. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:mt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo large />
            <p className="mt-5 hidden max-w-xs lg:block text-[0.875rem] leading-[1.43] text-tone-mute">
              A technology company in Kigali. We build software, cloud and smart systems.
            </p>
          </div>

          <FooterColumn title="Explore" className="col-span-2 lg:col-span-1" twoUp>
            {primaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company" className="col-span-2 lg:col-span-1" twoUp>
            {secondaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch" className="col-span-2 lg:col-span-1">
            <li className="text-[0.75rem] leading-4 text-tone-mute">
              {site.address.line1}, {site.address.line2}
              <br className="hidden lg:inline" />
              <span className="lg:hidden">, </span>
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
            <li className="flex flex-wrap gap-2 pt-1 lg:pt-2">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 lg:mt-8 lg:gap-4 lg:pt-5">
          <p className="text-[0.75rem] leading-4 text-tone-faint">
            &copy; {new Date().getFullYear()} {site.name}. {site.tagline}.
          </p>
          <nav className="flex gap-6" aria-label="Legal">
            <FooterLink href="/privacy" inline>Privacy</FooterLink>
            <FooterLink href="/terms" inline>Terms</FooterLink>
          </nav>
        </div>
      </div>

      {/* The logo in dots, the last thing on the page. */}
      <div className="relative pb-4 lg:flex lg:flex-1 lg:flex-col lg:pb-4">
        <div className="relative mx-auto aspect-[958/310] w-full max-w-[calc(78.75rem+2*var(--gutter))] lg:aspect-auto lg:min-h-[6.5rem] lg:flex-1">
          <FooterMark />
          <span className="sr-only">AxxonTek</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className = "",
  twoUp = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Lay the links out two to a row on phones, to keep the footer short. */
  twoUp?: boolean;
}) {
  return (
    <div className={className}>
      <h2 className="mb-3 lg:mb-4 text-[0.75rem] leading-4 font-semibold tracking-[-0.01em] text-tone">{title}</h2>
      <ul
        className={
          twoUp
            ? "grid grid-cols-2 gap-x-6 gap-y-2.5 lg:flex lg:flex-col lg:gap-3"
            : "flex flex-col gap-2.5 lg:gap-3"
        }
      >
        {children}
      </ul>
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
