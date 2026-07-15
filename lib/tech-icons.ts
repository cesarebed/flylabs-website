/**
 * Mappa "nome tecnologia" (come scritto a mano nel campo `tech` dei
 * caseStudy su Sanity) → icona Iconify, stessi set usati da /stack e dalla
 * strip loghi (logos: colore, simple-icons: monocromatiche).
 * Nomi non mappati: il badge esce senza logo, non è un errore.
 */
const TECH_ICONS: Record<string, string> = {
  claude: "logos:anthropic-icon",
  "claude code": "logos:anthropic-icon",
  anthropic: "logos:anthropic-icon",
  "make.com": "simple-icons:make",
  make: "simple-icons:make",
  apify: "devicon:apify",
  "google sheets": "simple-icons:googlesheets",
  n8n: "simple-icons:n8n",
  zapier: "logos:zapier-icon",
  hubspot: "logos:hubspot",
  openai: "logos:openai-icon",
  whatsapp: "logos:whatsapp-icon",
  zoho: "simple-icons:zoho",
  "zoho crm": "simple-icons:zoho",
  meta: "logos:meta-icon",
  "meta ads": "logos:meta-icon",
  "meta marketing api": "logos:meta-icon",
  gmail: "logos:google-gmail",
  tripadvisor: "simple-icons:tripadvisor",
  github: "logos:github-icon",
  "github actions": "logos:github-actions",
  brevo: "simple-icons:brevo",
  "next.js": "logos:nextjs-icon",
  vercel: "logos:vercel-icon",
  sanity: "simple-icons:sanity",
  python: "logos:python",
  playwright: "logos:playwright",
  mcp: "simple-icons:modelcontextprotocol",
};

export function techIcon(name: string): string | undefined {
  return TECH_ICONS[name.trim().toLowerCase()];
}
