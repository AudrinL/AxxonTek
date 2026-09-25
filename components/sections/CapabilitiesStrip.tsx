import Link from "next/link";
import { Reveal } from "@/components/system/Reveal";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/system/Marquee";
import { capabilityGroups } from "@/lib/site";

/**
 * The range, as a moving ribbon, on canvas. Two lanes of everything we can
 * build drift in opposite directions under a short, plain claim. The
 * marquee is the studio's device for "there is more here than fits on one
 * screen", used at Inzovu and RwandAir, and it earns its place here because
 * the list genuinely is long. It stops on hover and holds still under
 * reduced motion.
 */
export function CapabilitiesStrip() {
  const items = capabilityGroups.flatMap((g) => g.items);
  const half = Math.ceil(items.length / 2);
  const laneA = items.slice(0, half);
  const laneB = items.slice(half);

  return (
    <section data-chapter-ground="canvas" className="chapter-y relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-[24ch]">
            <Reveal as="p" className="label mb-6">
              <span className="label-dot" aria-hidden />
              What we can build for you
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-chapter">From idea to working technology.</h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="max-w-[42ch]">
            <p className="text-lede">
              Five families of work, not fifty technologies. You tell us the outcome
              you need. We tell you what it takes on the first call.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        <Marquee speed={44}>
          {laneA.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </Marquee>
        <Marquee speed={52} reverse>
          {laneB.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </Marquee>
      </div>

      <div className="container-x">
        <Reveal delay={80}>
          <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/capabilities" className="pill pill-ember hover:bg-ember-deep">
              See our capabilities
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-tone">
      <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
      {children}
    </span>
  );
}
