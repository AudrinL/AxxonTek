import { redirect } from "next/navigation";

/**
 * Solutions became Capabilities in the masterplan restructure. The route is
 * kept as a permanent redirect so old links, and the anchors the site used
 * to point at (#software and so on), still land somewhere real.
 */
export default function SolutionsPage() {
  redirect("/capabilities");
}
