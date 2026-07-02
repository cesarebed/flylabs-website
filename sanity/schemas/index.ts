import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { siteSettings } from "./documents/siteSettings";
import { page } from "./documents/page";
import { contactSubmission } from "./documents/contactSubmission";
import { caseStudy } from "./documents/caseStudy";

export const SINGLETON_TYPES = new Set<string>(["siteSettings"]);

export const schemaTypes = [
  localeString,
  localeText,
  siteSettings,
  page,
  contactSubmission,
  caseStudy,
];
