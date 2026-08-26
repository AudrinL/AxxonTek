import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={"This page moved on."}
        accent={["on."]}
        lede="The page you were looking for is not here. It may have been renamed, or the link that brought you here may be out of date."
        action={{ label: "Back to home", href: "/" }}
      />

      <section className="pb-[clamp(6rem,13vw,11rem)]">
        <div className="container-x">
          <p className="eyebrow hairline-t mb-7 w-full pt-8">Try one of these</p>
          <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "About us", href: "/about" },
              { title: "Contact", href: "/contact" },
              { title: "Careers", href: "/careers" },
              ...services.map((s) => ({ title: s.title, href: `/services/${s.slug}` })),
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between border-b border-hairline py-4 text-[0.9375rem] text-mute transition-colors hover:text-bone"
                >
                  {item.title}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="text-faint transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-ember"
                  >
                    <path
                      d="M5 12h14m-6-6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
