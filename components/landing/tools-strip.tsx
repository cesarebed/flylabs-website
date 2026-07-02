import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Icon } from "./icon";

export function ToolsStrip({ lang }: { lang: Locale }) {
  const { kicker, title, body, cta, href, logos } = landing.toolsStrip;
  return (
    <section className="border-t border-line bg-white py-[100px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-md">
            <div className="kicker mb-4">{kicker[lang]}</div>
            <h2 className="mb-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
              {title[lang]}
            </h2>
            <p className="mb-6 text-muted">{body[lang]}</p>
            <a
              href={`/${lang}${href}`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {cta[lang]}
            </a>
          </div>

          <div className="grid grid-cols-4 gap-x-8 gap-y-6 opacity-85">
            {logos.map((icon) => (
              <Icon key={icon} icon={icon} className="text-[34px]" aria-hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
