"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { FIT_HEIGHT, FIT_WIDTH, HUBS, project, sampleLand } from "./africa-geo";

/* ------------------------------------------------------------------ *
 * Shaders — round, soft-edged points that pulse gently, fly apart as the
 * hero scrolls away, and part around the pointer.
 * ------------------------------------------------------------------ */
const POINT_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aDir;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScatter;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  varying float vGlow;
  varying float vFade;

  void main() {
    vec3 p = position;
    float wave = sin(uTime * 0.8 + aPhase) * 0.5 + 0.5;
    p.z += wave * 0.12;

    // Fly apart as the hero leaves the viewport.
    p += aDir * uScatter * 7.0;
    p.z += uScatter * sin(aPhase * 3.0) * 2.0;

    // The pointer pushes nearby points outward and lifts them.
    vec2 d = p.xy - uPointer;
    float r = length(d);
    float push = smoothstep(3.2, 0.0, r) * uPointerStrength;
    p.xy += (r > 1e-4 ? d / r : vec2(0.0)) * push * 1.4;
    p.z += push * 1.3;

    vGlow = clamp(wave * 0.25 + push, 0.0, 1.0);
    vFade = 1.0 - uScatter;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (24.0 / -mv.z) * (1.0 + push * 0.8);
  }
`;
const POINT_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  uniform float uOpacity;
  varying float vGlow;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d) * uOpacity * (0.75 + vGlow * 0.25) * vFade;
    gl_FragColor = vec4(mix(uColor, uGlowColor, vGlow), a);
  }
`;

function makePointMaterial(pixelRatio: number) {
  return new THREE.ShaderMaterial({
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uScatter: { value: 0 },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uPointerStrength: { value: 0 },
      uColor: { value: new THREE.Color() },
      uGlowColor: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    },
  });
}

/* ------------------------------------------------------------------ *
 * Theme — colours follow the `data-theme` attribute on <html>.
 * ------------------------------------------------------------------ */
function useDarkTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  useEffect(() => {
    const read = () => setDark(document.documentElement.dataset.theme === "dark");
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

const palette = (dark: boolean) => ({
  land: dark ? "#7a7268" : "#bdb2a5",
  landOpacity: dark ? 0.8 : 0.7,
  ember: dark ? "#f26a1b" : "#e85d04",
  arc: dark ? "#ff8a45" : "#e85d04",
});

export type AfricaSceneProps = {
  /** The element the View is drawing into — pointer maths is relative to it. */
  surface: RefObject<HTMLElement | THREE.Group | null>;
  /** 0 with the hero at rest, 1 once it has scrolled out. Written by ScrollTrigger. */
  progress: RefObject<number>;
  /** Sampling step in degrees; bigger means fewer points (see lib/capabilities). */
  pointStep: number;
  /** Pointer tilt and repulsion — only worth it with a fine pointer and spare GPU. */
  pointerEffects: boolean;
  /** Fires after the first rendered frame, so the static fallback can fade out. */
  onFirstFrame?: () => void;
};

/**
 * The continent as a living network: a point cloud of Africa, orange hub
 * cities and arcs that draw out from Kigali. Scroll pulls the camera back
 * and tilts the plane while the points bloom outward and fade — the network
 * dissolves into the page. The pointer tilts the plane and parts the points.
 *
 * Renders inside a drei `<View>` on the shared canvas (see GlobalCanvas), so
 * it draws only when its rectangle is on screen.
 */
export function AfricaScene({
  surface,
  progress,
  pointStep,
  pointerEffects,
  onFirstFrame,
}: AfricaSceneProps) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { gl, camera, size } = useThree();
  const dark = useDarkTheme();

  /* ---------- geometry ---------- */
  const land = useMemo(() => {
    const s = sampleLand(pointStep);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(s.positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(s.sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(s.phases, 1));
    geo.setAttribute("aDir", new THREE.BufferAttribute(s.directions, 3));
    return geo;
  }, [pointStep]);

  const hubs = useMemo(() => {
    const pos: number[] = [];
    const sizes: number[] = [];
    const phases: number[] = [];
    const dirs: number[] = [];
    HUBS.forEach((h, i) => {
      const v = project(h.lon, h.lat);
      pos.push(v.x, v.y, 0.3);
      sizes.push(i === 0 ? 9 : 5.5);
      phases.push(i * 0.7);
      const len = Math.hypot(v.x, v.y) || 1;
      dirs.push((v.x / len) * 0.5, (v.y / len) * 0.5 + 0.3, 0.4);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
    geo.setAttribute("aDir", new THREE.Float32BufferAttribute(dirs, 3));
    return geo;
  }, []);

  const kigali = useMemo(() => project(HUBS[0].lon, HUBS[0].lat), []);

  const landMat = useMemo(() => makePointMaterial(gl.getPixelRatio()), [gl]);
  const hubMat = useMemo(() => makePointMaterial(gl.getPixelRatio()), [gl]);
  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );
  /* Arcs from Kigali. Draw range animates so they "travel" outward; each
     has its own material so it can fade on its own cycle. */
  const arcs = useMemo(() => {
    const a = new THREE.Vector3(kigali.x, kigali.y, 0.3);
    return HUBS.slice(1).map((h, i) => {
      const t = project(h.lon, h.lat);
      const b = new THREE.Vector3(t.x, t.y, 0.3);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.z = a.distanceTo(b) * 0.45 + 0.6;
      const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
      return { line: new THREE.Line(geo, mat), mat, total: pts.length, offset: i * 0.9 };
    });
  }, [kigali]);

  useEffect(() => {
    return () => {
      land.dispose();
      hubs.dispose();
      landMat.dispose();
      hubMat.dispose();
      haloMat.dispose();
      arcs.forEach(({ line, mat }) => {
        line.geometry.dispose();
        mat.dispose();
      });
    };
  }, [land, hubs, landMat, hubMat, haloMat, arcs]);

  /* ---------- theme ---------- */
  useEffect(() => {
    const p = palette(dark);
    landMat.uniforms.uColor.value.set(p.land);
    landMat.uniforms.uGlowColor.value.set(p.ember);
    landMat.uniforms.uOpacity.value = p.landOpacity;
    hubMat.uniforms.uColor.value.set(p.ember);
    hubMat.uniforms.uGlowColor.value.set(p.ember);
    haloMat.color.set(p.ember);
    arcs.forEach(({ mat }) => mat.color.set(p.arc));
  }, [dark, landMat, hubMat, haloMat, arcs]);

  /* ---------- pointer ---------- */
  const pointer = useRef({ tx: 0, ty: 0, x: 0, y: 0, active: false, strength: 0 });

  useEffect(() => {
    if (!pointerEffects) return;
    const state = pointer.current;
    const onMove = (e: PointerEvent) => {
      const el = surface.current;
      if (!(el instanceof HTMLElement)) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      state.tx = THREE.MathUtils.clamp(nx, -1.6, 1.6);
      state.ty = THREE.MathUtils.clamp(ny, -1.6, 1.6);
      state.active = Math.abs(nx) < 1.25 && Math.abs(ny) < 1.25;
    };
    const onLeave = () => {
      state.tx = 0;
      state.ty = 0;
      state.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerEffects, surface]);

  /* ---------- frame loop ---------- */
  const scratch = useMemo(
    () => ({
      raycaster: new THREE.Raycaster(),
      plane: new THREE.Plane(),
      normal: new THREE.Vector3(),
      origin: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
      hit: new THREE.Vector3(),
      ndc: new THREE.Vector2(),
    }),
    [],
  );
  const firstFrame = useRef(false);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1);
    const cam = camera as THREE.PerspectiveCamera;

    // Frame the continent regardless of the rectangle's aspect, and pull
    // back as the hero scrolls away.
    const aspect = size.width / Math.max(size.height, 1);
    if (cam.aspect !== aspect) {
      cam.aspect = aspect;
      cam.updateProjectionMatrix();
    }
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const distH = FIT_HEIGHT / 2 / Math.tan(vFov / 2);
    const distW = FIT_WIDTH / 2 / Math.tan(vFov / 2) / aspect;
    cam.position.z = Math.max(distH, distW) * (1 + p * 0.3);

    // Ease the tilt toward the pointer.
    const ptr = pointer.current;
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    ptr.strength += ((ptr.active ? 1 : 0) - ptr.strength) * 0.08;

    // Resting tilt gives the arcs visible height; the pointer and the scroll add to it.
    g.rotation.y = -0.18 + ptr.x * 0.28 + Math.sin(t * 0.25) * 0.05;
    g.rotation.x = 0.42 + p * 0.75 - ptr.y * 0.2 + Math.cos(t * 0.2) * 0.03;
    g.position.y = p * 4.5;

    const scatter = THREE.MathUtils.smoothstep(p, 0.04, 0.9);
    landMat.uniforms.uTime.value = t;
    landMat.uniforms.uScatter.value = scatter;
    hubMat.uniforms.uTime.value = t;
    hubMat.uniforms.uScatter.value = scatter * 0.5;

    // Project the pointer onto the plane of the map so the push is in map space.
    if (pointerEffects) {
      const s = scratch;
      s.ndc.set(ptr.x, -ptr.y);
      s.raycaster.setFromCamera(s.ndc, cam);
      g.getWorldQuaternion(s.quat);
      s.normal.set(0, 0, 1).applyQuaternion(s.quat);
      g.getWorldPosition(s.origin);
      s.plane.setFromNormalAndCoplanarPoint(s.normal, s.origin);
      if (s.raycaster.ray.intersectPlane(s.plane, s.hit)) {
        g.worldToLocal(s.hit);
        landMat.uniforms.uPointer.value.set(s.hit.x, s.hit.y);
        hubMat.uniforms.uPointer.value.set(s.hit.x, s.hit.y);
      }
      landMat.uniforms.uPointerStrength.value = ptr.strength;
      hubMat.uniforms.uPointerStrength.value = ptr.strength * 0.4;
    }

    // Kigali ping.
    if (halo.current) {
      const ping = (t % 2.4) / 2.4;
      halo.current.scale.setScalar(1 + ping * 5);
      haloMat.opacity = (1 - ping) * 0.55 * (1 - scatter);
    }

    // Arcs draw out, hold, then reset on a staggered cycle; they fade with scroll.
    for (const { line, mat, total, offset } of arcs) {
      const cycle = 6;
      const local = ((t + offset) % cycle) / cycle;
      const grow = THREE.MathUtils.smoothstep(local, 0, 0.35);
      const fade = 1 - THREE.MathUtils.smoothstep(local, 0.8, 1);
      line.geometry.setDrawRange(0, Math.floor(grow * total));
      mat.opacity = 0.55 * fade * (1 - scatter);
    }

    if (!firstFrame.current) {
      firstFrame.current = true;
      onFirstFrame?.();
    }
  });

  return (
    <group ref={group} rotation={[0.42, -0.18, 0]}>
      <points geometry={land} material={landMat} />
      <points geometry={hubs} material={hubMat} />
      <mesh ref={halo} position={[kigali.x, kigali.y, 0.32]} material={haloMat}>
        <ringGeometry args={[0.18, 0.22, 48]} />
      </mesh>
      {arcs.map(({ line }, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}
