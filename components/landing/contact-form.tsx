"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

const initial: ContactState = { ok: false };

const ERROR_ID = "contact-error";
const MESSAGE_HINT_ID = "contact-message-hint";

// Colori a contrasto AA su bianco: errore/asterisco #b8430f (~5,2:1, stessa
// famiglia del warm #ff7e4c, che come testo sta a 2,5:1) e bordo dei campi
// #8a8780 (~3,6:1, il border-line #e7e5e0 sta a 1,3:1).
const fieldClass =
  "w-full rounded-lg border border-[#8a8780] bg-white px-4 py-3 text-[15px] text-ink transition-colors focus:border-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 aria-invalid:border-[#b8430f]";

type Field = NonNullable<ContactState["field"]>;

export function ContactForm({ lang }: { lang: Locale }) {
  const c = landing.contact;
  const [state, action, pending] = useActionState(submitContact, initial);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  // Dopo ogni risposta: focus sul campo da correggere, oppure sul titolo
  // della conferma (il bottone che aveva il focus sparisce col form).
  useEffect(() => {
    if (state.ok) {
      successRef.current?.focus();
      return;
    }
    const refs = { name: nameRef, email: emailRef, message: messageRef };
    if (state.field) refs[state.field].current?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center"
      >
        <p
          ref={successRef}
          tabIndex={-1}
          className="font-display text-2xl font-semibold outline-none"
        >
          {c.success.title[lang]}
        </p>
        <p className="mt-2 text-muted">
          {c.success.body[lang]}
          <Link
            href={`/${lang}${c.success.link.href}`}
            className="font-medium text-accent underline underline-offset-2"
          >
            {c.success.link.label[lang]}
          </Link>
          {c.success.after[lang]}
        </p>
      </div>
    );
  }

  const v = state.values;
  // aria-invalid e aria-describedby solo sul campo colpevole.
  const invalid = (field: Field) =>
    state.field === field
      ? { "aria-invalid": true as const, "aria-describedby": ERROR_ID }
      : {};
  // Messaggio d'errore: specifico del campo quando la action lo indica;
  // su server/rate si aggiunge che il testo scritto è rimasto nel form.
  const errorText = (() => {
    if (!state.error) return null;
    if ((state.error === "missing" || state.error === "email") && state.field) {
      return c.errors.fields[state.field][lang];
    }
    const base = c.errors[state.error][lang];
    return state.error === "server" || state.error === "rate"
      ? `${base} ${c.errors.kept[lang]}`
      : base;
  })();
  const required = (
    <span className="text-[#b8430f]" aria-hidden>
      *
    </span>
  );

  return (
    <form
      action={action}
      className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-6 text-left md:p-8"
    >
      <p className="mb-4 text-xs text-muted">{c.requiredLegend[lang]}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            {c.labels.name[lang]} {required}
          </span>
          <input
            ref={nameRef}
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v?.name}
            className={fieldClass}
            {...invalid("name")}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            {c.labels.company[lang]}{" "}
            <span className="font-normal text-muted">({c.optional[lang]})</span>
          </span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={v?.company}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          {c.labels.email[lang]} {required}
        </span>
        <input
          ref={emailRef}
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={v?.email}
          className={fieldClass}
          {...invalid("email")}
        />
      </label>

      <label className="mt-4 block">
        <span className="block text-sm font-medium text-ink">
          {c.labels.message[lang]} {required}
        </span>
        <span id={MESSAGE_HINT_ID} className="mb-1.5 mt-0.5 block text-sm text-muted">
          {c.messageHint[lang]}
        </span>
        <textarea
          ref={messageRef}
          name="message"
          required
          rows={4}
          defaultValue={v?.message}
          className={`${fieldClass} resize-y`}
          {...invalid("message")}
          aria-describedby={
            state.field === "message" ? `${MESSAGE_HINT_ID} ${ERROR_ID}` : MESSAGE_HINT_ID
          }
        />
      </label>

      {/* honeypot anti-bot: nascosto agli utenti reali */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="locale" value={lang} />

      {errorText && (
        <p id={ERROR_ID} className="mt-4 text-sm font-medium text-[#b8430f]" role="alert">
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-accent mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? c.sending[lang] : c.submit[lang]}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {c.privacy.before[lang]}
        <Link
          href={`/${lang}/privacy`}
          className="underline underline-offset-2 hover:text-accent"
        >
          {c.privacy.link[lang]}
        </Link>
        {c.privacy.after[lang]}
      </p>
    </form>
  );
}
