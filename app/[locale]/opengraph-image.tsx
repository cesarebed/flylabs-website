import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { DEFAULT_OG_ALT } from "@/lib/seo";

// L'export statico non è localizzabile: l'alt per lingua lo emette
// buildMetadata (lib/seo.ts), che dichiara sempre og:image esplicita.
export const alt = DEFAULT_OG_ALT[defaultLocale];
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Copy minima, indipendente da lib/landing-content.ts: l'immagine OG è
// generata a build time (route statica) e non deve dipendere da Sanity.
// Stessa frase (e stessa parola evidenziata) dell'H1 della home.
const COPY: Record<
  Locale,
  { before: string; mark: string; after: string; tagline: string }
> = {
  it: {
    before: "Il partner per",
    mark: "integrare l'AI",
    after: "nei tuoi processi",
    tagline: "Soluzioni su misura, prezzo fisso, team formato.",
  },
  en: {
    before: "Your partner for",
    mark: "building AI",
    after: "into your processes",
    tagline: "Custom solutions, fixed price, a trained team.",
  },
};

// Immagine di anteprima social generica per lingua. La home la usa
// direttamente; le altre pagine ci arrivano perché buildMetadata (lib/seo.ts)
// punta sempre a /{lang}/opengraph-image come fallback, salvo le pagine con
// un'immagine propria (lavori/[slug]). Stesso linguaggio visivo dell'hero
// (.dark-paper in globals.css): sfondo scuro + alone indaco/arancio, wordmark ".ai" in accent, highlight
// giallo dietro la parola chiave (stesso trucco di .mark in globals.css).
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = COPY[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#131217",
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(52,59,237,0.55), transparent 55%), radial-gradient(circle at 6% 112%, rgba(255,126,76,0.30), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 34,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: -0.5,
          }}
        >
          flylabs
          <span style={{ color: "#a5a8f7" }}>.ai</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#fff",
            }}
          >
            <span style={{ marginRight: 20 }}>{c.before}</span>
            <span
              style={{
                marginRight: 20,
                padding: "0 10px",
                backgroundColor: "#ffda47",
                color: "#131217",
              }}
            >
              {c.mark}
            </span>
            <span>{c.after}</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "rgba(255,255,255,0.65)" }}>
            {c.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
