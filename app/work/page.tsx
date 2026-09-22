import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Rule } from "@/components/layout/Rule";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects AxxonTek has designed, built and shipped — websites, applications, our own products, and installed smart systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="container-x pt-40 pb-14 md:pt-48">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label mb-7">Selected work</p>
            <h1 className="text-display max-w-[16ch]">
              Things we built,
              <br />
              still running.
            </h1>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-mute">
            Every project here was scoped, built and is supported by the same
            four people. Where a client has asked us not to name them, we name
            the sector instead.
          </p>
        </div>
      </header>

      <div className="container-x">
        <Rule />
        <p className="label py-5">
          {work.length} {work.length === 1 ? "project" : "projects"} &middot; more
          added as they go live
        </p>
      </div>

      <WorkIndex />
    </>
  );
}
