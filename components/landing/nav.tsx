"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
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
 *
 * Lo `style` dell'header è sempre lo stesso oggetto di motion value: con
 * reduced motion cambiano solo i range (piatti), non la forma dello style,
 * così l'HTML SSR (dove useReducedMotion vale null) combacia con l'hydration.
 *
 * Menu mobile come disclosure APG: aria-controls sul bottone, Esc lo chiude
 * e riporta il focus al bottone, si chiude anche al cambio di route. Le icone
 * menu/x sono SVG inline (path lucide): mai dipendere da una rete esterna
 * per l'unico accesso alla navigazione su mobile.
 */
const MENU_ID = "menu-mobile";

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* lucide:x / lucide:menu */}
      <path d={open ? "M18 6L6 18M6 6l12 12" : "M4 5h16M4 12h16M4 19h16"} />
    </svg>
  );
}

export function Nav({ lang }: { lang: Locale }) {
  const { cta } = landing.nav;
  const pages = landing.footer.nav;
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // chiusura al cambio di route, durante il render (niente setState in effect)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 80], reduce ? [64, 64] : [64, 56]);
  const shadow = useTransform(
    scrollY,
    [0, 80],
    reduce
      ? ["0 0 0 rgba(21,21,26,0)", "0 0 0 rgba(21,21,26,0)"]
      : ["0 0 0 rgba(21,21,26,0)", "0 8px 24px -14px rgba(21,21,26,0.18)"]
  );
  const background = useTransform(
    scrollY,
    [0, 80],
    reduce
      ? ["rgba(255,255,255,0.82)", "rgba(255,255,255,0.82)"]
      : ["rgba(255,255,255,0.82)", "rgba(255,255,255,0.95)"]
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
      style={{ height, boxShadow: shadow, backgroundColor: background }}
      className="nav-light sticky top-0 z-50 border-b border-line text-ink backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-2 font-display text-2xl font-bold tracking-tight max-[379px]:text-xl"
        >
          <LogoMark className="h-6 w-6 max-[379px]:h-5 max-[379px]:w-5" />
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

        <div className="flex items-center gap-1.5 md:gap-4">
          <div className="hidden md:block">
            <LangToggle lang={lang} />
          </div>
          <Link
            href={`/${lang}#cta`}
            onClick={() => setOpen(false)}
            className="btn-ink inline-block whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold max-[349px]:hidden md:px-5 md:py-2.5"
          >
            {cta[lang]}
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={menuLabel}
            className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={MENU_ID}
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
              {/* doppione della CTA dell'header: serve solo dove quella è nascosta */}
              <Link
                href={`/${lang}#cta`}
                onClick={() => setOpen(false)}
                className="btn-ink rounded-lg px-5 py-2.5 text-sm font-semibold min-[350px]:hidden"
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
