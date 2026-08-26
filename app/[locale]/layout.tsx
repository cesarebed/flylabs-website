import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { fontVars } from "@/lib/fonts";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/seo";
import { organizationLd } from "@/lib/structured-data";
import { getSiteSettings } from "@/sanity/site-settings";
import { ChatbotWidget } from "@/components/chatbot-widget";
import "../globals.css";

// metadataBase di sicurezza (le pagine lo sovrascrivono con il siteUrl da
// Sanity). Il template si applica alle eventuali sotto-pagine che non usano
// un titolo assoluto.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.flylabs.ai"),
  title: {
    default: "flylabs.ai | AI concreta per la tua azienda",
    template: "%s | flylabs.ai",
  },
  description:
    "Costruiamo soluzioni AI concrete: chatbot, automazioni, risposta lead. Prezzo fisso, niente lock-in.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Root layout del sito. Vive sotto il segmento [locale] apposta: è qui che sta
// il tag <html>, così `lang` segue la lingua della pagina (it/en) invece di
// essere fisso. Lo Studio ha un root layout separato (app/studio/layout.tsx),
// e la root "/" redirige a /it via next.config.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const settings = await getSiteSettings();
  const siteUrl = await getSiteUrl(settings);
  // sameAs = URL dei profili social gestiti su Sanity (vuoto = omesso).
  const sameAs = (settings?.socialLinks ?? [])
    .map((link) => link.url)
    .filter((url): url is string => Boolean(url));

  return (
    <html lang={locale} className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationLd(siteUrl, sameAs)} />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
