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
import { PageShell } from "@/components/landing/page-shell";
import { Reveal } from "@/components/landing/reveal";
import { Icon } from "@/components/landing/icon";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.gptChatbotProduct.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/gpt-chatbot",
  });
}

export default async function GptChatbotProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const {
    title,
    tagline,
    logo,
    facts,
    app,
    mediaTitle,
    media,
    note,
    stepsTitle,
    steps,
    screensTitle,
    screensIntro,
    screens,
    problem,
    solution,
    featuresTitle,
    featureGroups,
    allFeatures,
    modesTitle,
    modeSaas,
    modeCustom,
    caseLinks,
    back,
  } = landing.gptChatbotProduct;
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: landing.products.kicker[lang], path: "/prodotti" },
          { name: title[lang], path: "/gpt-chatbot" },
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
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <li
              key={fact[lang]}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink/80"
            >
              <span aria-hidden className="text-accent">
                ✓
              </span>
              {fact[lang]}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={app.start.href[lang]}
            {...external}
            className="btn-accent inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            {app.start.label[lang]}
          </a>
          <a
            href={app.pricing.href[lang]}
            {...external}
            className="inline-block rounded-lg border border-ink/20 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            {app.pricing.label[lang]}
          </a>
        </div>
      </PageHeader>

      {/* Demo di esempio (video) accanto a una conversazione vera con
          l'assistente del sito: cosa sa fare, e che è lo stesso prodotto. */}
      <section className="bg-paper py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">{mediaTitle[lang]}</h2>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-[1.15fr_1fr]">
              <figure>
                <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lg">
                  {/* Il video non ha audio: niente <track>. L'alternativa
                      testuale è la trascrizione qui sotto (WCAG 1.2.1). Parte
                      da solo in loop, muto, e i controlli lo mettono in pausa
                      (WCAG 2.2.2). */}
                  <video
                    key={lang}
                    src={media.demoVideo.src[lang]}
                    poster={media.demoVideo.poster[lang]}
                    autoPlay
                    loop
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    aria-describedby="gpt-chatbot-video-trascrizione"
                    className="aspect-[1080/1046] w-full"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] font-medium text-ink/80">
                  {media.demoVideo.caption[lang]}
                </figcaption>
                <p
                  id="gpt-chatbot-video-trascrizione"
                  className="mt-3 text-[14px] leading-relaxed text-muted"
                >
                  {media.demoVideo.transcript[lang]}
                </p>
              </figure>
              <figure>
                <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lg">
                  <Image
                    src={media.realChat.src[lang]}
                    alt={media.realChat.alt[lang]}
                    width={840}
                    height={820}
                    sizes="(min-width: 1120px) 470px, (min-width: 768px) 42vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] font-medium text-ink/80">
                  {media.realChat.caption[lang]}
                </figcaption>
                <p className="mt-3 flex gap-2 text-[14px] leading-relaxed text-muted">
                  <Icon
                    icon="lucide:message-circle"
                    className="mt-0.5 shrink-0 text-[16px] text-accent"
                    aria-hidden
                  />
                  {note[lang]}
                </p>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">{stepsTitle[lang]}</h2>
            {/* Tre passi in fila, legati da una linea: un percorso, non tre card. */}
            <ol className="relative mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              <span
                aria-hidden
                className="absolute left-0 right-0 top-5 hidden h-px bg-line md:block"
              />
              {steps.map((step, i) => (
                <li key={step.title[lang]} className="relative">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-white font-display text-base font-semibold text-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title[lang]}</h3>
                  <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-ink/80">
                    {step.body[lang]}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-20">
            <h2 className="font-display text-2xl font-semibold">{screensTitle[lang]}</h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted">
              {screensIntro[lang]}
            </p>
            <ul className="mt-10 grid items-start gap-6 md:grid-cols-2">
              {screens.map((screen) => (
                <li key={screen.src[lang]}>
                  <figure>
                    <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-lg">
                      <div
                        aria-hidden
                        className="flex h-7 items-center gap-1.5 border-b border-line bg-paper px-3"
                      >
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                      </div>
                      <Image
                        src={screen.src[lang]}
                        alt={screen.alt[lang]}
                        width={screen.width}
                        height={screen.height}
                        sizes="(min-width: 768px) 540px, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-3 text-[13px] font-medium text-ink/80">
                      {screen.caption[lang]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="stamp text-muted">{landing.productLabels.problem[lang]}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{problem[lang]}</p>
              </div>
              <div>
                <h2 className="stamp text-accent">{landing.productLabels.solution[lang]}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{solution[lang]}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="font-display text-2xl font-semibold">{featuresTitle[lang]}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {featureGroups.map((group) => (
                <div
                  key={group.title[lang]}
                  className="rounded-xl border border-line bg-white p-7"
                >
                  <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon icon={group.icon} className="text-[18px]" aria-hidden />
                    </span>
                    {group.title[lang]}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((line) => (
                      <li key={line[lang]} className="flex gap-3">
                        <span aria-hidden className="mt-0.5 shrink-0 text-accent">
                          ✓
                        </span>
                        <span className="text-[15px] leading-relaxed text-ink/80">
                          {line[lang]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href={allFeatures.href[lang]}
              {...external}
              className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
            >
              {allFeatures.label[lang]}
            </a>
          </Reveal>

          <div className="mt-10 flex flex-col gap-2">
            {caseLinks.map((caseLink) => (
              <Link
                key={caseLink.href}
                href={`/${lang}${caseLink.href}`}
                className="text-sm font-medium text-accent hover:underline"
              >
                {caseLink.label[lang]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-16 md:py-[88px] text-white">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            {modesTitle[lang]}
          </h2>
          {/* Self-service per primo: è la strada più breve per provarlo. */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-accent bg-accent/[0.08] p-8">
              <h3 className="font-display text-xl font-semibold">{modeSaas.title[lang]}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeSaas.body[lang]}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={app.start.href[lang]}
                  {...external}
                  className="btn-accent inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  {app.start.label[lang]}
                </a>
                <a
                  href={app.pricing.href[lang]}
                  {...external}
                  className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <WithArrow>{app.pricing.label[lang]}</WithArrow>
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="font-display text-xl font-semibold">{modeCustom.title[lang]}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeCustom.body[lang]}
              </p>
              <Link
                href={`/${lang}#cta`}
                className="btn-ink mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
              >
                {modeCustom.cta[lang]}
              </Link>
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
