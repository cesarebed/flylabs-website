import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { landing, type BuildCardLink } from "@/lib/landing-content";
import { Icon } from "./icon";
import { RevealGroup, RevealItem } from "./reveal";

// Ritmo bento asimmetrico invece di celle identiche: la prima card (feature
// di apertura) occupa 2 colonne, le altre ne occupano 1 ciascuna.
const SPANS = ["md:col-span-2", "", "", ""];

export function WhatWeBuild({ lang }: { lang: Locale }) {
  const { section, cards, extra } = landing.build;
  return (
    <section id="cosa" className="py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="mb-14">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            {section.title[lang]}
          </h2>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
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

              {card.links && card.links.length > 0 && (
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
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
                      link.logo
                        ? "font-medium text-ink hover:text-accent"
                        : "text-muted hover:text-accent"
                    }`;
                    return link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link key={link.href} href={`/${lang}${link.href}`} className={cls}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>
              )}
            </RevealItem>
          ))}

          {/* card "rogna" — personalità, dashed */}
          <RevealItem className="card-hover flex flex-col justify-center rounded-xl border-2 border-dashed border-line bg-transparent p-7">
            <p className="mb-2 font-display text-xl italic leading-[1.15] pb-1">
              {extra.title[lang]}
            </p>
            <p className="mb-4 text-[15px] text-muted">{extra.body[lang]}</p>
            <a href="#cta" className="font-mono text-[12px] font-medium text-warm">
              {extra.cta[lang]}
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
