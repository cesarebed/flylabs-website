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
