/**
 * The work index.
 *
 * Everything a visitor sees on /work comes from this file. Two rules that
 * keep the page honest:
 *
 *   1. A project with no `shot` renders without an image rather than with
 *      a placeholder. The site never shows fake UI.
 *   2. A project with `nda: true` shows the sector instead of the client
 *      name. Say less rather than inventing more.
 *
 * To add a project: drop a screenshot in public/assets/work/ (1600x1000,
 * .webp) and add an entry below. Order here is the order on the page.
 */

export type WorkCategory = "websites" | "apps" | "products" | "smart";

export const workCategories: { id: WorkCategory; label: string; blurb: string }[] = [
  { id: "websites", label: "Websites", blurb: "Sites built to turn a visit into a call." },
  { id: "apps", label: "Apps", blurb: "Web and mobile applications for how a business runs." },
  { id: "products", label: "Our products", blurb: "Built in the lab, owned and run by us." },
  { id: "smart", label: "Smart systems", blurb: "Cameras, access and automation, installed." },
];

export type WorkItem = {
  slug: string;
  name: string;
  /** One line. What it is, not how good it is. */
  summary: string;
  category: WorkCategory;
  /** Client name, or the sector when `nda` is set. */
  client: string;
  nda?: boolean;
  year: number;
  /** Live URL. Empty when there is nothing public to link to. */
  url?: string;
  /** /assets/work/<file>.webp — 1600x1000. Empty renders type-only. */
  shot?: string;
  /** What we actually did. Three to five short items, no adjectives. */
  scope: string[];
  /** Case-study body. Leave out until there is something true to say. */
  study?: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const work: WorkItem[] = [
  {
    slug: "talentlens",
    name: "TalentLens",
    summary:
      "Timed practice for the reasoning tests employers actually use — and structured assessment for the organisations running them.",
    category: "products",
    client: "AxxonTek",
    year: 2024,
    shot: "/assets/work/talentlens.png",
    scope: [
      "Product design",
      "Web application",
      "Test engine across seven categories",
      "Hosting and support",
    ],
  },
  {
    slug: "floow",
    name: "Floow",
    summary: "A national parcel system for Rwanda — one network for businesses and individuals.",
    category: "products",
    client: "AxxonTek",
    year: 2024,
    shot: "/assets/work/floow.png",
    scope: ["Product design", "Web and mobile apps", "Courier routing", "Operations tooling"],
  },
];

export const getWorkItem = (slug: string) => work.find((w) => w.slug === slug);

export const workByCategory = (id: WorkCategory | "all") =>
  id === "all" ? work : work.filter((w) => w.category === id);

/** True once a project has a screenshot to show. */
export const hasShot = (item: WorkItem): item is WorkItem & { shot: string } =>
  Boolean(item.shot && item.shot.length > 0);
