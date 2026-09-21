/**
 * Single registration point for GSAP plugins. Import `gsap`, `ScrollTrigger`
 * and `useGSAP` from here rather than from the packages, so no component
 * forgets to register and so the registration never runs on the server.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
