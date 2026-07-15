import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, pickLocale, type Locale } from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import {
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/queries";
import type {
  CASE_STUDY_BY_SLUG_QUERY_RESULT,
  CASE_STUDY_SLUGS_QUERY_RESULT,
} from "@/sanity.types";
import { Footer } from "@/components/landing/footer";
import { LangToggle } from "@/components/landing/lang-toggle";
import { TechBadges } from "@/components/landing/tech-badges";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await sanityFetch<CASE_STUDY_SLUGS_QUERY_RESULT>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["caseStudy"],
  });
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

async function getStudy(slug: string) {
  return sanityFetch<CASE_STUDY_BY_SLUG_QUERY_RESULT>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
    tags: ["caseStudy"],
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const study = await getStudy(slug);
  if (!study) return buildMetadata(lang, cases.meta[lang]);
  return buildMetadata(lang, {
    title: `${pickLocale(study.title, lang)} — flylabs.ai`,
    description: pickLocale(study.solution, lang),
    path: `/lavori/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const study = await getStudy(slug);
  if (!study) notFound();

  const coverAlt = pickLocale(study.coverAlt, lang) || pickLocale(study.title, lang);

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
              href={`/${lang}/lavori`}
              className="text-sm font-medium text-ink/70 hover:text-ink"
            >
              {cases.backToList[lang]}
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-[80px]">
        <div className="kicker mb-5">{pickLocale(study.sector, lang)}</div>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          {pickLocale(study.title, lang)}
        </h1>
        <TechBadges tech={study.tech} className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-4">
          {(study.metrics ?? []).map((metric) => (
            <div
              key={metric._key}
              className="inline-block rounded-xl border border-line bg-paper px-7 py-6"
            >
              <div className="font-display text-6xl font-semibold leading-none text-accent">
                {metric.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                {pickLocale(metric.label, lang)}
              </div>
            </div>
          ))}
        </div>

        {study.cover?.asset && (
          <Image
            src={urlFor(study.cover).width(1600).height(900).url()}
            alt={coverAlt}
            width={1600}
            height={900}
            className="mt-10 rounded-xl border border-line"
          />
        )}

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <h2 className="mb-3 font-display text-2xl font-semibold">
              {cases.problem[lang]}
            </h2>
            <p className="leading-relaxed text-ink/80">
              {pickLocale(study.problem, lang)}
            </p>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl font-semibold">
              {cases.solution[lang]}
            </h2>
            <p className="leading-relaxed text-ink/80">
              {pickLocale(study.solution, lang)}
            </p>
          </section>
          {(study.diagrams ?? []).map((diagram) => {
            // Immagine nella lingua della pagina, con fallback sull'italiano.
            const image =
              lang === "en" && diagram.en?.asset ? diagram.en : diagram.it;
            if (!image?.asset) return null;
            return (
              <figure key={diagram._key}>
                <Image
                  src={urlFor(image).width(1600).url()}
                  alt={
                    pickLocale(diagram.alt, lang) ||
                    pickLocale(study.title, lang)
                  }
                  width={image.dims?.width ?? 1600}
                  height={image.dims?.height ?? 900}
                  className="rounded-xl border border-line bg-white"
                />
                {pickLocale(diagram.caption, lang) && (
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {pickLocale(diagram.caption, lang)}
                  </figcaption>
                )}
              </figure>
            );
          })}
          {pickLocale(study.body, lang) && (
            <div className="flex flex-col gap-3">
              {pickLocale(study.body, lang)
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-ink/80">
                    {paragraph}
                  </p>
                ))}
            </div>
          )}
          {pickLocale(study.testimonial?.quote, lang) && (
            <blockquote className="rounded-xl bg-ink p-8 text-white">
              <p className="text-lg leading-relaxed">
                “{pickLocale(study.testimonial?.quote, lang)}”
              </p>
              {study.testimonial?.author && (
                <footer className="mt-4 font-mono text-[12px] uppercase tracking-wider text-white/60">
                  {study.testimonial.author}
                </footer>
              )}
            </blockquote>
          )}
        </div>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
