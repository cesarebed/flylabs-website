import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { LocaleSwitch } from "@/components/landing/locale-switch";
import { PageShell } from "@/components/landing/page-shell";

function NotFoundView({ lang }: { lang: Locale }) {
  const { title, body, home, work } = landing.notFound;
  return (
    <PageShell lang={lang}>
      <section className="dot-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 text-center">
          <div className="kicker mb-4">404</div>
          <h1 className="mx-auto max-w-[22ch] font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
            {title[lang]}
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            {body[lang]}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${lang}`}
              className="btn-ink rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {home[lang]}
            </Link>
            <Link
              href={`/${lang}/lavori`}
              className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent"
            >
              {work[lang]}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

// 404 di ogni path con prefisso /it o /en che non esiste (lo attiva
// app/[locale]/[...rest]/page.tsx, che porta anche title e description).
// not-found.tsx non riceve params: le due versioni sono renderizzate sul
// server e LocaleSwitch mostra quella della lingua nell'URL, come in
// lavori/not-found.tsx.
export default function NotFound() {
  return <LocaleSwitch it={<NotFoundView lang="it" />} en={<NotFoundView lang="en" />} />;
}
