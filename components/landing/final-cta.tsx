import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";

export function FinalCta({
  lang,
  bookingUrl,
  contactEmail,
}: {
  lang: Locale;
  // Da siteSettings su Sanity: senza link di prenotazione resta solo il form.
  bookingUrl?: string | null;
  contactEmail?: string | null;
}) {
  const { title, body, cta, bookNote, orEmail, formHeading } = landing.finalCta;

  if (!bookingUrl) {
    return (
      <section id="cta" className="dot-paper py-16 md:py-24 lg:py-[120px]">
        <Spotlight size={720} className="mx-auto max-w-[1120px] px-6 text-center">
          <Reveal>
            <h2 className="mb-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {title[lang]}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-xl text-muted">{body[lang]}</p>
          </Reveal>
          {/* Il form resta fuori dal reveal: l'unico punto di conversione non
              deve dipendere da un'animazione (né dal JS per essere visibile). */}
          <ContactForm lang={lang} />
        </Spotlight>
      </section>
    );
  }

  // Due strade, stesso peso: prenotare subito 15 minuti (TidyCal, in una nuova
  // scheda: niente embed, che caricherebbe cookie di terzi) oppure scrivere.
  return (
    <section id="cta" className="dot-paper py-16 md:py-24 lg:py-[120px]">
      <Spotlight size={720} className="mx-auto max-w-[1120px] px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="text-center lg:pt-2 lg:text-left">
            <h2 className="mb-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {title[lang]}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-xl text-muted lg:mx-0">{body[lang]}</p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-block rounded-lg px-7 py-4 text-base font-semibold"
            >
              {cta[lang]}
            </a>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted lg:mx-0">{bookNote[lang]}</p>
            {contactEmail && (
              <p className="mt-6 text-sm text-muted">
                {orEmail[lang]}{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent"
                >
                  {contactEmail}
                </a>
              </p>
            )}
          </div>
          <div>
            <h3 className="mb-4 text-center text-lg font-semibold lg:text-left">
              {formHeading[lang]}
            </h3>
            {/* Il form resta fuori da qualsiasi reveal: l'unico punto di
                conversione non deve dipendere da un'animazione o dal JS. */}
            <ContactForm lang={lang} bookingUrl={bookingUrl} />
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
