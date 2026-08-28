"use client";

import { useConsent } from "./consent-provider";

// Riapre il pannello preferenze cookie: consente di revocare/aggiornare il
// consenso in ogni momento (requisito di revocabilità). Usato nel footer e
// nella Cookie Policy.
export function ManageCookiesLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      {label}
    </button>
  );
}
