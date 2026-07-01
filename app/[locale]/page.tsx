import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/sanity/site-settings";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { WhatWeBuild } from "@/components/landing/what-we-build";
import { Work } from "@/components/landing/work";
import { Method } from "@/components/landing/method";
import { Offer } from "@/components/landing/offer";
import { Why } from "@/components/landing/why";
import { Faq } from "@/components/landing/faq";
import { ToolsStrip } from "@/components/landing/tools-strip";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export const revalidate = 3600;

// Titolo e descrizione della home arrivano da Sanity (siteSettings); questi
// restano come fallback se il CMS è vuoto o irraggiungibile.
const META: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "flylabs.ai — AI concreta per la tua azienda",
    description:
      "Costruiamo soluzioni AI concrete: chatbot, automazioni, risposta lead. Prezzo fisso, niente lock-in. Parli con chi costruisce.",
  },
  en: {
    title: "flylabs.ai — Concrete AI for your business",
    description:
      "We build concrete AI solutions: chatbots, automations, lead response. Fixed price, no lock-in. You talk to the people who build.",
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
    <main className="flex-1">
      <Nav lang={lang} />
      <Hero lang={lang} />
      <WhatWeBuild lang={lang} />
      <Work lang={lang} />
      <Method lang={lang} />
      <Offer lang={lang} />
      <Why lang={lang} />
      <Faq lang={lang} />
      <ToolsStrip lang={lang} />
      <FinalCta lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
