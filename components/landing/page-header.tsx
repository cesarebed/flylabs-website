import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Header comune delle sottopagine (lavori, servizi, prodotti, stack e pagine
 * prodotto). Prima ogni pagina aveva il suo: padding, scala del titolo e
 * larghezze diverse, e un H1 a text-5xl fisso che da mobile andava su sei
 * righe. Qui la scala è una sola: 4xl da mobile, 5xl da md.
 *
 * Nelle pagine figlie (es. un prodotto) al posto del kicker c'è `back`, un
 * link alla pagina madre ("← Prodotti"): la micro-label che ripeteva la voce
 * di nav diventa una via d'uscita.
 */
export function PageHeader({
  kicker,
  back,
  logo,
  title,
  intro,
}: {
  kicker?: string;
  back?: { href: string; label: string };
  logo?: ReactNode;
  title: string;
  intro?: string;
}) {
  return (
    <section className="dot-paper border-b border-line py-14 md:py-[88px]">
      <div className="mx-auto max-w-[1120px] px-6">
        {back && (
          <Link
            href={back.href}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink"
          >
            <span aria-hidden>←</span>
            {back.label}
          </Link>
        )}
        {logo && <div className="mb-6">{logo}</div>}
        {kicker && <div className="kicker mb-4">{kicker}</div>}
        <h1 className="max-w-[22ch] font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
