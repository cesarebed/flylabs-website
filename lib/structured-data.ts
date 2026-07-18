import type { Locale } from "@/lib/i18n";

// Costruttori dei payload JSON-LD (issue #16). Solo dati reali: sameAs
// arriva dai profili social su Sanity (vuoto = omesso); il logo si aggiunge
// quando esisterà un file logo.

export function organizationLd(siteUrl: string, sameAs?: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "flylabs.ai",
    url: siteUrl,
    ...(sameAs?.length ? { sameAs } : {}),
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
  // La `date` di Sanity è un giorno secco (YYYY-MM-DD); il Rich Results Test
  // segnala il fuso mancante, quindi la promuoviamo a datetime ISO in UTC.
  const datePublished =
    args.datePublished && args.datePublished.length === 10
      ? `${args.datePublished}T00:00:00Z`
      : args.datePublished;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    inLanguage: args.lang === "it" ? "it-IT" : "en-US",
    mainEntityOfPage: args.url,
    ...(datePublished ? { datePublished } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    ...(args.images?.length ? { image: args.images } : {}),
    author: org,
    publisher: org,
  };
}
