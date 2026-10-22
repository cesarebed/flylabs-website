"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/**
 * Sceglie fra gli alberi (uno per lingua) già renderizzati sul server in base al segmento
 * [locale] dell'URL. Serve ai file che non ricevono params (es. not-found.tsx)
 * ma devono montare componenti server come il Footer nella lingua giusta.
 */
export function LocaleSwitch(props: Record<Locale, ReactNode>) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  return props[locale && isLocale(locale) ? locale : defaultLocale];
}
