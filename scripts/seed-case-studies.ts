/**
 * Seed dei primi documenti `caseStudy` con i contenuti oggi hardcoded nelle
 * work card della landing (lib/landing-content.ts). Le metriche sono ancora
 * PLACEHOLDER: vanno corrette dallo Studio con i dati reali dei clienti.
 *
 * Uso (serve un account con accesso al progetto e `npx sanity login`):
 *   npx sanity@latest exec scripts/seed-case-studies.ts --with-user-token
 *
 * È idempotente: `createIfNotExists` su id fissi — rilanciarlo NON
 * sovrascrive le modifiche fatte dallo Studio.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient();

const docs = [
  {
    _id: "caseStudy.studio-dentistico",
    _type: "caseStudy",
    title: {
      _type: "localeString",
      it: "Appuntamenti h24 per uno studio dentistico",
      en: "24/7 bookings for a dental practice",
    },
    slug: { _type: "slug", current: "studio-dentistico" },
    sector: {
      _type: "localeString",
      it: "Studio dentistico",
      en: "Dental practice",
    },
    problem: {
      _type: "localeText",
      it: "Perdeva richieste fuori orario.",
      en: "Was losing requests after hours.",
    },
    solution: {
      _type: "localeText",
      it: "Chatbot su sito e WhatsApp, appuntamenti h24.",
      en: "Chatbot on site and WhatsApp, 24/7 bookings.",
    },
    metric: "+48",
    metricLabel: {
      _type: "localeString",
      it: "richieste · primo mese",
      en: "requests · first month",
    },
  },
  {
    _id: "caseStudy.installatore-fotovoltaico",
    _type: "caseStudy",
    title: {
      _type: "localeString",
      it: "Pratiche automatiche per un installatore fotovoltaico",
      en: "Automated paperwork for a solar installer",
    },
    slug: { _type: "slug", current: "installatore-fotovoltaico" },
    sector: {
      _type: "localeString",
      it: "Installatore fotovoltaico",
      en: "Solar installer",
    },
    problem: {
      _type: "localeText",
      it: "Preventivi e pratiche lente.",
      en: "Slow quotes and paperwork.",
    },
    solution: {
      _type: "localeText",
      it: "Automazione delle pratiche ripetitive.",
      en: "Automation of repetitive paperwork.",
    },
    metric: "12h",
    metricLabel: {
      _type: "localeString",
      it: "liberate a settimana",
      en: "freed up per week",
    },
  },
  {
    _id: "caseStudy.concessionario",
    _type: "caseStudy",
    title: {
      _type: "localeString",
      it: "Risposta immediata ai lead di un concessionario",
      en: "Instant lead response for a car dealership",
    },
    slug: { _type: "slug", current: "concessionario" },
    sector: {
      _type: "localeString",
      it: "Concessionario",
      en: "Car dealership",
    },
    problem: {
      _type: "localeText",
      it: "Lead dai portali ricontattati tardi.",
      en: "Portal leads contacted too late.",
    },
    solution: {
      _type: "localeText",
      it: "Risposta automatica su ogni richiesta.",
      en: "Automatic reply on every request.",
    },
    metric: "<60s",
    metricLabel: {
      _type: "localeString",
      it: "tempo di prima risposta",
      en: "first response time",
    },
  },
];

const tx = docs.reduce(
  (t, doc) => t.createIfNotExists(doc),
  client.transaction()
);

tx.commit()
  .then(() => console.log(`✓ ${docs.length} caseStudy seedati (o già presenti)`))
  .catch((err) => {
    console.error("✗ seed fallito:", err.message);
    process.exit(1);
  });
