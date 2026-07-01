import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function Faq({ lang }: { lang: Locale }) {
  const { section, items } = landing.faq;
  return (
    <section id="faq" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-center font-display text-4xl font-semibold">
          {section.title[lang]}
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.q[lang]} className="py-7">
              <h3 className="mb-2 text-lg font-bold">{item.q[lang]}</h3>
              <p className="text-muted">{item.a[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
