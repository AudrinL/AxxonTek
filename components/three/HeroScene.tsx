"use client";

import { PerspectiveCamera, View } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import type * as THREE from "three";
import { AfricaScene } from "./AfricaScene";

export type HeroSceneProps = {
  progress: RefObject<number>;
  pointStep: number;
  pointerEffects: boolean;
  onLive?: () => void;
};

/**
 * The hero's slice of the shared canvas. `View` renders a plain div here and
 * tunnels the 3D children into `GlobalCanvas`, which draws them into this
 * div's rectangle. Loaded on demand by HeroField so three.js stays out of
 * the initial bundle.
 */
export default function HeroScene({ progress, pointStep, pointerEffects, onLive }: HeroSceneProps) {
  const surface = useRef<HTMLElement | THREE.Group>(null);

  return (
    <View ref={surface} className="pointer-events-none absolute inset-0">
      <PerspectiveCamera makeDefault fov={32} near={0.1} far={100} position={[0, 0, 21]} />
      <AfricaScene
        surface={surface}
        progress={progress}
        pointStep={pointStep}
        pointerEffects={pointerEffects}
        onFirstFrame={onLive}
      />
    </View>
  );
}
