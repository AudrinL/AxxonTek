export const site = {
  name: "AxxonTek",
  tagline: "Software, security & cloud for growing businesses",
  description:
    "AxxonTek is a Kigali-based engineering team that builds software, security systems, and cloud infrastructure for businesses across East Africa — researched first, built by the people who scoped it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axxontek.com",
  email: "hello@axxontek.com",
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
    slug: "sourcing",
    photo: "",
    title: "Talent Sourcing",
    eyebrow: "Talent",
    icon: "users",
    short: "Vetted engineers matched to your project — not whoever is available.",
    lede: "We help you find technical talent that is actually right for the role — sourced, screened, and matched to what your project really needs.",
    cta: "Find Top Talent",
    introLabel: "Talent, matched properly",
    introHeading: "The right person, not just an available one.",
    introBody:
      "Sourcing technical talent is easy. Sourcing the right technical talent for your specific project is the hard part. We take the time to understand what you are building before we go looking for who should build it.",
    pillarsTitle: "How we source",
    pillars: [
      {
        icon: "target",
        title: "Targeted search",
        body: "We source for the specific skills your project needs, not a generic job description.",
      },
      {
        icon: "check",
        title: "Pre-vetted",
        body: "Every candidate is technically reviewed before you ever see a profile.",
      },
      {
        icon: "handshake",
        title: "Long-term fit",
        body: "We look for people who will actually work well with your team, not just fill a seat.",
      },
    ],
    closing: "Tell us who you are looking for.",
    image: "/assets/custom-websites.webp",
  },
  {
    slug: "interviews",
    photo: "",
    title: "Technical Interviews",
    eyebrow: "Vetting",
    icon: "clipboard",
    short: "We run the technical rounds and give you an honest read on every candidate.",
    lede: "Technical interviews built to actually test whether someone can do the job — not just recite the right buzzwords.",
    cta: "Partner with Us",
    introLabel: "Vetting that means something",
    introHeading: "We test for the work, not the resume.",
    introBody:
      "A polished resume and real skill are not always the same thing. Our technical interview process is built to find out which one you are actually getting — through real problems, not scripted trivia.",
    pillarsTitle: "How we vet",
    pillars: [
      {
        icon: "brain",
        title: "Real problem-solving",
        body: "Interviews built around actual work, not whiteboard trivia.",
      },
      {
        icon: "clipboard",
        title: "Honest reporting",
        body: "You get a clear, honest read on strengths and gaps — not a passing grade for everyone.",
      },
      {
        icon: "loop",
        title: "Pairs with sourcing",
        body: "Works directly with our sourcing service for a complete hiring pipeline.",
      },
    ],
    closing: "Need candidates properly vetted?",
    image: "/assets/custom-development.webp",
  },
  {
    slug: "analytics",
    photo: "",
    title: "Data & Analytics",
    eyebrow: "Data",
    icon: "chart",
    short: "Dashboards and reporting built around the decisions you actually make.",
    lede: "We turn scattered data into decisions you can act on — dashboards and reporting built around how your team actually works, not a generic template.",
    cta: "Talk to Us",
    introLabel: "What this looks like",
    introHeading: "Data that answers real questions.",
    introBody:
      "Most analytics tools show you everything and tell you nothing. We start with the decisions you are actually trying to make, then build the tracking, dashboards, and reporting to support them.",
    pillarsTitle: "How we approach analytics",
    pillars: [
      {
        icon: "chart",
        title: "Custom dashboards",
        body: "Built around your metrics, not a vendor's idea of what matters.",
      },
      {
        icon: "search",
        title: "Clear reporting",
        body: "Reports people actually read, because they are built for the people reading them.",
      },
      {
        icon: "gear",
        title: "Integrated, not bolted-on",
        body: "Analytics wired into the systems you already use, not a separate tool to check.",
      },
    ],
    closing: "Want to see your data differently?",
    image: "/assets/saas.avif",
  },
  {
    slug: "security",
    photo: "",
    title: "Security Systems",
    eyebrow: "Protection",
    icon: "lock",
    short: "CCTV, access control and alarms — designed, installed and monitored properly.",
    lede: "CCTV, access control, and alarm systems built to protect what you have built — installed properly, monitored reliably, and easy for your team to manage.",
    cta: "Secure Your Business",
    introLabel: "Security, done properly",
    introHeading: "Protection you do not have to think about.",
    introBody:
      "Security systems fail most often not from bad hardware, but from bad setup — blind spots, unmonitored alerts, access nobody remembers granting. We design and install systems that close those gaps from day one.",
    pillarsTitle: "What we cover",
    pillars: [
      {
        icon: "camera",
        title: "Surveillance",
        body: "CCTV coverage designed around how your space is actually used.",
      },
      {
        icon: "lock",
        title: "Access control",
        body: "Know who is where, without paperwork.",
      },
      {
        icon: "alert",
        title: "Monitoring & alerts",
        body: "Real alerts you can act on, not noise you learn to ignore.",
      },
    ],
    closing: "Protect what matters.",
    image: "/assets/security-systems.webp",
  },
  {
    slug: "infrastructure",
    photo: "",
    title: "IT Infrastructure",
    eyebrow: "Foundations",
    icon: "server",
    short: "Networks and servers engineered to stay online under real load.",
    lede: "Networks, servers, and IT systems engineered to stay online, scale with you, and hold up under real pressure — not just in a demo.",
    cta: "Talk to Us",
    introLabel: "The foundation",
    introHeading: "Infrastructure you do not have to worry about.",
    introBody:
      "Most infrastructure problems only show up under pressure — during a launch, a migration, or your busiest day. We build networks and systems that are tested before they matter, not after.",
    pillarsTitle: "What we build",
    pillars: [
      {
        icon: "network",
        title: "Networking",
        body: "Reliable connectivity designed for how your team and systems actually communicate.",
      },
      {
        icon: "server",
        title: "Servers & systems",
        body: "Right-sized infrastructure — built for your real load, not a sales pitch.",
      },
      {
        icon: "tools",
        title: "Ongoing support",
        body: "We stay involved after launch. Infrastructure is not a one-time project.",
      },
    ],
    closing: "Let us build a foundation that holds.",
    image: "/assets/infrastructure.webp",
  },
  {
    slug: "cloud",
    photo: "",
    title: "Cloud & SaaS",
    eyebrow: "Scale",
    icon: "cloud",
    short: "Migrations and custom platforms that scale in steps you can afford.",
    lede: "Cloud platforms and SaaS solutions that scale with your business — built for the size you are now, and the size you are growing into.",
    cta: "Talk to Us",
    introLabel: "Cloud, without the overhead",
    introHeading: "Grow without re-architecting everything.",
    introBody:
      "We design cloud systems that scale in steps you can afford, not all-or-nothing migrations. Whether it is moving existing systems to the cloud or building a new SaaS product from scratch, we plan for the growth you actually expect.",
    pillarsTitle: "What we deliver",
    pillars: [
      {
        icon: "cloud",
        title: "Cloud migration",
        body: "Move existing systems to the cloud without downtime surprises.",
      },
      {
        icon: "puzzle",
        title: "SaaS platforms",
        body: "Custom software platforms built to scale with your users.",
      },
      {
        icon: "growth",
        title: "Built to grow",
        body: "Architecture that scales with demand, not a rebuild every time you grow.",
      },
    ],
    closing: "Ready to scale properly?",
    image: "/assets/saas.avif",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}


