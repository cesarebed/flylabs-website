import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { siteSettings } from "./documents/siteSettings";
import { page } from "./documents/page";

export const SINGLETON_TYPES = new Set<string>(["siteSettings"]);

export const schemaTypes = [localeString, localeText, siteSettings, page];
