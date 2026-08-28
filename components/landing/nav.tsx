"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Icon } from "./icon";
import { LangToggle } from "./lang-toggle";
import { LogoMark } from "./logo-mark";

/**
 * Nav sitewide: prima viveva solo nella homepage e linkava le sezioni della
 * pagina (#cosa, #metodo, ...); ogni altra pagina si ricostruiva un header
 * minimale a mano (solo logo + lang toggle), senza modo di navigare altrove
 * — su mobile addirittura senza alcun link. Ora è un unico componente,
 * montato in ogni pagina, che porta alle pagine reali del sito (le stesse
 * di `footer.nav`: Home/Lavori/Servizi/Stack) e diventa un menu a comparsa
 * sotto `md`.
 *
 * Si restringe leggermente scrollando (altezza, ombra, opacità dello
 * sfondo), legata a `useScroll` — mai `window.addEventListener('scroll')`
 * (vedi design-taste-frontend §5.D). Il menu mobile resta ferma sotto
 * `prefers-reduced-motion` (si apre/chiude senza animazione di altezza).
 */
export function Nav({ lang }: { lang: Locale }) {
  const { cta } = landing.nav;
  const pages = landing.footer.nav;
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 80], [64, 56]);
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0 rgba(21,21,26,0)", "0 8px 24px -14px rgba(21,21,26,0.18)"]
  );
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0.82)", "rgba(255,255,255,0.95)"]
  );

  // path corrente senza il segmento di locale (es. "/it/lavori/x" → "/lavori/x"),
  // per evidenziare la voce di nav attiva
  const rest = pathname.replace(/^\/(?:it|en)(?=\/|$)/, "");
  const isActive = (href: string) =>
    href === "" ? rest === "" : rest === href || rest.startsWith(`${href}/`);

  const navLabel = lang === "it" ? "Navigazione principale" : "Primary navigation";
  const menuLabel = open
    ? lang === "it"
      ? "Chiudi il menu"
      : "Close menu"
    : lang === "it"
      ? "Apri il menu"
      : "Open menu";

  return (
    <motion.header
      style={
        reduce ? undefined : { height, boxShadow: shadow, backgroundColor: background }
      }
      className="nav-light sticky top-0 z-50 border-b border-line text-ink backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight"
        >
          <LogoMark className="h-6 w-6 text-ink" />
          <span>
            flylabs<span className="logo-ai">.ai</span>
          </span>
        </Link>

        <nav
          aria-label={navLabel}
          className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex"
        >
          {pages.map((p) => (
            <Link
              key={p.href}
              href={`/${lang}${p.href}`}
              aria-current={isActive(p.href) ? "page" : undefined}
              className={isActive(p.href) ? "text-ink" : "hover:text-ink"}
            >
              {p.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LangToggle lang={lang} />
          </div>
          <Link
            href={`/${lang}#cta`}
            className="btn-ink hidden rounded-lg px-5 py-2.5 text-sm font-semibold md:inline-block"
          >
            {cta[lang]}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={menuLabel}
            className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            <Icon icon={open ? "lucide:x" : "lucide:menu"} width={24} height={24} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <nav
              aria-label={navLabel}
              className="flex flex-col gap-1 px-6 py-5 text-base font-medium"
            >
              {pages.map((p) => (
                <Link
                  key={p.href}
                  href={`/${lang}${p.href}`}
                  aria-current={isActive(p.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={
                    "rounded-lg px-2 py-2.5 " +
                    (isActive(p.href) ? "text-ink" : "text-ink/70 hover:text-ink")
                  }
                >
                  {p.label[lang]}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line px-6 py-5">
              <LangToggle lang={lang} />
              <Link
                href={`/${lang}#cta`}
                onClick={() => setOpen(false)}
                className="btn-ink rounded-lg px-5 py-2.5 text-sm font-semibold"
              >
                {cta[lang]}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
