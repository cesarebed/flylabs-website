"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { CONTACT_RATE_COUNT_QUERY } from "@/sanity/queries";
import { isLocale } from "@/lib/i18n";

// Client con token di scrittura — vive solo lato server (questo file è
// "use server", il token non finisce mai nel bundle del browser).
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export type ContactState = {
  ok: boolean;
  error?: "missing" | "email" | "server" | "rate";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limiti di lunghezza: oltre si tronca (protezione, non validazione UX).
const NAME_MAX = 120;
const COMPANY_MAX = 200;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 4000;

// Rate limit: max 3 richieste in 10 minuti per stessa email o stesso IP.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Escape per l'HTML della mail di notifica: l'input è dell'utente.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// IP del chiamante (primo hop di x-forwarded-for su Vercel), salvato solo
// come hash SHA-256: basta per il rate limit, niente IP in chiaro nel CMS.
async function callerIpHash(): Promise<string | null> {
  const forwarded = (await headers()).get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex");
}

type Lead = {
  name: string;
  company: string;
  email: string;
  message: string;
  locale: string;
};

// Notifica via Resend. Non blocca il flusso: se la chiave non è configurata
// o l'invio fallisce, la richiesta resta comunque salvata su Sanity.
async function notifyByEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.RESEND_FROM || "flylabs <onboarding@resend.dev>";
  const to = process.env.RESEND_TO || "info@flylabs.ai";

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject: `Nuova richiesta dal sito — ${lead.name.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Nome: ${lead.name}`,
        `Azienda: ${lead.company || "—"}`,
        `Email: ${lead.email}`,
        `Lingua: ${lead.locale}`,
        "",
        "Messaggio:",
        lead.message,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;color:#15151a">
          <h2 style="margin:0 0 16px">Nuova richiesta dal sito</h2>
          <p style="margin:4px 0"><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>
          <p style="margin:4px 0"><strong>Azienda:</strong> ${escapeHtml(lead.company) || "—"}</p>
          <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
          <p style="margin:4px 0"><strong>Lingua:</strong> ${escapeHtml(lead.locale)}</p>
          <p style="margin:16px 0 4px"><strong>Messaggio:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Resend notification failed:", err);
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: campo nascosto che solo i bot compilano → scarto silenzioso.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, NAME_MAX);
  const email = String(formData.get("email") ?? "").trim().slice(0, EMAIL_MAX);
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MESSAGE_MAX);
  const company = String(formData.get("company") ?? "")
    .trim()
    .slice(0, COMPANY_MAX);
  const rawLocale = String(formData.get("locale") ?? "it").trim();
  const locale = isLocale(rawLocale) ? rawLocale : "it";

  if (!name || !email || !message) return { ok: false, error: "missing" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "email" };

  const ipHash = await callerIpHash();

  // Rate limit contro flood: conta le richieste recenti con stessa email o
  // stesso IP. Fail-open: se il conteggio fallisce, la richiesta passa (meglio
  // un lead in più che un lead perso per un errore transitorio).
  try {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const recent = await writeClient.fetch<number>(
      CONTACT_RATE_COUNT_QUERY,
      { since, email, ipHash: ipHash ?? "" }
    );
    if (recent >= RATE_LIMIT_MAX) return { ok: false, error: "rate" };
  } catch (err) {
    console.error("Rate limit check failed (letting request through):", err);
  }

  const lead: Lead = { name, email, message, company, locale };

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      ...(company ? { company } : {}),
      ...(ipHash ? { ipHash } : {}),
      locale,
      submittedAt: new Date().toISOString(),
      handled: false,
    });
  } catch {
    return { ok: false, error: "server" };
  }

  // La mail parte dopo il salvataggio: se fallisce, la richiesta è già al sicuro.
  await notifyByEmail(lead);

  return { ok: true };
}
