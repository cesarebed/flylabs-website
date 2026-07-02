"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

/**
 * Toggle IT / EN: mantiene la pagina corrente cambiando solo il segmento
 * di locale (es. /it/stack → /en/stack).
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
            aria-current={l === lang ? "true" : undefined}
            className={
              l === lang
                ? "font-semibold text-ink"
                : "text-ink/40 transition-colors hover:text-ink"
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
