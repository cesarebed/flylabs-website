import type { Locale } from "@/lib/i18n";

// Costruttori dei payload JSON-LD (issue #16). Solo dati reali: logo e
// sameAs si aggiungono quando esisteranno un file logo e profili social.

export function organizationLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "flylabs.ai",
    url: siteUrl,
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function caseStudyArticleLd(args: {
  siteUrl: string;
  lang: Locale;
  url: string;
  headline: string;
  description: string;
  datePublished?: string | null;
  dateModified?: string | null;
  images?: string[];
}) {
  const org = {
    "@type": "Organization",
    name: "flylabs.ai",
    url: args.siteUrl,
  };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    inLanguage: args.lang === "it" ? "it-IT" : "en-US",
    mainEntityOfPage: args.url,
    ...(args.datePublished ? { datePublished: args.datePublished } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    ...(args.images?.length ? { image: args.images } : {}),
    author: org,
    publisher: org,
  };
}
