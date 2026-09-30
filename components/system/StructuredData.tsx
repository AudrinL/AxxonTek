import { site } from "@/lib/site";

/**
 * Tells search engines who AxxonTek is in the form they read directly.
 *
 * The business entry carries the same name, address and phone as the
 * Google Business Profile, which is what lets Google join the site and the
 * profile into one knowledge panel. `sameAs` lists every profile we own so
 * they are treated as one entity rather than five strangers. The WebSite
 * entry gives Google the site name to show above the result.
 */
export function StructuredData() {
  const id = `${site.url}/#organization`;

  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": id,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/assets/icon.png`,
    image: `${site.url}/opengraph-image`,
    email: site.email,
    ...(site.phone && { telephone: site.phone }),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    areaServed: ["Rwanda", "Africa"],
    sameAs: site.socials.map((s) => s.href),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": id },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, website]) }}
    />
  );
}
