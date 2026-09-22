import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

/** Generated from the route data, so it cannot drift out of sync. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/solutions", priority: 0.9 },
    { path: "/lab", priority: 0.9 },
    { path: "/playground", priority: 0.8 },
    { path: "/work", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...work.map((item) => ({
      url: `${site.url}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
