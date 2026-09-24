import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { landing, type BuildCard, type BuildCardLink } from "@/lib/landing-content";
import { Icon } from "./icon";
import { RevealGroup, RevealItem } from "./reveal";

// Ritmo bento asimmetrico invece di celle identiche: la prima card (feature
// di apertura) occupa 2 colonne, le altre ne occupano 1 ciascuna.
const SPANS = ["md:col-span-2", "", "", ""];

/**
 * Due rami con lo stesso contenuto. Da md in su la griglia bento di card.
 * Sotto md le 10 card impilate erano alte ~4.400px (5 schermate): lì ogni
 * voce è un <details> nativo con icona, titolo e claim nel summary, e testo e
 * link ai casi dentro (la prima aperta). Niente JS, niente secondo carosello.
 */
export function WhatWeBuild({ lang }: { lang: Locale }) {
  const { section, cards } = landing.build;
  return (
    <section id="cosa" className="py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            {section.title[lang]}
          </h2>
        </div>

        {/* Mobile: elenco compatto a comparsa */}
        <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white md:hidden">
          {cards.map((card, i) => (
            <details key={card.title[lang]} open={i === 0} className="group">
              {/* Figli diretti del summary in griglia: <summary> ammette un
                  heading solo come figlio diretto, non dentro uno <span>.
                  Anello di focus interno: il contenitore ha overflow-hidden
                  e un outline esterno a tutta larghezza restava tagliato ai lati. */}
              <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-start gap-x-4 px-5 py-4 focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden">
                <Icon icon={card.icon} className="row-span-2 mt-0.5 text-xl text-accent" aria-hidden />
                <h3 className="min-w-0 text-base font-bold leading-snug">{card.title[lang]}</h3>
                <span
                  aria-hidden
                  className="row-span-2 text-xl leading-none text-accent motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45"
                >
                  +
                </span>
                <span className="col-start-2 mt-1 font-mono text-[12px] leading-snug text-accent">
                  {card.claim[lang]}
                </span>
              </summary>
              <div className="pb-5 pl-14 pr-5">
                <p className="text-[15px] leading-relaxed text-muted">{card.body[lang]}</p>
                <CardLinks card={card} lang={lang} className="mt-4" />
              </div>
            </details>
          ))}
        </div>
        <div className={`mt-5 p-5 md:hidden ${EXTRA_CARD}`}>
          <ExtraCardBody lang={lang} />
        </div>

        {/* md+: griglia bento */}
        <RevealGroup className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-3">
          {cards.map((card, i) => (
            <RevealItem
              key={card.title[lang]}
              className={`card-hover flex flex-col rounded-xl border border-line bg-white p-7 ${SPANS[i] ?? ""}`}
            >
              <Icon icon={card.icon} className="text-2xl text-accent" aria-hidden />
              <h3 className="mb-2 mt-5 text-lg font-bold">{card.title[lang]}</h3>
              <p className="mb-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
                {card.body[lang]}
              </p>
              <p className="mb-5 font-mono text-[12px] text-accent">{card.claim[lang]}</p>
              <CardLinks card={card} lang={lang} className="mt-auto border-t border-line pt-4" />
            </RevealItem>
          ))}

          <RevealItem className={`p-7 ${EXTRA_CARD}`}>
            <ExtraCardBody lang={lang} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/** Link "visto in produzione" di una card: prodotti flylabs (con logo) e casi. */
function CardLinks({
  card,
  lang,
  className,
}: {
  card: BuildCard;
  lang: Locale;
  className: string;
}) {
  if (!card.links || card.links.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {card.links.map((link: BuildCardLink) => {
        const inner = (
          <>
            {link.logo && (
              <Image
                src={link.logo}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 shrink-0 object-contain"
              />
            )}
            <span>{link.label[lang]}</span>
            <span aria-hidden>→</span>
          </>
        );
        const cls = `inline-flex items-center gap-1.5 text-[12px] ${
          link.logo ? "font-medium text-ink hover:text-accent" : "text-muted hover:text-accent"
        }`;
        return link.external ? (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link key={link.href} href={`/${lang}${link.href}`} className={cls}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

/** Card "rogna": personalità, bordo tratteggiato. */
const EXTRA_CARD =
  "card-hover flex flex-col justify-center rounded-xl border-2 border-dashed border-line bg-transparent";

function ExtraCardBody({ lang }: { lang: Locale }) {
  const { extra } = landing.build;
  return (
    <>
      <p className="mb-2 font-display text-xl italic leading-[1.15] pb-1">{extra.title[lang]}</p>
      <p className="mb-4 text-[15px] text-muted">{extra.body[lang]}</p>
      {/* Testo in accent (il warm su paper era 2,4:1): l'arancio resta solo
          come sottolineatura decorativa, come vuole ui-style.md. */}
      <a href="#cta" className="self-start font-mono text-[12px] font-medium text-accent">
        <span className="uline">{extra.cta[lang]}</span>
      </a>
    </>
  );
}
