import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { SocialIcon } from "@/components/SocialIcon";
import { Section, Strong } from "@/components/system/Page";
import { getStudioConcept, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Tell AxxonTek what you need. An engineer replies within one business day.",
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
            Have a <span className="text-serif">project</span> in mind?
          </>
        }
        lede={
          <>
            <Strong>Tell us what you need.</Strong> An engineer, not a salesperson, replies
            within one business day.
          </>
        }
      />

      <Section alt className="!pt-8 md:!pt-12">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-5">
            {concept && (
              <div className="flex items-center gap-4 rounded-[var(--r-card)] bg-black p-5">
                <span className="relative h-14 w-20 flex-none overflow-hidden rounded-[0.75rem] bg-surface-2">
                  {concept.image && (
                    <Image src={concept.image} alt="" fill sizes="80px" className="object-cover" />
                  )}
                </span>
                <div>
                  <p className="text-[0.75rem] text-tone-faint">Design you picked</p>
                  <p className="mt-1 text-[1.0625rem] font-semibold text-tone">{concept.title}</p>
                </div>
              </div>
            )}
            <div className="rounded-[var(--r-card)] bg-black p-6 sm:p-10">
              <ContactForm
                defaultEmail={email}
                concept={conceptSlug}
                defaultInterest={concept ? "Building a website" : undefined}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal>
              <InfoTile title="Email us">
                <a href={`mailto:${site.email}`} className="text-[1.0625rem] text-[#ff8a55] hover:underline">
                  {site.email}
                </a>
                {site.phone && (
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="text-[1.0625rem] text-[#ff8a55] hover:underline"
                  >
                    {site.phone}
                  </a>
                )}
                <p className="mt-2 text-[0.875rem] text-tone-faint">The same people read the form and the inbox.</p>
              </InfoTile>
            </Reveal>

            <Reveal delay={70}>
              <InfoTile title="Where we are">
                <address className="text-[1.0625rem] leading-[1.47] text-tone-mute not-italic">
                  {site.address.line1}, {site.address.line2}
                  <br />
                  {site.address.city}
                </address>
              </InfoTile>
            </Reveal>

            <Reveal delay={140}>
              <InfoTile title="Follow us">
                <div className="flex flex-wrap gap-2">
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-tone-mute transition-colors duration-[var(--t-hover)] hover:text-tone"
                    >
                      <SocialIcon name={social.label} />
                    </a>
                  ))}
                </div>
              </InfoTile>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoTile({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--r-card)] bg-black p-6 sm:p-8">
      <h2 className="font-display text-[1.3125rem] font-semibold">{title}</h2>
      <div className="mt-4 flex flex-col gap-1">{children}</div>
    </div>
  );
}
