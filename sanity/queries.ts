import { defineQuery } from "next-sanity";

// All GROQ queries live here — never inline them in page files.

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{
    title,
    description,
    siteUrl,
    "ogImage": ogImage.asset->url,
    keywords
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
    metric,
    metricLabel
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
    metric,
    metricLabel,
    body,
    testimonial,
    cover,
    "coverAlt": cover.alt,
    date
  }`
);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)].slug.current`
);
