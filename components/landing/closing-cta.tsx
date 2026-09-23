import Link from "next/link";

type ClosingLink = {
  label: string;
  href: string;
  /** Freccia finale (aria-hidden). Default true; false per link tipo "← Indietro". */
  arrow?: boolean;
};

// Toglie una freccia finale già scritta nel copy (es. "Parliamone →" in
// landing-content), così il componente non ne aggiunge una seconda.
function stripArrow(label: string) {
  return label.replace(/[\s ]*→\s*$/u, "");
}

/**
 * Etichetta di link con la freccia fuori dal nome accessibile (lo screen
 * reader non legge "freccia destra") e incollata all'ultima parola con uno
 * spazio non separabile (niente freccia orfana a capo).
 */
export function WithArrow({ children }: { children: string }) {
  return (
    <>
      {stripArrow(children)}
      <span aria-hidden>{" →"}</span>
    </>
  );
}

/**
 * Blocco scuro di chiusura prima del footer: titolo, testo, bottone verso il
 * form di contatto e un link secondario facoltativo. Stesso pattern della
 * chiusura di /servizi, riusabile da ogni pagina che altrimenti finirebbe
 * direttamente nel footer.
 */
export function ClosingCta({
  title,
  body,
  cta,
  secondary,
}: {
  title: string;
  body: string;
  cta: ClosingLink;
  secondary?: ClosingLink;
}) {
  return (
    <section className="dark-section py-16 text-white md:py-[88px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="max-w-[22ch] font-display text-3xl font-semibold leading-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/70">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href={cta.href}
            className="btn-light rounded-lg px-6 py-3 text-sm font-semibold"
          >
            {cta.arrow === false ? cta.label : <WithArrow>{cta.label}</WithArrow>}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {secondary.arrow === false ? (
                secondary.label
              ) : (
                <WithArrow>{secondary.label}</WithArrow>
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
