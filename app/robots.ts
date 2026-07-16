import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

// /robots.txt (issue #7): tutto indicizzabile tranne lo Studio embedded
// e le route API; punta al sitemap generato da app/sitemap.ts.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
