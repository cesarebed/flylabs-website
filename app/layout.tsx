import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/seo";
import { organizationLd } from "@/lib/structured-data";
import { getSiteSettings } from "@/sanity/site-settings";
import "./globals.css";

// Display serif for headlines — caratteriale, "meno vibe-AI".
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Body sans — pulito e credibile.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Micro-label / annotazioni da quaderno tecnico.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// metadataBase di sicurezza (le pagine lo sovrascrivono con il siteUrl da
// Sanity). Il template si applica alle eventuali sotto-pagine che non usano
// un titolo assoluto.
export const metadata: Metadata = {
  metadataBase: new URL("https://flylabs.ai"),
  title: {
    default: "flylabs.ai — AI concreta per la tua azienda",
    template: "%s | flylabs.ai",
  },
  description:
    "Costruiamo soluzioni AI concrete: chatbot, automazioni, risposta lead. Prezzo fisso, niente lock-in.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// lang is the default locale; per-locale pages live under app/[locale].
// When real content lands, consider moving to next-intl for full i18n.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteUrl = await getSiteUrl(settings);
  // sameAs = URL dei profili social gestiti su Sanity (vuoto = omesso).
  const sameAs = (settings?.socialLinks ?? [])
    .map((link) => link.url)
    .filter((url): url is string => Boolean(url));
  return (
    <html
      lang="it"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationLd(siteUrl, sameAs)} />
        {children}
      </body>
    </html>
  );
}
