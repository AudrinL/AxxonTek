"use client";

import { useEffect, useState } from "react";
import { DustField } from "@/components/system/DustField";
import { DotMark } from "@/components/system/DotMark";

/** Phones get fewer specks and a tighter reach, as rho does. */
function useSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

/** Faint dust drifting behind the whole footer. */
export function FooterDust() {
  const small = useSmall();
  return <DustField preset="footer" count={small ? 120 : 260} cell={2} radius={small ? 160 : 240} />;
}

/** The logo drawn in dots at the foot of the page, parting round the cursor. */
export function FooterMark() {
  const small = useSmall();
  return (
    <DotMark
      src="/assets/logo-dots.png"
      color="image"
      cell={2}
      gap={small ? 1 : 3}
      radius={small ? 70 : 110}
      className="h-full w-full"
    />
  );
}
