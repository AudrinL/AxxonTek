/**
 * Shared between the inline bootstrap script in app/layout.tsx (a server
 * component) and the preloader in components/motion/Boot.tsx (client). Lives
 * here so neither has to import the other.
 */
export const BOOT_SESSION_KEY = "axxontek-boot";
