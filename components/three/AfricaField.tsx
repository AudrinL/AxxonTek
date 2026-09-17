"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Geography
 *
 * A simplified outline of the continent (lon, lat), clockwise from Tunis,
 * plus Madagascar. Accurate enough to be unmistakably Africa at the size we
 * draw it; coarse enough to keep the file small.
 * ------------------------------------------------------------------ */
const AFRICA: [number, number][] = [
  [10, 37.3], [-2, 35.5], [-6, 35.8], [-9.8, 31], [-13, 27.7], [-17, 21],
  [-17.5, 14.7], [-16.7, 12], [-13, 8.5], [-7.5, 4.4], [-3, 5.1], [1.5, 6.2],
  [5, 6], [9.5, 3.8], [9.5, 1], [11.8, -4.8], [12.3, -6.1], [13.4, -12.5],
  [11.7, -17.3], [14.5, -22.9], [16.5, -28.6], [18.4, -34.2], [20, -34.8],
  [25.7, -33.9], [30, -31], [32.9, -28.5], [35.5, -24], [35, -20], [40.5, -15],
  [40.4, -10.5], [39.3, -6.8], [39.7, -4.05], [41.5, -1.7], [44.5, 1.5],
  [49, 6], [51.2, 11.8], [43.2, 11.5], [39.6, 15.6], [37.2, 19], [33.9, 27.2],
  [32.5, 29.9], [32.3, 31.3], [30, 31.4], [25.1, 31.6], [20, 32.5], [15.2, 32.4],
  [13.2, 32.9], [11, 33.5],
];
const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.5, -15.5], [49.5, -18.5], [47.2, -25], [44, -24.9],
  [43.3, -21.5], [44.2, -18.5], [46.5, -15.5], [48, -13.5],
];

/** Kigali first — it is the hub every arc leaves from. */
const HUBS: { name: string; lon: number; lat: number }[] = [
  { name: "Kigali", lon: 30.06, lat: -1.94 },
  { name: "Nairobi", lon: 36.82, lat: -1.29 },
  { name: "Addis Ababa", lon: 38.74, lat: 9.03 },
  { name: "Lagos", lon: 3.38, lat: 6.52 },
  { name: "Accra", lon: -0.19, lat: 5.6 },
  { name: "Johannesburg", lon: 28.05, lat: -26.2 },
  { name: "Cairo", lon: 31.24, lat: 30.04 },
  { name: "Dar es Salaam", lon: 39.28, lat: -6.79 },
  { name: "Kinshasa", lon: 15.31, lat: -4.32 },
];

function inPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* Map (lon, lat) onto a plane roughly 12 units tall, centred on the continent. */
const CENTER_LON = 18;
const CENTER_LAT = 2;
const SCALE = 0.155;
const project = (lon: number, lat: number) =>
  new THREE.Vector3((lon - CENTER_LON) * SCALE, (lat - CENTER_LAT) * SCALE, 0);

/* ------------------------------------------------------------------ *
 * Shaders — round, soft-edged points that pulse gently.
 * ------------------------------------------------------------------ */
const POINT_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vGlow;
  void main() {
    vec3 p = position;
    float wave = sin(uTime * 0.8 + aPhase) * 0.5 + 0.5;
    p.z += wave * 0.12;
    vGlow = wave;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (24.0 / -mv.z);
  }
`;
const POINT_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d) * uOpacity * (0.75 + vGlow * 0.25);
    gl_FragColor = vec4(uColor, a);
  }
`;

export type AfricaFieldProps = {
  className?: string;
};

/**
 * The continent as a living network: a point cloud of Africa, orange hub
 * cities, and arcs that draw out from Kigali. Colours follow the theme
 * attribute on <html>. Pointer movement tilts the whole plane. The frame
 * loop pauses when offscreen, when the tab is hidden, and under
 * prefers-reduced-motion (which gets a single static frame).
 */
