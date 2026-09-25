/**
 * The inset rule with four lit corner ticks that turns any relatively
 * positioned box into a cinematic stage. Inherits `currentColor`, so it
 * reads correctly on both the ink stages and the light ones. Drop it as a
 * direct child of a relatively positioned, `overflow-visible` container.
 */
export function StageFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`stage-frame-inner ${className}`} aria-hidden>
      <span className="stage-tick" style={{ top: -1, left: -1, borderRight: "none", borderBottom: "none" }} />
      <span className="stage-tick" style={{ top: -1, right: -1, borderLeft: "none", borderBottom: "none" }} />
      <span className="stage-tick" style={{ bottom: -1, left: -1, borderRight: "none", borderTop: "none" }} />
      <span className="stage-tick" style={{ bottom: -1, right: -1, borderLeft: "none", borderTop: "none" }} />
    </div>
  );
}
