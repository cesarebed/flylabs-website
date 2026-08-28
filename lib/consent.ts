// Modello del consenso cookie del sito.
//
// Oltre ai cookie "necessari" (sempre attivi, nessun consenso richiesto) ci
// sono due categorie di strumenti NON tecnici che partono solo col consenso:
//   - analytics  → Google Analytics 4
//   - assistant  → chatbot di terza parte (gpt-trainer, via gptchatbot.it)
//
// Vercel Web Analytics / Speed Insights sono cookieless e restano fuori da
// questo modello (nessun consenso necessario).

export type ConsentState = {
  analytics: boolean;
  assistant: boolean;
};

// Bump quando cambiano gli strumenti o la Cookie Policy: fa ricomparire il
// banner anche a chi aveva già scelto (scelta "vecchia" = non più valida).
export const CONSENT_VERSION = 1;

export const CONSENT_STORAGE_KEY = "flylabs-consent";

// Ripresentazione della scelta: non prima di 6 mesi (linee guida Garante
// 10/6/2021). Oltre questa età la scelta scade e il banner riappare.
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180;

export const DENY_ALL: ConsentState = { analytics: false, assistant: false };
export const GRANT_ALL: ConsentState = { analytics: true, assistant: true };

export type StoredConsent = { v: number; at: number; state: ConsentState };

function isConsentState(value: unknown): value is ConsentState {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ConsentState).analytics === "boolean" &&
    typeof (value as ConsentState).assistant === "boolean"
  );
}

// Legge la scelta salvata, o null se assente / scaduta / di versione vecchia /
// storage non disponibile (es. navigazione in incognito con storage bloccato).
export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== CONSENT_VERSION) return null;
    if (!parsed.at || Date.now() - parsed.at > CONSENT_MAX_AGE_MS) return null;
    if (!isConsentState(parsed.state)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredConsent(state: ConsentState): StoredConsent {
  const record: StoredConsent = { v: CONSENT_VERSION, at: Date.now(), state };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage non disponibile: la scelta vale per la sessione corrente via
    // stato React, semplicemente non persiste al reload.
  }
  return record;
}
