import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { WithArrow } from "@/components/landing/closing-cta";
import { LocaleSwitch } from "@/components/landing/locale-switch";
import { PageShell } from "@/components/landing/page-shell";

function NotFoundView({ lang }: { lang: Locale }) {
  return (
    <PageShell lang={lang}>
      <section className="mx-auto w-full max-w-[1120px] px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold md:text-4xl">
          {cases.notFound.title[lang]}
        </h1>
        <p className="mt-4 text-lg text-muted">{cases.notFound.body[lang]}</p>
        <Link
          href={`/${lang}/lavori`}
          className="mt-8 inline-block rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          <WithArrow>{cases.notFound.cta[lang]}</WithArrow>
        </Link>
      </section>
    </PageShell>
  );
}

// Caso non trovato. not-found.tsx non riceve params: le due versioni sono
// renderizzate sul server (Nav e Footer compresi) e LocaleSwitch mostra
// quella della lingua nell'URL.
export default function NotFound() {
  return (
    <LocaleSwitch it={<NotFoundView lang="it" />} en={<NotFoundView lang="en" />} />
  );
}
