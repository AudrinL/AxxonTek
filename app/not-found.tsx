import { PageHero } from "@/components/sections/PageHero";
import { Strong } from "@/components/system/Page";

export default function NotFound() {
  return (
    <PageHero
      label="404"
      title="This page does not exist."
      lede={
        <>
          <Strong>The link may be old, or the page may have moved.</Strong> Try the home page
          or get in touch.
        </>
      }
      primary={{ href: "/", text: "Go to the home page" }}
      secondary={{ href: "/contact", text: "Contact us" }}
    />
  );
}
