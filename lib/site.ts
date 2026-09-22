/**
 * The content model.
 *
 * One rule governs every string in this file: the customer is the subject
 * of the sentence. "We build custom applications" becomes "your customers
 * can order and pay without calling anyone". Same fact, and only one of
 * them is about the reader. Copy that breaks the rule gets rewritten, not
 * redesigned around.
 *
 * Second rule: no em dashes anywhere.
 */

export const site = {
  name: "AxxonTek",
  tagline: "What's next, working now",
  description:
    "AxxonTek is a technology company in Kigali. We build software, AI, immersive learning and smart systems for organisations across Africa, and we run the products we invent.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axxontek.com",
  email: "info@axxontek.com",
  /** Leave empty until there is a real line. The UI hides it when blank. */
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
  { label: "Solutions", href: "/solutions" },
  { label: "Lab", href: "/lab" },
  { label: "Playground", href: "/playground" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

/**
 * The positioning, in the two forms the site actually needs it.
 * `line` is the brand statement. `promise` is what it means for a reader.
 */
export const positioning = {
  line: "What's next, working now.",
  promise:
    "New technology gets announced constantly and deployed almost nowhere. We build the systems that close that gap, for schools, clinics, businesses and the people they serve.",
} as const;

/* ------------------------------------------------------------------ *
 * Situations
 *
 * Written in the words a visitor would use about their own problem, so
 * they recognise themselves before they have to learn our vocabulary.
 * Each one names the technology only after the outcome.
 * ------------------------------------------------------------------ */
export type Situation = {
  said: string;
  answer: string;
  tags: string[];
  href: string;
};

export const situations: Situation[] = [
  {
    said: "Your customers have to call someone to buy from you.",
    answer:
      "An ordering and payment flow built for the phones and connections your customers actually have, with mobile money and WhatsApp wired in rather than bolted on.",
    tags: ["Software", "Payments"],
    href: "/solutions#software",
  },
  {
    said: "Your school teaches science students never get to perform.",
    answer:
      "A virtual laboratory for physics, biology and chemistry that runs on the devices the school already owns. No building, no glassware, no technician.",
    tags: ["Immersive", "Education"],
    href: "/lab",
  },
  {
    said: "Your team runs the whole operation on spreadsheets and WhatsApp.",
    answer:
      "One system that holds the process end to end, with the messaging tools your team already lives in connected to it instead of replaced.",
    tags: ["Platforms", "Automation"],
    href: "/solutions#software",
  },
  {
    said: "You have data, and no idea what it is telling you.",
    answer:
      "Reporting that answers the questions you actually ask out loud, and automation for the decisions that repeat every week.",
    tags: ["AI", "Data"],
    href: "/solutions#ai",
  },
  {
    said: "You cannot prove who opened which door, or when.",
    answer:
      "Cameras, access control and automation designed around your actual space, installed properly, with a record you can rely on and run from your phone.",
    tags: ["Smart systems"],
    href: "/solutions#smart",
  },
  {
    said: "You are about to spend real money and you are not sure on what.",
    answer:
      "An independent review and a written recommendation you can act on, including when the honest answer is a smaller project, a different approach, or not us.",
    tags: ["Advisory"],
    href: "/solutions#advisory",
  },
];

/* ------------------------------------------------------------------ *
 * Capabilities
 * ------------------------------------------------------------------ */
export type Capability = {
  id: string;
  name: string;
  lede: string;
  body: string;
  bullets: string[];
  stack: string[];
};

export const capabilities: Capability[] = [
  {
    id: "software",
    name: "Software and platforms",
    lede: "The system your organisation runs on, built for the conditions it runs in.",
    body:
      "Most software assumes a fast laptop on fast Wi-Fi. Your customers are on mid-range Android phones on mobile data, and your staff are often on the same. We design for that from the first screen: light pages, clear flows, and the payment and messaging rails people here already use.",
    bullets: [
      "Customer-facing apps and websites that turn a visit into an order",
      "Internal systems that replace the spreadsheet nobody trusts",
      "Mobile money, SMS and WhatsApp connected properly",
    ],
    stack: ["Web", "Mobile", "Integrations"],
  },
  {
    id: "ai",
    name: "AI and automation",
    lede: "Fewer repeated decisions, and answers from the data you already hold.",
    body:
      "The useful version of this is rarely a chatbot. It is a document that reads itself into your system, a weekly report that writes itself, a queue that sorts itself before anyone looks at it. We start from the task that costs your team the most hours and work backwards.",
    bullets: [
      "Documents and forms turned into structured data",
      "Reporting that answers the question as asked",
      "Routine decisions handled before a human sees them",
    ],
    stack: ["Language models", "Automation", "Data"],
  },
  {
    id: "immersive",
    name: "Immersive and virtual",
    lede: "Practical experience where the equipment, the room or the risk makes it impossible.",
    body:
      "This is where the Lab spends most of its time. Virtual laboratories let a school teach physics, biology and chemistry practicals without building and maintaining a laboratory. VR reaches the schools that can run it. Browser based simulation reaches the far larger number that cannot, which is the half that matters.",
    bullets: [
      "Virtual laboratories for practical subjects",
      "Browser simulation for low-cost devices",
      "VR for the environments that justify it",
    ],
    stack: ["WebGL", "VR", "Simulation"],
  },
  {
    id: "smart",
    name: "Smart systems",
    lede: "Cameras, access and automation, designed around your space and installed properly.",
    body:
      "These systems fail from bad setup far more often than bad hardware: blind spots, alerts nobody sees, an app that stops working after a month. We plan the coverage around how the space is actually used, install it cleanly, and make sure you can run it yourself afterwards.",
    bullets: [
      "Camera coverage planned before anything is drilled",
      "Gates, doors and locks you can audit",
      "Lighting and power on rules that hold",
    ],
    stack: ["IoT", "Access control", "Automation"],
  },
  {
    id: "advisory",
    name: "Technology advisory",
    lede: "Know what you need before you pay for it.",
    body:
      "Most technology money is lost before anything is built: the wrong vendor, the wrong scope, the wrong thing fixed first. We review what you have, understand what you are trying to achieve, and give you a written recommendation you can act on with us or without us.",
    bullets: [
      "An honest audit of systems, tools and costs",
      "Build, buy or do nothing yet",
      "A roadmap sized to the budget you actually have",
    ],
    stack: ["Review", "Roadmap"],
  },
];

export const getCapability = (id: string) => capabilities.find((c) => c.id === id);

/* ------------------------------------------------------------------ *
 * Products
 * ------------------------------------------------------------------ */
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  outcome: string;
  status: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "floow",
    name: "Floow",
    tagline: "A national parcel system for Rwanda",
    outcome:
      "A business in Kigali can send a parcel to Nyamabuye and both ends can watch it move, on one network, with one code.",
    status: "Live",
    image: "/assets/work/floow.png",
  },
  {
    slug: "talentlens",
    name: "TalentLens",
    tagline: "Reasoning assessment for hiring and practice",
    outcome:
      "An organisation can hire on evidence instead of instinct, and a candidate can practise the same tests for free before they sit one.",
    status: "Live",
    image: "/assets/work/talentlens.png",
  },
];

