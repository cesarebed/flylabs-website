export const locales = ["it", "en", "es", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Tag BCP 47 per `inLanguage` (JSON-LD) e simili. */
export const languageTags: Record<Locale, string> = {
  it: "it-IT",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

/** Locale Open Graph (`og:locale`). */
export const ogLocales: Record<Locale, string> = {
  it: "it_IT",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

/**
 * Ordine di fallback quando un contenuto di Sanity non c'è nella lingua
 * richiesta: spagnolo e francese ripiegano sull'inglese (più vicino al
 * pubblico internazionale), poi tutto sull'italiano, che è sempre compilato.
 */
const FALLBACKS: Record<Locale, readonly Locale[]> = {
  it: ["it"],
  en: ["en", "it"],
  es: ["es", "en", "it"],
  fr: ["fr", "en", "it"],
};

/**
 * Primo valore presente seguendo il fallback della lingua. `isPresent` decide
 * cosa conta come compilato (es. un'immagine senza asset non conta).
 */
export function pickWithFallback<T>(
  value: Partial<Record<Locale, T | null | undefined>> | null | undefined,
  lang: Locale,
  isPresent: (v: T) => boolean = () => true
): T | undefined {
  for (const l of FALLBACKS[lang]) {
    const v = value?.[l];
    if (v != null && isPresent(v)) return v;
  }
  return undefined;
}

type LocalizedText = Partial<Record<Locale, string | null>>;

/**
 * Testo localizzato proveniente da Sanity (localeString/localeText): la
 * lingua richiesta può essere vuota, si degrada seguendo FALLBACKS e poi su
 * stringa vuota invece di rompere la pagina.
 */
export function pickLocale(
  value: LocalizedText | null | undefined,
  lang: Locale
): string {
  return pickWithFallback(value, lang, (v) => v !== "") ?? "";
}

/**
 * Come pickLocale, ma tollera anche una stringa semplice: metric.value era
 * `string` fino al 2026-07-16 e i documenti su Sanity migrano al formato
 * localeString solo dopo il deploy (re-import). Evita pagine rotte nella
 * finestra codice-nuovo + dati-vecchi.
 */
export function pickLocaleLoose(
  value:
    | string
    | LocalizedText
    | null
    | undefined,
  lang: Locale
): string {
  return typeof value === "string" ? value : pickLocale(value, lang);
}
