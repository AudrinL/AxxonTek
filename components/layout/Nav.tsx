"use client";

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
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Icon } from "@/components/Icon";

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setCondensed(latest > 24));

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
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: easeOutExpo }}
      >
        {/* The bar is always readable: solid ground once you scroll, and even
            at the top it sits on the page colour so it never fights a hero. */}
        <div
          className={`transition-[background-color,box-shadow,border-color] duration-400 ${
            condensed
              ? "border-b border-hairline bg-ink/85 shadow-nav backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-ink/0"
          }`}
        >
          <nav
            className={`container-x flex items-center justify-between gap-4 transition-[height] duration-400 ${
              condensed ? "h-16" : "h-20"
            }`}
            aria-label="Primary"
          >
            <Logo compact={condensed} className="relative z-10" />

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative flex h-9 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-300 hover:bg-ink-panel hover:text-bone ${
                      isActive(item.href) ? "text-bone" : "text-mute"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <div className="hidden lg:block">
                <MagneticButton href="/contact" variant="primary" size="md" strength={8}>
                  Book a call
                </MagneticButton>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-bone transition-colors hover:border-hairline-strong lg:hidden"
              >
                <span className="flex h-3 w-4 flex-col justify-between">
                  <motion.span
                    className="block h-[1.5px] w-full rounded bg-current"
                    animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
                  />
                  <motion.span
                    className="block h-[1.5px] w-full rounded bg-current"
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-[1.5px] w-full rounded bg-current"
                    animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
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
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.3, ease: easeOutExpo }}
          >
            <motion.nav
              className="container-x flex flex-1 flex-col gap-9 pt-28 pb-12"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              aria-label="Mobile"
            >
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between border-b border-hairline py-4 text-[1.5rem] font-medium tracking-tight text-bone"
                    >
                      {item.label}
                      <Icon name="arrow" className="text-faint" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                }}
              >
                <p className="eyebrow mb-4">Services</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-[0.9375rem] text-mute transition-colors hover:text-bone"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-auto flex flex-col gap-3"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                }}
              >
                <MagneticButton href="/contact" size="lg" className="w-full" strength={0}>
                  Book a call
                </MagneticButton>
                <a
                  href={`mailto:${site.email}`}
                  className="text-center text-sm text-mute transition-colors hover:text-ember"
                >
                  {site.email}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