export function AfricaField({ className = "" }: AfricaFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- renderer + scene ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 21);

    const group = new THREE.Group();
    group.rotation.set(0.42, -0.18, 0);
    scene.add(group);

    /* ---------- theme ---------- */
    const palette = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      return {
        land: new THREE.Color(dark ? "#7a7268" : "#bdb2a5"),
        landOpacity: dark ? 0.8 : 0.7,
        ember: new THREE.Color(dark ? "#f26a1b" : "#e85d04"),
        arc: new THREE.Color(dark ? "#ff8a45" : "#e85d04"),
      };
    };

    /* ---------- land points ---------- */
    const land: number[] = [];
    const sizes: number[] = [];
    const phases: number[] = [];
    const step = 0.9;
    const jitter = () => (Math.random() - 0.5) * step * 0.6;
    for (let lat = -36; lat <= 38; lat += step) {
      for (let lon = -19; lon <= 52; lon += step) {
        const jl = lon + jitter();
        const jt = lat + jitter();
        if (inPolygon(jl, jt, AFRICA) || inPolygon(jl, jt, MADAGASCAR)) {
          const v = project(jl, jt);
          land.push(v.x, v.y, (Math.random() - 0.5) * 0.25);
          sizes.push(1.9 + Math.random() * 1.3);
          phases.push(Math.random() * Math.PI * 2);
        }
      }
    }
    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute("position", new THREE.Float32BufferAttribute(land, 3));
    landGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    landGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));

    const initial = palette();
    const landMat = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColor: { value: initial.land },
        uOpacity: { value: initial.landOpacity },
      },
    });
    group.add(new THREE.Points(landGeo, landMat));

    /* ---------- hubs ---------- */
    const hubPos: number[] = [];
    const hubSize: number[] = [];
    const hubPhase: number[] = [];
    HUBS.forEach((h, i) => {
      const v = project(h.lon, h.lat);
      hubPos.push(v.x, v.y, 0.3);
      hubSize.push(i === 0 ? 9 : 5.5);
      hubPhase.push(i * 0.7);
    });
    const hubGeo = new THREE.BufferGeometry();
    hubGeo.setAttribute("position", new THREE.Float32BufferAttribute(hubPos, 3));
    hubGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(hubSize, 1));
    hubGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(hubPhase, 1));
    const hubMat = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColor: { value: initial.ember },
        uOpacity: { value: 1 },
      },
    });
    group.add(new THREE.Points(hubGeo, hubMat));

    /* Kigali halo: a ring that expands and fades, like a radar ping. */
    const haloGeo = new THREE.RingGeometry(0.18, 0.22, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: initial.ember,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    const kigali = project(HUBS[0].lon, HUBS[0].lat);
    halo.position.set(kigali.x, kigali.y, 0.32);
    group.add(halo);

    /* ---------- arcs from Kigali ---------- */
    const arcMat = new THREE.LineBasicMaterial({
      color: initial.arc,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const arcs: { line: THREE.Line; total: number; offset: number }[] = [];
    HUBS.slice(1).forEach((h, i) => {
      const a = kigali;
      const b = project(h.lon, h.lat);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.z = a.distanceTo(b) * 0.45 + 0.6;
      const curve = new THREE.QuadraticBezierCurve3(a.clone().setZ(0.3), mid, b.clone().setZ(0.3));
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, arcMat);
      // Draw range animates so arcs "travel" out from Kigali.
      geo.setDrawRange(0, 0);
      group.add(line);
      arcs.push({ line, total: pts.length, offset: i * 0.9 });
    });

    /* ---------- layout ---------- */
    let width = 1;
    let height = 1;
    const resize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Fit the ~12-unit-tall continent regardless of aspect.
      const fitHeight = 11.6;
      const fitWidth = 11;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const distH = fitHeight / 2 / Math.tan(vFov / 2);
      const distW = fitWidth / 2 / Math.tan(vFov / 2) / camera.aspect;
      camera.position.z = Math.max(distH, distW);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---------- pointer tilt ---------- */
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    if (!reduced) {
      mount.addEventListener("pointermove", onMove);
      mount.addEventListener("pointerleave", onLeave);
    }

    /* ---------- theme observer ---------- */
    const applyPalette = () => {
      const p = palette();
      landMat.uniforms.uColor.value = p.land;
      landMat.uniforms.uOpacity.value = p.landOpacity;
      hubMat.uniforms.uColor.value = p.ember;
      haloMat.color = p.ember;
      arcMat.color = p.arc;
      if (reduced) renderer.render(scene, camera);
    };
    const mo = new MutationObserver(applyPalette);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    /* ---------- frame loop ---------- */
    let raf = 0;
    let running = false;
    let visible = true;
    const clock = new THREE.Clock();

    const frame = () => {
      if (!running) return;
      const t = clock.getElapsedTime();

      landMat.uniforms.uTime.value = t;
      hubMat.uniforms.uTime.value = t;

      // Ease the tilt toward the pointer.
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      // A resting tilt gives the arcs visible height; the pointer adds to it.
      group.rotation.y = -0.18 + current.x * 0.28 + Math.sin(t * 0.25) * 0.05;
      group.rotation.x = 0.42 - current.y * 0.2 + Math.cos(t * 0.2) * 0.03;

      // Kigali ping.
      const ping = (t % 2.4) / 2.4;
      halo.scale.setScalar(1 + ping * 5);
      haloMat.opacity = (1 - ping) * 0.55;

      // Arcs draw out, hold, then reset on a staggered cycle.
      arcs.forEach(({ line, total, offset }) => {
        const cycle = 6;
        const local = ((t + offset) % cycle) / cycle;
        const grow = THREE.MathUtils.smoothstep(local, 0, 0.35);
        const fade = 1 - THREE.MathUtils.smoothstep(local, 0.8, 1);
        line.geometry.setDrawRange(0, Math.floor(grow * total));
        (line.material as THREE.LineBasicMaterial).opacity = 0.55 * fade;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      // One static frame with the arcs fully drawn.
      arcs.forEach(({ line, total }) => line.geometry.setDrawRange(0, total));
      haloMat.opacity = 0;
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(mount);
    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      landGeo.dispose();
      hubGeo.dispose();
      haloGeo.dispose();
      landMat.dispose();
      hubMat.dispose();
      haloMat.dispose();
      arcMat.dispose();
      arcs.forEach(({ line }) => line.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