/** Short trust signals shown under the hero CTA. Keep these verifiable. */
export const trustPoints = [
  "Reply within one business day",
  "Senior engineers, no handoffs",
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
    a: "Fixed-scope projects get a fixed price after the research phase, so you are never quoted on a guess. Ongoing work (infrastructure support, sourcing, monitoring) is a monthly retainer. We will tell you which applies on the first call.",
  },
  {
    q: "Do you only work in Rwanda?",
    a: "We are based in Kigali and install physical systems — security, networks, smart buildings — across Rwanda. Software, cloud, analytics, and hiring work is delivered remotely for clients anywhere in East Africa and beyond.",
  },
  {
    q: "We are a small business. Is this for us?",
    a: "Yes, as long as the problem is real. We are a small team ourselves and size our engagements accordingly. What matters is that there is a clear business reason for the work — and we will say so if there is not.",
  },
  {
    q: "Who actually does the work?",
    a: "A small senior team. The engineer who scopes your project is the engineer who builds it, and you have their direct contact for the life of the engagement.",
  },
  {
    q: "What if we already have an IT provider?",
    a: "That is common. We regularly take a single well-defined piece — a security install, a cloud migration, a hiring push — and work alongside an existing provider without disrupting them.",
  },
] as const;

/**
 * Real photographs of the team and workspace. Paths under /public. Leave a
 * slot empty and the section falls back to its photo-less layout, so the
 * site never shows a broken image. Shot list: public/assets/photos/README.md
 */
export const photos = {
  /** 4:5 portrait. One engineer at their desk at Norrsken, looking at the camera or mid-conversation. */
  hero: "",
  /** 16:9. The team around a whiteboard or table — the "are you real?" photo. */
  team: "",
  /** 3:2. Norrsken Kigali — the building, the workspace, or the view from it. */
  workspace: "",
} as const;

/** True when a photo slot has been filled. */
export const hasPhoto = (path: string): path is string => path.length > 0;
