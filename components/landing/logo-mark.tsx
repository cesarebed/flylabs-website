import { useId } from "react";

/**
 * Il mark di flylabs: un aeroplanino di carta stilizzato, ali simmetriche
 * (stessa apertura sopra e sotto), con un piccolo "occhio a mandorla" nel
 * punto in cui naso e coda si incontrano — le due tracce che vi confluiscono
 * ricordano un segnale che arriva a un nodo, la mandorla un occhio
 * socchiuso (visione/idea). Un solo colore (`currentColor`): eredita il
 * colore del testo circostante, quindi lo stesso componente funziona sia
 * su sfondo chiaro (nav, inchiostro) sia su sfondo scuro (footer, bianco).
 *
 * Le "pieghe" e l'occhio sono ritagli veri (via `<mask>`), non un colore
 * sovrapposto: restano trasparenti su qualunque sfondo, non solo su quello
 * per cui erano stati tarati in fase di bozza.
 */
export function LogoMark({ className }: { className?: string }) {
  const maskId = useId();

  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <line x1="91" y1="46" x2="45" y2="50" stroke="black" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="9" y1="80" x2="45" y2="50" stroke="black" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="45" cy="50" rx="10" ry="5.5" transform="rotate(-20 45 50)" fill="black" />
      </mask>
      <path d="M91,46 L9,20 L45,50 L9,80 Z" mask={`url(#${maskId})`} />
      <circle cx="47.8" cy="49" r="1.8" />
    </svg>
  );
}
