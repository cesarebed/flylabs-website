import Link from "next/link";
import { pickLocale, pickLocaleLoose, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { cases } from "@/lib/cases-content";
import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_CASE_STUDIES_QUERY } from "@/sanity/queries";
import type { FEATURED_CASE_STUDIES_QUERY_RESULT } from "@/sanity.types";
import { WorkCarousel, type WorkItem } from "./work-carousel";
import { Reveal } from "./reveal";

export async function Work({ lang }: { lang: Locale }) {
  const { section, allLink, deck, nav } = landing.work;
  // Casi marcati "in evidenza" su Sanity. Se non ce n'è nessuno (o la
  // lettura torna vuota) si mostra solo il messaggio di lista vuota e il
  // link a /lavori: mai card o metriche inventate.
  const studies = await sanityFetch<FEATURED_CASE_STUDIES_QUERY_RESULT>({
    query: FEATURED_CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });

  // Il carosello è un client component: gli passiamo dati già localizzati e
  // serializzabili, non gli oggetti localeString di Sanity.
  const items: WorkItem[] = studies.map((study) => ({
    id: study._id,
    href: `/${lang}/lavori/${study.slug}`,
    title: pickLocale(study.title, lang),
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
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-tight">
            {section.titleBefore[lang]}
            <span className="mark">{section.titleMark[lang]}</span>
            {section.titleAfter[lang]}
          </h2>
          <p className="mb-10 mt-4 max-w-[46ch] text-muted">{deck[lang]}</p>
        </Reveal>

        {items.length > 0 ? (
          <WorkCarousel
            items={items}
            labels={{
              prev: nav.prev[lang],
              next: nav.next[lang],
              region: nav.region[lang],
            }}
          />
        ) : (
          <p className="text-muted">{cases.empty[lang]}</p>
        )}
        <div className="mt-8 text-right">
          <Link
            href={`/${lang}${allLink.href}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {allLink.label[lang]}
          </Link>
        </div>
      </div>
    </section>
  );
}
