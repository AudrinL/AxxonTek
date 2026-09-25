import type { Metadata, Viewport } from "next";
import { Outfit, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ground } from "@/components/system/Ground";
import { Trace } from "@/components/system/Trace";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Loader } from "@/components/system/Loader";
import { site } from "@/lib/site";

/**
 * Outfit carries the headlines. It is geometric with even strokes and
 * round bowls, which is the same family of shapes as the Floow wordmark,
 * so the site reads as the company that made the products rather than as
 * a separate studio. Inter carries running text, where the job is to
 * disappear. Mono is the label face, which is the device both products
 * already use for categories, codes and counts.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/**
 * The serif accent. One warm, high-contrast face used sparingly for a
 * single emphasised word inside a headline, the way Inzovu uses Instrument
 * Serif in gold. It is the studio's signal that a headline is being spoken,
 * not just set, and it replaces the italic the house rules forbid.
 */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-instrument",
  display: "swap",
});

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
    "technology company Kigali",
    "software development Rwanda",
    "virtual laboratory schools Africa",
    "VR education Rwanda",
    "AI automation Africa",
    "smart home installation Kigali",
    "TalentLens",
    "Floow",
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
  icons: { icon: "/assets/icon.png", apple: "/assets/icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

/**
 * Marks the document as scripted before first paint. Every reveal on the
 * site rests in its visible state and only hides itself once this class
 * is present, so a visitor without JavaScript, or one whose script fails,
 * gets the whole page rather than a blank one. Two lines, and it removes
 * an entire category of broken.
 */
const markScripted = `document.documentElement.classList.add("js");`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-ground="canvas"
      /* The script below adds `js` and the Ground component writes
         data-ground, both before React hydrates. Expected, not a bug. */
      suppressHydrationWarning

      className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: markScripted }} />
      </head>
      <body className="dotgrid antialiased">
        <SmoothScroll />
        <Loader />
        <Ground />
        <Trace />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main" className="relative z-[1]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
