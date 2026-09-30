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
  tagline: "Think Beyond Tomorrow",
  description:
    "AxxonTek is a technology company in Kigali. We build software, AI, immersive learning and smart systems for organisations across Africa, and we run the products we invent.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axxontek.com",
  email: "info@axxontek.com",
  /**
   * Leave empty until there is a real line. The UI hides it when blank.
   * Write it exactly as the Google Business Profile shows it, in
   * international form (+250 ...), so Google can match the two.
   */
  phone: "" as string,
  /**
   * Must read exactly as the Google Business Profile does. Google ties the
   * site to the profile by name, address and phone, so a mismatch here
   * costs the knowledge panel its link.
   */
  address: {
    line1: "Norrsken House",
    line2: "1 KN 78 St",
    city: "Kigali, Rwanda",
    street: "Norrsken House, 1 KN 78 St",
    locality: "Kigali",
    country: "RW",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/axxon_tek/" },
    { label: "X", href: "https://x.com/axxontek" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/axxontek/" },
    { label: "YouTube", href: "https://www.youtube.com/@AxxonTek" },
    { label: "GitHub", href: "https://github.com/axxontek" },
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
  { label: "Inspiration", href: "/studio" },
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
  line: "Think beyond tomorrow.",
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
    said: "Online ordering and payments.",
    answer:
      "Let customers order and pay from their phone, with mobile money and WhatsApp.",
    tags: ["Software", "Payments"],
    href: "/solutions#software",
  },
  {
    said: "Virtual science labs.",
    answer:
      "Practical lessons for schools, on the computers they already have.",
    tags: ["Immersive", "Education"],
    href: "/lab",
  },
  {
    said: "One system for your team.",
    answer:
      "Replace spreadsheets and scattered chats with one simple tool.",
    tags: ["Platforms", "Automation"],
    href: "/solutions#software",
  },
  {
    said: "Reports and automation.",
    answer:
      "See what your data says, and automate the tasks you repeat.",
    tags: ["AI", "Data"],
    href: "/solutions#ai",
  },
  {
    said: "Cameras and access control.",
    answer:
      "Know who comes and goes, and check it from your phone.",
    tags: ["Smart systems"],
    href: "/solutions#smart",
  },
  {
    said: "Honest technology advice.",
    answer:
      "Get an independent review before you spend money.",
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
  image: "/assets/services/hosting.webp",
  includes: [
    "Your site online on servers we manage",
    "Free SSL certificate, renewed for you",
    "Daily backups you can restore",
    "Security updates and uptime monitoring",
    "Your own domain and email set up properly",
    "A real engineer to talk to when you need help",
  ],
  note:
    "Domain names are billed separately at cost. We can host sites we did not build after a quick check.",
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
    image: "/assets/services/software-development.webp",
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
    image: "/assets/services/it-consultation.webp",
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
      "We learn what you are trying to fix before we quote anything.",
    promise: "You are never priced on a guess",
  },
  {
    n: "02",
    title: "We tell you the truth",
    body:
      "You get a clear recommendation, even if the answer is a smaller project or not us.",
    promise: "Including when the answer is no",
  },
  {
    n: "03",
    title: "We build it ourselves",
    body:
      "The person who plans your project builds it, and stays your contact after launch.",
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
    line: "Send a parcel anywhere in Rwanda. Track it all the way.",
    problem: {
      heading: "Nobody could see the whole journey.",
      body: "Sending a parcel from Kigali to another town meant several couriers, many phone calls and no single place to track it.",
    },
    how: {
      heading: "How Floow works.",
      steps: [
        {
          title: "One code, start to finish",
          body: "Every parcel gets one tracking code that stays with it the whole way.",
        },
        {
          title: "Made for everyday phones",
          body: "It works on mid-range Android phones and mobile data, with mobile money and SMS built in.",
        },
        {
          title: "Both sides can follow it",
          body: "The sender and the receiver see the same live status.",
        },
      ],
    },
    audiences: [
      {
        label: "For businesses",
        title: "Send and relax.",
        body: "Book, pay and track every parcel in one place.",
      },
      {
        label: "For couriers",
        title: "Routes planned for you.",
        body: "Pickups and drop-offs arrive already in order, so riders spend the day delivering.",
      },
    ],
    technology: ["Web and mobile apps", "Courier routing", "Mobile money", "Operations tools"],
    vision: "A parcel network that reaches every town in Rwanda.",
    url: "",
  },
  {
    slug: "talentlens",
    line: "Hire on evidence. Let candidates practise for free.",
    problem: {
      heading: "Hiring was a guess.",
      body: "Companies hired on CVs and instinct, and candidates sat tests they had never seen before.",
    },
    how: {
      heading: "How TalentLens works.",
      steps: [
        {
          title: "Seven kinds of reasoning test",
          body: "The same test types employers use, scored the same way for everyone.",
        },
        {
          title: "Free practice",
          body: "Anyone can practise the real tests under a real timer before an interview.",
        },
        {
          title: "Clear results",
          body: "Employers get structured results and a clear reason for every shortlist.",
        },
      ],
    },
    audiences: [
      {
        label: "For employers",
        title: "A shortlist you can explain.",
        body: "See how candidates actually reason, scored the same way every time.",
      },
      {
        label: "For candidates",
        title: "Walk in prepared.",
        body: "Practise the real test types for free, so the test measures how you think.",
      },
    ],
    technology: ["Product design", "Web application", "Test engine", "Hosting and support"],
    vision: "Fair assessment anywhere, so opportunity follows ability.",
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
  /** A designed screen for the concept, when we have one. Falls back to the poster. */
  image?: string;
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
    image: "/assets/inspiration/restaurant.webp",
    industry: "Restaurants",
    number: "01",
    title: "Restaurant website",
    blurb: "Show your menu, tell your story, and take table bookings online.",
    style: "Editorial",
    features: ["Reservations", "Menu", "Story"],
    accent: ["#b3350c", "#e8642a"],
  },
  {
    slug: "hotel-01",
    image: "/assets/inspiration/hotel.webp",
    industry: "Hotels",
    number: "01",
    title: "Hotel website",
    blurb: "Show your rooms, keep availability up to date, and take bookings on any phone.",
    style: "Luxury",
    features: ["Booking", "Rooms", "Payments"],
    accent: ["#2b2140", "#6d4aa6"],
  },
  {
    slug: "real-estate-01",
    image: "/assets/inspiration/real-estate.webp",
    industry: "Real Estate",
    number: "01",
    title: "Real estate website",
    blurb: "List every property with photos, a map and prices, and get enquiries straight away.",
    style: "Minimal",
    features: ["Listings", "Maps", "Enquiries"],
    accent: ["#16302a", "#2f7d63"],
  },
  {
    slug: "healthcare-01",
    image: "/assets/inspiration/pharmacy.webp",
    industry: "Healthcare",
    number: "01",
    title: "Clinic website",
    blurb: "Let patients book appointments online and find what they need before a visit.",
    style: "Corporate",
    features: ["Appointments", "Services", "Patient info"],
    accent: ["#0f2a3d", "#2f7fb0"],
  },
  {
    slug: "education-01",
    industry: "Education",
    number: "01",
    title: "School website",
    blurb: "Show your programmes clearly and take applications online.",
    style: "Editorial",
    features: ["Admissions", "Programmes", "Portal"],
    accent: ["#3a2410", "#c07a2c"],
  },
  {
    slug: "finance-01",
    industry: "Finance",
    number: "01",
    title: "Finance website",
    blurb: "Explain your products simply and let customers apply online.",
    style: "Corporate",
    features: ["Products", "Applications", "Trust"],
    accent: ["#101b2e", "#3457a8"],
  },
  {
    slug: "retail-01",
    industry: "Retail",
    number: "01",
    title: "Online shop",
    blurb: "A fast online shop with mobile money checkout and live stock.",
    style: "Bold",
    features: ["E-commerce", "Payments", "Catalogue"],
    accent: ["#3d0f1f", "#c0355f"],
  },
  {
    slug: "logistics-01",
    industry: "Logistics",
    number: "01",
    title: "Logistics website",
    blurb: "Live tracking for customers, quick quotes, and one view for your team.",
    style: "Experimental",
    features: ["Tracking", "Quotes", "Dashboard"],
    accent: ["#12100e", "#c0562a"],
  },
];

