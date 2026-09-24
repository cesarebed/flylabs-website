import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isLocale,
  defaultLocale,
  pickLocale,
  pickLocaleLoose,
  type Locale,
} from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { caseStudyArticleLd, siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { sanityFetch } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/queries";
import type {
  CASE_STUDIES_QUERY_RESULT,
  CASE_STUDY_BY_SLUG_QUERY_RESULT,
  CASE_STUDY_SLUGS_QUERY_RESULT,
} from "@/sanity.types";
import { ClosingCta, WithArrow } from "@/components/landing/closing-cta";
import { PageShell } from "@/components/landing/page-shell";
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
  // Caso inesistente: niente canonical (prima puntava alla home, segnale in
  // contraddizione con il noindex) e un titolo che dice cosa è successo. Il
  // noindex lo inietta già Next per notFound(): ripeterlo qui duplicava il
  // meta. Lo status resta 200 finché lavori/[slug]/loading.tsx (e
  // lavori/loading.tsx) aprono lo streaming prima di notFound().
  if (!study) {
    return { title: { absolute: cases.notFound.metaTitle[lang] } };
  }
  return buildMetadata(lang, {
    title: `${pickLocale(study.title, lang)} | flylabs.ai`,
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

  // "Caso successivo": il seguente nello stesso ordine di /lavori (dal più
  // recente), ricominciando dal primo dopo l'ultimo. Stessa query della
  // lista, quindi stessa cache e stesso tag di revalidation.
  const allStudies = await sanityFetch<CASE_STUDIES_QUERY_RESULT>({
    query: CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });
  const position = allStudies.findIndex((s) => s.slug === slug);
  const nextStudy =
    allStudies.length > 1 && position !== -1
      ? allStudies[(position + 1) % allStudies.length]
      : null;
  const relatedProduct = cases.relatedProduct.bySlug[slug];

  const siteUrl = await getSiteUrl();
  const pageUrl = `${siteUrl}/${lang}/lavori/${slug}`;
  // Le stesse immagini mostrate in pagina (cover + diagrammi nella lingua
  // giusta), riusate nel JSON-LD dell'articolo.
  const ldImages = [
    ...(study.cover?.asset
      ? [urlFor(study.cover).width(1600).height(900).url()]
      : []),
    ...(study.diagrams ?? []).flatMap((diagram) => {
      const image =
        lang === "en" && diagram.en?.asset ? diagram.en : diagram.it;
      return image?.asset ? [urlFor(image).width(1600).url()] : [];
    }),
  ];

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: cases.kicker[lang], path: "/lavori" },
          { name: pickLocale(study.title, lang), path: `/lavori/${slug}` },
        ])}
      />
      <JsonLd
        data={caseStudyArticleLd({
          siteUrl,
          lang,
          url: pageUrl,
          headline: pickLocale(study.title, lang),
          description: pickLocale(study.solution, lang),
          datePublished: study.date,
          dateModified: study.updatedAt,
          images: ldImages,
        })}
      />
      <article className="mx-auto max-w-3xl px-6 py-[80px]">
        <Link
          href={`/${lang}/lavori`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink"
        >
          {cases.backToList[lang]}
        </Link>
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
                {pickLocaleLoose(metric.value, lang)}
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
            const caption = pickLocale(diagram.caption, lang);
            // Da mobile il testo del diagramma è di pochi pixel: il link apre
            // l'immagine a piena risoluzione, da ingrandire a piacere.
            return (
              <figure key={diagram._key}>
                <a
                  href={urlFor(image).url()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Image
                    src={urlFor(image).width(1600).url()}
                    alt={
                      pickLocale(diagram.alt, lang) ||
                      pickLocale(study.title, lang)
                    }
                    width={image.dims?.width ?? 1600}
                    height={image.dims?.height ?? 900}
                    // Colonna max-w-3xl (768px) × zoom 1.15 del sito.
                    sizes="(min-width: 768px) 884px, 100vw"
                    className="rounded-xl border border-line bg-white"
                  />
                  <span className="sr-only">{cases.diagram.newTab[lang]}</span>
                </a>
                <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {caption && <span>{caption}</span>}
                  <span className="whitespace-nowrap normal-case tracking-normal text-[12px]">
                    {cases.diagram.enlarge[lang]}
                  </span>
                </figcaption>
              </figure>
            );
          })}
          {pickLocale(study.body, lang) && (
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-semibold">
                {cases.story[lang]}
              </h2>
              {pickLocale(study.body, lang)
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-ink/80">
                    {paragraph}
                  </p>
                ))}
            </section>
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
          {relatedProduct && (
            <p className="rounded-xl border border-line bg-paper px-6 py-5 text-[15px] leading-snug">
              <span className="text-ink/70">
                {cases.relatedProduct.label[lang]}
              </span>{" "}
              <Link
                href={`/${lang}${relatedProduct.href}`}
                className="font-semibold text-accent hover:underline"
              >
                <WithArrow>{relatedProduct.name}</WithArrow>
              </Link>
            </p>
          )}
        </div>
      </article>

      <ClosingCta
        title={cases.closing.caseStudy.title[lang]}
        body={cases.closing.caseStudy.body[lang]}
        cta={{ label: cases.closing.caseStudy.cta[lang], href: `/${lang}#cta` }}
        secondary={
          nextStudy
            ? {
                // "·" e non ":": diversi titoli contengono già i due punti
                // ("Caso successivo: WeGrocery: la piattaforma...").
                label: `${cases.closing.caseStudy.next[lang]} · ${pickLocale(nextStudy.title, lang)}`,
                href: `/${lang}/lavori/${nextStudy.slug}`,
              }
            : undefined
        }
      />
    </PageShell>
  );
}
