"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Shaders
 *
 * All per-particle work (wave displacement, pointer falloff, the ring
 * formation blend, glow) happens on the GPU. The old implementation ran
 * this loop in JS over every particle, every frame.
 * ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform vec3  uPointer;
  uniform float uPointerActive;
  uniform float uRippleTime;
  uniform vec3  uRippleOrigin;
  uniform float uPixelRatio;

  attribute vec3  aTarget;
  attribute float aScale;
  attribute float aGlyph;

  varying float vGlow;
  varying float vDepth;

  void main() {
    // Blend between the drifting field position and the gathered ring.
    float morph = uMorph * aGlyph;
    vec3 pos = mix(position, aTarget, morph);

    // Layered sine field - organic, cheap, and stable across frame rates.
    float wave =
      sin(pos.x * 0.3 + uTime) * 1.5 +
      cos(pos.z * 0.2 + uTime * 0.9) * 1.5;

    // Gathered particles flatten and lift so the ring reads clearly.
    wave *= (1.0 - morph);
    pos.y = wave + morph * 1.4;

    float glow = morph * 0.85;

    // Pointer lifts and brightens nearby particles (gaussian falloff).
    float pointerDist = distance(pos.xz, uPointer.xz);
    float pointerInfluence = exp(-(pointerDist * pointerDist) / 16.0)
                             * uPointerActive
                             * (1.0 - morph);
    pos.y += pointerInfluence * 2.5;
    glow += pointerInfluence;

    // Expanding click ripple.
    if (uRippleTime > 0.0 && uRippleTime < 2.5) {
      float d = distance(pos.xz, uRippleOrigin.xz);
      float ring = exp(-pow(d - uRippleTime * 6.0, 2.0) / 4.5);
      float fade = 1.0 - uRippleTime / 2.5;
      pos.y += ring * fade * 3.0;
      glow += ring * fade;
    }

    vGlow = clamp(glow, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;

    // Perspective-correct point size.
    gl_PointSize = uSize * aScale * uPixelRatio * (18.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uColorLow;
  uniform vec3  uColorHigh;
  uniform float uOpacity;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vGlow;
  varying float vDepth;

  void main() {
    // Soft round sprite without a texture fetch.
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, d);

    vec3 color = mix(uColorLow, uColorHigh, vGlow);
    color = mix(color, vec3(1.0), vGlow * 0.55);

    // Distance fade keeps the far edge of the field from hard-cutting.
    float fog = 1.0 - smoothstep(uFogNear, uFogFar, vDepth);

    gl_FragColor = vec4(color, alpha * uOpacity * fog);
  }
`;

/* ------------------------------------------------------------------ */

type FieldConfig = {
  count: number;
  spread: number;
  size: number;
  opacity: number;
  includeRing: boolean;
  interactive: boolean;
};

function Field({ count, spread, size, opacity, includeRing, interactive }: FieldConfig) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, size: viewport } = useThree();

  const pointerWorld = useRef(new THREE.Vector3());
  const pointerActive = useRef(0);
  const rippleStart = useRef(-10);
  const morph = useRef(0);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);

  const ringCenter = useMemo(() => new THREE.Vector3(11, 0, 0), []);
  const ringHoverRadius = 14;

  /** Build the buffer geometry once. */
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const glyph = new Float32Array(count);

    // Ring: sampled as a centre line, then thickened into a soft cloud so it
    // reads as a volume of particles rather than a single row of dots.
    const ringRadius = 9;
    const ringSteps = 140;
    const dotsPerStep = 6;
    const thickness = 1.6;
    const ringPoints: [number, number][] = [];

    if (includeRing) {
      for (let s = 0; s < ringSteps; s++) {
        const theta = (s / ringSteps) * Math.PI * 2;
        const cx = Math.cos(theta) * ringRadius;
        const cz = Math.sin(theta) * ringRadius;
        const nx = -Math.cos(theta);
        const nz = -Math.sin(theta);
        for (let d = 0; d < dotsPerStep; d++) {
          // Sum-of-randoms biases the spread toward the centre line.
          const r = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
          ringPoints.push([cx + nx * r * thickness, cz + nz * r * thickness]);
        }
      }
    }

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;

      const ringPoint = ringPoints[i];
      if (ringPoint) {
        targets[i * 3] = ringCenter.x + ringPoint[0];
        targets[i * 3 + 1] = 0;
        targets[i * 3 + 2] = ringCenter.z + ringPoint[1];
        glyph[i] = 1;
      } else {
        targets[i * 3] = x;
        targets[i * 3 + 1] = 0;
        targets[i * 3 + 2] = z;
        glyph[i] = 0;
      }

      scales[i] = 0.6 + Math.random() * 0.8;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aGlyph", new THREE.BufferAttribute(glyph, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), spread);
    return geo;
  }, [count, spread, includeRing, ringCenter]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSize: { value: size },
      uPointer: { value: new THREE.Vector3() },
      uPointerActive: { value: 0 },
      uRippleTime: { value: -1 },
      uRippleOrigin: { value: new THREE.Vector3() },
      uPixelRatio: { value: 1 },
      uColorLow: { value: new THREE.Color("#a03e00") },
      uColorHigh: { value: new THREE.Color("#ff8a3d") },
      uOpacity: { value: opacity },
      uFogNear: { value: 18 },
      uFogFar: { value: 60 },
    }),
    [size, opacity],
  );

  // Dispose GPU resources on unmount.
  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    if (!interactive) return;

    function onPointerMove(event: PointerEvent) {
      ndc.x = (event.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.ray.intersectPlane(groundPlane, pointerWorld.current);
      pointerActive.current = hit ? 1 : 0;
    }
    function onPointerLeave() {
      pointerActive.current = 0;
    }
    function onPointerDown() {
      if (pointerActive.current) rippleStart.current = 0;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [camera, groundPlane, ndc, raycaster, interactive]);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    // Clamp delta so a backgrounded tab doesn't snap the animation forward.
    const dt = Math.min(delta, 1 / 30);

    mat.uniforms.uTime.value += dt;
    mat.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    mat.uniforms.uPointer.value.copy(pointerWorld.current);
    mat.uniforms.uPointerActive.value +=
      (pointerActive.current - mat.uniforms.uPointerActive.value) * Math.min(1, dt * 8);

    // Ring gathers when the cursor comes near it.
    const near =
      includeRing &&
      pointerActive.current > 0 &&
      Math.hypot(
        pointerWorld.current.x - ringCenter.x,
        pointerWorld.current.z - ringCenter.z,
      ) < ringHoverRadius;

    morph.current += ((near ? 1 : 0) - morph.current) * Math.min(1, dt * 5);
    if (near && morph.current > 0.995) morph.current = 1;
    if (!near && morph.current < 0.005) morph.current = 0;
    mat.uniforms.uMorph.value = morph.current;

    if (rippleStart.current >= 0) {
      rippleStart.current += dt;
      mat.uniforms.uRippleTime.value = rippleStart.current;
      if (rippleStart.current > 2.5) {
        rippleStart.current = -10;
        mat.uniforms.uRippleTime.value = -1;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.05;
    }
  });

  // Keep the field framed the same way on narrow viewports.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = viewport.width < 768 ? 78 : 60;
    cam.updateProjectionMatrix();
  }, [camera, viewport.width]);

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export type ParticleFieldProps = {
  className?: string;
  count?: number;
  spread?: number;
  size?: number;
  opacity?: number;
  includeRing?: boolean;
  interactive?: boolean;
  cameraY?: number;
  cameraZ?: number;
};

/**
 * Canvas wrapper. Renders only while visible: the frameloop is suspended when
 * the section scrolls offscreen or the tab is hidden, so the GPU is idle
 * instead of animating a field nobody is looking at.
 */
export function ParticleField({
  className = "",
  count = 4000,
  spread = 40,
  size = 2.2,
  opacity = 0.85,
  includeRing = true,
  interactive = true,
  cameraY = 8,
  cameraZ = 15,
}: ParticleFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!reduced.matches);
    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let onscreen = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        setActive(onscreen && !document.hidden);
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);

    const onVisibility = () => setActive(onscreen && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden>
      {enabled && (
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, cameraY, cameraZ], fov: 60, near: 0.1, far: 200 }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
          <Field
            count={count}
            spread={spread}
            size={size}
            opacity={opacity}
            includeRing={includeRing}
            interactive={interactive}
          />
        </Canvas>
      )}
    </div>
  );
}
