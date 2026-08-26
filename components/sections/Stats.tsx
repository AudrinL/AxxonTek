"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Credibility band. Deliberately honest numbers — this is a young company, and
 * inflated metrics are the fastest way to lose a serious buyer.
 */
const stats = [
  { value: 2025, suffix: "", label: "Founded in Kigali", prefix: "" },
  { value: 4, suffix: "", label: "Projects delivered", prefix: "" },
  { value: 4, suffix: "", label: "Engineers, no middle layer", prefix: "" },
  { value: 1, suffix: " day", label: "Typical reply time", prefix: "<" },
];

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo, matching the site's motion curve
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="band">
      <div className="container-x py-[clamp(3.5rem,7vw,6rem)]">
        <Reveal>
          <p className="eyebrow mb-10">By the numbers</p>
        </Reveal>

        <motion.dl
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
              }}
              className="border-t border-hairline pt-5"
            >
              <dd className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-medium tracking-[-0.04em] text-bone tabular-nums">
                <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-[0.8125rem] leading-snug text-mute">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
