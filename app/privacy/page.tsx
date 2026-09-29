import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalBody, type LegalSection } from "@/components/sections/LegalBody";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AxxonTek collects, uses, stores and protects personal information, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "29 September 2026";

/**
 * The privacy policy. Every statement here must stay true to what the code
 * actually does: two forms (contact and newsletter) stored in Supabase, the
 * site served by Netlify, fonts self-hosted by next/font, and no analytics,
 * advertising or tracking scripts. Change the code, change this page.
 */
const sections: LegalSection[] = [
  {
    heading: "Introduction",
    paragraphs: [
      `This Privacy Policy explains how ${site.name} ("${site.name}", "we", "us" or "our") collects, uses, stores, shares and protects personal information when you visit ${site.url.replace(/^https?:\/\//, "")} (the "Website") or contact us through it.`,
      "It applies only to this Website. Our products, such as Floow and TalentLens, and the systems we build for clients have their own privacy notices, which apply when you use them.",
      "By using the Website you acknowledge that you have read this policy. If you do not agree with it, please do not submit your information through the Website.",
    ],
  },
  {
    heading: "Who is responsible for your data",
    paragraphs: [
      `${site.name} is the controller of the personal information described in this policy. This means we decide why and how it is processed.`,
      `You can contact us about anything in this policy at ${site.email}, or by post at ${site.address.line1}, ${site.address.line2}, ${site.address.city}.`,
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect only the information you choose to give us, and a small amount of technical information that any website needs in order to work.",
    ],
    list: [
      "Contact form: your name, email address, company name (optional), the service or concept you are interested in (optional), and the contents of your message.",
      "Newsletter sign-up: your email address.",
      "Email and other correspondence: anything you include when you write to us directly.",
      "Technical information: when you load a page, our hosting provider automatically receives standard request data such as your IP address, browser type, device type, the page requested and the time of the request. This is used to deliver the page, keep the Website secure and diagnose faults.",
    ],
  },
  {
    heading: "Information we do not collect",
    paragraphs: [
      "We do not knowingly collect special categories of personal data, such as information about health, religion, ethnicity, political opinions or biometrics. Please do not send this kind of information through the Website.",
      "We do not use analytics tools, advertising networks, social media tracking pixels or session recording on this Website.",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: ["We use your personal information only for the following purposes:"],
    list: [
      "To reply to your enquiry and continue the conversation you started, including preparing a proposal or quotation you have asked for.",
      "To send you our newsletter, if you have signed up for it.",
      "To keep the Website secure, prevent abuse and spam, and fix technical problems.",
      "To meet our legal, accounting and regulatory obligations.",
      "To establish, exercise or defend legal claims.",
    ],
  },
  {
    heading: "Legal basis for processing",
    paragraphs: [
      "Where the law requires a legal basis for processing personal data, we rely on the following:",
    ],
    list: [
      "Consent: for the newsletter. You can withdraw your consent at any time.",
      "Steps before a contract: when you ask us about a project or service, we process your details to respond and prepare an agreement.",
      "Legitimate interests: to run, secure and improve the Website and to answer general enquiries, where those interests are not overridden by your rights.",
      "Legal obligation: where we must keep or disclose information by law.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and similar technologies",
    paragraphs: [
      "The Website does not set advertising or analytics cookies, and we do not track you across other websites.",
      "Your browser may store small amounts of data that are strictly necessary for the Website to function, and the Website may remember simple display preferences on your device. These are not used to identify or profile you. Because we use no non-essential cookies, we do not show a cookie consent banner.",
      "Our fonts are served from our own domain, so loading the Website does not send your information to a font provider.",
    ],
  },
  {
    heading: "Who we share your information with",
    paragraphs: [
      "We do not sell, rent or trade your personal information. We share it only with service providers who process it on our behalf, under contracts that require them to keep it secure and use it only on our instructions:",
    ],
    list: [
      "Supabase, which stores contact form and newsletter submissions in a managed database.",
      "Netlify, which hosts and serves the Website.",
      "Our email provider, which delivers and stores email correspondence.",
    ],
  },
  {
    heading: "Other disclosures",
    paragraphs: [
      "We may also disclose personal information where we are required to do so by law, court order or a lawful request from a public authority; to protect the rights, property or safety of AxxonTek, our clients or others; or in connection with a merger, acquisition or sale of all or part of our business, in which case we will require the recipient to protect your information in line with this policy.",
    ],
  },
  {
    heading: "International transfers",
    paragraphs: [
      "Our service providers may store or process information on servers located outside your country, including in the European Union and the United States. Where personal information is transferred across borders, we take steps to make sure it receives an adequate level of protection, such as contractual safeguards with our providers, as required by applicable data protection law.",
    ],
  },
  {
    heading: "How long we keep it",
    list: [
      "Enquiries and correspondence: for as long as needed to respond and, if we work together, for the duration of the relationship and up to 24 months after it ends, unless a longer period is required by law.",
      "Newsletter addresses: until you unsubscribe or ask us to delete them.",
      "Technical request logs: for the short period set by our hosting provider, typically no more than 30 days.",
      "Records we must keep for accounting or legal reasons: for the period the law requires.",
    ],
    paragraphs: ["We keep personal information only as long as we need it for the purpose it was collected:"],
  },
  {
    heading: "How we protect it",
    paragraphs: [
      "We use appropriate technical and organisational measures to protect personal information, including encryption in transit (HTTPS), encryption at rest by our database provider, restricted access limited to the team members who need it, and server-side validation of everything submitted through our forms.",
      "No method of transmission or storage is completely secure. If we become aware of a breach that affects your personal information, we will notify you and the relevant authority where the law requires it.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have some or all of the following rights over your personal information:",
    ],
    list: [
      "To be told what personal information we hold about you and receive a copy of it.",
      "To have inaccurate or incomplete information corrected.",
      "To have your information deleted.",
      "To restrict or object to how we process it.",
      "To receive your information in a portable format.",
      "To withdraw consent at any time, where we rely on consent. This does not affect processing already carried out.",
      "Not to be subject to decisions based solely on automated processing. We do not make such decisions.",
    ],
  },
  {
    heading: "How to exercise your rights",
    paragraphs: [
      `Email ${site.email} and tell us what you would like us to do. We may need to confirm your identity before acting on your request. We will respond within 30 days, or sooner if the law requires.`,
      "To stop receiving the newsletter, use the unsubscribe link in any issue or email us.",
    ],
  },
  {
    heading: "Complaints",
    paragraphs: [
      "If you are unhappy with how we have handled your personal information, please contact us first so we can try to put it right.",
      "You also have the right to complain to the data protection authority where you live or where the issue arose. In Rwanda this is the National Cyber Security Authority, which supervises the Law relating to the protection of personal data and privacy. In Canada it is the Office of the Privacy Commissioner of Canada. In the European Union and the United Kingdom it is your local supervisory authority.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The Website is intended for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has given us their information, please contact us and we will delete it.",
    ],
  },
  {
    heading: "Links to other websites",
    paragraphs: [
      "The Website links to other websites and social media profiles. We are not responsible for their content or privacy practices, and we encourage you to read their privacy policies.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top of the contents list shows when it was last changed. If we make a significant change that affects how we use information we already hold, we will tell newsletter subscribers by email.",
    ],
  },
  {
    heading: "Contact us",
    paragraphs: [
      `For any question or request about this policy or your personal information, contact us at ${site.email}, or write to ${site.name}, ${site.address.line1}, ${site.address.line2}, ${site.address.city}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy policy."
        lede="What we collect, why we collect it, and the rights you have over it."
      />
      <LegalBody sections={sections} updated={UPDATED} />
    </>
  );
}
