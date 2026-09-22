export const site = {
  name: "AxxonTek",
  tagline: "Software, apps & smart systems for Africa",
  description:
    "AxxonTek is a Kigali-based engineering team. We build apps and websites for African SMEs and individuals, advise on IT, run an innovation lab behind products like TalentLens and Floow, and install smart-home and camera systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axxontek.com",
  email: "info@axxontek.com",
  /** Leave empty until there is a real line — the UI hides it when blank. */
  phone: "" as string,
  address: {
    line1: "Norrsken Kigali",
    line2: "1 KN 78 St",
    city: "Kigali, Rwanda",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/axxontek", short: "In" },
    { label: "X", href: "https://x.com/axxontek", short: "X" },
    { label: "GitHub", href: "https://github.com/axxontek", short: "Gh" },
  ],
} as const;

export const primaryNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
] as const;

export type Pillar = { icon: string; title: string; body: string };

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  /** Icon name from components/Icon.tsx */
  icon: string;
  /** One line for cards and lists. */
  short: string;
  /** Real photo for the card + page (see public/assets/photos/README.md). Empty = icon-only card. */
  photo: string;
  lede: string;
  cta: string;
  introLabel: string;
  introHeading: string;
  introBody: string;
  pillarsTitle: string;
  pillars: Pillar[];
  closing: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "software",
    photo: "",
    title: "Software Development",
    eyebrow: "Build",
    icon: "code",
    short: "Apps and websites for SMEs and individuals — fast, modern, built to last.",
    lede: "Custom apps and websites for SMEs and individuals across Africa — designed around how your customers actually behave, built to work on the phones and connections they really have.",
    cta: "Start a project",
    introLabel: "Built for where you operate",
    introHeading: "Software that works on the phone in your customer's hand.",
    introBody:
      "Most software is designed for fast laptops on fast Wi-Fi. Your customers are on mid-range Android phones on mobile data. We design and build for that reality from the first screen: light pages, clear flows, and payment and messaging integrations that people here already use.",
    pillarsTitle: "What we build",
    pillars: [
      {
        icon: "globe",
        title: "Websites that convert",
        body: "Fast, clear sites for businesses and professionals — built to turn a visit into a call, an order, or a booking.",
      },
      {
        icon: "puzzle",
        title: "Web & mobile apps",
        body: "Custom applications for the way your business runs — from internal tools to customer-facing products.",
      },
      {
        icon: "loop",
        title: "Integrations that fit",
        body: "Mobile money, SMS, WhatsApp, and the systems you already use — wired in, not bolted on.",
      },
    ],
    closing: "Have an app or website in mind?",
    image: "/assets/custom-websites.webp",
  },
  {
    slug: "consulting",
    photo: "",
    title: "IT Consultation",
    eyebrow: "Advise",
    icon: "bulb",
    short: "Straight answers on what to build, buy or fix — before you spend.",
    lede: "Independent technical advice for businesses that need to make a decision — what to build, what to buy, what to fix first — from engineers who will tell you the truth.",
    cta: "Book a consultation",
    introLabel: "Advice, not a sales pitch",
    introHeading: "Know what you need before you pay for it.",
    introBody:
      "Most technology mistakes are made before anything is built: the wrong vendor, the wrong scope, the wrong thing fixed first. We review what you have, understand what you are trying to achieve, and give you a written recommendation you can act on — with us or without us.",
    pillarsTitle: "How we help",
    pillars: [
      {
        icon: "search",
        title: "Technology review",
        body: "An honest audit of your current systems, tools, and costs — what works, what does not, and why.",
      },
      {
        icon: "clipboard",
        title: "Build-or-buy decisions",
        body: "A clear recommendation on whether to build custom, buy off the shelf, or do nothing yet.",
      },
      {
        icon: "target",
        title: "Roadmap you can afford",
        body: "A step-by-step plan sized to your budget, with the highest-value work first.",
      },
    ],
    closing: "Need a second opinion before you commit?",
    image: "/assets/rwanda.jpg",
  },
  {
    slug: "lab",
    photo: "",
    title: "Innovation Lab",
    eyebrow: "Invent",
    icon: "microscope",
    short: "Our own products for African problems. TalentLens and Floow started here.",
    lede: "Our lab exists to build solutions for problems that are specific to Africa — products we own, and products we build with partners who understand a market we do not.",
    cta: "Partner with the lab",
    introLabel: "Research, then product",
    introHeading: "Solutions built for African problems, not imported for them.",
    introBody:
      "Imported software assumes infrastructure, habits, and budgets that do not match how people here actually live and work. The lab is where we study those gaps properly and build for them. TalentLens, our recruitment platform, and Floow, a national parcel system for Rwanda, both came out of this process.",
    pillarsTitle: "How the lab works",
    pillars: [
      {
        icon: "microscope",
        title: "Problem research",
        body: "We spend time with the people who have the problem before we write a line of code.",
      },
      {
        icon: "growth",
        title: "Products we ship",
        body: "Ideas that survive research become real products — built, launched, and supported by us.",
      },
      {
        icon: "handshake",
        title: "Partnerships",
        body: "Bring us a problem in a market you know, and we will build the solution with you.",
      },
    ],
    closing: "Have a problem worth solving?",
    image: "/assets/smart-buildings.jpg",
  },
  {
    slug: "smart-homes",
    photo: "",
    title: "Smart Homes & Cameras",
    eyebrow: "Protect",
    icon: "camera",
    short: "Cameras, smart locks and automation — installed properly, run from your phone.",
    lede: "Smart lighting, access, and camera systems for homes and small premises — designed around how you use the space, installed properly, and controllable from your phone.",
    cta: "Secure your home",
    introLabel: "Installed properly",
    introHeading: "A home that watches itself, and tells you when it matters.",
    introBody:
      "Camera and smart-home systems fail from bad setup more than bad hardware: blind spots, alerts nobody sees, apps that stop working. We design the system around your actual space, install it cleanly, and make sure you can manage it yourself afterwards.",
    pillarsTitle: "What we install",
    pillars: [
      {
        icon: "camera",
        title: "Cameras & monitoring",
        body: "Coverage designed around your space, viewable from your phone, with alerts you can act on.",
      },
      {
        icon: "lock",
        title: "Smart access",
        body: "Gates, doors, and locks you control remotely — and know who used, and when.",
      },
      {
        icon: "bulb",
        title: "Automation",
        body: "Lighting, power, and appliances on schedules and rules, so the house runs itself.",
      },
    ],
    closing: "Want your home to look after itself?",
    image: "/assets/security-systems.webp",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export type Product = {
  name: string;
  /** What it is, in five words. */
  tagline: string;
  body: string;
  icon: string;
  /** Leave empty to send visitors to the contact page for a demo. */
  href: string;
  /** e.g. "Live" / "In pilot" — shown as a small badge. Empty hides it. */
  status: string;
};

/** Products built in the lab. Proof that we ship, not just advise. */
export const products: Product[] = [
  {
    name: "TalentLens",
    tagline: "Advanced recruitment software",
    body: "Structure the process, see every candidate clearly, and hire on evidence instead of gut feel.",
    icon: "users",
    href: "",
    status: "",
  },
  {
    name: "Floow",
    tagline: "A national parcel system for Rwanda",
    body: "Send, track and receive parcels anywhere in Rwanda — one system for businesses and individuals.",
    icon: "pin",
    href: "",
    status: "",
  },
];


/** Short trust signals shown under the hero CTA. Keep these verifiable. */
export const trustPoints = [
  "Reply within one business day",
  "No handoffs — the engineer you meet builds it",
  "Based at Norrsken Kigali",
] as const;

/** The three-step engagement model. Shown on the homepage process band. */
export const processSteps = [
  {
    n: "01",
    title: "We study the problem",
    body: "Before scoping or quoting, we spend real time understanding what you are actually trying to fix — and whether you need what you think you need.",
  },
  {
    n: "02",
    title: "We tell you the truth",
    body: "You get a clear recommendation, including when the answer is a smaller project, a different approach, or not us at all.",
  },
  {
    n: "03",
    title: "We build it ourselves",
    body: "The people who scoped it write the code and install the systems. Nothing is handed to a junior bench you never meet.",
  },
] as const;

/** Objections a serious buyer has before they contact us. Answer them here. */
export const faqs = [
  {
    q: "What happens after I book a call?",
    a: "A 30-minute conversation with an engineer — not a salesperson — about what you are trying to solve. If it looks like a fit, we follow up with a short written summary of the problem as we understand it and a proposed next step. No obligation either way.",
  },
  {
    q: "How do you price work?",
    a: "Fixed-scope projects — an app, a website, an installation — get a fixed price after the research phase, so you are never quoted on a guess. Ongoing work such as consulting, support, and monitoring is a monthly retainer. We will tell you which applies on the first call.",
  },
  {
    q: "Do you only work in Rwanda?",
    a: "We are based in Kigali and install smart-home and camera systems across Rwanda. Software, apps, and consulting are delivered remotely for clients anywhere in Africa and beyond.",
  },
  {
    q: "We are a small business. Is this for us?",
    a: "Yes — SMEs and individuals are who we build for. We are a small team ourselves and size our engagements accordingly. What matters is that there is a clear reason for the work, and we will say so if there is not.",
  },
  {
    q: "Who actually does the work?",
    a: "A small senior team. The engineer who scopes your project is the engineer who builds it, and you have their direct contact for the life of the engagement.",
  },
  {
    q: "What if we already have an IT provider?",
    a: "That is common. We regularly take a single well-defined piece — an app, a website, a camera install, an IT review — and work alongside an existing provider without disrupting them.",
  },
] as const;

/**
 * Real photographs of the team and workspace. Paths under /public. Leave a
 * slot empty and the section falls back to its photo-less layout, so the
 * site never shows a broken image. Shot list: public/assets/photos/README.md
 */
export const photos = {
  /** 16:9 landscape. Full-bleed backdrop of the homepage hero, shown under an orange duotone. */
  hero: "/assets/hero.webp",
  /** 16:9. The team around a whiteboard or table — the "are you real?" photo. */
  team: "",
  /** 3:2. Norrsken Kigali — the building, the workspace, or the view from it. */
  workspace: "",
} as const;

/** True when a photo slot has been filled. */
export const hasPhoto = (path: string): path is string => path.length > 0;
