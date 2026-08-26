"use client";

import dynamic from "next/dynamic";
import type { ParticleFieldProps } from "./ParticleField";

/**
 * Three.js is ~150kB of the bundle and is purely decorative, so it is loaded
 * on the client after hydration rather than shipped in the initial payload.
 * Nothing renders until it arrives — there is no layout to reserve.
 */
const ParticleFieldImpl = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false, loading: () => null },
);

export function LazyParticleField(props: ParticleFieldProps) {
  return <ParticleFieldImpl {...props} />;
}
