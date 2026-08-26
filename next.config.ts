import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // NOTE: do not add `experimental.optimizePackageImports` for framer-motion or
  // @react-three/drei here. Next 15 already optimizes framer-motion by default,
  // and forcing it broke the module graph for runtime-rendered routes: /contact
  // returned a 500 ("TypeError: a[d] is not a function" from webpack-runtime)
  // in production builds while working fine in dev.
};

export default nextConfig;
