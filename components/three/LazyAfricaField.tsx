"use client";

import dynamic from "next/dynamic";
import type { AfricaFieldProps } from "./AfricaField";

/**
 * Three.js is ~150kB and purely decorative, so it loads after hydration
 * instead of shipping in the initial payload. The mount div reserves the
 * space, so nothing shifts when it arrives.
 */
const AfricaFieldImpl = dynamic(() => import("./AfricaField").then((m) => m.AfricaField), {
  ssr: false,
  loading: () => null,
});

export function LazyAfricaField(props: AfricaFieldProps) {
  return <AfricaFieldImpl {...props} />;
}
