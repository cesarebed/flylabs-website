import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, pickLocale, type Locale } from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/fetch";
import { CASE_STUDIES_QUERY } from "@/sanity/queries";
import type { CASE_STUDIES_QUERY_RESULT } from "@/sanity.types";
import { Footer } from "@/components/landing/footer";
import { LangToggle } from "@/components/landing/lang-toggle";

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

  return (
    <main className="site-zoom flex-1">
      <header className="nav-light sticky top-0 z-50 border-b border-line backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
          <Link
            href={`/${lang}`}
            className="font-display text-2xl font-bold tracking-tight"
          >
            flylabs<span className="logo-ai">.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <LangToggle lang={lang} />
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-ink/70 hover:text-ink"
            >
              {cases.back[lang]}
            </Link>
          </div>
        </div>
      </header>

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
                <p className="mb-6 text-sm text-muted">
                  {pickLocale(study.solution, lang)}
                </p>
                <div className="mt-auto border-t border-line pt-6">
                  <div className="font-display text-6xl font-semibold leading-none text-accent">
                    {study.metric}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {pickLocale(study.metricLabel, lang)}
                  </div>
                  <div className="mt-4 text-sm font-medium text-ink/70">
                    {cases.cta[lang]}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer lang={lang} />
    </main>
  );
}
