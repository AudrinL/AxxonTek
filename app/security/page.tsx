import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { CloseAsk, Section, Strong, Tile } from "@/components/system/Page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How AxxonTek keeps the technology it builds and runs secure: sign-in, data protection, infrastructure, access control, updates, and how to report a problem.",
  alternates: { canonical: "/security" },
};

const areas: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Secure sign-in.",
    body: "Modern sign-in on everything we build, and admin access only for people who need it.",
  },
  {
    icon: "shield",
    title: "Protected data.",
    body: "Data is encrypted on its way in and out, and we only collect what a system needs.",
  },
  {
    icon: "server",
    title: "Watched infrastructure.",
    body: "Systems run on managed servers we monitor, with daily backups kept separately.",
  },
  {
    icon: "users",
    title: "Clear access rules.",
    body: "Who can see and change what is set by role, and reviewed regularly.",
  },
  {
    icon: "search",
    title: "Regular updates.",
    body: "Software is kept up to date on a schedule, and urgent fixes go out straight away.",
  },
  {
    icon: "mail",
    title: "Report a problem.",
    body: `Found a security issue? Email ${site.email} and we will act on it quickly.`,
  },
];

/**
 * Security. Plain statements of how security is handled today, without
 * overclaiming, and one clear way to report a problem.
 */
export default function SecurityPage() {
  return (
    <>
      <PageHero
        label="Security"
        title={
          <>
            Built and run <span className="text-serif">securely</span>.
          </>
        }
        lede={
          <>
            <Strong>Security is part of how we build, not an extra.</Strong> Here is how we
            handle it today.
          </>
        }
      />

      <Section alt>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <Reveal as="li" key={area.title} delay={(i % 3) * 70} className="h-full">
              <Tile>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent">
                  <Icon name={area.icon} size={20} />
                </span>
                <h3 className="mt-10 font-display text-[1.5rem] font-semibold leading-[1.17]">
                  {area.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.47] text-tone-mute">{area.body}</p>
              </Tile>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CloseAsk
        title="Found a security issue?"
        lede="Tell us privately and we will look at it straight away."
        primary={{ href: `mailto:${site.email}?subject=Security%20report`, text: "Report an issue" }}
      />
    </>
  );
}
