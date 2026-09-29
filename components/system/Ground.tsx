"use client";

import { useEffect } from "react";

export type GroundTone = "canvas" | "ink";

/**
 * The ground.
 *
 * One fixed surface behind the whole page. The site now lives on ink
 * throughout, so this holds the attribute on <html> at "ink" and every
 * contextual token in globals.css resolves against it. The chapter-driven
 * cross-fade to canvas is switched off; sections may still declare
 * `data-chapter-ground`, it is simply ignored until light chapters return.
 */
export function Ground() {
  useEffect(() => {
    document.documentElement.dataset.ground = "ink";
  }, []);

  return <div className="ground" aria-hidden />;
}
