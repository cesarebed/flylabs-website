import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getSiteUrl, xDefaultPath } from "@/lib/seo";
import { sanityFetch } from "@/sanity/fetch";
import { CASE_STUDY_SITEMAP_QUERY } from "@/sanity/queries";
import type { CASE_STUDY_SITEMAP_QUERY_RESULT } from "@/sanity.types";
import { caseSlug } from "@/lib/case-slugs";

export const revalidate = 3600;

// /sitemap.xml (issue #7): pagine statiche + dettagli /work da Sanity,
// in entrambe le lingue con alternates hreflang. La root "/" non compare
// perché redirige a /it (app/page.tsx).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  const studies = await sanityFetch<CASE_STUDY_SITEMAP_QUERY_RESULT>({
    query: CASE_STUDY_SITEMAP_QUERY,
    tags: ["caseStudy"],
  });

  const entries: { path: string; lastModified?: string }[] = [
    { path: "" },
    { path: "/work" },
    { path: "/services" },
    { path: "/products" },
    { path: "/gpt-chatbot" },
    { path: "/stellar-reviews" },
    { path: "/wegrocery" },
    { path: "/stack" },
    { path: "/privacy" },
    { path: "/cookie-policy" },
    { path: "/terms" },
    ...studies
      .filter((s) => s.slug)
      .map((s) => ({
        path: `/work/${caseSlug(s.slug)}`,
        lastModified: s.updatedAt ?? undefined,
      })),
  ];

  // hreflang bidirezionale: ogni URL localizzato è una voce, e ogni voce
  // dichiara tutte le versioni linguistiche della stessa pagina, più
  // x-default (stessa regola dei <link> nell'HTML, vedi buildMetadata).
  return entries.flatMap(({ path, lastModified }) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      "x-default": `${base}${xDefaultPath(path)}`,
    };
    return locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages },
    }));
  });
}
