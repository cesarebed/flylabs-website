import Link from "next/link";
import { pickLocale, pickLocaleLoose, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { cases } from "@/lib/cases-content";
import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_CASE_STUDIES_QUERY } from "@/sanity/queries";
import type { FEATURED_CASE_STUDIES_QUERY_RESULT } from "@/sanity.types";
import { WorkCarousel, type WorkItem } from "./work-carousel";

export async function Work({ lang }: { lang: Locale }) {
  const { section, cards, allLink, deck, nav } = landing.work;
  // Casi reali marcati "in evidenza" su Sanity; finché non ce ne sono,
  // restano le card hardcoded (placeholder storici, vedi PLAN.md).
  const studies = await sanityFetch<FEATURED_CASE_STUDIES_QUERY_RESULT>({
    query: FEATURED_CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });

  // Il carosello è un client component: gli passiamo dati già localizzati e
  // serializzabili, non gli oggetti localeString di Sanity.
  const items: WorkItem[] = studies.map((study) => ({
    id: study._id,
    href: `/${lang}/lavori/${study.slug}`,
    sector: pickLocale(study.sector, lang),
    problem: pickLocale(study.problem, lang),
    solution: pickLocale(study.solution, lang),
    tech: study.tech ?? [],
    metrics: (study.metrics ?? []).map((metric) => ({
      key: metric._key,
      value: pickLocaleLoose(metric.value, lang),
      label: pickLocale(metric.label, lang),
    })),
    cta: cases.cta[lang],
  }));

  return (
    <section id="lavori" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="font-display text-4xl font-semibold leading-tight">
          {section.titleBefore[lang]}
          <span className="mark">{section.titleMark[lang]}</span>
          {section.titleAfter[lang]}
        </h2>
        <p className="mb-10 mt-4 max-w-[46ch] text-muted">{deck[lang]}</p>

        {items.length > 0 ? (
          <>
            <WorkCarousel
              items={items}
              labels={{
                prev: nav.prev[lang],
                next: nav.next[lang],
                region: nav.region[lang],
              }}
            />
            <div className="mt-8 text-right">
              <Link
                href={`/${lang}${allLink.href}`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {allLink.label[lang]}
              </Link>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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

      </div>
    </section>
  );
}
