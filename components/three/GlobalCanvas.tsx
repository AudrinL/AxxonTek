"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { signalBoot } from "@/components/motion/Boot";
import { useMotionBudget } from "@/components/motion/MotionTier";

/**
 * The site's single WebGL context. It is fixed behind the page and never
 * unmounts, so scenes survive route changes and no page ever pays for a
 * second context. Nothing is drawn directly here: components anywhere in
 * the DOM declare a `<View>` (drei) and their scene is rendered into that
 * element's rectangle through `<View.Port />`.
 *
 * Loaded through `components/three/GlobalCanvasLoader.tsx` after hydration;
 * the "off" tier never mounts it.
 */
export default function GlobalCanvas() {
  const { dpr } = useMotionBudget();

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          signalBoot("canvas");
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
}
