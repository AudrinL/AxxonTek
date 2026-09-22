"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { useBootReady } from "@/components/motion/Boot";
import { AfricaStatic } from "@/components/three/AfricaStatic";
import { easeOutExpo } from "@/lib/motion";

/**
 * The hero graphic, drawn in code: a browser window showing a small
 * AxxonTek page (websites), a phone (apps) and two live cards from a smart
 * installation (smart homes & cameras). Everything is a DOM element in the
 * brand's own tokens, so it stays crisp at any size and weighs nothing. A
 * light perspective and a slow float give it depth without a single image.
 *
 * Each piece has an entrance (after the preloader) on an outer wrapper and
 * an endless float on an inner one, so the two transforms never fight. The
 * root `MotionConfig reducedMotion="user"` stills both for visitors who ask.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full text-bone [container-type:inline-size] [perspective:1600px] ${className}`}
      aria-hidden
    >
      {/* Every em inside scales with the illustration's width (cqw), so the
          mockups keep their proportions from a phone to a wide desktop. */}
      <div className="absolute inset-0 text-[clamp(9px,1.7cqw,17px)] [transform:rotateY(-14deg)_rotateX(4deg)] [transform-style:preserve-3d]">
        <Piece className="left-[3%] top-[9%] w-[64%]" delay={0.35} floatSeconds={7} floatBy={8}>
          <Browser />
        </Piece>

        <Piece className="right-[7%] top-[21%] w-[27%]" delay={0.55} floatSeconds={6} floatBy={12} floatDelay={0.6}>
          <Phone />
        </Piece>

        <Piece className="right-[-1%] top-[3%] w-[38%]" delay={0.75} floatSeconds={5} floatBy={7} floatDelay={1.1}>
          <StatusCard icon="lock" title="Front gate" detail="Locked · 09:41" tone="green" />
        </Piece>

        <Piece className="left-[0%] bottom-[13%] w-[38%]" delay={0.9} floatSeconds={5.5} floatBy={7} floatDelay={0.3}>
          <StatusCard icon="camera" title="Gate camera" detail="Live · 2 viewers" tone="live" />
        </Piece>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Motion wrapper: entrance outside, float inside.
 * ------------------------------------------------------------------ */
function Piece({
  children,
  className,
  delay,
  floatSeconds,
  floatBy,
  floatDelay = 0,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  floatSeconds: number;
  floatBy: number;
  floatDelay?: number;
}) {
  const ready = useBootReady();
  const float: Transition = {
    duration: floatSeconds,
    delay: delay + floatDelay,
    repeat: Infinity,
    ease: "easeInOut",
  };
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 28 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 1, ease: easeOutExpo, delay }}
    >
      <motion.div animate={{ y: [0, -floatBy, 0] }} transition={float}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Pieces
 * ------------------------------------------------------------------ */
const card = "rounded-2xl border border-hairline bg-white";
const bigShadow = "shadow-[0_40px_80px_-24px_rgba(23,20,15,0.45)]";
const smallShadow = "shadow-[0_18px_40px_-16px_rgba(23,20,15,0.35)]";

/** A browser window showing a miniature AxxonTek landing page. */
function Browser() {
  return (
    <div className={`${card} ${bigShadow} overflow-hidden`}>
      <div className="flex items-center gap-[1.6%] border-b border-hairline px-[3.5%] py-[2.4%]">
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-ember/70" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-ember-soft/50" />
        <span className="h-[0.5em] w-[0.5em] rounded-full bg-hairline-strong" />
        <span className="ml-[3%] h-[0.7em] w-[42%] rounded-full bg-ink-panel" />
      </div>
      <div className="p-[4.5%]">
        <div className="relative overflow-hidden rounded-xl bg-ember p-[5%]">
          <div className="relative z-10 w-[55%]">
            <span className="mb-[6%] block h-[0.55em] w-[40%] rounded-full bg-white/50" />
            <span className="mb-[4%] block h-[0.9em] w-full rounded-full bg-white" />
            <span className="mb-[9%] block h-[0.9em] w-[72%] rounded-full bg-white" />
            <span className="block h-[1.4em] w-[38%] rounded-full bg-white" />
          </div>
          <AfricaStatic tone="light" className="absolute -top-[8%] -right-[4%] h-[120%] w-[48%] opacity-90" />
        </div>
        <div className="mt-[4.5%] grid grid-cols-3 gap-[4%]">
          {["code", "globe", "lock"].map((name) => (
            <div key={name} className="rounded-lg bg-ink-panel p-[8%]">
              <span className="mb-[10%] flex h-[1.6em] w-[1.6em] items-center justify-center rounded-md bg-ember-tint text-ember">
                <Icon name={name} className="h-[0.9em] w-[0.9em]" strokeWidth={1.8} />
              </span>
              <span className="mb-[6%] block h-[0.5em] w-[80%] rounded-full bg-hairline-strong" />
              <span className="block h-[0.5em] w-[55%] rounded-full bg-hairline" />
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
    <div className={`${bigShadow} rounded-[14%] bg-bone p-[4%]`}>
      <div className="flex aspect-[9/18.5] flex-col overflow-hidden rounded-[11%] bg-white p-[7%]">
        <span className="mx-auto mb-[10%] block h-[0.55em] w-[38%] rounded-full bg-bone/85" />
        <span className="mb-[8%] block h-[0.9em] w-[60%] rounded-full bg-bone" />
        <ul className="space-y-[7%]">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center gap-[6%]">
              <span
                className={`h-[1.8em] w-[1.8em] shrink-0 rounded-full ${
                  i === 0 ? "bg-ember" : i === 1 ? "bg-ember-soft/60" : "bg-ink-panel"
                }`}
              />
              <span className="flex-1">
                <span className="mb-[6%] block h-[0.5em] w-[85%] rounded-full bg-hairline-strong" />
                <span className="block h-[0.5em] w-[55%] rounded-full bg-hairline" />
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
  tone: "green" | "live";
}) {
  return (
    <div className={`${card} ${smallShadow} flex items-center gap-[0.75em] p-[0.75em] pr-[1em]`}>
      <span className="flex h-[2.4em] w-[2.4em] shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember">
        <Icon name={icon} className="h-[1.1em] w-[1.1em]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[0.95em] font-semibold text-bone">{title}</span>
        <span className="block truncate text-[0.8em] text-mute">{detail}</span>
      </span>
      <span className="relative flex h-[0.55em] w-[0.55em] shrink-0">
        {tone === "live" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#e5484d]/50" />
        )}
        <span
          className={`relative h-[0.55em] w-[0.55em] rounded-full ${tone === "live" ? "bg-[#e5484d]" : "bg-[#1f9d55]"}`}
        />
      </span>
    </div>
  );
}
