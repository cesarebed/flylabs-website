"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

/**
 * Sceglie fra due alberi già renderizzati sul server in base al segmento
 * [locale] dell'URL. Serve ai file che non ricevono params (es. not-found.tsx)
 * ma devono montare componenti server come il Footer nella lingua giusta.
 */
export function LocaleSwitch(props: Record<Locale, ReactNode>) {
  const params = useParams<{ locale?: string }>();
  return params?.locale === "en" ? props.en : props.it;
}