/* ------------------------------------------------------------------ *
 * How working together goes
 * ------------------------------------------------------------------ */
export const processSteps = [
  {
    n: "01",
    title: "We study the problem",
    body:
      "Before scoping or quoting, we spend real time on what you are actually trying to fix, and whether you need what you think you need.",
    promise: "You are never priced on a guess",
  },
  {
    n: "02",
    title: "We tell you the truth",
    body:
      "You get a clear recommendation, including when the answer is a smaller project, a different approach, or not us at all.",
    promise: "Including when the answer is no",
  },
  {
    n: "03",
    title: "We build it ourselves",
    body:
      "The engineer who scoped it writes the code and installs the systems, and you keep their direct contact after launch.",
    promise: "No handoffs, no junior bench",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Objections a serious buyer has before they write to you
 * ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "What happens after I get in touch?",
    a: "A 30 minute conversation with an engineer, not a salesperson, about what you are trying to solve. If it looks like a fit we follow up with a short written summary of the problem as we understand it and a proposed next step. No obligation either way.",
  },
  {
    q: "How do you price work?",
    a: "Fixed-scope projects such as an app, a website or an installation get a fixed price after the research phase, so you are never quoted on a guess. Ongoing work such as advisory, support and monitoring is a monthly retainer. We tell you which applies on the first call.",
  },
  {
    q: "Do you only work in Rwanda?",
    a: "We are based in Kigali and install smart systems across Rwanda. Software, AI, immersive work and advisory are delivered remotely for clients anywhere in Africa and beyond.",
  },
  {
    q: "We are a small organisation. Is this for us?",
    a: "Yes. SMEs, schools and individual professionals are who we build for most often. We size engagements accordingly, and we will say so if there is no clear reason for the work.",
  },
  {
    q: "Can you work alongside our current IT provider?",
    a: "That is common. We regularly take a single well-defined piece, an app, a website, an installation or a review, and work alongside an existing provider without disrupting them.",
  },
  {
    q: "Is the virtual laboratory work available now?",
    a: "It is in active development in the Lab, and the first browser prototypes are on the Playground where anyone can use them. If you run a school and want to be part of the pilot, get in touch and say so.",
  },
] as const;
