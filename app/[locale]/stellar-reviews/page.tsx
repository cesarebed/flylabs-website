import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WithArrow } from "@/components/landing/closing-cta";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/landing/icon";
import { PageHeader } from "@/components/landing/page-header";
import { PageShell } from "@/components/landing/page-shell";
import { Reveal } from "@/components/landing/reveal";

export const revalidate = 3600;

type Platform = { name: string; icon: string; color: string };

/** "A, B e C" con logo accanto a ogni nome (il nome è scritto, logo aria-hidden). */
function PlatformList({
  items,
  and,
  logoClassName = "",
}: {
  items: readonly Platform[];
  and: string;
  logoClassName?: string;
}) {
  return items.map((p, i) => (
    <span key={p.name}>
      {i > 0 && (i === items.length - 1 ? ` ${and} ` : ", ")}
      <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
        <Icon
          icon={p.icon}
          width={20}
          height={20}
          className={`shrink-0 self-center ${logoClassName}`}
          style={{ color: p.color }}
        />
        {p.name}
      </span>
    </span>
  ));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.stellarReviews.meta[lang];
  const og = landing.stellarReviews.og[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/stellar-reviews",
    ogImage: og?.src,
    ogImageAlt: og?.alt,
  });
}

export default async function StellarReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const {
    title,
    tagline,
    taglineHighlight,
    priceNote,
    app,
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
    logoAlt,
    platforms,
    screens,
  } = landing.stellarReviews;
  // Evidenziatore giallo su una parte del tagline (testo inchiostro: il giallo
  // non va mai come colore del testo, 1,4:1 sul bianco).
  const [before, after] = tagline[lang].split(taglineHighlight[lang]);
  const intro =
    after === undefined ? (
      tagline[lang]
    ) : (
      <>
        {before}
        <mark className="rounded-[3px] bg-mark px-1 text-ink [box-decoration-break:clone]">
          {taglineHighlight[lang]}
        </mark>
        {after}
      </>
    );
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: landing.products.kicker[lang], path: "/prodotti" },
          { name: title[lang], path: "/stellar-reviews" },
        ])}
      />

      <PageHeader
        back={{ href: `/${lang}/prodotti`, label: landing.products.kicker[lang] }}
        logo={
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl">
            <Image src={logo} alt={logoAlt} width={64} height={64} />
          </div>
        }
        title={title[lang]}
        intro={intro}
      >
        {/* Due righe con le etichette in colonna, così le liste partono allineate
            anche quando vanno a capo. "In arrivo" ha sempre la sua riga: non si
            mescola mai alle piattaforme di oggi. */}
        <dl className="mt-4 grid max-w-[62ch] grid-cols-[auto_1fr] gap-x-2 text-[15px] leading-loose text-muted">
          <dt>{platforms.todayLabel[lang]}</dt>
          <dd>
            <PlatformList items={platforms.today} and={platforms.and[lang]} />.
          </dd>
          <dt>{platforms.comingLabel[lang]}</dt>
          <dd>
            <PlatformList
              items={platforms.coming}
              and={platforms.and[lang]}
              logoClassName="opacity-60"
            />
            .
          </dd>
        </dl>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={app.demo.href}
            {...external}
            className="btn-accent inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            {app.demo.label[lang]}
          </a>
          <a
            href={app.pricing.href}
            {...external}
            className="inline-block rounded-lg border border-ink/20 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            {app.pricing.label[lang]}
          </a>
        </div>
        <p className="mt-4 text-sm text-muted">{priceNote[lang]}</p>
      </PageHeader>

      {/* Schermate reali della demo: dal computer in cornice browser, il
          telefono sovrapposto in basso a destra; sotto md solo il telefono. */}
      <section className="bg-white pt-16 md:pt-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <figure>
              <div className="relative md:pb-12">
                <div className="hidden overflow-hidden rounded-xl border border-line bg-paper shadow-lg md:mr-32 md:block">
                  <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-line bg-paper px-3">
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                  </div>
                  <Image
                    src={screens.desktop.src[lang]}
                    alt={screens.desktop.alt[lang]}
                    width={2880}
                    height={1480}
                    sizes="(min-width: 1120px) 976px, 88vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="mx-auto w-[260px] overflow-hidden rounded-[26px] border-[5px] border-ink bg-white shadow-lg md:absolute md:bottom-0 md:right-0 md:w-[210px]">
                  <Image
                    src={screens.mobile.src[lang]}
                    alt={screens.mobile.alt[lang]}
                    width={780}
                    height={1688}
                    sizes="260px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-5 max-w-[62ch] text-[13px] leading-relaxed text-ink/70 md:mt-3">
                {screens.caption[lang]}
              </figcaption>
            </figure>
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
            <ul className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {features.map((f) => (
                <li key={f.title[lang]} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 shrink-0 text-accent">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold">
                      {f.title[lang]}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/80">
                      {f.body[lang]}
                      {f.link && (
                        <>
                          {" "}
                          <a
                            href={app[f.link].href}
                            {...external}
                            className="font-medium text-accent underline-offset-2 hover:underline"
                          >
                            {app[f.link].label[lang]}
                          </a>
                          .
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <div id="piattaforme" className="mt-14 max-w-[62ch] border-t border-line pt-10">
            <h2 className="font-display text-xl font-semibold">
              {platforms.faq.q[lang]}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
              {platforms.faq.a[lang]}{" "}
              <a
                href={platforms.faq.contact.href[lang]}
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                {platforms.faq.contact.label[lang]}
              </a>
              .
            </p>
          </div>

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
            <div className="rounded-xl border-2 border-accent bg-accent/[0.08] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modeSaas.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeSaas.body[lang]}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={app.demo.href}
                  {...external}
                  className="btn-accent btn-accent-dark inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  {app.demo.label[lang]}
                </a>
                <a
                  href={app.pricing.href}
                  {...external}
                  className="text-sm font-medium text-peri transition-colors hover:text-white"
                >
                  <WithArrow>{app.pricing.label[lang]}</WithArrow>
                </a>
                <a
                  href={app.access.href}
                  {...external}
                  className="text-sm font-medium text-peri transition-colors hover:text-white"
                >
                  <WithArrow>{app.access.label[lang]}</WithArrow>
                </a>
              </div>
              <p className="mt-5 text-sm text-white/60">
                {platforms.pricingNote[lang]}
              </p>
            </div>
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
                  className="btn-light mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  {modeCustom.cta[lang]}
                </Link>
              )}
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
