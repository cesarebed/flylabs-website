import type { Metadata } from "next";
import {
  isLocale,
  defaultLocale,
  pickLocale,
  pickLocaleLoose,
  type Locale,
} from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { sanityFetch } from "@/sanity/fetch";
import { CASE_STUDIES_QUERY } from "@/sanity/queries";
import type { CASE_STUDIES_QUERY_RESULT } from "@/sanity.types";
import { CaseCard } from "@/components/landing/case-card";
import { ClosingCta } from "@/components/landing/closing-cta";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = cases.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/lavori",
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const studies = await sanityFetch<CASE_STUDIES_QUERY_RESULT>({
    query: CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });
  const siteUrl = await getSiteUrl();

  return (
    <main className="site-zoom flex-1">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${siteUrl}/${lang}` },
          { name: cases.kicker[lang], url: `${siteUrl}/${lang}/lavori` },
        ])}
      />
      <Nav lang={lang} />

      <section className="dot-paper border-b border-line py-16">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="kicker mb-5">{cases.kicker[lang]}</div>
          <h1 className="mb-6 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            {cases.title[lang]}
          </h1>
          <p className="max-w-2xl text-lg text-muted">{cases.intro[lang]}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-6 py-16">
        {studies.length === 0 ? (
          <p className="text-lg text-muted">{cases.empty[lang]}</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {studies.map((study) => (
              <CaseCard
                key={study._id}
                headingLevel="h2"
                item={{
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
                }}
              />
            ))}
          </div>
        )}
      </div>

      <ClosingCta
        title={cases.closing.list.title[lang]}
        body={cases.closing.list.body[lang]}
        cta={{ label: cases.closing.list.cta[lang], href: `/${lang}#cta` }}
      />

      <Footer lang={lang} />
    </main>
  );
}
