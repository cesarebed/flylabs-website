/**
 * Seed del singleton `siteSettings` con i valori SEO correnti.
 *
 * Uso (dopo aver creato il progetto e fatto `npx sanity login`):
 *   npx sanity@latest exec scripts/seed-site-settings.ts --with-user-token
 *
 * È idempotente: `createOrReplace` sull'id fisso "siteSettings" (documento
 * pubblicato, singleton). Rilanciarlo riporta i valori a questi default.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient();

const doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: {
    _type: "localeString",
    it: "flylabs.ai — AI concreta per la tua azienda",
    en: "flylabs.ai — Concrete AI for your business",
  },
  description: {
    _type: "localeText",
    it: "Costruiamo soluzioni AI concrete: chatbot, automazioni, risposta lead. Prezzo fisso, niente lock-in. Parli con chi costruisce.",
    en: "We build concrete AI solutions: chatbots, automations, lead response. Fixed price, no lock-in. You talk to the people who build.",
  },
  siteUrl: "https://flylabs.ai",
  keywords: [
    "intelligenza artificiale",
    "automazione aziendale",
    "chatbot AI",
    "AI per PMI",
    "consulenza AI",
    "agenzia AI",
  ],
  // ogImage: da caricare dallo Studio (immagine 1200×630).
};

client
  .createOrReplace(doc)
  .then(() => console.log("✓ siteSettings seedato:", doc._id))
  .catch((err) => {
    console.error("✗ seed fallito:", err.message);
    process.exit(1);
  });
