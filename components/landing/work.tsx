import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Icon } from "./icon";

export function Work({ lang }: { lang: Locale }) {
  const { section, cards, live } = landing.work;
  return (
    <section id="lavori" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="mb-14 font-display text-4xl font-semibold leading-tight">
          {section.titleBefore[lang]}
          <span className="mark">{section.titleMark[lang]}</span>
          {section.titleAfter[lang]}
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.tag[lang]}
              className="flex flex-col rounded-xl border border-line bg-paper p-7"
            >
              <span className="stamp mb-6 text-muted">{card.tag[lang]}</span>
              <p className="mb-1 font-semibold">{card.problem[lang]}</p>
              <p className="mb-6 text-sm text-muted">{card.solution[lang]}</p>
              <div className="mt-auto border-t border-line pt-6">
                <div className="font-display text-6xl font-semibold leading-none text-accent">
                  {card.metric}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {card.metricLabel[lang]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* banda scura: chatbot live teaser */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-ink p-8 text-white md:flex-row">
          <div className="flex items-center gap-4">
            <Icon icon="lucide:sparkles" className="text-2xl text-warm" aria-hidden />
            <div>
              <p className="font-semibold">{live.title[lang]}</p>
              <p className="text-sm text-white/60">{live.body[lang]}</p>
            </div>
          </div>
          <a
            href="#"
            className="rounded-md bg-white px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-mark"
          >
            {live.cta[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
