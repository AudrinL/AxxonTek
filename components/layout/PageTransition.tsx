"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

/**
 * Route-change entrance. Keyed on the pathname so each navigation replays the
 * reveal. A curtain wipes up off the new page while its content settles in,
 * which hides the paint of below-the-fold images on first frame.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <div key={pathname} className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-ink"
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
