import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransition } from "@/components/layout/PageTransition";
import { MotionTierProvider } from "@/components/motion/MotionTier";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { BootProvider } from "@/components/motion/Boot";
import { BOOT_SESSION_KEY } from "@/lib/boot";
import { GlobalCanvasLoader } from "@/components/three/GlobalCanvasLoader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "software development Kigali",
    "app development Rwanda",
    "website design Rwanda",
    "IT consultation Kigali",
    "smart home installation Rwanda",
    "CCTV cameras Kigali",
    "TalentLens",
    "Floow parcel",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: "/assets/icon.png",
    apple: "/assets/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b0a" },
  ],
};

/**
 * Applies the stored theme before first paint so a dark-mode visitor never
 * sees a light flash. Light is the default when nothing is stored — the
 * system preference is deliberately not consulted, the site is light-first.
 * Must match STORAGE_KEY in components/layout/ThemeToggle.tsx.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("axxontek-theme");if(t==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}})();`;

/**
 * Decides before first paint whether the preloader shows. It runs once per
 * browser session (sessionStorage), never for reduced-motion or Data Saver
 * visitors, and never when storage is unavailable. `html[data-boot]` drives
 * the overlay's CSS and the scroll lock; components/motion/Boot.tsx owns the
 * rest of the lifecycle.
 */
const bootBootstrap = `(function(){var d=document.documentElement;try{var skip=sessionStorage.getItem("${BOOT_SESSION_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches||!!(navigator.connection&&navigator.connection.saveData);d.dataset.boot=skip?"skip":"loading"}catch(e){d.dataset.boot="skip"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: bootBootstrap }} />
        <noscript>
          <style>{`.boot{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <MotionTierProvider>
          <SmoothScroll>
            <BootProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
              >
                Skip to content
              </a>

              {/* One WebGL context for the whole site, behind the page. Scenes
                  are declared where they appear (see components/three). */}
              <GlobalCanvasLoader />

              <ScrollProgress />
              <Nav />
              <main id="main">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </BootProvider>
          </SmoothScroll>
        </MotionTierProvider>
      </body>
    </html>
  );
}
