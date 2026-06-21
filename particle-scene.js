import React, { useEffect, useMemo, useRef, useState } from 'https://esm.sh/react@18.3.1?dev';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client?dev';
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber@8.14.0?dev';
import * as THREE from 'https://esm.sh/three@0.152.2?dev';
import { SVGLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/SVGLoader?dev';

const ORANGE_COLOR = new THREE.Color('#f56e02');
const PARTICLE_COUNT = 3600;

const vertexShader = `
precision highp float;
attribute vec3 aOrigin;
attribute float aSeed;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uForm;
uniform float uPointScale;
varying float vAlpha;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * vec3(1.0, 1.0, 1.0) - 0.5;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.y;
  vec4 y = y_ * ns.x + ns.y;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec3 target = position;
  vec3 start = aOrigin;
  vec3 base = mix(start, target, clamp(uForm, 0.0, 1.0));
  vec3 noisePos = base * 1.3 + vec3(uTime * 0.12 + aSeed, uTime * 0.11 - aSeed, uTime * 0.09 + aSeed);
  vec3 noiseOffset = vec3(
    snoise(noisePos + vec3(1.0, 0.0, 0.0)),
    snoise(noisePos + vec3(0.0, 1.0, 0.0)),
    snoise(noisePos + vec3(0.0, 0.0, 1.0))
  ) * 0.16;
  vec2 mouse = uMouse * 1.8;
  float distanceToMouse = distance(base.xy, mouse);
  float repulsion = smoothstep(0.45, 0.05, distanceToMouse) * uMouseStrength;
  vec2 direction = normalize(base.xy - mouse + vec2(0.001));
  vec3 mouseOffset = vec3(direction * repulsion * 0.35, 0.0);
  vec3 finalPosition = base + noiseOffset + mouseOffset + vec3(0.0, sin(uTime * 0.6 + aSeed) * 0.08, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
  gl_PointSize = uPointScale * (4.0 + (0.55 - distanceToMouse) * 4.5);
  vAlpha = 1.0 - smoothstep(0.0, 0.65, distanceToMouse);
}
`;

const fragmentShader = `
precision highp float;
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.7, 0.0, dist) * vAlpha;
  gl_FragColor = vec4(uColor, alpha);
  if (alpha < 0.01) discard;
}
`;

function buildPointGeometry(points) {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const origins = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const source = points[Math.floor(Math.random() * points.length)];
    positions.set([source.x, source.y, source.z], i * 3);

    origins.set([
      (Math.random() - 0.5) * 4.5,
      (Math.random() - 0.5) * 4.5,
      (Math.random() - 0.5) * 0.6,
    ], i * 3);

    seeds[i] = Math.random() * 3.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aOrigin', new THREE.BufferAttribute(origins, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

function sampleSvgPaths(paths) {
  const points = [];
  paths.forEach((path) => {
    path.subPaths.forEach((subPath) => {
      const samplePoints = subPath.getPoints(80);
      samplePoints.forEach((point) => {
        points.push(new THREE.Vector3(point.x, point.y, 0));
      });
    });
  });
  return points;
}

function normalizePoints(points) {
  const bbox = new THREE.Box3().setFromPoints(points);
  const center = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const scale = 2.0 / Math.max(size.x, size.y, 1.0);
  points.forEach((point) => {
    point.sub(center).multiplyScalar(scale);
  });
  return points;
}

function ParticleCloud({ mouseTarget, pointerActive }) {
  const [geometry, setGeometry] = useState(null);
  const materialRef = useRef(null);
  const pointScale = useRef(3.2);

  useEffect(() => {
    const loader = new SVGLoader();
    fetch('assets/coding icons.svg')
      .then((response) => response.text())
      .then((svgText) => {
        const data = loader.parse(svgText);
        const loadedPoints = sampleSvgPaths(data.paths);
        if (!loadedPoints.length) return;
        const normalizedPoints = normalizePoints(loadedPoints);
        setGeometry(buildPointGeometry(normalizedPoints));
      });
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: 0 },
        uForm: { value: 1 },
        uPointScale: { value: pointScale.current },
        uColor: { value: ORANGE_COLOR.clone() },
      },
    });
    materialRef.current = mat;
    return mat;
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;
    const ScrollTrigger = window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);
    if (window.gsap && ScrollTrigger) {
      window.gsap.registerPlugin(ScrollTrigger);
      const timeline = window.gsap.timeline({
        scrollTrigger: {
          trigger: '#technology',
          start: 'top 70%',
          end: 'bottom top',
          scrub: 1,
        },
      });
      timeline.fromTo(
        materialRef.current.uniforms.uForm,
        { value: 0 },
        { value: 1, duration: 1.8, ease: 'power2.out' },
      );
      return () => {
        timeline.kill();
        ScrollTrigger.kill();
      };
    }
    return undefined;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uMouse.value.lerp(mouseTarget.current, 0.15);
      materialRef.current.uniforms.uMouseStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouseStrength.value,
        pointerActive.current ? 1.0 : 0.0,
        0.1,
      );
    }
  });

  return geometry ? <points geometry={geometry} material={material} /> : null;
}

function ParticleCanvas() {
  const mouseTarget = useRef(new THREE.Vector2(0.0, 0.0));
  const pointerActive = useRef(false);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    mouseTarget.current.set(x, y);
    pointerActive.current = true;
  };

  const handlePointerLeave = () => {
    pointerActive.current = false;
  };

  return (
    <div
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <ParticleCloud mouseTarget={mouseTarget} pointerActive={pointerActive} />
      </Canvas>
    </div>
  );
}

const mountNode = document.getElementById('particle-canvas');
if (mountNode) {
  createRoot(mountNode).render(<ParticleCanvas />);
}
