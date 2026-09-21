/**
 * Geography shared by the WebGL hero and its static SVG fallback, so the two
 * line up when one fades into the other.
 *
 * A simplified outline of the continent (lon, lat), clockwise from Tunis,
 * plus Madagascar. Accurate enough to be unmistakably Africa at the size we
 * draw it; coarse enough to keep the file small.
 */
export const AFRICA: [number, number][] = [
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
export const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.5, -15.5], [49.5, -18.5], [47.2, -25], [44, -24.9],
  [43.3, -21.5], [44.2, -18.5], [46.5, -15.5], [48, -13.5],
];

/** Kigali first — it is the hub every arc leaves from. */
export const HUBS: { name: string; lon: number; lat: number }[] = [
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

export function inPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* Map (lon, lat) onto a plane roughly 12 units tall, centred on the continent. */
export const CENTER_LON = 18;
export const CENTER_LAT = 2;
export const SCALE = 0.155;

/** The plane the scene is framed to, in world units. */
export const FIT_HEIGHT = 11.6;
export const FIT_WIDTH = 11;

export const project = (lon: number, lat: number) => ({
  x: (lon - CENTER_LON) * SCALE,
  y: (lat - CENTER_LAT) * SCALE,
});

/** Small deterministic PRNG (mulberry32) so every build samples the same dots. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type LandSample = {
  /** xyz triples */
  positions: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  /** Unit-ish direction each point flies in when the field scatters. */
  directions: Float32Array;
  count: number;
};

/** Jittered grid of points inside the continent. `step` is in degrees. */
export function sampleLand(step: number, seed = 7): LandSample {
  const random = rng(seed);
  const jitter = () => (random() - 0.5) * step * 0.6;

  const positions: number[] = [];
  const sizes: number[] = [];
  const phases: number[] = [];
  const directions: number[] = [];

  for (let lat = -36; lat <= 38; lat += step) {
    for (let lon = -19; lon <= 52; lon += step) {
      const jl = lon + jitter();
      const jt = lat + jitter();
      if (!inPolygon(jl, jt, AFRICA) && !inPolygon(jl, jt, MADAGASCAR)) continue;

      const v = project(jl, jt);
      positions.push(v.x, v.y, (random() - 0.5) * 0.25);
      sizes.push(1.9 + random() * 1.3);
      phases.push(random() * Math.PI * 2);

      // Radial from the centre with some lift, so the scatter reads as a bloom.
      const len = Math.hypot(v.x, v.y) || 1;
      directions.push(
        (v.x / len) * (0.6 + random() * 0.8),
        (v.y / len) * (0.6 + random() * 0.8) + 0.35,
        (random() - 0.5) * 1.6,
      );
    }
  }

  return {
    positions: new Float32Array(positions),
    sizes: new Float32Array(sizes),
    phases: new Float32Array(phases),
    directions: new Float32Array(directions),
    count: sizes.length,
  };
}
