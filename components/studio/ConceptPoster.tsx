import type { StudioConcept } from "@/lib/site";

/**
 * A concept, drawn rather than screenshotted. The Studio shows what we can
 * build, so a concept is presented as a designed poster in the studio's own
 * palette, never a faked interface. The gradient is the concept's own two
 * accent stops, the type is the studio's, and the mono coordinate reads the
 * same way the rest of the site does. When a real, explorable build exists
 * it replaces this; until then this is honest about being a direction.
 */
export function ConceptPoster({
  concept,
  className = "",
  large = false,
}: {
  concept: StudioConcept;
  className?: string;
  large?: boolean;
}) {
  const [from, to] = concept.accent;
  return (
    <div
      className={`window relative flex flex-col justify-between overflow-hidden ${
        large ? "aspect-[16/11]" : "aspect-[4/5]"
      } ${className}`}
      style={{
        background: `radial-gradient(120% 130% at 15% 0%, ${to} 0%, ${from} 55%, #0d0c0b 120%)`,
      }}
    >
      {/* Faint grid so the field is not flat, the way TalentLens treats a panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex items-center justify-between p-5 font-mono text-[0.625rem] tracking-[0.16em] text-white/85 uppercase md:p-6">
        <span>
          {concept.industry} / {concept.number}
        </span>
        <span>{concept.style}</span>
      </div>

      <div className="relative p-5 md:p-6">
        <h3
          className={`font-display font-semibold leading-[1.04] tracking-[-0.03em] text-white ${
            large ? "text-[clamp(1.75rem,3.2vw,2.75rem)] max-w-[18ch]" : "text-[1.375rem] max-w-[16ch]"
          }`}
        >
          {concept.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {concept.features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/25 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.1em] text-white/80 uppercase"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
