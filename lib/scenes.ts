"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Registry of mounted WebGL scenes. The shared canvas (and three.js with it)
 * is only loaded while at least one scene is on the page, so routes without
 * 3D never pay for it. Scenes register from a mount effect; the preloader
 * reads the count in its own effect, which runs later, to decide whether a
 * canvas is worth waiting for.
 */
let count = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((fn) => fn());

export function sceneCount() {
  return count;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** True while any scene is mounted. Always false on the server. */
export function useHasScenes() {
  return useSyncExternalStore(
    subscribe,
    () => count > 0,
    () => false,
  );
}

/** Call from a component that renders a drei `<View>` into the shared canvas. */
export function useRegisterScene(active = true) {
  useEffect(() => {
    if (!active) return;
    count++;
    emit();
    return () => {
      count--;
      emit();
    };
  }, [active]);
}
