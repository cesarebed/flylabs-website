"use client";

import { motion } from "motion/react";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactNode,
} from "react";

/**
 * Wrapper per lo scroll-reveal delle sezioni landing: fade + salita leggera
 * quando l'elemento entra in viewport, con stagger opzionale per liste di
 * card. Isolato come client leaf (motion) mentre le sezioni restano Server
 * Components — vedi design-taste-frontend §3.A / §5.C.
 *
 * Ogni elemento ha il proprio trigger: una soglia sull'intero gruppo (alto
 * ~4000px su mobile) non veniva mai raggiunta e le card restavano a opacity 0.
 * Gli elementi portano `data-reveal`: senza JS li rende visibili il
 * <noscript> del layout ([locale]/layout.tsx), con prefers-reduced-motion
 * una regola in globals.css. Lo stato iniziale non dipende da
 * useReducedMotion: lato server vale null, e un `initial` diverso fra SSR e
 * client dà un hydration mismatch che lascia gli elementi a opacity 0.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const HIDDEN = { opacity: 0, y: 20 };
const SHOWN = { opacity: 1, y: 0 };

// Oltre questo indice lo stagger smette di crescere: su mobile (colonna
// singola) le card entrano una alla volta e un ritardo lungo sembra un lag.
const MAX_STAGGER_STEPS = 5;

type Stagger = { index: number; step: number };
const StaggerContext = createContext<Stagger | null>(null);

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={HIDDEN}
      whileInView={SHOWN}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenitore per stagger: usare con <RevealItem> come figli diretti. Non ha
 * un trigger proprio, passa solo l'indice a ogni figlio per il ritardo.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <StaggerContext.Provider
          key={isValidElement(child) && child.key != null ? child.key : index}
          value={{ index, step: stagger }}
        >
          {child}
        </StaggerContext.Provider>
      ))}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const stagger = useContext(StaggerContext);
  const delay = stagger
    ? Math.min(stagger.index, MAX_STAGGER_STEPS) * stagger.step
    : 0;
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={HIDDEN}
      whileInView={SHOWN}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
