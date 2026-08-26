"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-[0.9375rem] font-medium tracking-tight transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-55";

const sizes = {
  md: "h-12 px-7",
  lg: "h-14 px-9 text-base",
} as const;

const variants: Record<Variant, string> = {
  primary: "bg-ember text-white hover:bg-ember-soft",
  outline: "border border-hairline-strong text-bone hover:border-ember hover:text-white",
  ghost: "text-mute hover:text-bone",
};

type MagneticProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  disabled?: boolean;
  /** How far the button drifts toward the cursor, in px. */
  strength?: number;
};

/**
 * A button that leans toward the pointer on a spring, with a specular
 * highlight that tracks the cursor across its surface. Magnetism is disabled
 * for reduced-motion visitors and on touch (no pointer to follow).
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  strength = 14,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  // Local pointer position for the specular sheen.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.22), transparent 65%)`;

  function handleMove(event: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    glowX.set((relX / rect.width) * 100);
    glowY.set((relY / rect.height) * 100);

    if (reduced) return;
    x.set(((relX - rect.width / 2) / (rect.width / 2)) * strength);
    y.set(((relY - rect.height / 2) / (rect.height / 2)) * strength * 0.6);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );

  const motionProps = {
    style: { x, y },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: disabled ? undefined : { scale: 0.97 },
  };

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
          {...motionProps}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={classes}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
