"use client";

import Script from "next/script";
import { GA_ID } from "@/lib/google-analytics";
import { useConsent } from "./consent-provider";

// GA4 si carica SOLO dopo il consenso alla categoria "Statistiche": lo script
// di Google non viene nemmeno richiesto finché non c'è consenso (blocco
// preventivo). ID e revoca vivono in lib/google-analytics.ts.

export function GoogleAnalytics() {
  const { ready, state } = useConsent();

  if (!GA_ID || !ready || !state.analytics) return null;

  // Decisione (4) di PLAN.md: niente Google Signals né personalizzazione
  // pubblicitaria. anonymize_ip non serve: in GA4 l'IP non viene mai salvato.
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
gtag('config', '${GA_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}
