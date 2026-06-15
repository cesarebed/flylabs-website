import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

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

    revalidateTag("sanity", "max");
    if (body?._type) revalidateTag(body._type, "max");

    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
