"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

/**
 * Route-change entrance for client-side navigations.
 *
 * Deliberately does NOT run on the first load. Covering the server-rendered
 * HTML with a curtain and starting the content at opacity 0 means nothing
 * contentful paints until React hydrates - that pushed First Contentful Paint
 * from ~0.5s to ~2.4s and read as "the site takes forever to load". On first
 * load the markup is handed straight to the browser; the hero runs its own
 * entrance animation on top of already-visible content.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Which pathname was rendered on the server for this document.
  const initialPath = useRef(pathname);
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    if (pathname !== initialPath.current) setNavigated(true);
  }, [pathname]);

  if (reduced || !navigated) return <>{children}</>;

  return (
    <div key={pathname} className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: easeOutExpo }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.12 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
