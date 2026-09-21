"use client";

import { useEffect, useState } from "react";

/**
 * False during server rendering and the hydration render, true afterwards.
 *
 * Use it to gate anything whose *presence* depends on client-only facts
 * (the motion tier, storage, viewport). Even `next/dynamic` with `ssr:false`
 * leaves a Suspense marker in the server HTML, so conditionally omitting
 * such a component on the client is a hydration mismatch — and React then
 * regenerates the whole tree, losing attributes the inline scripts set on
 * `<html>`.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
