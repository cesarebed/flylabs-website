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
  wordpress: "logos:wordpress-icon",
  // Modelli: mostrarli affiancati racconta la flessibilità di scelta.
  gpt: "logos:openai-icon",
  gemini: "logos:google-gemini",
  deepseek: "logos:deepseek",
  // Canali: mostrarli affiancati racconta il multi-piattaforma.
  instagram: "logos:instagram-icon",
  messenger: "logos:messenger",
  "facebook messenger": "logos:messenger",
  // Superfici Meta usate per l'integrazione WhatsApp Business.
  "meta business management api": "logos:meta-icon",
  "meta developer apps": "logos:meta-icon",
};

/**
 * Loghi che non esistono su Iconify e vivono come immagine in `public/logos/`
 * (es. prodotti nostri). Renderizzati con next/image dai badge.
 */
const TECH_IMAGE_LOGOS: Record<string, { src: string; alt: string }> = {
  "gpt chatbot": { src: "/logos/gpt-chatbot.png", alt: "Logo GPT Chatbot" },
};

export function techIcon(name: string): string | undefined {
  return TECH_ICONS[name.trim().toLowerCase()];
}

export function techImageLogo(
  name: string
): { src: string; alt: string } | undefined {
  return TECH_IMAGE_LOGOS[name.trim().toLowerCase()];
}
