import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import heroImage from "@/public/hero-automation-2.png";

export function Hero({ lang }: { lang: Locale }) {
  const h = landing.hero;
  return (
    <header id="top" className="dark-paper text-white">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-16 px-6 py-[120px] lg:grid-cols-[1.05fr_.95fr]">
        {/* copy */}
        <div className="fade">
          <h1 className="mb-7 font-display text-5xl font-semibold leading-[1.04] md:text-[3.75rem]">
            {h.titleBefore[lang]} <span className="mark text-ink">{h.titleMark[lang]}</span>{" "}
            {h.titleAfter[lang]}
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
            {h.body[lang]}
            <span className="uline">{h.bodyMark[lang]}</span>
            {h.bodyAfter[lang]}
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="btn-accent rounded-lg px-7 py-4 text-base font-bold"
            >
              {h.ctaPrimary[lang]}
            </a>
            <a
              href="#lavori"
              className="border-b-2 border-white/70 pb-0.5 text-base font-semibold transition-colors hover:border-mark hover:text-mark"
            >
              {h.ctaSecondary[lang]}
            </a>
          </div>
          <p className="text-sm text-white/45">{h.note[lang]}</p>
        </div>

        {/* visual: render 3D del flusso di automazione */}
        <div className="fade relative" style={{ animationDelay: "0.1s" }}>
          <Image
            src={heroImage}
            alt={
              lang === "it"
                ? "Flusso di automazione: un messaggio da sito, WhatsApp o Instagram viene qualificato e gestito dall'AI, che prenota e avvisa."
                : "Automation flow: a message from your site, WhatsApp or Instagram is qualified and handled by AI, which books and notifies."
            }
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </header>
  );
}
