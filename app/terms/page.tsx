import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalBody, type LegalSection } from "@/components/sections/LegalBody";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the AxxonTek website and the framework for engagements with us.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    paragraphs: [
      `These terms govern your use of the ${site.name} website. By browsing this site or submitting a form on it, you agree to them. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: "What this website is",
    paragraphs: [
      "This site describes our services and provides a way to contact us. Nothing on it constitutes a binding offer, a quotation, or professional advice for your specific situation.",
      "Any engagement between us is governed by a separate written agreement covering scope, deliverables, timelines, and fees. Where that agreement and these terms conflict, the signed agreement controls.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: ["When using this website, you agree not to:"],
    list: [
      "Submit false, misleading, or unlawful information through our forms.",
      "Attempt to gain unauthorised access to the site, its infrastructure, or its data.",
      "Use automated systems to scrape, overload, or disrupt the service.",
      "Use the contact form to send unsolicited commercial messages.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `All content on this site — text, design, code, graphics, and the ${site.name} name and marks — belongs to us or our licensors and is protected by copyright and trade mark law.`,
      "You may view and print pages for your own reference. You may not republish, resell, or redistribute the content without our written permission.",
    ],
  },
  {
    heading: "Submissions you send us",
    paragraphs: [
      "You keep ownership of anything you send through our contact form. By sending it, you grant us permission to read it, store it, and use it for the purpose of responding to you.",
      "Please do not send confidential or sensitive material through the website form. If a project requires it, we will put a confidentiality agreement in place first.",
    ],
  },
  {
    heading: "Availability and accuracy",
    paragraphs: [
      "We work to keep this site accurate and available, but we provide it on an as-is basis. We do not warrant that it will be uninterrupted, error-free, or that the information on it is complete or current at every moment.",
      "We may change, suspend, or withdraw any part of the site without notice.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by Rwandan law, we are not liable for indirect or consequential loss arising from your use of this website, including lost profits, lost data, or business interruption.",
      "Nothing in these terms limits liability that cannot lawfully be limited, including liability for death or personal injury caused by negligence, or for fraud.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This site links to third-party websites. We do not control them and are not responsible for their content, terms, or privacy practices. Visiting them is at your own discretion.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the Republic of Rwanda, and the courts of Rwanda have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about these terms can be sent to ${site.email}, or by post to ${site.address.line1}, ${site.address.line2}, ${site.address.city}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={"Terms of service."}
        accent={["service."]}
        lede="The framework that governs your use of this site, and how it relates to the agreements behind our engagements."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Terms", href: "/terms" },
        ]}
      />
      <LegalBody sections={sections} updated="August 2026" />
    </>
  );
}
