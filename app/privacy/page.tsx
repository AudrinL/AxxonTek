import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalBody, type LegalSection } from "@/components/sections/LegalBody";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AxxonTek collects, uses, and protects the personal information you share with us.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `${site.name} is a technology company registered in Rwanda, with offices at ${site.address.line1}, ${site.address.line2}, ${site.address.city}. This policy explains what we do with personal information you give us through this website.`,
      `If you have a question about anything here, write to us at ${site.email} and a member of the team will answer you directly.`,
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "We only collect information you deliberately give us. There are two places on this site where that happens:",
    ],
    list: [
      "Contact form — your name, email address, company name (if you provide one), and the contents of your message.",
      "Newsletter signup — your email address only.",
    ],
  },
  {
    heading: "Why we collect it",
    paragraphs: [
      "Contact form submissions are used solely to reply to your enquiry and to carry on the conversation you started. Newsletter addresses are used solely to send you the occasional email we describe at signup.",
      "We do not sell, rent, or trade your personal information to anyone, and we do not use it for automated decision-making or profiling.",
    ],
  },
  {
    heading: "How it is stored",
    paragraphs: [
      "Submissions are stored in a managed Supabase (PostgreSQL) database, encrypted in transit over HTTPS and at rest by our hosting provider. Access is limited to the members of our team who need it to answer you.",
      "We keep contact enquiries for as long as the business relationship is active, and newsletter addresses until you unsubscribe. You can ask us to delete either at any time.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    paragraphs: [
      "This website sets no advertising cookies, no analytics cookies, and no third-party tracking pixels. We do not build advertising profiles of visitors.",
      "Your browser may store standard technical data required to load the page — that is handled by your browser and our host, not by tracking software we have added. Because we set no non-essential cookies, there is no consent banner to click through.",
    ],
  },
  {
    heading: "Third parties",
    paragraphs: [
      "A small number of service providers process data on our behalf, strictly to make the site work:",
    ],
    list: [
      "Supabase — stores contact and newsletter submissions.",
      "Our hosting provider — serves the website and its assets.",
      "Google Fonts — serves the typefaces used on this site.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us to show you the personal information we hold about you, correct it if it is wrong, delete it, or stop using it. You can also withdraw consent to marketing email at any time — every newsletter includes an unsubscribe link.",
      `To exercise any of these rights, email ${site.email}. We will respond within 30 days.`,
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we handle personal information, we will update this page and revise the date shown alongside it. Material changes affecting existing subscribers will also be sent by email.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={"Privacy policy."}
        accent={["policy."]}
        lede="A plain-language account of what we collect, why we collect it, and what you can ask us to do about it."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ]}
      />
      <LegalBody sections={sections} updated="August 2026" />
    </>
  );
}
