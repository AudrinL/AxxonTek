import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { hosting, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Managed hosting from AxxonTek: your site online, fast, backed up and patched on infrastructure we run, for a flat 133 USD a year.",
  alternates: { canonical: "/pricing" },
};

/**
 * Pricing exists for the one service with a public, fixed number: managed
 * hosting. Everything else on the site is scoped after a conversation, so
 * this page says that plainly rather than inventing tiers that do not
 * exist. The hosting plan gets the bloom panel, the studio's signature
 * material, because it is the thing the page is here to sell. The service
 * imagery sits below in a quiet grid, one 16:9 window each.
 */

const priceFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: hosting.currency,
  maximumFractionDigits: 0,
});

const howWePrice = [
  {
    icon: "clipboard",
    k: "Projects are fixed price",
    v: "An app, a website or an installation gets one fixed price after the research phase, so you are never quoted on a guess.",
  },
  {
    icon: "loop",
    k: "Ongoing work is a retainer",
    v: "Advisory, support and monitoring run on a flat monthly fee. You know the number before the month starts.",
  },
  {
    icon: "server",
    k: "Hosting is published",
    v: "Because hosting is a known quantity, it carries a public price. That is the plan above.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title={
          <>
            One price for hosting, <span className="text-accent">no surprises</span>.
          </>
        }
        lede="Most of what we do is scoped to your problem and priced after a conversation. Hosting is the exception: a known quantity, so it carries a number you can read right here."
        meta={`${hosting.cadence} · ${priceFmt.format(hosting.price)} per ${hosting.period}`}
      />

      {/* The plan itself, on the ink ground with the signature bloom. */}
      <section data-chapter-ground="ink" className="bloom chapter-y relative overflow-hidden">
        <span aria-hidden className="bloom-light -top-[20rem] -left-[16rem] opacity-55" />
        <div className="container-x">
          <div className="grid items-stretch gap-x-14 gap-y-10 lg:grid-cols-2">
            {/* Left: the offer. */}
            <div className="flex flex-col">
              <Reveal as="p" className="label mb-6">
                <span className="label-dot" aria-hidden />
                {hosting.name}
              </Reveal>
              <Reveal delay={70}>
                <div className="flex items-end gap-3">
                  <span className="text-display leading-none">
                    {priceFmt.format(hosting.price)}
                  </span>
                  <span className="mb-2 font-mono text-[0.8125rem] tracking-[0.08em] text-tone-mute uppercase">
                    / {hosting.period}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-3 font-mono text-[0.75rem] tracking-[0.1em] text-tone-faint uppercase">
                  {hosting.cadence}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lede mt-7 max-w-[40ch]">{hosting.lede}</p>
              </Reveal>

              <Reveal delay={240}>
                <ul className="mt-8 flex flex-col gap-3.5">
                  {hosting.includes.map((item) => (
                    <li key={item} className="flex gap-3.5">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ember-wash text-ember-text">
                        <Icon name="check" size={15} />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-tone-mute">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <a
                    href={hosting.checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pill pill-ember hover:bg-ember-deep"
                  >
                    Subscribe
                  </a>
                  <a
                    href={`mailto:${site.email}?subject=Managed%20hosting`}
                    className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
                  >
                    Ask a question first
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: the hosting image in a window, with the note anchored. */}
            <Reveal delay={120} className="h-full">
              <div className="window flex h-full flex-col">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={hosting.image}
                    alt="AxxonTek managed hosting"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="border-t border-white/10 p-6 text-[0.8125rem] leading-relaxed text-white/60">
                  {hosting.note}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The build work a hosting customer usually needs first, with imagery. */}
      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
            <div className="max-w-[22ch]">
              <Reveal as="p" className="label mb-6">
                <span className="label-dot" aria-hidden />
                What we build
              </Reveal>
              <Reveal delay={70}>
                <h2 className="text-chapter">Services we can host once they ship.</h2>
              </Reveal>
            </div>
            <Reveal delay={140} className="max-w-[42ch]">
              <p className="text-lede">
                These are scoped and quoted after a conversation. Hosting keeps them
                online afterwards for the flat yearly price above.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.name} delay={i * 70} className="h-full">
                <Link
                  href={service.href}
                  className="group card flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[var(--t-base)] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.022em] transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                      {service.blurb}
                    </p>
                    <span
                      aria-hidden
                      className="mt-6 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-tone-faint uppercase transition-colors duration-[var(--t-hover)] group-hover:text-accent"
                    >
                      Start a conversation
                      <span className="inline-block transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1">
                        &#8594;
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How everything else is priced, so the page is honest about scope. */}
      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <div className="max-w-[24ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              Everything else
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">How the rest of the work is priced.</h2>
            </Reveal>
          </div>

          <dl className="mt-14 grid gap-4 md:grid-cols-3">
            {howWePrice.map((row, i) => (
              <Reveal as="div" key={row.k} delay={i * 70} className="h-full">
                <div className="card h-full p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-wash text-ember-text">
                    <Icon name={row.icon} size={20} />
                  </span>
                  <dt className="mt-5 font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {row.k}
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">
                    {row.v}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={80}>
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
                Start a project
              </Link>
              <Link
                href="/work"
                className="text-[0.9375rem] text-tone-mute underline decoration-line-firm underline-offset-[6px] transition-colors duration-[var(--t-hover)] hover:text-tone"
              >
                See what we have built
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
