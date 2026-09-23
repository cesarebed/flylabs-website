"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

/** Nome esteso di ogni lingua, nella lingua stessa (letto solo dagli SR). */
const LANG_NAMES: Record<Locale, string> = { it: "italiano", en: "English" };

/**
 * Toggle IT / EN: mantiene la pagina corrente cambiando solo il segmento
 * di locale (es. /it/stack → /en/stack).
 *
 * Ogni link porta `lang`/`hrefLang` della lingua di destinazione, così "EN"
 * non viene letto con fonetica italiana (WCAG 3.1.2), e un nome esteso
 * sr-only che contiene ancora l'etichetta visibile (2.5.3). La lingua non
 * attiva è ink/70 (contrasto AA), quella attiva si distingue per peso e
 * sottolineatura, non solo per colore.
 */
export function LangToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  // rimuove il locale iniziale, tenendo il resto del path (o "" per la home)
  const rest = pathname.replace(/^\/(?:it|en)(?=\/|$)/, "");

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-ink/25">/</span>}
          <Link
            href={`/${l}${rest}`}
            lang={l}
            hrefLang={l}
            aria-current={l === lang ? "true" : undefined}
            className={
              l === lang
                ? "font-semibold text-ink underline decoration-2 underline-offset-4"
                : "text-ink/70 transition-colors hover:text-ink"
            }
          >
            {l.toUpperCase()}
            <span className="sr-only"> ({LANG_NAMES[l]})</span>
          </Link>
        </span>
      ))}
    </div>
  );
}
