import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, pickLocale, pickLocaleLoose, type Locale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/fetch";
import { CASE_STUDY_BY_SLUG_QUERY } from "@/sanity/queries";
import type { CASE_STUDY_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

export const alt = "flylabs.ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK: Record<Locale, string> = {
  it: "Un caso di successo flylabs.ai",
  en: "A flylabs.ai success story",
};

// Anteprima social del singolo caso: settore + problema + la metrica più
// grande, stesso trattamento visivo (numero enorme, colore accent) delle
// card in home. Più specifica di app/[locale]/opengraph-image.tsx, che resta
// il fallback per tutte le altre pagine sotto [locale].
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const study = await sanityFetch<CASE_STUDY_BY_SLUG_QUERY_RESULT>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
    tags: ["caseStudy"],
  });

  if (!study) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#131217",
            color: "#fff",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          {FALLBACK[lang]}
        </div>
      ),
      { ...size }
    );
  }

  const metric = study.metrics?.[0];

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
            "radial-gradient(circle at 82% 8%, rgba(52,59,237,0.5), transparent 55%), radial-gradient(circle at 6% 112%, rgba(255,126,76,0.28), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 30, fontWeight: 700, color: "#fff" }}>
          flylabs<span style={{ color: "#a5a8f7" }}>.ai</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#a5a8f7",
              marginBottom: 24,
            }}
          >
            {pickLocale(study.sector, lang)}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
            }}
          >
            {pickLocale(study.problem, lang)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {metric ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1, color: "#8b93ff" }}>
                {pickLocaleLoose(metric.value, lang)}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 12,
                  fontSize: 20,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {pickLocale(metric.label, lang)}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
