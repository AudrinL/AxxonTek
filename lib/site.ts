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
    line1: "Brampton",
    line2: "Ontario",
    city: "Canada",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/axxontek", short: "In" },
    { label: "X", href: "https://x.com/axxontek", short: "X" },
    { label: "GitHub", href: "https://github.com/axxontek", short: "Gh" },
  ],
} as const;

/**
 * Primary navigation. Five items, in the order of the argument a first
 * visitor makes: what we build for ourselves, what we have built for
 * others, what we could build for you, how we build it, and who we are.
 * Contact is the button, not a nav item, and lives in the footer too.
 */
export const primaryNav = [
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Lab", href: "/lab" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

/**
 * Secondary links. Footer only, never the primary bar. Careers and
 * Insights are deliberately not here yet: an empty careers page or a
 * blog with no posts signals a company pretending to be bigger than it
 * is, which is the opposite of what they are for. They arrive when there
 * is something true to put on them.
 */
export const secondaryNav = [
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
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
 * Hosting
 *
 * The one service on the site with a public, fixed price. Everything
 * else is scoped after a conversation; hosting is a known quantity, so
 * it is quoted plainly. Same content rule applies: the reader is the
 * subject. "Your site stays up" beats "we provide uptime".
 * ------------------------------------------------------------------ */
export type HostingPlan = {
  name: string;
  price: number;
  currency: string;
  period: string;
  cadence: string;
  checkoutUrl: string;
  lede: string;
  image: string;
  includes: string[];
  note: string;
};

export const hosting: HostingPlan = {
  name: "Managed hosting",
  price: 133,
  currency: "USD",
  period: "year",
  cadence: "Billed once a year",
  checkoutUrl: "https://flutterwave.com/pay/t8rgtxiizwgr",
  lede:
    "Your site stays online, fast and patched, on infrastructure we run and monitor so you never have to think about it.",
  image: "/assets/services/hosting.png",
  includes: [
    "Your site live on managed infrastructure, tuned for African networks",
    "A free SSL certificate, renewed automatically so the lock never lapses",
    "Daily backups you can restore from, kept off the main server",
    "Security patches and uptime monitoring handled by us, not by you",
    "A custom domain connected properly, with email routing if you need it",
    "A real engineer to reach when something looks wrong",
  ],
  note:
    "Domain registration is billed separately at cost. Sites we did not build are welcome after a short review.",
} as const;

/* ------------------------------------------------------------------ *
 * Services, with imagery
 *
 * The build work that a hosting customer usually needs first. Each one
 * keeps the content rule: the reader is the subject. Images live under
 * /public/assets/services and are 16:9 so the cards line up.
 * ------------------------------------------------------------------ */
export type Service = {
  name: string;
  blurb: string;
  image: string;
  href: string;
};

export const services: Service[] = [
  {
    name: "Software development",
    blurb:
      "The system your organisation runs on, built for mid-range phones on mobile data rather than a demo laptop.",
    image: "/assets/services/software-development.png",
    href: "/contact",
  },
  {
    name: "App development",
    blurb:
      "A customer-facing app that turns a visit into an order, with mobile money and WhatsApp wired in from the first screen.",
    image: "/assets/services/app-development.avif",
    href: "/contact",
  },
  {
    name: "IT consultation",
    blurb:
      "Know what you need before you pay for it: an honest audit and a written recommendation you can act on with us or without us.",
    image: "/assets/services/it-consultation.png",
    href: "/contact",
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
    a: "It is in active development in the Lab, with the first browser prototypes already running. If you run a school and want to be part of the pilot, get in touch and say so.",
  },
] as const;

/* ================================================================== *
 * What we build
 *
 * The three levels the company operates on, in the order a stranger
 * should meet them: the products we own, the systems we build for
 * others, and the frontier we explore. This is the spine of the home
 * page and the clearest single statement that AxxonTek is a technology
 * company rather than an agency.
 * ================================================================== */
export type BuildLevel = {
  id: string;
  kicker: string;
  name: string;
  lede: string;
  href: string;
  cta: string;
};

export const whatWeBuild: BuildLevel[] = [
  {
    id: "products",
    kicker: "We build our own",
    name: "Products",
    lede:
      "Technology we design, own and operate ourselves. Floow and TalentLens are live and used by people who have never heard of us, which is the only test that counts.",
    href: "/products",
    cta: "See our products",
  },
  {
    id: "systems",
    kicker: "We build for organisations",
    name: "Digital systems",
    lede:
      "The platforms, applications and websites an organisation runs on, built for mid-range phones on mobile data rather than a demo laptop, and handed over working.",
    href: "/work",
    cta: "See the work",
  },
  {
    id: "emerging",
    kicker: "We explore what is next",
    name: "Emerging technology",
    lede:
      "Virtual laboratories, AI, WebGL and immersive interfaces, worked out in the open so the ideas that survive can reach the schools, clinics and businesses that need them.",
    href: "/studio",
    cta: "Explore the Studio",
  },
];

/* ================================================================== *
 * Capabilities, grouped
 *
 * The masterplan structure: five families a client can ask for by
 * outcome, not fifty technologies they would have to decode. The rule
 * holds here too. A client asks "what can you build for me", never
 * "which framework do you use", so the framework names stay out of this
 * list and live in the case studies instead.
 * ================================================================== */
export type CapabilityGroup = {
  id: string;
  name: string;
  lede: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "product-engineering",
    name: "Product engineering",
    lede: "The working software your organisation and your customers actually use.",
    items: ["Web applications", "Mobile applications", "Backend systems", "APIs and integrations"],
  },
  {
    id: "digital-experiences",
    name: "Digital experiences",
    lede: "The public face of your organisation, built to turn a visit into a decision.",
    items: ["Websites", "E-commerce", "Interactive experiences", "WebGL and 3D on the web"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    lede: "The parts you should never have to think about, run so you do not have to.",
    items: ["Cloud hosting", "Databases", "Authentication", "Integrations", "Deployment"],
  },
  {
    id: "product-design",
    name: "Product design",
    lede: "The reason people understand your product the first time they open it.",
    items: ["UX", "UI", "Design systems", "Prototyping"],
  },
  {
    id: "emerging-technology",
    name: "Emerging technology",
    lede: "The frontier, brought down to something a real organisation can run today.",
    items: ["AI and automation", "VR and XR", "3D and simulation", "Experimental interfaces"],
  },
];

/* ================================================================== *
 * Product detail pages
 *
 * The long story behind each product we own. Keyed by the same slug as
 * `products` above; a product appears on /products/<slug> only once it
 * has an entry here. Every string keeps the reader as the subject.
 * ================================================================== */
export type ProductDetail = {
  slug: string;
  /** The one line at the top of the product page. */
  line: string;
  /** The register the page opens in. Products earn the dark ground. */
  problem: { heading: string; body: string };
  how: { heading: string; steps: { title: string; body: string }[] };
  /** The two sides of the product, named for who lives on each. */
  audiences: { label: string; title: string; body: string }[];
  technology: string[];
  vision: string;
  /** Public URL, when there is one to send people to. */
  url?: string;
};

export const productDetails: ProductDetail[] = [
  {
    slug: "floow",
    line: "Send a parcel anywhere in Rwanda, and watch it move the whole way.",
    problem: {
      heading: "The problem",
      body: "Getting a parcel from a business in Kigali to a person in Nyamabuye meant a chain of separate couriers, phone calls and guesses. Nobody could see the whole journey, and when something went missing there was no single place to ask. Delivery apps existed; the network underneath them did not.",
    },
    how: {
      heading: "How Floow works",
      steps: [
        {
          title: "One network, one code",
          body: "A business books a parcel and gets a single tracking code that stays with it across every courier that touches it, instead of a new number at every handoff.",
        },
        {
          title: "Built for the phones people have",
          body: "The whole flow runs on mid-range Android phones on mobile data, with mobile money and SMS wired in from the first screen rather than added later.",
        },
        {
          title: "Both ends can watch",
          body: "Sender and recipient see the same live status, so a delivery becomes something you follow rather than something you wait for and hope.",
        },
      ],
    },
    audiences: [
      {
        label: "For businesses",
        title: "Ship without babysitting",
        body: "Book, pay and track from one place, with a record of every parcel you have ever sent and where it went.",
      },
      {
        label: "For couriers",
        title: "Work that routes itself",
        body: "Pickups and drop-offs arrive already ordered by geography, so a rider spends the day moving parcels instead of planning routes.",
      },
    ],
    technology: ["Web and mobile apps", "Courier routing", "Mobile money", "Operations tooling"],
    vision: "A parcel network that reaches the towns the big carriers skip, run on infrastructure built for how Rwanda actually moves.",
    url: "",
  },
  {
    slug: "talentlens",
    line: "Hire on evidence, and let people practise the same tests for free before they sit one.",
    problem: {
      heading: "The problem",
      body: "Organisations hire on instinct and a CV, then discover months later whether the person can actually reason through the work. Candidates, meanwhile, walk into aptitude tests they have never seen the shape of. Both sides are guessing, and both sides lose when the guess is wrong.",
    },
    how: {
      heading: "How TalentLens works",
      steps: [
        {
          title: "Reasoning, across seven categories",
          body: "A test engine covers the categories employers actually screen on, scored consistently so two candidates can be compared on the same evidence.",
        },
        {
          title: "Practice is free, and real",
          body: "Anyone can practise the exact test types under a real timer before an interview, so the assessment measures ability rather than familiarity.",
        },
        {
          title: "Assessment for the organisation",
          body: "The organisation running the hiring gets structured results instead of a gut feeling, and a defensible reason for every shortlist.",
        },
      ],
    },
    audiences: [
      {
        label: "For organisations",
        title: "A shortlist you can defend",
        body: "See how candidates actually reason, scored the same way every time, so the decision rests on evidence rather than a strong interview day.",
      },
      {
        label: "For candidates",
        title: "Walk in prepared",
        body: "Practise the real test types under a real timer, for free, so the only thing being measured on the day is how you think.",
      },
    ],
    technology: ["Product design", "Web application", "Test engine", "Hosting and support"],
    vision: "Assessment infrastructure that makes talent legible wherever it is, so opportunity follows ability rather than access.",
    url: "",
  },
];

export const getProductDetail = (slug: string) =>
  productDetails.find((p) => p.slug === slug);

/* ================================================================== *
 * Studio
 *
 * Concepts, not client work. The Studio is what AxxonTek is capable of
 * building, shown as designed directions a visitor can browse and then
 * ask us to make theirs. It grows without pretending anything here was
 * commissioned, which is exactly why it stays separate from /work.
 *
 * These are presented honestly as concepts. Where a live, explorable
 * build exists, `preview` points at it; until then the concept shows a
 * designed poster and an honest "live preview in progress" state rather
 * than a faked screenshot.
 * ================================================================== */
export type StudioStyle =
  | "Minimal"
  | "Editorial"
  | "Luxury"
  | "Corporate"
  | "Experimental"
  | "Bold";

export type StudioConcept = {
  slug: string;
  industry: string;
  /** Per-industry number, e.g. Restaurant / 03. */
  number: string;
  title: string;
  blurb: string;
  style: StudioStyle;
  features: string[];
  /** Two hex stops for the poster gradient. Our own palette, no stock art. */
  accent: [string, string];
  /** A live, explorable build. Empty until one exists. */
  preview?: string;
};

export const studioCategories = [
  "All",
  "Restaurants",
  "Hotels",
  "Real Estate",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Logistics",
  "Corporate",
] as const;

export const studioStyles: StudioStyle[] = [
  "Minimal",
  "Editorial",
  "Luxury",
  "Corporate",
  "Experimental",
  "Bold",
];

export const studioConcepts: StudioConcept[] = [
  {
    slug: "restaurant-01",
    industry: "Restaurants",
    number: "01",
    title: "A dining room that fills its own tables",
    blurb: "A menu people can read on the walk over, a story worth the trip, and reservations taken without a single phone call.",
    style: "Editorial",
    features: ["Reservations", "Menu", "Story"],
    accent: ["#b3350c", "#e8642a"],
  },
  {
    slug: "hotel-01",
    industry: "Hotels",
    number: "01",
    title: "A stay booked before the guest arrives",
    blurb: "Rooms shown the way they actually feel, availability that is always current, and a booking flow that finishes on a phone.",
    style: "Luxury",
    features: ["Booking", "Rooms", "Payments"],
    accent: ["#2b2140", "#6d4aa6"],
  },
  {
    slug: "real-estate-01",
    industry: "Real Estate",
    number: "01",
    title: "Listings that answer the first ten questions",
    blurb: "Every property with the map, the numbers and the walkthrough a buyer needs before they ever pick up the phone.",
    style: "Minimal",
    features: ["Listings", "Maps", "Enquiries"],
    accent: ["#16302a", "#2f7d63"],
  },
  {
    slug: "healthcare-01",
    industry: "Healthcare",
    number: "01",
    title: "A clinic patients can reach at 9pm",
    blurb: "Appointments booked without the front desk, clear guidance before a visit, and a calm, legible presence people trust.",
    style: "Corporate",
    features: ["Appointments", "Services", "Patient info"],
    accent: ["#0f2a3d", "#2f7fb0"],
  },
  {
    slug: "education-01",
    industry: "Education",
    number: "01",
    title: "A school that admits its next class online",
    blurb: "Programmes laid out plainly, applications taken end to end, and a site parents can navigate on the phone in their hand.",
    style: "Editorial",
    features: ["Admissions", "Programmes", "Portal"],
    accent: ["#3a2410", "#c07a2c"],
  },
  {
    slug: "finance-01",
    industry: "Finance",
    number: "01",
    title: "A lender that feels as safe as it is",
    blurb: "Products explained without the jargon, applications that start on the site, and the quiet authority a money brand needs.",
    style: "Corporate",
    features: ["Products", "Applications", "Trust"],
    accent: ["#101b2e", "#3457a8"],
  },
  {
    slug: "retail-01",
    industry: "Retail",
    number: "01",
    title: "A shop that never closes",
    blurb: "A catalogue that loads on a slow connection, checkout with mobile money, and stock that stays honest across both.",
    style: "Bold",
    features: ["E-commerce", "Payments", "Catalogue"],
    accent: ["#3d0f1f", "#c0355f"],
  },
  {
    slug: "logistics-01",
    industry: "Logistics",
    number: "01",
    title: "A carrier you can see through",
    blurb: "Live tracking a customer actually believes, quotes without an email chain, and an operations view the team runs the day from.",
    style: "Experimental",
    features: ["Tracking", "Quotes", "Dashboard"],
    accent: ["#12100e", "#c0562a"],
  },
];

export const getStudioConcept = (slug: string) =>
  studioConcepts.find((c) => c.slug === slug);
