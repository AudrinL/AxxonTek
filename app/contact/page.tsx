import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { getStudioConcept, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have something worth building? Tell the AxxonTek team in Kigali what you are trying to make. An engineer replies within one business day.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; concept?: string }>;
}) {
  const { email, concept: conceptSlug } = await searchParams;
  const concept = conceptSlug ? getStudioConcept(conceptSlug) : undefined;

  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Have something <span className="text-serif text-accent">worth</span> building?
          </>
        }
        lede="Tell us what you are trying to make. An engineer, not a salesperson, comes back to you within one business day."
      />

      <section data-chapter-ground="canvas" className="pb-[clamp(6rem,13vw,11rem)]">
        <div className="container-x">
          <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[1fr_0.72fr]">
            <div className="order-2 lg:order-1">
              {concept && (
                <div className="card mb-5 flex items-center gap-4 p-5">
                  <span
                    aria-hidden
                    className="h-12 w-12 flex-none rounded-[var(--r-inner)]"
                    style={{
                      background: `radial-gradient(120% 130% at 20% 0%, ${concept.accent[1]}, ${concept.accent[0]})`,
                    }}
                  />
                  <div>
                    <p className="font-mono text-[0.625rem] tracking-[0.14em] text-tone-faint uppercase">
                      Studio concept · {concept.industry} / {concept.number}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-medium text-tone">{concept.title}</p>
                  </div>
                </div>
              )}
              <div className="card p-6 sm:p-8">
                <ContactForm
                  defaultEmail={email}
                  concept={conceptSlug}
                  defaultInterest={concept ? "Building a website" : undefined}
                />
              </div>
            </div>

            <div className="order-1 flex flex-col gap-8 lg:order-2">
              <Reveal>
                <InfoBlock label="Where we are">
                  <address className="text-[0.9375rem] leading-relaxed text-tone-mute not-italic">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.city}
                  </address>
                </InfoBlock>
              </Reveal>

              <Reveal delay={70}>
                <InfoBlock label="Direct contact">
                  <a
                    href={`mailto:${site.email}`}
                    className="block text-[0.9375rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-accent"
                  >
                    {site.email}
                  </a>
                  {site.phone && (
                    <a
                      href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                      className="block text-[0.9375rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-accent"
                    >
                      {site.phone}
                    </a>
                  )}
                </InfoBlock>
              </Reveal>

              <Reveal delay={140}>
                <InfoBlock label="Elsewhere">
                  <div className="flex flex-col gap-2">
                    {site.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.9375rem] text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-accent"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </InfoBlock>
              </Reveal>

              <Reveal delay={210}>
                <div className="card p-6">
                  <p className="text-[0.9375rem] leading-relaxed text-tone-mute">
                    Prefer to skip the form? Email us directly. The same people read it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <h2 className="label mb-4">
        <span className="label-dot" aria-hidden />
        {label}
      </h2>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
