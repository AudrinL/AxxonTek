import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `npm run build` runs the OpenNext build, so OpenNext must call Next directly
  // instead of looping back through the npm script.
  buildCommand: "next build",
};
