import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Tag } from "@/components/system/Page";
import { work, workCategories, hasShot } from "@/lib/work";

/**
 * The work, as a grid of tiles: the project's own screen first, then its
 * name, year, category and one line. Categories are shown as tags rather
 * than a filter, because with a short list a filter mostly produces empty
 * states.
 */
export function WorkIndex() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {work.map((item, i) => {
        const category = workCategories.find((c) => c.id === item.category);
        return (
          <Reveal as="li" key={item.slug} delay={(i % 2) * 70} className="h-full">
            <Link
              href={`/work/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--r-card)] bg-black"
            >
              <div className="px-6 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-7">
                <p className="text-[0.75rem] text-tone-faint">
                  {item.nda ? item.client : category?.label} &middot; {item.year}
                </p>
                <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-[1.14] transition-colors duration-[var(--t-hover)] group-hover:text-accent">
                  {item.name}
                </h2>
                <p className="mt-2 max-w-[44ch] text-[1.0625rem] leading-[1.47] text-tone-mute">
                  {item.summary}
                </p>
                {category && (
                  <p className="mt-5 flex flex-wrap gap-1.5">
                    <Tag>{category.label}</Tag>
                  </p>
                )}
              </div>
              {hasShot(item) && (
                <div className="relative mx-3 mt-auto mb-3 aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={item.shot}
                    alt={`${item.name} interface`}
                    fill
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="object-cover object-left-top transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.02]"
                  />
                </div>
              )}
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
