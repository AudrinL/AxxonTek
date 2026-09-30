import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * The card a link shows when shared on WhatsApp, LinkedIn or X, and the
 * image Google may use beside the business. True black, one ember mark,
 * centred, the same way the site sets itself.
 */
export const alt = `${site.name}, a technology company in Kigali, Rwanda`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: 14, background: "#f0581f", marginBottom: 40 }} />
        <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4 }}>{site.name}</div>
        <div style={{ fontSize: 40, color: "#a1a1a6", marginTop: 16 }}>{site.tagline}</div>
        <div style={{ fontSize: 28, color: "#86868b", marginTop: 56 }}>
          Software, AI and smart systems from Kigali, Rwanda
        </div>
      </div>
    ),
    size,
  );
}
