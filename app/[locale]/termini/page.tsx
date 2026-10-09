import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { terms } from "@/lib/terms-content";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/landing/page-shell";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = terms.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/termini",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const form = terms.withdrawalForm;

  return (
    <PageShell lang={lang}>
      <article className="mx-auto max-w-3xl px-6 py-[80px]">
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          {terms.title[lang]}
        </h1>
        <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-muted">
          {terms.updated[lang]}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {terms.intro[lang]}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {terms.sections.map((section) => (
            <section key={section.heading[lang]}>
              <h2 className="mb-3 font-display text-2xl font-semibold">
                {section.heading[lang]}
              </h2>
              <div className="flex flex-col gap-3">
                {section.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink/80">
                    {p.label && (
                      <strong className="font-semibold text-ink">
                        {p.label[lang]}{" "}
                      </strong>
                    )}
                    {p.text[lang]}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Modulo tipo dell'Allegato I parte B del Codice del Consumo,
              richiamato dalla sezione 6 (recesso dei consumatori). */}
          <section id="modulo-recesso" className="rounded-lg border border-ink/10 p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold">{form.title[lang]}</h2>
            <p className="mb-4 text-sm italic text-muted">{form.note[lang]}</p>
            <div className="flex flex-col gap-2">
              {form.lines.map((line, i) => (
                <p key={i} className="leading-relaxed text-ink/80">
                  {line[lang]}
                </p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
