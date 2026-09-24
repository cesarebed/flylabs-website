"use client";

import { useConsent } from "./consent-provider";

// Riapre il pannello preferenze cookie: consente di revocare/aggiornare il
// consenso in ogni momento (requisito di revocabilità). Usato nel footer e
// nella Cookie Policy. Il bottone viene passato come trigger: il pannello gli
// riporta il focus quando si chiude.
export function ManageCookiesLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { openPreferences } = useConsent();
  return (
    <button
      type="button"
      onClick={(e) => openPreferences(e.currentTarget)}
      className={className}
    >
      {label}
    </button>
  );
}
