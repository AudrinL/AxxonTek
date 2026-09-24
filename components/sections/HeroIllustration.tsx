import { Icon } from "@/components/Icon";

/**
 * The hero graphic, drawn entirely in code: a browser window showing a
 * miniature AxxonTek page (websites), a phone (apps) and two live cards
 * from a smart installation (cameras and access). Everything is a DOM
 * element in the brand's own tokens, so it stays crisp at any size and
 * weighs nothing.
 *
 * Rebuilt for the current system: no framer-motion, no three.js. The
 * slow drift is the CSS `.floaty` keyframe, stilled for anyone who asks
 * for reduced motion. Every inner size is in `em` or `%`, and the root
 * sets a fluid font-size with container queries, so the whole scene
 * scales from a phone to a wide desktop without breaking proportion.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative aspect-[4/3] w-full [container-type:inline-size] [perspective:1600px] ${className}`}
    >
      <div className="absolute inset-0 text-[clamp(9px,1.7cqw,17px)] [transform:rotateY(-14deg)_rotateX(4deg)] [transform-style:preserve-3d]">
        <Piece className="left-[3%] top-[9%] w-[64%]" dur="7s" by="8px">
          <Browser />
        </Piece>
        <Piece className="right-[7%] top-[21%] w-[27%]" dur="6s" by="12px" delay="0.6s">
          <Phone />
        </Piece>
        <Piece className="right-[-1%] top-[3%] w-[38%]" dur="5s" by="7px" delay="1.1s">
          <StatusCard icon="lock" title="Front gate" detail="Locked · 09:41" tone="ok" />
        </Piece>
        <Piece className="left-[0%] bottom-[13%] w-[38%]" dur="5.5s" by="7px" delay="0.3s">
          <StatusCard icon="camera" title="Gate camera" detail="Live · 2 viewers" tone="live" />
        </Piece>
      </div>
    </div>
  );
}

function Piece({
  children,
  className,
  dur,
  by,
  delay = "0s",
}: {
  children: React.ReactNode;
  className: string;
  dur: string;
  by: string;
  delay?: string;
}) {
  return (
    <div
      className={`floaty absolute ${className}`}
      style={
        {
          "--float-dur": dur,
          "--float-by": by,
          "--float-delay": delay,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

const cardBase = "rounded-2xl border border-black/[0.06] bg-white";
const bigShadow = "shadow-[0_40px_80px_-24px_rgba(23,20,15,0.45)]";
const smallShadow = "shadow-[0_18px_40px_-16px_rgba(23,20,15,0.35)]";

/** A browser window showing a miniature AxxonTek landing page. */
function Browser() {
  return (
    <div className={`${cardBase} ${bigShadow} overflow-hidden`}>
      <div className="flex items-center gap-[1.6%] border-b border-black/[0.06] px-[3.5%] py-[2.4%]">
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-ember/70" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-ember/40" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-black/15" />
        <span className="ml-[3%] h-[0.7em] w-[42%] rounded-full bg-black/[0.06]" />
      </div>
      <div className="p-[4.5%]">
        <div className="relative overflow-hidden rounded-xl bg-ember p-[5%]">
          <div className="relative z-10 w-[55%]">
            <span className="mb-[6%] block h-[0.55em] w-[40%] rounded-full bg-white/50" />
            <span className="mb-[4%] block h-[0.9em] w-full rounded-full bg-white" />
            <span className="mb-[9%] block h-[0.9em] w-[72%] rounded-full bg-white" />
            <span className="block h-[1.4em] w-[38%] rounded-full bg-white" />
          </div>
          {/* The dotted Africa, drawn as a clipped dot field so it needs no
              image and no 3D. */}
          <span
            aria-hidden
            className="absolute -top-[6%] -right-[3%] h-[112%] w-[46%] opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1.4px)",
              backgroundSize: "0.7em 0.7em",
              clipPath:
                "polygon(42% 0, 63% 6%, 70% 24%, 64% 40%, 66% 55%, 56% 74%, 47% 100%, 41% 80%, 33% 60%, 27% 40%, 30% 18%)",
            }}
          />
        </div>
        <div className="mt-[4.5%] grid grid-cols-3 gap-[4%]">
          {(["code", "globe", "lock"] as const).map((name) => (
            <div key={name} className="rounded-lg bg-canvas p-[8%]">
              <span className="mb-[10%] flex h-[1.6em] w-[1.6em] items-center justify-center rounded-md bg-ember-wash text-ember">
                <Icon name={name} width="60%" height="60%" />
              </span>
              <span className="mb-[6%] block h-[0.5em] w-[80%] rounded-full bg-black/15" />
              <span className="block h-[0.5em] w-[55%] rounded-full bg-black/[0.08]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A phone running a small app: a list and one clear action. */
function Phone() {
  return (
    <div className={`${bigShadow} rounded-[14%] bg-ink p-[4%]`}>
      <div className="flex aspect-[9/18.5] flex-col overflow-hidden rounded-[11%] bg-white p-[7%]">
        <span className="mx-auto mb-[10%] block h-[0.55em] w-[38%] rounded-full bg-black/10" />
        <span className="mb-[8%] block h-[0.9em] w-[60%] rounded-full bg-black/15" />
        <ul className="space-y-[7%]">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center gap-[6%]">
              <span
                className={`h-[1.8em] w-[1.8em] shrink-0 rounded-full ${
                  i === 0 ? "bg-ember" : i === 1 ? "bg-ember/50" : "bg-canvas"
                }`}
              />
              <span className="flex-1">
                <span className="mb-[6%] block h-[0.5em] w-[85%] rounded-full bg-black/15" />
                <span className="block h-[0.5em] w-[55%] rounded-full bg-black/[0.08]" />
              </span>
            </li>
          ))}
        </ul>
        <span className="mt-auto flex h-[2.4em] items-center justify-center rounded-full bg-ember">
          <span className="block h-[0.5em] w-[45%] rounded-full bg-white/90" />
        </span>
      </div>
    </div>
  );
}

/** A live status card from a smart-home or camera installation. */
function StatusCard({
  icon,
  title,
  detail,
  tone,
}: {
  icon: string;
  title: string;
  detail: string;
  tone: "ok" | "live";
}) {
  return (
    <div className={`${cardBase} ${smallShadow} flex items-center gap-[0.75em] p-[0.75em] pr-[1em]`}>
      <span className="flex h-[2.4em] w-[2.4em] shrink-0 items-center justify-center rounded-full bg-ember-wash text-ember">
        <Icon name={icon} width="45%" height="45%" />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[0.95em] font-semibold text-ink">{title}</span>
        <span className="block truncate text-[0.8em] text-black/45">{detail}</span>
      </span>
      <span className="relative flex h-[0.55em] w-[0.55em] shrink-0">
        {tone === "live" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#e5484d]/50" />
        )}
        <span
          className={`relative h-[0.55em] w-[0.55em] rounded-full ${
            tone === "live" ? "bg-[#e5484d]" : "bg-[#1f9d55]"
          }`}
        />
      </span>
    </div>
  );
}
