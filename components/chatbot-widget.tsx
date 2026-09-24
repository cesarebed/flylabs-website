"use client";

import { useCallback, useRef, useState } from "react";
import { useConsent } from "./consent/consent-provider";

// Assistente flylabs.ai, ospitato sulla piattaforma gpt-trainer (via
// gptchatbot.it). L'UUID identifica il chatbot pubblico (non è un segreto).
const CHATBOT_UUID = "30d345beba264975998856aabf21f0f5";
const WIDGET_DOMAIN = "app.gptchatbot.it";

// FACADE: di default NON carichiamo lo script di terza parte (che scrive
// cookie, apre una sessione verso gpt-trainer e carica font di Google). Al
// posto suo mostriamo un nostro bottone. Lo script parte SOLO al click, che
// vale anche come consenso alla categoria "assistant" (il click sul pulsante
// dell'assistente è una richiesta esplicita del servizio). Un solo click:
// iniettiamo lo script e, appena il widget espone GPTTConfig.toggleWidget,
// apriamo il pannello.

declare global {
  interface Window {
    // Il saluto iniziale resta quello di default della dashboard: il widget lo
    // traduce da solo nella lingua del browser (verificato il 2026-09-24).
    GPTTConfig?: { uuid: string; domain: string; toggleWidget?: () => void };
  }
}

// Pill con testo visibile: dichiara che è un'AI e che il click attiva cookie di
// terze parti (il title non compare sui dispositivi touch, la microriga sì).
const labels = {
  it: {
    pill: "Assistente AI",
    note: "Chat con un'AI · attiva cookie di terze parti",
    aria: "Apri l'assistente AI (attiva i cookie del fornitore)",
    loading: "Caricamento dell'assistente",
  },
  en: {
    pill: "AI assistant",
    note: "Chat with an AI · enables third-party cookies",
    aria: "Open the AI assistant (enables the provider's cookies)",
    loading: "Loading the assistant",
  },
};

export function ChatbotWidget({ lang }: { lang: string }) {
  const { state, decided, bannerOpen, grantAssistant } = useConsent();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const injectedRef = useRef(false);

  const load = useCallback(() => {
    // Già caricato: basta ri-aprire il pannello.
    if (injectedRef.current) {
      window.GPTTConfig?.toggleWidget?.();
      return;
    }
    injectedRef.current = true;
    setLoading(true);
    window.GPTTConfig = { uuid: CHATBOT_UUID, domain: WIDGET_DOMAIN };
    const script = document.createElement("script");
    script.src = `https://${WIDGET_DOMAIN}/widget-asset.min.js`;
    script.async = true;
    document.body.appendChild(script);

    // Il widget assegna GPTTConfig.toggleWidget quando è pronto: appena c'è,
    // apriamo il pannello (così il click dell'utente resta uno solo).
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.GPTTConfig?.toggleWidget === "function") {
        window.clearInterval(timer);
        window.GPTTConfig.toggleWidget();
        setLoading(false);
        setLoaded(true);
      } else if (Date.now() - startedAt > 15000) {
        // Fallback difensivo: il widget ha comunque reso la sua bollicina,
        // nascondiamo il nostro bottone per non averne due.
        window.clearInterval(timer);
        setLoading(false);
        setLoaded(true);
      }
    }, 120);
  }, []);

  const onClick = useCallback(() => {
    // Durante il caricamento il bottone è aria-disabled (non disabled, che
    // farebbe cadere il focus su body): ignoriamo i click ripetuti.
    if (loading) return;
    // Il click vale come consenso allo strumento di terza parte "assistant".
    if (!state.assistant) grantAssistant();
    load();
  }, [loading, state.assistant, grantAssistant, load]);

  // Spazio in fondo alla pagina, dello stesso colore del footer (il widget è
  // montato subito dopo il contenuto, quindi dopo il footer): a fine scroll la
  // pill, o la bollicina del widget vero, non copre l'ultima riga legale
  // (contitolari e P.IVA). Sempre presente, anche col widget caricato.
  const spacer = <div aria-hidden="true" className="h-20 shrink-0 bg-ink" />;

  // Nascondi il nostro bottone quando: si sta ancora scegliendo i cookie
  // (prima il banner), oppure il widget vero è caricato (evita doppia bollicina).
  if ((bannerOpen && !decided) || loaded) return spacer;

  const t = labels[lang === "en" ? "en" : "it"];

  return (
    <>
      {spacer}
      {/* Senza JavaScript il bottone non può caricare nulla: meglio non mostrarlo. */}
      <noscript>
        <style>{"[data-chatbot-facade]{display:none!important}"}</style>
      </noscript>
      <button
        type="button"
        data-chatbot-facade=""
        onClick={onClick}
        aria-label={t.aria}
        title={t.aria}
        aria-disabled={loading || undefined}
        aria-busy={loading || undefined}
        className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 rounded-full bg-ink py-2.5 pl-3.5 pr-5 text-left text-white shadow-lg transition-transform motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white aria-disabled:cursor-progress aria-disabled:hover:scale-100"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {loading ? (
            <span
              aria-hidden="true"
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          )}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{t.pill}</span>
          <span className="mt-0.5 text-[11px] text-white/75">{t.note}</span>
        </span>
        {/* Live region sempre montata: se nascesse insieme al testo molti screen
            reader non annuncerebbero il caricamento. */}
        <span className="sr-only" role="status">
          {loading ? t.loading : ""}
        </span>
      </button>
    </>
  );
}
