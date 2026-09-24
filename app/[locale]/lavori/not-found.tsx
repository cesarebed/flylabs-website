import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { WithArrow } from "@/components/landing/closing-cta";
import { Footer } from "@/components/landing/footer";
import { LocaleSwitch } from "@/components/landing/locale-switch";
import { Nav } from "@/components/landing/nav";

function NotFoundView({ lang }: { lang: Locale }) {
  return (
    <>
      <Nav lang={lang} />
      <section className="mx-auto w-full max-w-[1120px] flex-1 px-6 py-24 text-center">
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
      <Footer lang={lang} />
    </>
  );
}

// Caso non trovato. not-found.tsx non riceve params: le due versioni sono
// renderizzate sul server (Nav e Footer compresi) e LocaleSwitch mostra
// quella della lingua nell'URL.
export default function NotFound() {
  return (
    <main className="site-zoom flex flex-1 flex-col">
      <LocaleSwitch it={<NotFoundView lang="it" />} en={<NotFoundView lang="en" />} />
    </main>
  );
}
