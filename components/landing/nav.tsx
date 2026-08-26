"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { LangToggle } from "./lang-toggle";

/**
 * La nav si restringe leggermente scrollando (altezza, ombra, opacità dello
 * sfondo), legata a `useScroll` — mai `window.addEventListener('scroll')`
 * (vedi design-taste-frontend §5.D). Solo un segnale di profondità in più:
 * niente da guardare finché non si scrolla, quindi resta ferma sotto
 * `prefers-reduced-motion`.
 */
export function Nav({ lang }: { lang: Locale }) {
  const { links, cta } = landing.nav;
  const reduce = useReducedMotion();
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

  return (
    <motion.nav
      style={
        reduce ? undefined : { height, boxShadow: shadow, backgroundColor: background }
      }
      className="nav-light sticky top-0 z-50 h-16 border-b border-line text-ink backdrop-blur"
    >
      <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6">
        <a href="#top" className="font-display text-2xl font-bold tracking-tight">
          flylabs<span className="logo-ai">.ai</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label[lang]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <LangToggle lang={lang} />
          <a href="#cta" className="btn-ink rounded-lg px-5 py-2.5 text-sm font-semibold">
            {cta[lang]}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
