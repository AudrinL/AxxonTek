/**
 * The scroll hint the studio uses at the foot of a hero: a mono word and a
 * line that draws itself left to right and back, forever. Pure CSS, and it
 * holds still under reduced motion.
 */
export function ScrollCue({ label = "Scroll", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-current/70 ${className}`}
      aria-hidden
    >
      {label}
      <span className="scroll-cue-line relative block h-px w-8 overflow-hidden bg-current/25">
        <span className="scroll-cue-run absolute inset-y-0 left-0 w-full bg-current" />
      </span>
    </span>
  );
}
