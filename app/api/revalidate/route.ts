import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

// Solo i tipi che il sito mostra. Gli altri (consentEvent, contactSubmission,
// ...) nascono dal sito stesso e non devono svuotare la cache.
const CONTENT_TYPES = ["siteSettings", "caseStudy"];

// Scadenza immediata: con "max" (stale-while-revalidate) il primo visitatore
// dopo un Publish vedrebbe ancora la versione vecchia. La doc di revalidateTag
// indica { expire: 0 } proprio per i webhook.
const EXPIRE_NOW = { expire: 0 };

// Sanity GROQ-powered webhook → invalidates the tagged fetch cache.
// Configured on the Sanity project to fire on create/update/delete;
// signature is verified against SANITY_REVALIDATE_SECRET.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const type = body?._type;
    if (!type || !CONTENT_TYPES.includes(type)) {
      return NextResponse.json({ revalidated: false, type: type ?? null });
    }

    revalidateTag(type, EXPIRE_NOW);
    // siteSettings compare in ogni layout: si rinfresca tutto ciò che viene da Sanity.
    if (type === "siteSettings") revalidateTag("sanity", EXPIRE_NOW);

    return NextResponse.json({ revalidated: true, type });
  } catch (err) {
    console.error("Revalidate webhook failed:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
