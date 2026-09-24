import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { IP_HASH_EXPIRED_QUERY, RETENTION_EXPIRED_QUERY } from "@/sanity/queries";

// Cron giornaliero (vercel.json): applica i periodi di conservazione promessi
// nella privacy.
//   - registro consensi (consentEvent): 24 mesi (prova del consenso, art. 7.1 GDPR)
//   - richieste dal form non diventate un rapporto (contactSubmission): 24 mesi
//   - hash dell'IP su entrambi: 30 giorni (serve solo al rate limit)
// Idempotente: ogni giro riprende quello che resta, a lotti di 200.
// Protetto da CRON_SECRET: Vercel lo manda come "Authorization: Bearer ...".
// Senza la variabile su Vercel il cron risponde 401 e non tocca nulla.

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const DAY_MS = 24 * 60 * 60 * 1000;
const monthsAgo = (months: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
};

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const [expired, withIp] = await Promise.all([
      writeClient.fetch<string[]>(RETENTION_EXPIRED_QUERY, {
        consentCutoff: monthsAgo(24),
        contactCutoff: monthsAgo(24),
      }),
      writeClient.fetch<string[]>(IP_HASH_EXPIRED_QUERY, {
        ipCutoff: new Date(Date.now() - 30 * DAY_MS).toISOString(),
      }),
    ]);

    const toStrip = withIp.filter((id) => !expired.includes(id));
    if (expired.length || toStrip.length) {
      const tx = writeClient.transaction();
      for (const id of expired) tx.delete(id);
      for (const id of toStrip) tx.patch(id, (p) => p.unset(["ipHash"]));
      await tx.commit({ visibility: "async" });
    }

    return NextResponse.json({ deleted: expired.length, ipHashRemoved: toStrip.length });
  } catch (err) {
    console.error("Pulizia dati fallita:", err);
    return NextResponse.json({ error: "cleanup failed" }, { status: 500 });
  }
}
