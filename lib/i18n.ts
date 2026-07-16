export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Testo localizzato proveniente da Sanity (localeString/localeText): la
 * lingua richiesta può essere vuota, si degrada su italiano e poi stringa
 * vuota invece di rompere la pagina.
 */
export function pickLocale(
  value: { it?: string | null; en?: string | null } | null | undefined,
  lang: Locale
): string {
  return value?.[lang] ?? value?.it ?? "";
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
    | { it?: string | null; en?: string | null }
    | null
    | undefined,
  lang: Locale
): string {
  return typeof value === "string" ? value : pickLocale(value, lang);
}
