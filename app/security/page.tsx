import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How AxxonTek designs, builds and operates technology securely: authentication, data protection, infrastructure, access control, vulnerability management and responsible disclosure.",
  alternates: { canonical: "/security" },
};

/**
 * A small page that buys a lot of maturity. It does not overclaim: it states
 * how security is handled as part of building and running technology, in the
 * same plain voice as the rest of the site, and gives a way to report a
 * problem. It grows a formal disclosure policy when there is one to publish.
 */
const areas: { icon: IconName; k: string; v: string }[] = [
  {
    icon: "lock",
    k: "Authentication",
    v: "Access to the systems we build is protected with modern authentication, and privileged access is kept to the few who need it.",
  },
  {
    icon: "shield",
    k: "Data protection",
    v: "Data is encrypted in transit, and we collect only what a system actually needs to do its job.",
  },
  {
    icon: "server",
    k: "Infrastructure",
    v: "Products run on managed infrastructure we monitor, with daily backups kept off the main server and restorable.",
  },
  {
    icon: "users",
    k: "Access control",
    v: "Who can see and change what is defined per role, and reviewed, rather than shared around informally.",
  },
  {
    icon: "search",
    k: "Vulnerability management",
    v: "Dependencies and systems are patched on a schedule, and urgent fixes are shipped out of band when they matter.",
  },
  {
    icon: "mail",
    k: "Responsible disclosure",
    v: "Found something? Tell us and we will act on it. A formal disclosure policy will be published as the practice matures.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        label="Security"
        title={
          <>
            Built and run <span className="text-serif text-accent">securely</span>.
          </>
        }
        lede="Security is part of how we design, build and operate technology, not a checkbox at the end. Here is how we handle it today, in plain terms."
      />

      <section data-chapter-ground="canvas" className="chapter-y">
        <div className="container-x">
          <dl className="grid gap-px overflow-hidden rounded-[var(--r-card)] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <Reveal key={area.k} delay={Math.min(i, 3) * 60}>
                <div className="h-full bg-[var(--ground-veil)] p-8 transition-colors duration-[var(--t-ground)] ease-[var(--ease-gravity)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-wash text-ember-text">
                    <Icon name={area.icon} size={18} />
                  </span>
                  <dt className="mt-5 font-display text-[1.25rem] font-semibold tracking-[-0.022em]">
                    {area.k}
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-tone-mute">{area.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={80}>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={`mailto:${site.email}`} className="pill pill-ember hover:bg-ember-deep">
                Report a security issue
                <Icon name="arrow" size={16} />
              </a>
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-tone-faint uppercase">
                {site.email}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
