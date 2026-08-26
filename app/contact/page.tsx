import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Ready to elevate your digital infrastructure? Talk to the AxxonTek team in Kigali about your project.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Let's talk."}
        accent={["talk."]}
        lede="Ready to elevate your digital infrastructure? Tell us what you are building and we will come back to you within one business day."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="pb-[clamp(6rem,13vw,11rem)]">
        <div className="container-x">
          <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[1fr_0.72fr]">
            <div className="order-2 lg:order-1">
              <ContactForm defaultEmail={email} />
            </div>

            <div className="order-1 flex flex-col gap-10 lg:order-2">
              <Reveal>
                <InfoBlock label="Headquarters">
                  <address className="text-[0.9375rem] leading-relaxed text-mute not-italic">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.city}
                  </address>
                  <a
                    href="https://maps.google.com/?q=Norrsken+Kigali,+1+KN+78+St,+Kigali"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-ember transition-opacity hover:opacity-75"
                  >
                    Open in Maps
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M7 17L17 7m0 0H8m9 0v9"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </InfoBlock>
              </Reveal>

              <Reveal delay={0.08}>
                <InfoBlock label="Direct contact">
                  <a
                    href={`mailto:${site.email}`}
                    className="block text-[0.9375rem] text-mute transition-colors hover:text-ember"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="block text-[0.9375rem] text-mute transition-colors hover:text-ember"
                  >
                    {site.phone}
                  </a>
                </InfoBlock>
              </Reveal>

              <Reveal delay={0.16}>
                <InfoBlock label="Elsewhere">
                  <div className="flex flex-col gap-2">
                    {site.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.9375rem] text-mute transition-colors hover:text-ember"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </InfoBlock>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="rounded-2xl border border-hairline bg-ink-raised p-7">
                  <p className="text-[0.9375rem] leading-relaxed text-mute">
                    Prefer to skip the form? Email us directly — the same four people read it.
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
    <div className="hairline-t pt-6">
      <h2 className="eyebrow mb-4">{label}</h2>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
