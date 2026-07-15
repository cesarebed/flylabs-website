import Link from "next/link";
import { pickLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { cases } from "@/lib/cases-content";
import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_CASE_STUDIES_QUERY } from "@/sanity/queries";
import type { FEATURED_CASE_STUDIES_QUERY_RESULT } from "@/sanity.types";
import { Icon } from "./icon";
import { TechBadges } from "./tech-badges";

export async function Work({ lang }: { lang: Locale }) {
  const { section, cards, live } = landing.work;
  // Casi reali marcati "in evidenza" su Sanity; finché non ce ne sono,
  // restano le card hardcoded (placeholder storici, vedi PLAN.md).
  const studies = await sanityFetch<FEATURED_CASE_STUDIES_QUERY_RESULT>({
    query: FEATURED_CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });

  return (
    <section id="lavori" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="mb-14 font-display text-4xl font-semibold leading-tight">
          {section.titleBefore[lang]}
          <span className="mark">{section.titleMark[lang]}</span>
          {section.titleAfter[lang]}
        </h2>

        {studies.length > 0 ? (
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {studies.map((study) => (
              <Link
                key={study._id}
                href={`/${lang}/lavori/${study.slug}`}
                className="card-hover flex flex-col rounded-xl border border-line bg-paper p-7"
              >
                <span className="stamp mb-6 text-muted">
                  {pickLocale(study.sector, lang)}
                </span>
                <p className="mb-1 font-semibold">
                  {pickLocale(study.problem, lang)}
                </p>
                <p className="mb-4 text-sm text-muted">
                  {pickLocale(study.solution, lang)}
                </p>
                <TechBadges tech={study.tech} className="mb-6" />
                <div
                  className={`mt-auto border-t border-line pt-6 ${
                    (study.metrics?.length ?? 0) > 1
                      ? "grid grid-cols-2 gap-4"
                      : ""
                  }`}
                >
                  {(study.metrics ?? []).map((metric) => (
                    <div key={metric._key}>
                      <div className="whitespace-nowrap font-display text-4xl font-semibold leading-none text-accent">
                        {metric.value}
                      </div>
                      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {pickLocale(metric.label, lang)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-sm font-medium text-ink/70">
                  {cases.cta[lang]}
                </div>
              </Link>
            ))}
          </div>
        ) : (
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
        )}

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
