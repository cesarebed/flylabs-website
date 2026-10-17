import Image from "next/image";

/**
 * Logo orizzontale flylabs.ai 2.0 (aereo di carta + scritta su misura, la
 * scintilla gialla fa da punto di ".ai"). Viene dal kit in
 * flylabs-brain/03_Resources/materials/brand/logo/ (svg/flylabs-lockup-color-*.svg):
 * per aggiornarlo si rigenera il kit e si ricopiano i due file, non si
 * ridisegna qui. È un'immagine e non testo HTML perché la scritta è
 * disegnata a mano (f e y tagliate a 45°), quindi l'alt porta il nome.
 *
 * `variant`: "light" su sfondo chiaro (nav), "dark" su sfondo scuro
 * (footer, pagine di errore). Larghezza minima del brand: 160 px.
 */
export function Logo({
  variant,
  className,
}: {
  variant: "light" | "dark";
  className?: string;
}) {
  return (
    <Image
      src={`/logo/flylabs-lockup-${variant}.svg`}
      // viewBox 202,9 × 45,5: alla dimensione di default (h-9) è largo 160 px
      width={161}
      height={36}
      alt="flylabs.ai"
      loading="eager"
      unoptimized
      className={className}
    />
  );
}
