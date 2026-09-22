import type { ReactNode } from "react";

/**
 * A hairline. That is all it is.
 *
 * This replaces a chevron "imigongo" divider that was, to anyone who
 * knows imigongo, not imigongo: the real thing is raised relief built in
 * ridges — spirals, nested lozenges, concentric diamonds, finely
 * outlined — not a flat sawtooth. Approximating it produced a generic
 * zigzag wearing a borrowed name, which is worse than no motif at all.
 *
 * If the brand wants genuine imigongo later it needs real reference and
 * probably a real artist. Until then the structure is quiet on purpose,
 * and the page earns its character from type, space and the work itself.
 */
export function Rule({
  tone = "canvas",
  className = "",
}: {
  tone?: "canvas" | "ink";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`h-px w-full ${tone === "ink" ? "bg-line-on-ink" : "bg-line"} ${className}`}
    />
  );
}

/**
 * A dark section that resolves out of the canvas instead of cutting into
 * it. The two gradients are the point: a hard edge between light and dark
 * reads as a block dropped on the page, while a fade reads as a change of
 * light. Nine rems at each end is enough to feel deliberate at any scroll
 * speed without eating the section's own padding.
 */
export function InkPanel({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`panel-ink overflow-hidden ${className}`}>
      <div aria-hidden className="panel-fade-top z-10" />
      <div className="relative z-20">{children}</div>
      <div aria-hidden className="panel-fade-bottom z-10" />
    </section>
  );
}
