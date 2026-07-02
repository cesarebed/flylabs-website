import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Icon } from "./icon";

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title[lang]}
              className="card-hover rounded-xl border border-line bg-white p-7"
            >
              <Icon icon={card.icon} className="text-2xl text-accent" aria-hidden />
              <h3 className="mb-2 mt-5 text-lg font-bold">{card.title[lang]}</h3>
              <p className="mb-4 text-[15px] leading-relaxed text-muted">
                {card.body[lang]}
              </p>
              <p className="font-mono text-[12px] text-accent">{card.claim[lang]}</p>
            </div>
          ))}

          {/* card "rogna" — personalità, dashed */}
          <div className="card-hover flex flex-col justify-center rounded-xl border-2 border-dashed border-line bg-transparent p-7">
            <p className="mb-2 font-display text-xl italic">{extra.title[lang]}</p>
            <p className="mb-4 text-[15px] text-muted">{extra.body[lang]}</p>
            <a href="#cta" className="font-mono text-[12px] font-medium text-warm">
              {extra.cta[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
