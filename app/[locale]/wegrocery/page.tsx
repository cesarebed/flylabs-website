import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WithArrow } from "@/components/landing/closing-cta";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/landing/page-header";
import { AutoplayVideo } from "@/components/landing/autoplay-video";
import { PageShell } from "@/components/landing/page-shell";
import { Reveal } from "@/components/landing/reveal";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.wegroceryProduct.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/wegrocery",
  });
}

export default async function WeGroceryProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const {
    title,
    tagline,
    problem,
    solution,
    featuresTitle,
    features,
    modesTitle,
    modeCustom,
    modeSaas,
    caseLink,
    back,
    logo,
    media,
    mediaTitle,
  } = landing.wegroceryProduct;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: landing.products.kicker[lang], path: "/prodotti" },
          { name: title[lang], path: "/wegrocery" },
        ])}
      />

      <PageHeader
        back={{ href: `/${lang}/prodotti`, label: landing.products.kicker[lang] }}
        logo={
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image src={logo} alt="" width={56} height={56} className="object-contain" />
          </div>
        }
        title={title[lang]}
        intro={tagline[lang]}
      />

      <section className="bg-paper py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">{mediaTitle[lang]}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
              <div>
                <div className="overflow-hidden rounded-xl border border-line bg-ink">
                  {/* Il video non ha audio: niente <track> (vuoto annunciava
                      sottotitoli inesistenti). L'alternativa testuale è la
                      trascrizione qui sotto (WCAG 1.2.1). */}
                  <video
                    src={media.launchVideo.src}
                    poster={media.launchVideo.poster}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    aria-describedby="wegrocery-video-trascrizione"
                    className="aspect-square w-full"
                  />
                  <p className="stamp px-4 py-3 text-white/60">
                    {media.launchVideo.caption[lang]}
                  </p>
                </div>
                <p
                  id="wegrocery-video-trascrizione"
                  className="mt-4 text-[14px] leading-relaxed text-muted"
                >
                  {media.launchVideo.transcript[lang]}
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-white">
                <AutoplayVideo
                  src={media.demoVideo.src}
                  poster={media.demoVideo.poster}
                  width={media.demoVideo.width}
                  height={media.demoVideo.height}
                  label={media.demoVideo.label[lang]}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="stamp text-muted">
                  {landing.productLabels.problem[lang]}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  {problem[lang]}
                </p>
              </div>
              <div>
                <h2 className="stamp text-accent">
                  {landing.productLabels.solution[lang]}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  {solution[lang]}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="font-display text-2xl font-semibold">
              {featuresTitle[lang]}
            </h2>
            <ul className="mt-6 space-y-4">
              {features.map((line) => (
                <li key={line[lang]} className="flex gap-3">
                  <span aria-hidden className="mt-1 shrink-0 text-accent">
                    ✓
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink/80">
                    {line[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10">
            <Link
              href={`/${lang}${caseLink.href}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              {caseLink.label[lang]}
            </Link>
          </div>
        </div>
      </section>

      <section className="dark-section py-16 md:py-[88px] text-white">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            {modesTitle[lang]}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modeCustom.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeCustom.body[lang]}
              </p>
              {modeCustom.cta && (
                <Link
                  href={`/${lang}#cta`}
                  className="btn-ink mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  {modeCustom.cta[lang]}
                </Link>
              )}
            </div>
            <div className="rounded-xl border-2 border-accent bg-accent/[0.08] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modeSaas.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeSaas.body[lang]}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                {modeSaas.cta && modeSaas.href && (
                  <Link
                    href={modeSaas.href}
                    target={modeSaas.external ? "_blank" : undefined}
                    rel={modeSaas.external ? "noopener noreferrer" : undefined}
                    className="btn-accent inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                  >
                    {modeSaas.cta[lang]}
                  </Link>
                )}
                {/* "Open source" promesso tre volte: qui il link al codice. */}
                {modeSaas.cta2 && modeSaas.href2 && (
                  <Link
                    href={modeSaas.href2}
                    target={modeSaas.external2 ? "_blank" : undefined}
                    rel={modeSaas.external2 ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    <WithArrow>{modeSaas.cta2[lang]}</WithArrow>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={`/${lang}/prodotti`}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {back[lang]}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
