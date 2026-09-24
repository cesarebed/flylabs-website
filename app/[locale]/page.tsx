import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/sanity/site-settings";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/landing/page-shell";
import { Hero } from "@/components/landing/hero";
import { WhatWeBuild } from "@/components/landing/what-we-build";
import { Work } from "@/components/landing/work";
import { Method } from "@/components/landing/method";
import { Offer } from "@/components/landing/offer";
import { Why } from "@/components/landing/why";
import { Faq } from "@/components/landing/faq";
import { ToolsStrip } from "@/components/landing/tools-strip";
import { FinalCta } from "@/components/landing/final-cta";

export const revalidate = 3600;

// Titolo e descrizione della home arrivano da Sanity (siteSettings); questi
// restano come fallback se il CMS è vuoto o irraggiungibile. Allineati al
// posizionamento del 2026-09-10 (partner AI, formazione): gli stessi testi
// vanno messi anche in Studio.
const META: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Partner AI per PMI: soluzioni su misura e formazione | flylabs.ai",
    description:
      "Integriamo l'AI nei processi della tua PMI: chatbot, automazioni, documenti e formazione del team. Prezzo fisso deciso prima, parli con chi costruisce.",
  },
  en: {
    title: "AI partner for SMEs: custom solutions and training | flylabs.ai",
    description:
      "We build AI into your business processes: chatbots, automations, documents and team training. Fixed price agreed upfront, and you talk to the people who build it.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const settings = await getSiteSettings();
  const title = settings?.title?.[lang] || META[lang].title;
  const description = settings?.description?.[lang] || META[lang].description;
  return buildMetadata(lang, { title, description }, settings);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <PageShell lang={lang}>
      <Hero lang={lang} />
      {/* Le prove prima di tutto (audit B13): i casi subito sotto l'hero,
          poi cosa costruiamo, come si lavora e con quali strumenti. */}
      <Work lang={lang} />
      <WhatWeBuild lang={lang} />
      <Offer lang={lang} />
      <Method lang={lang} />
      <ToolsStrip lang={lang} />
      <Why lang={lang} />
      <Faq lang={lang} />
      <FinalCta lang={lang} />
    </PageShell>
  );
}
