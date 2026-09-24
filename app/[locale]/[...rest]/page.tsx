import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

// Catch-all dei path con prefisso di lingua che non corrispondono a nessuna
// pagina (/it/xyz, /en/a/b): senza, finivano su global-not-found, bilingue e
// con link fisso a /it. Qui la lingua è nota, quindi notFound() mostra la 404
// localizzata di app/[locale]/not-found.tsx, con nav e footer.
//
// Limite noto: i path senza lingua (/xyz, /xyz/abc) entrano comunque in
// [locale] con locale "xyz" e il notFound() del root layout finisce sulla
// 404 grezza di Next, non su global-not-found (che risponde solo agli URL che
// non corrispondono a nessuna route, e con questo catch-all non ne restano).
// Era già così per /xyz prima di questo file. dynamicParams = false sul
// layout lo risolverebbe, ma viene ereditato da lavori/[slug] e farebbe 404
// ai casi pubblicati dopo la build (provato): serve un proxy che riscriva i
// path senza lingua.
//
// Status 404 vero solo se nessun loading.tsx sta sopra questa route: il suo
// Suspense farebbe partire lo streaming con un 200 prima di notFound() (docs
// loading.md, "Status Codes"). Per questo app/[locale]/loading.tsx non c'è più.

// Title e description stanno qui e non in not-found.tsx: quando notFound()
// parte dal render di una page, Next ha già risolto i metadata della page
// (layout + questo file), e un generateMetadata nel not-found.tsx non viene
// applicato (verificato: il title restava quello di default del layout). Il
// noindex lo aggiunge Next per lo status 404.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  return {
    title: { absolute: landing.notFound.metaTitle[lang] },
    description: landing.notFound.metaDescription[lang],
  };
}

export default function CatchAllNotFound() {
  notFound();
}