export const getStudioConcept = (slug: string) =>
  studioConcepts.find((c) => c.slug === slug);


/* ================================================================== *
 * What we offer, as the homepage names it
 *
 * Six things a visitor can ask for, each phrased as what it does for
 * them. `focus` positions the photograph inside its frame so the part
 * that matters survives the crop.
 * ================================================================== */
export type Offering = {
  id: string;
  name: string;
  line: string;
  tags: string[];
  href: string;
  image: string;
  focus: string;
};

export const offerings: Offering[] = [
  {
    id: "web",
    name: "Web Development",
    line: "Websites and web apps that load fast and are easy to use.",
    tags: ["Websites", "Web apps", "E-commerce"],
    href: "/solutions#software",
    image: "/assets/home/web.webp",
    focus: "60% 40%",
  },
  {
    id: "mobile",
    name: "Mobile Development",
    line: "Android and iPhone apps that work even on slow internet.",
    tags: ["Android", "iOS", "Offline first"],
    href: "/solutions#software",
    image: "/assets/home/mobile.webp",
    focus: "22% 50%",
  },
  {
    id: "cloud",
    name: "Cloud & Hosting Infrastructure",
    line: "Reliable hosting, servers and databases, monitored for you.",
    tags: ["Hosting", "Databases", "Monitoring"],
    href: "/capabilities",
    image: "/assets/home/cloud.webp",
    focus: "70% 50%",
  },
  {
    id: "saas",
    name: "SaaS Product Development",
    line: "Turn your idea into software that people can subscribe to.",
    tags: ["Subscriptions", "Multi-tenant", "APIs"],
    href: "/capabilities",
    image: "/assets/home/saas.webp",
    focus: "56% 50%",
  },
  {
    id: "design",
    name: "UX/UI Design & Redesign",
    line: "Clear, simple screens for new or existing products.",
    tags: ["Research", "Interface design", "Design systems"],
    href: "/capabilities",
    image: "/assets/home/ux.webp",
    focus: "50% 50%",
  },
  {
    id: "smart",
    name: "Smart Home Systems",
    line: "Control your lights, locks and cameras from your phone.",
    tags: ["Automation", "Access control", "Cameras"],
    href: "/solutions#smart",
    image: "/assets/home/smart.webp",
    focus: "45% 50%",
  },
];
