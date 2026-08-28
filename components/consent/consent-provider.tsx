"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type ConsentState,
  DENY_ALL,
  GRANT_ALL,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/consent";

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
  openPreferences: () => void;
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

  // La scelta salvata vive nel localStorage, che non esiste durante l'SSR:
  // va letta al mount dentro un effect (non come stato iniziale), altrimenti
  // server e client renderizzerebbero stati diversi (hydration mismatch). Per
  // questo qui il setState-in-effect è intenzionale.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
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
      writeStoredConsent(next);
      setState(next);
      setDecided(true);
      setBannerOpen(false);
      // Registro consensi (accountability, art. 7 GDPR): fire-and-forget, non
      // deve mai bloccare o rompere l'esperienza.
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
    },
    [locale]
  );

  const save = useCallback((next: ConsentState) => persist(next), [persist]);
  const acceptAll = useCallback(() => persist(GRANT_ALL), [persist]);
  const rejectAll = useCallback(() => persist(DENY_ALL), [persist]);
  const openPreferences = useCallback(() => setBannerOpen(true), []);
  // Il facade del chatbot chiama questo solo dopo che l'utente ha già chiuso il
  // banner (il bottone dell'assistente è nascosto finché il banner è aperto e
  // non deciso), quindi `state` qui è aggiornato.
  const grantAssistant = useCallback(
    () => persist({ ...state, assistant: true }),
    [persist, state]
  );

  return (
    <ConsentContext.Provider
      value={{
        ready,
        decided,
        state,
        bannerOpen,
        openPreferences,
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
