import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { Actions, CloseAsk, RowHead, Section, Strong, Tile } from "@/components/system/Page";
import { hosting, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Managed hosting from AxxonTek for a flat 133 USD a year: your site online, fast, backed up and kept secure. Projects are quoted at a fixed price after a short conversation.",
  alternates: { canonical: "/pricing" },
};

const priceFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: hosting.currency,
  maximumFractionDigits: 0,
});

const howWePrice: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clipboard",
    title: "Projects: one fixed price.",
    body: "Apps, websites and installations get a fixed price after we understand the problem.",
  },
  {
    icon: "loop",
    title: "Ongoing work: a monthly fee.",
    body: "Support, advice and monitoring for a flat monthly fee you know in advance.",
  },
  {
    icon: "server",
    title: "Hosting: a public price.",
    body: `${priceFmt.format(hosting.price)} a ${hosting.period}, the plan on this page.`,
  },
];

/**
 * Pricing. The one public price, hosting, as a single product tile in the
 * middle of the page, then a plain account of how everything else is priced.
 * No invented tiers.
 */
export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title={
          <>
            Simple, <span className="text-serif">honest</span> pricing.
          </>
        }
        lede={
          <>
            <Strong>Hosting has one public price.</Strong> Everything else gets a fixed quote
            after a short conversation about what you need.
          </>
        }
      />

      <Section alt>
        <Reveal>
          <div className="mx-auto max-w-[44rem] rounded-[var(--r-card)] bg-black p-6 text-center sm:p-8 md:p-14">
            <p className="label justify-center">{hosting.name}</p>
            <p className="mt-6 flex items-end justify-center gap-2">
              <span className="text-display leading-none">{priceFmt.format(hosting.price)}</span>
              <span className="mb-2 text-[1.0625rem] text-tone-mute">/ {hosting.period}</span>
            </p>
            <p className="mt-3 text-[0.875rem] text-tone-faint">{hosting.cadence}</p>
            <p className="text-lede mx-auto mt-6 max-w-[34ch]">
              <Strong>Your site stays online, fast and secure.</Strong> We run it and watch it
              for you.
            </p>

            <ul className="mx-auto mt-9 grid max-w-[34rem] gap-3 text-left">
              {hosting.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                    <Icon name="check" size={14} />
                  </span>
                  <span className="text-[1.0625rem] leading-[1.47] text-tone-mute">{item}</span>
                </li>
              ))}
            </ul>

            <Actions
              center
              className="mt-10"
              primary={{ href: hosting.checkoutUrl, text: "Subscribe" }}
              secondary={{ href: `mailto:${site.email}?subject=Managed%20hosting`, text: "Ask a question first" }}
            />
            <p className="mt-6 text-[0.75rem] leading-4 text-tone-faint">{hosting.note}</p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <RowHead title="How everything else is priced." link={{ href: "/capabilities", text: "See what we build" }} />
        <ul className="grid gap-5 md:grid-cols-3">
          {howWePrice.map((row, i) => (
            <Reveal as="li" key={row.title} delay={i * 70} className="h-full">
              <Tile>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-accent">
                  <Icon name={row.icon} size={20} />
                </span>
                <h3 className="mt-10 font-display text-[1.5rem] font-semibold leading-[1.17]">
                  {row.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{row.body}</p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CloseAsk
        title="Want a quote?"
        lede="Tell us about your project. We reply within one business day."
        primary={{ href: "/contact", text: "Get a quote" }}
      />
    </>
  );
}
