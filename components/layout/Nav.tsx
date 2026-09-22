"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { primaryNav, site } from "@/lib/site";

/**
 * The bar takes its colour from the ground rather than deciding for
 * itself, which is the reason it never fights a chapter. Once scrolled
 * it becomes a frosted veil of whatever the current ground is: the same
 * surface, slightly opaque, blurred. rho does exactly this and it is why
 * their header works over both light and dark without a second variant.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={
            scrolled
              ? "border-b border-line bg-[color-mix(in_srgb,var(--c-surface)_10%,transparent)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color] duration-[var(--t-ground)] ease-[var(--ease-gravity)]"
              : "border-b border-transparent transition-[background-color,border-color] duration-[var(--t-ground)] ease-[var(--ease-gravity)]"
          }
          style={
            scrolled
              ? {
                  backgroundColor:
                    "color-mix(in srgb, var(--ground-veil, var(--canvas)) 82%, transparent)",
                }
              : undefined
          }
        >
          <nav
            className={`container-x flex items-center justify-between gap-4 transition-[height] duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
            aria-label="Primary"
          >
            <Logo compact={scrolled} />

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative flex h-9 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-[var(--t-hover)] hover:text-tone ${
                      isActive(item.href) ? "text-tone" : "text-tone-mute"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span
                        aria-hidden
                        className="absolute inset-x-4 bottom-1 h-px bg-ember"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <Link href="/contact" className="pill pill-ember hidden h-11 px-6 text-sm hover:bg-ember-deep lg:inline-flex">
                Start a project
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-firm text-tone transition-colors duration-[var(--t-hover)] lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer. Paints the ground colour solid so it is legible in
          either chapter without a second set of classes. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <div className="absolute inset-0 bg-canvas dotgrid" style={{ backgroundColor: "var(--ground-veil, var(--canvas))" }} />
        <div className="container-x relative flex h-full flex-col justify-center gap-1 pt-20">
          {primaryNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-5 font-display text-[2rem] font-semibold tracking-[-0.03em] text-tone"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="pill pill-ember mt-8 self-start">
            Start a project
          </Link>
          <p className="label mt-10">
            <span className="label-dot" aria-hidden />
            {site.address.city}
          </p>
        </div>
      </div>
    </>
  );
}
