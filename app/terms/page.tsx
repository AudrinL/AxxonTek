import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalBody, type LegalSection } from "@/components/sections/LegalBody";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the AxxonTek website, and how they relate to agreements for our services and products.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "29 September 2026";

const domain = site.url.replace(/^https?:\/\//, "");

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      `These Terms of Use ("Terms") govern your access to and use of ${domain} (the "Website"), operated by ${site.name} ("${site.name}", "we", "us" or "our").`,
      "By accessing or using the Website you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, you must not use the Website.",
      "If you use the Website on behalf of a company or other organisation, you confirm that you have authority to accept these Terms on its behalf.",
    ],
  },
  {
    heading: "Our services and products",
    paragraphs: [
      "The Website describes the services we offer and the products we operate. It is provided for general information only.",
      "Nothing on the Website is a binding offer, quotation, warranty or professional advice for your particular situation. Prices, timelines and features shown are indicative and may change without notice.",
      "Any work we carry out for you is governed by a separate written agreement, proposal or statement of work signed by both parties. Our products, including Floow and TalentLens, are governed by their own terms of service. If those documents conflict with these Terms, those documents prevail.",
    ],
  },
  {
    heading: "Eligibility",
    paragraphs: [
      "You must be at least 18 years old, or the age of legal majority where you live, to use the Website or submit information through it.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: ["You agree to use the Website lawfully and not to:"],
    list: [
      "Submit false, misleading, defamatory or unlawful information through our forms.",
      "Impersonate any person or organisation, or misrepresent your connection with them.",
      "Attempt to gain unauthorised access to the Website, its servers, databases or connected systems.",
      "Introduce viruses, malware or any other harmful code.",
      "Scrape, copy or harvest content or data by automated means, or place an unreasonable load on our infrastructure.",
      "Interfere with the security or proper working of the Website, including by testing its vulnerabilities without our written permission.",
      "Use the Website or our contact details to send unsolicited marketing or spam.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `The Website and everything on it, including text, graphics, designs, concept work, photographs, code, and the ${site.name} name, logo and other marks, are owned by or licensed to ${site.name} and are protected by copyright, trade mark and other intellectual property laws.`,
      "You may view, download and print pages for your own personal, non-commercial reference. You must not copy, reproduce, modify, republish, distribute, sell or create derivative works from any part of the Website without our prior written permission.",
      "Nothing in these Terms transfers any intellectual property rights to you.",
    ],
  },
  {
    heading: "Design concepts",
    paragraphs: [
      "The designs shown in the Inspiration section are concepts created by us to show what we can build. They are not client work, and any resemblance to a real business is coincidental. They remain our property and may not be copied or used without our permission. If you would like a design based on one of them, we will create it for you under a separate agreement.",
    ],
  },
  {
    heading: "Information you send us",
    paragraphs: [
      "You keep ownership of anything you send us through the Website. By sending it, you give us permission to store it and use it to respond to you, as described in our Privacy Policy.",
      "You confirm that anything you send is accurate and that you have the right to share it. Please do not send confidential information through our forms. Where a project requires confidential information to be shared, we will first agree a confidentiality agreement with you.",
      "If you send us ideas or feedback about our services or products, you agree that we may use them without any obligation to you.",
    ],
  },
  {
    heading: "Third-party links and services",
    paragraphs: [
      "The Website contains links to third-party websites and social media profiles. We do not control them and are not responsible for their content, availability, terms or privacy practices. Following a link is at your own risk.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "We aim to keep the Website available and accurate, but we do not guarantee that it will be uninterrupted, secure or free from errors. We may change, suspend or withdraw all or part of the Website at any time, without notice and without liability.",
    ],
  },
  {
    heading: "Disclaimer",
    paragraphs: [
      'To the fullest extent permitted by law, the Website and all content on it are provided "as is" and "as available", without warranties of any kind, whether express or implied, including warranties of accuracy, completeness, fitness for a particular purpose and non-infringement.',
      "You are responsible for deciding whether any information on the Website is suitable for your needs before relying on it.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      `To the fullest extent permitted by law, ${site.name} and its directors, employees and partners will not be liable for any indirect, incidental, special or consequential loss, or for any loss of profit, revenue, business, data or goodwill, arising out of or in connection with your use of, or inability to use, the Website.`,
      "Our total liability to you for any claim arising from your use of the Website is limited to one hundred US dollars (USD 100).",
      "Nothing in these Terms excludes or limits liability that cannot be excluded or limited by law, including liability for death or personal injury caused by negligence, or for fraud.",
    ],
  },
  {
    heading: "Indemnity",
    paragraphs: [
      `You agree to indemnify ${site.name} against any claims, losses, damages and reasonable costs, including legal fees, arising from your breach of these Terms or your misuse of the Website.`,
    ],
  },
  {
    heading: "Suspension of access",
    paragraphs: [
      "We may restrict or end your access to the Website at any time if we reasonably believe you have breached these Terms.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may revise these Terms from time to time. The updated version takes effect when it is published on this page, and the date in the contents list shows when it last changed. Your continued use of the Website after a change means you accept the revised Terms.",
    ],
  },
  {
    heading: "Governing law and disputes",
    paragraphs: [
      "These Terms are governed by the laws of the Republic of Rwanda.",
      "If a dispute arises, we will first try to resolve it with you in good faith. If it cannot be resolved within 30 days, it will be submitted to the competent courts of Rwanda, which will have exclusive jurisdiction, except where the law of your country of residence gives you a mandatory right to bring proceedings there.",
    ],
  },
  {
    heading: "General",
    list: [
      "Severability: if any part of these Terms is found to be invalid or unenforceable, the rest remains in full effect.",
      "No waiver: if we do not enforce a right under these Terms, that does not mean we have waived it.",
      "Assignment: we may transfer our rights and obligations under these Terms. You may not transfer yours without our written consent.",
      "Entire agreement: these Terms, together with our Privacy Policy, are the entire agreement between you and us about your use of the Website.",
    ],
    paragraphs: [],
  },
  {
    heading: "Contact us",
    paragraphs: [
      `If you have any questions about these Terms, contact us at ${site.email}, or write to ${site.name}, ${site.address.line1}, ${site.address.line2}, ${site.address.city}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of use."
        lede="The rules for using this website, and how they relate to our service agreements."
      />
      <LegalBody sections={sections} updated={UPDATED} />
    </>
  );
}
