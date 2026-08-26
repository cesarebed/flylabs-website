"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

/**
 * Accordion invece di lista piatta: 9 voci con una hairline per riga
 * (`divide-y`) sono un data-dump, non un layout (design-taste-frontend §4.9).
 * Una voce aperta alla volta, altezza animata via CSS grid-rows (nessuna
 * misura JS, rispetta prefers-reduced-motion tramite motion-safe:).
 */
export function Faq({ lang }: { lang: Locale }) {
  const { section, items } = landing.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-center font-display text-4xl font-semibold">
          {section.title[lang]}
        </h2>
        <div className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q[lang]} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg font-bold">{item.q[lang]}</span>
                  <span
                    aria-hidden
                    className={`motion-safe:transition-transform motion-safe:duration-300 shrink-0 text-xl text-accent ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-a-${i}`}
                  className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pb-6 text-muted">{item.a[lang]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
