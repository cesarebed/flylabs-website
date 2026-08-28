"use client";

import Script from "next/script";
import { useConsent } from "./consent-provider";

// GA4 si carica SOLO dopo il consenso alla categoria "Statistiche": lo script
// di Google non viene nemmeno richiesto finché non c'è consenso (blocco
// preventivo). L'ID vive in NEXT_PUBLIC_GA_ID (non hardcodato).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const { ready, state } = useConsent();

  if (!GA_ID || !ready || !state.analytics) return null;

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
