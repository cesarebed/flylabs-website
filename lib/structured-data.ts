import type { Locale } from "@/lib/i18n";

// Costruttori dei payload JSON-LD (issue #16). Solo dati reali: sameAs
// arriva dai profili social su Sanity (vuoto = omesso), logo = app/icon.png,
// founder ed email sono gli stessi già pubblici nella privacy policy.

const orgId = (siteUrl: string) => `${siteUrl.replace(/\/+$/, "")}/#organization`;

/**
 * Entità del brand per tutto il sito: un @graph con Organization + WebSite,
 * collegati per @id. Il nome "flylabs" collide con altri brand omonimi, quindi
 * l'entità dichiara alternateName, logo, founder ed email per disambiguare.
 * Gli altri payload (Article) puntano all'Organization via `@id`.
 */
export function organizationLd(siteUrl: string, sameAs?: string[]) {
  const base = siteUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId(base),
        name: "flylabs.ai",
        alternateName: ["flylabs", "Flylabs"],
        url: `${base}/`,
        logo: `${base}/icon.png`,
        email: "info@flylabs.ai",
        founder: [
          { "@type": "Person", name: "Cesare Bedin" },
          { "@type": "Person", name: "Federico De Cillia" },
        ],
        areaServed: "IT",
        knowsAbout: [
          "intelligenza artificiale",
          "automazione dei processi",
          "chatbot AI",
          "formazione AI",
        ],
        ...(sameAs?.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: `${base}/`,
        name: "flylabs.ai",
        alternateName: "flylabs",
        inLanguage: ["it-IT", "en-US"],
        publisher: { "@id": orgId(base) },
      },
    ],
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
  // Stessa entità del @graph nel layout (collegata via @id); name e url
  // restano espliciti così l'Article è valido anche letto da solo.
  const org = {
    "@type": "Organization",
    "@id": orgId(args.siteUrl),
    name: "flylabs.ai",
    url: `${args.siteUrl.replace(/\/+$/, "")}/`,
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
    // Senza cover né diagrammi, l'immagine è la OG generata per il caso.
    image: args.images?.length ? args.images : [`${args.url}/opengraph-image`],
    author: org,
    publisher: org,
  };
}
