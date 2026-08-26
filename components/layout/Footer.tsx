"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { services, site } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LazyParticleField } from "@/components/three/LazyParticleField";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline">
      {/* Ambient field - dimmer, fewer particles, no ring formation. */}
      <LazyParticleField
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        count={900}
        spread={55}
        size={1.6}
        opacity={0.4}
        includeRing={false}
        interactive={false}
        cameraY={10}
        cameraZ={22}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink"
      />

      <div className="container-x relative pt-[clamp(4rem,9vw,7rem)] pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]">
              Complete technology.
            </h2>
            <p className="text-lede mt-4 mb-8 text-[0.9375rem]">
              Insights on enterprise tech, cloud architecture, and security — occasionally, and only
              when we have something worth saying.
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

          <FooterColumn title="Headquarters">
            <address className="text-sm leading-relaxed text-mute not-italic">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}
            </address>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-mute transition-colors hover:text-ember"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm text-mute transition-colors hover:text-ember"
            >
              {site.phone}
            </a>

            <div className="mt-6 flex gap-2.5">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-[0.6875rem] font-medium tracking-wide text-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60 hover:text-ember"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        {/* Oversized wordmark - the "signature" moment at the end of the page. */}
        <motion.div
          className="mt-[clamp(4rem,8vw,7rem)] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="block bg-gradient-to-b from-bone/[0.14] to-bone/[0.02] bg-clip-text text-center text-[clamp(4rem,17vw,15rem)] leading-[0.8] font-medium tracking-[-0.05em] text-transparent select-none"
            initial={{ y: "22%" }}
            whileInView={{ y: "0%" }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: easeOutExpo }}
          >
            {site.name}
          </motion.span>
        </motion.div>

        <div className="hairline-t mt-12 flex flex-col-reverse items-center justify-between gap-6 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logo.webp"
              alt={site.name}
              width={104}
              height={24}
              className="h-5 w-auto opacity-60"
            />
            <p className="text-[0.8125rem] text-faint">
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-7" aria-label="Legal">
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
      <h3 className="eyebrow mb-5">{title}</h3>
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
      className={`group inline-flex w-fit items-center text-mute transition-colors duration-300 hover:text-bone ${
        small ? "text-[0.8125rem]" : "text-sm"
      }`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ember transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </Link>
  );
}
