"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

const initial: ContactState = { ok: false };

export function ContactForm({ lang }: { lang: Locale }) {
  const c = landing.contact;
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center">
        <p className="font-display text-2xl font-semibold">
          {c.success.title[lang]}
        </p>
        <p className="mt-2 text-muted">{c.success.body[lang]}</p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form
      action={action}
      className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-6 text-left md:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            {c.labels.name[lang]} <span className="text-warm">*</span>
          </span>
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            {c.labels.company[lang]}{" "}
            <span className="font-normal text-muted">({c.optional[lang]})</span>
          </span>
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          {c.labels.email[lang]} <span className="text-warm">*</span>
        </span>
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          {c.labels.message[lang]} <span className="text-warm">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={c.messagePlaceholder[lang]}
          className={`${fieldClass} resize-y`}
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

      {state.error && (
        <p className="mt-4 text-sm font-medium text-warm" role="alert">
          {c.errors[state.error][lang]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-accent mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? c.sending[lang] : c.submit[lang]}
      </button>
    </form>
  );
}
