import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { cases } from "@/lib/cases-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { ClosingCta } from "@/components/landing/closing-cta";
import { Icon } from "@/components/landing/icon";
import { PageHeader } from "@/components/landing/page-header";
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
  const m = landing.stack.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/stack",
  });
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const { kicker, title, intro, groups, disclaimer } = landing.stack;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [{ name: "Stack", path: "/stack" }])}
      />

      <PageHeader kicker={kicker[lang]} title={title[lang]} intro={intro[lang]} />

      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <Reveal key={group.name[lang]}>
              <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                {group.name[lang]}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.tools.map((tool) => (
                  // Niente card-hover: le card non sono link, il sollevamento
                  // prometteva un clic che non porta da nessuna parte.
                  <div
                    key={tool.name}
                    className="flex items-start gap-3 rounded-lg border border-line bg-white p-4"
                  >
                    {tool.icon ? (
                      <Icon
                        icon={tool.icon}
                        className="mt-0.5 shrink-0 text-[24px]"
                        aria-hidden
                      />
                    ) : (
                      // Tool senza logo su Iconify: stesso monogramma neutro
                      // per tutti, invece di icone semantiche prese a caso.
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-paper font-mono text-[12px] font-semibold text-muted"
                      >
                        {tool.name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <h3 className="text-[15px] font-bold">{tool.name}</h3>
                      <p className="mt-0.5 text-[13px] leading-snug text-muted">
                        {tool.desc[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 max-w-[70ch] border-t border-line pt-6 text-[13px] leading-relaxed text-muted">
          {disclaimer[lang]}
        </p>
      </div>

      <ClosingCta
        title={cases.closing.start.title[lang]}
        body={cases.closing.start.body[lang]}
        cta={{ label: landing.nav.cta[lang], href: `/${lang}#cta` }}
      />
    </PageShell>
  );
}
