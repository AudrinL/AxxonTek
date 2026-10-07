import type { MetadataRoute } from "next";
import { productDetails, site, studioConcepts } from "@/lib/site";
import { work } from "@/lib/work";

/**
 * Generated from the route data so it stays in step with the site. The
 * dynamic sections (products, studio concepts, work) are derived from the
 * same arrays the pages render from, so adding an entry there adds it here.
 * `/solutions` is intentionally absent: it is a redirect, not a page.
 *
 * No lastmod: on Workers this renders per request, so a timestamp would
 * claim every page changed on every fetch and Google would learn to ignore
 * the file. Google ignores changefreq and priority, but they cost nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/studio", priority: 0.9 },
    { path: "/capabilities", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/security", priority: 0.4 },
    { path: "/lab", priority: 0.7 },
    { path: "/pricing", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const dynamicRoutes = [
    ...productDetails.map((p) => ({ path: `/products/${p.slug}`, priority: 0.8 })),
    ...studioConcepts.map((c) => ({ path: `/studio/${c.slug}`, priority: 0.6 })),
    ...work.map((w) => ({ path: `/work/${w.slug}`, priority: 0.7 })),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
