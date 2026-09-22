import Link from "next/link";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section data-chapter-ground="canvas" className="container-x pt-48 pb-[var(--chapter)]">
      <p className="label mb-7">
        <span className="label-dot" aria-hidden />
        404
      </p>
      <h1 className="text-display max-w-[14ch]">This page does not exist.</h1>
      <p className="text-lede mt-7 max-w-[46ch]">
        The link may be old, or the page may have moved during the rebuild. Here is
        everything that does exist.
      </p>

      <ul className="mt-10 flex flex-wrap gap-2.5">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="pill pill-quiet hover:border-tone">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="pill pill-ember hover:bg-ember-deep">
            Contact
          </Link>
        </li>
      </ul>
    </section>
  );
}
