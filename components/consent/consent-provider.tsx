"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type ConsentState,
  DENY_ALL,
  GRANT_ALL,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/consent";
import { revokeAssistantStorage, revokeGoogleAnalytics } from "@/lib/google-analytics";

type ConsentContextValue = {
  // storage letto lato client: prima di questo non renderizziamo banner/GA per
  // evitare flash e mismatch di idratazione.
  ready: boolean;
  // l'utente ha già espresso una scelta (persistita e valida).
  decided: boolean;
  // scelta effettiva. Finché non si decide vale DENY_ALL (nessun tracker).
  state: ConsentState;
  // il banner/pannello preferenze è aperto.
  bannerOpen: boolean;
  // Riapre il pannello (es. da "Gestisci cookie"). `trigger` indica dove
  // riportare il focus alla chiusura: un elemento, oppure l'evento del click
  // (così resta valido anche onClick={openPreferences}); default: l'elemento
  // attivo.
  openPreferences: (trigger?: HTMLElement | React.SyntheticEvent | null) => void;
  // Chiude il pannello riaperto senza salvare (Escape). Non fa nulla alla
  // prima visita: lì serve una scelta esplicita.
  closePreferences: () => void;
  save: (next: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  // Concede la sola categoria "assistant" (usata dal facade del chatbot: il
  // click sul bottone dell'assistente vale come consenso a quello strumento).
  grantAssistant: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent deve stare dentro <ConsentProvider>");
  return ctx;
}

export function ConsentProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [decided, setDecided] = useState(false);
  const [state, setState] = useState<ConsentState>(DENY_ALL);
  const [bannerOpen, setBannerOpen] = useState(false);
  // Stato corrente in un ref: persist() deve confrontare la scelta nuova con
  // quella precedente per capire se è una revoca.
  const stateRef = useRef<ConsentState>(DENY_ALL);
  // Elemento che ha riaperto il pannello: ci torna il focus alla chiusura.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const restoreFocus = useCallback(() => {
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el?.isConnected) el.focus();
  }, []);

  // La scelta salvata vive nel localStorage, che non esiste durante l'SSR:
  // va letta al mount dentro un effect (non come stato iniziale), altrimenti
  // server e client renderizzerebbero stati diversi (hydration mismatch). Per
  // questo qui il setState-in-effect è intenzionale.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      stateRef.current = stored.state;
      setState(stored.state);
      setDecided(true);
    } else {
      // Prima visita o scelta scaduta: mostra il banner.
      setBannerOpen(true);
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const persist = useCallback(
    (next: ConsentState) => {
      const prev = stateRef.current;
      const revokedAnalytics = prev.analytics && !next.analytics;
      const revokedAssistant = prev.assistant && !next.assistant;
      // Revoca efficace subito (art. 7.3 GDPR): gtag già caricato va fermato
      // prima di qualsiasi altra navigazione client-side.
      if (revokedAnalytics) revokeGoogleAnalytics();
      if (revokedAssistant) revokeAssistantStorage();

      writeStoredConsent(next);
      stateRef.current = next;
      setState(next);
      setDecided(true);
      setBannerOpen(false);
      restoreFocus();
      // Registro consensi (accountability, art. 7 GDPR): fire-and-forget, non
      // deve mai bloccare o rompere l'esperienza. keepalive: la richiesta
      // sopravvive anche al reload qui sotto.
      try {
        void fetch("/api/consent", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ state: next, locale }),
          keepalive: true,
        });
      } catch {
        // ignora: il consenso resta valido lato client comunque.
      }
      // Script di terze parti già eseguiti (gtag.js, widget del chatbot) non si
      // possono scaricare: un reload riparte dalla nuova scelta, già salvata.
      if (revokedAnalytics || revokedAssistant) window.location.reload();
    },
    [locale, restoreFocus]
  );

  const save = useCallback((next: ConsentState) => persist(next), [persist]);
  const acceptAll = useCallback(() => persist(GRANT_ALL), [persist]);
  const rejectAll = useCallback(() => persist(DENY_ALL), [persist]);
  const openPreferences = useCallback(
    (trigger?: HTMLElement | React.SyntheticEvent | null) => {
      const el =
        trigger && "currentTarget" in trigger ? trigger.currentTarget : trigger;
      const active = document.activeElement;
      returnFocusRef.current =
        el instanceof HTMLElement
          ? el
          : active instanceof HTMLElement && active !== document.body
            ? active
            : null;
      setBannerOpen(true);
    },
    []
  );
  const closePreferences = useCallback(() => {
    if (!decided) return;
    setBannerOpen(false);
    restoreFocus();
  }, [decided, restoreFocus]);
  // Il facade del chatbot chiama questo solo dopo che l'utente ha già chiuso il
  // banner (il bottone dell'assistente è nascosto finché il banner è aperto e
  // non deciso); stateRef è comunque sempre allineato all'ultima scelta.
  const grantAssistant = useCallback(
    () => persist({ ...stateRef.current, assistant: true }),
    [persist]
  );

  return (
    <ConsentContext.Provider
      value={{
        ready,
        decided,
        state,
        bannerOpen,
        openPreferences,
        closePreferences,
        save,
        acceptAll,
        rejectAll,
        grantAssistant,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
