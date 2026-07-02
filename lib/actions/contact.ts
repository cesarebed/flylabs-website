"use server";

import { createClient } from "next-sanity";
import { Resend } from "resend";
import { apiVersion, dataset, projectId } from "@/sanity/env";

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
  error?: "missing" | "email" | "server";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      subject: `Nuova richiesta dal sito — ${lead.name}`,
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
          <p style="margin:4px 0"><strong>Nome:</strong> ${lead.name}</p>
          <p style="margin:4px 0"><strong>Azienda:</strong> ${lead.company || "—"}</p>
          <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p style="margin:4px 0"><strong>Lingua:</strong> ${lead.locale}</p>
          <p style="margin:16px 0 4px"><strong>Messaggio:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${lead.message}</p>
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

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const locale = String(formData.get("locale") ?? "it").trim();

  if (!name || !email || !message) return { ok: false, error: "missing" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "email" };

  const lead: Lead = { name, email, message, company, locale };

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      ...(company ? { company } : {}),
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
