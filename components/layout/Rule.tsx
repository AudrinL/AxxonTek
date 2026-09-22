/**
 * A hairline, and the ink panel the case studies wrap sections in. Both
 * take their colour from the ground, so they survive a chapter change
 * without a second variant.
 */
export function Rule({
  className = "",
  tone,
}: {
  className?: string;
  tone?: string;
}) {
  return <hr data-tone={tone} className={`border-0 border-t border-line ${className}`} />;
}

export function InkPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bloom window relative overflow-hidden p-8 sm:p-12 ${className}`}>
      <span aria-hidden className="bloom-light -right-[16rem] -bottom-[20rem] opacity-60" />
      <div className="relative">{children}</div>
    </div>
  );
}
