import { createHash } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { CONSENT_RATE_COUNT_QUERY } from "@/sanity/queries";
import { CONSENT_VERSION } from "@/lib/consent";
import { isLocale } from "@/lib/i18n";

// Registro dei consensi (accountability, art. 7 GDPR): ogni scelta dell'utente
// viene loggata come documento `consentEvent` su Sanity. Non blocca l'utente:
// il client fa una POST fire-and-forget e ignora l'esito.
//
// Client con token di scrittura, vive solo lato server (route handler): il
// token non finisce mai nel bundle del browser.
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Rate limit contro chi riempie il dataset con eventi finti: oltre 20 eventi in
// 10 minuti dallo stesso IP si risponde 204 senza scrivere.
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type Body = { state?: { analytics?: unknown; assistant?: unknown }; locale?: unknown };

// Solo il banner del sito può registrare consensi. Sec-Fetch-Site lo mandano
// tutti i browser recenti; per quelli che non lo mandano (Safari < 16.4) si
// confronta Origin, che una fetch POST include sempre.
function isSameOrigin(req: NextRequest): boolean {
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Dello user agent teniamo solo famiglia di browser e sistema operativo
// (minimizzazione): basta per capire da dove arriva una scelta.
const BROWSERS: [RegExp, string][] = [
  [/Edg(e|A|iOS)?\//, "Edge"],
  [/OPR\/|Opera/, "Opera"],
  [/SamsungBrowser\//, "Samsung Internet"],
  [/Firefox\/|FxiOS\//, "Firefox"],
  [/Chrome\/|CriOS\/|Chromium\//, "Chrome"],
  [/Safari\//, "Safari"],
];
const SYSTEMS: [RegExp, string][] = [
  [/iPhone|iPad|iPod/, "iOS"],
  [/Android/, "Android"],
  [/CrOS/, "ChromeOS"],
  [/Windows/, "Windows"],
  [/Macintosh|Mac OS X/, "macOS"],
  [/Linux/, "Linux"],
];

function userAgentFamily(ua: string): string {
  const browser = BROWSERS.find(([re]) => re.test(ua))?.[1] ?? "altro";
  const os = SYSTEMS.find(([re]) => re.test(ua))?.[1] ?? "altro";
  return `${browser} / ${os}`;
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  try {
    const body = (await req.json().catch(() => null)) as Body | null;
    const analytics = body?.state?.analytics;
    const assistant = body?.state?.assistant;
    if (typeof analytics !== "boolean" || typeof assistant !== "boolean") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // IP solo in forma di hash (mai in chiaro), coerente col form contatti.
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : undefined;
    const userAgent = userAgentFamily(req.headers.get("user-agent") ?? "");
    const locale =
      typeof body?.locale === "string" && isLocale(body.locale) ? body.locale : undefined;

    // Fail-open come nel form: se il conteggio fallisce si registra comunque
    // (meglio un evento in più che una scelta persa).
    if (ipHash) {
      try {
        const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
        const recent = await writeClient.fetch<number>(CONSENT_RATE_COUNT_QUERY, {
          ipHash,
          since,
        });
        if (recent >= RATE_LIMIT_MAX) return new NextResponse(null, { status: 204 });
      } catch (err) {
        console.error("Consent rate limit check failed (logging anyway):", err);
      }
    }

    await writeClient.create({
      _type: "consentEvent",
      analytics,
      assistant,
      version: CONSENT_VERSION,
      locale,
      userAgent,
      ipHash,
      at: new Date().toISOString(),
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Consent log failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
