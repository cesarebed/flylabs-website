import Image from "next/image";
import mark from "@/public/logo/flylabs-mark.png";

/**
 * Il mark di flylabs: aeroplanino di carta stilizzato a forma di "F",
 * gradiente blu/violetto. Non è più un `currentColor` disegnato a mano
 * (vedi git history di questo file per la vecchia versione flat) ma
 * un'illustrazione a colori fissi fornita dal brand — quindi un'immagine,
 * non un componente che eredita il colore del testo circostante. Funziona
 * sia su sfondo chiaro (nav) sia su sfondo scuro (footer, `bg-ink`) perché
 * i suoi colori sono già pensati per reggere su entrambi.
 *
 * Reso a 24-28px (h-6, × zoom 1.15 da desktop): `sizes` fa scaricare la variante da 32/64w
 * invece di quella da 1080w che Next sceglieva senza. Niente `preload` di
 * Next (competeva con l'hero ed era doppio, nav + footer): caricamento
 * eager, per cui resta solo l'hint automatico di React sulla variante da
 * pochi KB.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden="true"
      sizes="32px"
      loading="eager"
      className={className}
    />
  );
}
