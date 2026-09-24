import { defineQuery } from "next-sanity";

// All GROQ queries live here — never inline them in page files.

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{
    title,
    description,
    siteUrl,
    "ogImage": ogImage.asset->url,
    socialLinks[]{ _key, label, url },
    contactEmail,
    bookingUrl,
    legalEntities[]{ _key, name, vatNumber, profileUrl }
  }`
);

// Casi di successo, dal più recente (fallback sulla data di creazione).
export const CASE_STUDIES_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)]
    | order(coalesce(date, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    sector,
    problem,
    solution,
    metrics,
    tech
  }`
);

// Card del carosello dei casi di successo in homepage: tutti i casi marcati
// "in evidenza", dal più recente. Nessun tetto: il carosello scorre, e la
// selezione la fa l'editor con il flag su Sanity.
export const FEATURED_CASE_STUDIES_QUERY = defineQuery(
  `*[_type == "caseStudy" && featured == true && defined(slug.current)]
    | order(coalesce(date, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    sector,
    problem,
    solution,
    metrics,
    tech
  }`
);

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(
  `*[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    sector,
    problem,
    solution,
    metrics,
    tech,
    body,
    testimonial,
    cover,
    "coverAlt": cover.alt,
    "diagrams": diagrams[]{
      _key,
      alt,
      caption,
      "it": it{ ..., "dims": asset->metadata.dimensions{ width, height } },
      "en": en{ ..., "dims": asset->metadata.dimensions{ width, height } }
    },
    date,
    "updatedAt": _updatedAt
  }`
);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)].slug.current`
);

// Voci del sitemap: slug + ultima modifica reale del documento (_updatedAt).
export const CASE_STUDY_SITEMAP_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`
);

// Rate limit del registro consensi (/api/consent): eventi recenti dallo stesso IP.
export const CONSENT_RATE_COUNT_QUERY = defineQuery(
  `count(*[_type == "consentEvent" && ipHash == $ipHash && at > $since])`
);

// Conservazione dei dati (cron /api/cron/pulizia-dati, vedi privacy): record da
// cancellare perché oltre il periodo dichiarato. A lotti, il cron recupera il
// resto ai giri successivi.
export const RETENTION_EXPIRED_QUERY = defineQuery(
  `*[(_type == "consentEvent" && at < $consentCutoff) ||
    (_type == "contactSubmission" && submittedAt < $contactCutoff)][0...200]._id`
);

// Record che hanno ancora l'hash dell'IP oltre i 30 giorni: serve solo al rate
// limit (finestra di 10 minuti), poi va tolto (minimizzazione).
export const IP_HASH_EXPIRED_QUERY = defineQuery(
  `*[_type in ["consentEvent", "contactSubmission"] && defined(ipHash) &&
    coalesce(at, submittedAt) < $ipCutoff][0...200]._id`
);

// Rate limit del form contatti: richieste recenti con stessa email o stesso IP.
export const CONTACT_RATE_COUNT_QUERY = defineQuery(
  `count(*[_type == "contactSubmission" && submittedAt > $since &&
    (email == $email || (defined(ipHash) && ipHash == $ipHash))])`
);
