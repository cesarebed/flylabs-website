import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { CONSENT_VERSION } from "@/lib/consent";

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

type Body = { state?: { analytics?: unknown; assistant?: unknown }; locale?: unknown };

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Body | null;
    const analytics = body?.state?.analytics;
    const assistant = body?.state?.assistant;
    if (typeof analytics !== "boolean" || typeof assistant !== "boolean") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const h = await headers();
    // IP solo in forma di hash (mai in chiaro), coerente col form contatti.
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : undefined;
    const userAgent = (h.get("user-agent") ?? "").slice(0, 300);
    const locale = typeof body?.locale === "string" ? body.locale.slice(0, 5) : undefined;

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
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
