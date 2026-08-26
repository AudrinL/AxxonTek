"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { primaryNav, services, site } from "@/lib/site";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(latest > 40);
    // Hide on scroll down, reveal on scroll up - but never while the menu is open.
    setHidden(!menuOpen && latest > previous && latest > 320);
  });

  // Close the drawer on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll behind the drawer.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: easeOutExpo }}
      >
        {/* Utility bar: one line, one offer, collapses the moment you scroll so
            it never competes with the nav. */}
        <motion.div
          aria-hidden={condensed}
          initial={false}
          animate={{ height: condensed ? 0 : 38, opacity: condensed ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: easeOutExpo }}
          className="overflow-hidden border-b border-hairline bg-surface-2"
        >
          <div className="container-x flex h-[38px] items-center justify-center gap-3 text-[0.8125rem]">
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-ember sm:block" />
            <span className="truncate text-mute">
              Taking on new projects for {new Date().getFullYear()}.
            </span>
            <Link
              href="/contact"
              tabIndex={condensed ? -1 : 0}
              className="group inline-flex shrink-0 items-center gap-1.5 font-medium text-bone transition-colors hover:text-ember"
            >
              Book a call
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="transition-transform duration-400 group-hover:translate-x-0.5"
              >
                <path
                  d="M5 12h14m-6-6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        <div
          className={`transition-all duration-500 ${
            condensed
              ? "border-b border-hairline bg-ink/72 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            className={`container-x flex items-center justify-between transition-all duration-500 ${
              condensed ? "h-16" : "h-20 md:h-24"
            }`}
            aria-label="Primary"
          >
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3"
              aria-label={`${site.name} home`}
            >
              <Image
                src="/assets/logo.webp"
                alt=""
                width={132}
                height={30}
                priority
                className={`w-auto transition-all duration-500 ${condensed ? "h-6" : "h-7"}`}
              />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative flex h-9 items-center px-4 text-sm text-mute transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 bottom-1 h-px origin-left bg-ember transition-transform duration-400 ${
                        isActive(item.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <MagneticButton href="/contact" variant="primary" size="md">
                  Get a Proposal
                </MagneticButton>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-bone transition-colors hover:border-hairline-strong lg:hidden"
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                <span className="flex h-3 w-4 flex-col justify-between">
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/97 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: easeOutExpo }}
          >
            <motion.nav
              className="container-x flex flex-1 flex-col justify-center gap-10 pt-24 pb-16"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 text-[2rem] leading-none tracking-tight text-bone transition-colors hover:text-ember"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="hairline-t pt-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
                }}
              >
                <p className="eyebrow mb-4">Services</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-sm text-mute transition-colors hover:text-bone"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
                }}
              >
                <MagneticButton href="/contact" size="lg" className="w-full">
                  Get a Proposal
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
