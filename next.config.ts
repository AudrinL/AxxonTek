import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Legacy .html URLs from the old static site, and service slugs from the first
// Next.js version, pointed straight at their current routes.
const legacyRedirects: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/contact.html", "/contact"],
  ["/blog.html", "/blog"],
  ["/careers.html", "/careers"],
  ["/privacy.html", "/privacy"],
  ["/terms.html", "/terms"],
  ["/sourcing.html", "/services/lab"],
  ["/interviews.html", "/services/lab"],
  ["/analytics.html", "/services/consulting"],
  ["/security.html", "/services/smart-homes"],
  ["/infrastructure.html", "/services/consulting"],
  ["/cloud.html", "/services/software"],
  ["/services/sourcing", "/services/lab"],
  ["/services/interviews", "/services/lab"],
  ["/services/analytics", "/services/consulting"],
  ["/services/security", "/services/smart-homes"],
  ["/services/infrastructure", "/services/consulting"],
  ["/services/cloud", "/services/software"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudflare Workers has no Next.js image optimizer. Photos are
    // pre-compressed by scripts/photos.mjs and served as-is.
    unoptimized: true,
  },
  async redirects() {
    return [
      // One canonical host. www answers (so old links and Search Console
      // properties still resolve) but always lands on the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.axxontek.com" }],
        destination: "https://axxontek.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // NOTE: do not add `experimental.optimizePackageImports` for framer-motion or
  // @react-three/drei here. Next 15 already optimizes framer-motion by default,
  // and forcing it broke the module graph for runtime-rendered routes: /contact
  // returned a 500 ("TypeError: a[d] is not a function" from webpack-runtime)
  // in production builds while working fine in dev.
};

export default nextConfig;

initOpenNextCloudflareForDev();
