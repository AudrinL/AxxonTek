export const site = {
  name: "AxxonTek",
  tagline: "Complete Technology Solutions",
  description:
    "AxxonTek is a Kigali-based technology partner delivering researched, engineered solutions across software, intelligent systems, security, and cloud.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axxontek.com",
  email: "hello@axxontek.com",
  phone: "+250 (0) 700 000 000",
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
  { label: "Expertise", href: "/#expertise" },
  { label: "Why Us", href: "/#why" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Pillar = { icon: string; title: string; body: string };

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
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
    title: "Sourcing",
    eyebrow: "Talent",
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
    title: "Interviews",
    eyebrow: "Vetting",
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
    title: "Analytics",
    eyebrow: "Data",
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
    title: "Security",
    eyebrow: "Protection",
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
    title: "Infrastructure",
    eyebrow: "Foundations",
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
    title: "Cloud Services",
    eyebrow: "Scale",
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

/** The four capability pillars shown on the homepage split-scroll. */
export const capabilities = [
  {
    id: "websites",
    index: "01",
    title: "Custom Websites & Apps",
    body: "Turn ideas into digital experiences people love to use. We create fast, modern websites and applications that help businesses connect with customers, build trust, and grow with confidence.",
    image: "/assets/custom-websites.webp",
    href: "/contact",
  },
  {
    id: "smart-buildings",
    index: "02",
    title: "Smart Building Systems",
    body: "Create smarter, more efficient spaces with intelligent systems that automate lighting, energy management, access control, and daily operations — reducing costs and giving you real control over your facilities.",
    image: "/assets/smart-buildings.jpg",
    href: "/services/infrastructure",
  },
  {
    id: "security",
    index: "03",
    title: "Security Systems",
    body: "Protect what matters most with modern security solutions. From CCTV surveillance and access control to alarm systems and monitoring, we build safer environments with reliable, easy-to-manage infrastructure.",
    image: "/assets/security-systems.webp",
    href: "/services/security",
  },
  {
    id: "saas",
    index: "04",
    title: "SaaS & Hardware",
    body: "Technology should make work easier. We provide scalable software platforms and innovative hardware solutions that help organizations streamline operations, improve productivity, and support long-term growth.",
    image: "/assets/saas.avif",
    href: "/services/cloud",
  },
] as const;
