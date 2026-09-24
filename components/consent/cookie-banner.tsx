"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type ConsentState } from "@/lib/consent";
import { useConsent } from "./consent-provider";

const copy = {
  it: {
    title: "Cookie e privacy",
    body: "Usiamo solo strumenti tecnici, sempre attivi. Con il tuo consenso attiviamo le statistiche (Google Analytics) e l'assistente AI (gpt-trainer). Puoi cambiare idea in ogni momento da «Gestisci cookie».",
    acceptAll: "Accetta tutti",
    rejectAll: "Rifiuta tutti",
    customize: "Personalizza",
    save: "Salva preferenze",
    policy: "Cookie Policy",
    privacy: "Privacy",
    necessary: "Necessari",
    necessaryDesc: "Indispensabili al funzionamento del sito. Sempre attivi.",
    analytics: "Statistiche",
    analyticsDesc:
      "Google Analytics: capiamo in forma aggregata come viene usato il sito. Cookie di terze parti (Google).",
    assistant: "Assistente AI",
    assistantDesc:
      "Il chatbot di supporto (fornitore gpt-trainer). Cookie di terze parti. Si attiva anche aprendo l'assistente dal suo pulsante.",
    always: "Sempre attivi",
  },
  en: {
    title: "Cookies & privacy",
    body: "We only use strictly necessary tools, always on. With your consent we turn on analytics (Google Analytics) and the AI assistant (gpt-trainer). You can change your mind anytime via “Manage cookies”.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    customize: "Customise",
    save: "Save preferences",
    policy: "Cookie Policy",
    privacy: "Privacy",
    necessary: "Necessary",
    necessaryDesc: "Essential for the site to work. Always on.",
    analytics: "Analytics",
    analyticsDesc:
      "Google Analytics: aggregated insight into how the site is used. Third-party cookies (Google).",
    assistant: "AI assistant",
    assistantDesc:
      "The support chatbot, provided by gpt-trainer. Third-party cookies. Also turned on by opening the assistant from its button.",
    always: "Always on",
  },
};

export function CookieBanner({ lang }: { lang: string }) {
  const {
    ready,
    decided,
    bannerOpen,
    state,
    acceptAll,
    rejectAll,
    save,
    closePreferences,
  } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(state);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const visible = ready && bannerOpen;
  // Riaperto da "Gestisci cookie" (c'è già una scelta salvata), non prima visita.
  const reopened = visible && decided;

  // Riallinea i toggle allo stato salvato quando il pannello viene (ri)aperto,
  // es. da "Gestisci cookie". Reset durante il render (pattern consigliato da
  // React) invece che in un effect, così non si innescano render a cascata.
  const [wasOpen, setWasOpen] = useState(bannerOpen);
  if (bannerOpen !== wasOpen) {
    setWasOpen(bannerOpen);
    if (bannerOpen) setDraft(state);
  }

  // Riaperto dall'utente: il focus va sul titolo del pannello (il ritorno al
  // trigger alla chiusura lo gestisce il provider) ed Escape chiude senza
  // salvare. Alla prima visita invece il focus resta dov'è: il banner è il
  // primo elemento del DOM, quindi è comunque il primo tab stop.
  useEffect(() => {
    if (!reopened) return;
    headingRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [reopened, closePreferences]);

  // Finché il banner è aperto copre il fondo della pagina: scroll-padding fa sì
  // che l'elemento a fuoco venga portato sopra il banner (WCAG 2.4.11). Il
  // padding sul body dà lo spazio per scrollare anche il footer sopra il banner,
  // altrimenti gli ultimi link resterebbero coperti a fine pagina.
  useEffect(() => {
    const el = dialogRef.current;
    if (!visible || !el) return;
    const root = document.documentElement;
    const apply = () => {
      root.style.scrollPaddingBottom = `${el.offsetHeight + 16}px`;
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.scrollPaddingBottom = "";
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) return null;

  const t = copy[lang === "en" ? "en" : "it"];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      className="fixed inset-x-0 bottom-0 z-[2147483000] flex justify-center px-4 pb-4"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-line bg-white p-5 text-ink shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2
            ref={headingRef}
            id="cookie-banner-title"
            tabIndex={-1}
            className="font-display text-lg font-semibold focus:outline-none"
          >
            {t.title}
          </h2>
          <div className="flex gap-3 pt-1 text-xs text-muted">
            <Link href={`/${lang}/cookie-policy`} className="underline hover:text-ink">
              {t.policy}
            </Link>
            <Link href={`/${lang}/privacy`} className="underline hover:text-ink">
              {t.privacy}
            </Link>
          </div>
        </div>

        <p id="cookie-banner-body" className="mt-2 text-sm leading-relaxed text-muted">
          {t.body}
        </p>

        <div
          id="cookie-prefs"
          hidden={!showPrefs}
          className="mt-4 flex flex-col gap-3 border-t border-line pt-4"
        >
          <PrefRow
            title={t.necessary}
            desc={t.necessaryDesc}
            checked
            disabled
            badge={t.always}
            onChange={() => {}}
          />
          <PrefRow
            title={t.analytics}
            desc={t.analyticsDesc}
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <PrefRow
            title={t.assistant}
            desc={t.assistantDesc}
            checked={draft.assistant}
            onChange={(v) => setDraft((d) => ({ ...d, assistant: v }))}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {showPrefs ? (
            <button
              type="button"
              onClick={() => save(draft)}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              {t.save}
            </button>
          ) : (
            <>
              {/* Accetta e Rifiuta hanno lo stesso peso visivo (linee guida
                  Garante: il rifiuto dev'essere facile quanto l'accettazione). */}
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
              >
                {t.acceptAll}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
              >
                {t.rejectAll}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setShowPrefs((v) => !v)}
            aria-expanded={showPrefs}
            aria-controls="cookie-prefs"
            className="text-sm font-medium text-muted underline underline-offset-2 hover:text-ink sm:ml-auto"
          >
            {t.customize}
          </button>
        </div>
      </div>
    </div>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  disabled,
  badge,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  badge?: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={`flex items-start gap-3 ${disabled ? "opacity-70" : "cursor-pointer"}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-ink"
      />
      <span className="flex flex-col">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {title}
          {badge && (
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-normal uppercase tracking-wide text-muted">
              {badge}
            </span>
          )}
        </span>
        <span className="text-xs leading-relaxed text-muted">{desc}</span>
      </span>
    </label>
  );
}
