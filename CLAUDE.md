@AGENTS.md

# CLAUDE.md — flylabs-website

Sito di Flylabs (AI agency di Cesare + Federico). Next.js 16 (App Router) + TypeScript + Tailwind v4 + Sanity CMS. Deploy su Vercel.

---

## Contesto persone

Su questo repo lavorano due persone, **entrambe tecniche**, entrambe data scientist con esperienza dev:

- **Cesare** (GitHub: `cesarebed`)
- **Federico De Cillia** (GitHub: `fedcillia`, da confermare)

Stesso livello di accesso e competenze. Niente onboarding "non tecnico", niente schermate da semplificare, niente distinzione fra committer di codice e committer di contenuti. Parla tecnico, proponi trade-off, procedi.

---

## MUST / MUST NOT

MUST usare sempre la skill più rilevante per il task (vedi `.claude/skills/` e le skill globali); se manca una skill per un flusso ricorrente, creala in `.claude/skills/`.
MUST verificare visivamente ogni modifica UI con Playwright (browser MCP o skill `webapp-testing`): avvia `npm run dev`, naviga, screenshot. Mai dichiarare finita una modifica UI senza averla vista.
MUST usare App Router, mai Pages Router.
MUST fare fetch dei dati in Server Components, mai useEffect+fetch per dati di render.
MUST tenere tutte le query GROQ in `sanity/queries.ts`, mai inline nelle pagine.
MUST fare ogni fetch Sanity tramite `sanityFetch` (`sanity/fetch.ts`) passando i tag del tipo di documento, mai `client.fetch` diretto nelle pagine: i tag alimentano la revalidation on-demand del webhook.
MUST usare `next/image` con `alt` su ogni immagine.
MUST esportare `metadata` (o `generateMetadata`) e `viewport` su ogni pagina.
MUST avere un solo `<h1>` per pagina.
MUST usare `localeString`/`localeText` per ogni testo editabile (italiano + inglese) negli schemi Sanity.
MUST chiamare `notFound()` quando un documento Sanity è null.
MUST aggiungere `loading.tsx`, `error.tsx`, `not-found.tsx` a ogni route dinamica con dati.
MUST aggiungere le nuove env var a `.env.local`, `.env.example` e a Vercel (`vercel env add`).

MUST NOT committare `.env.local`.
MUST NOT usare `any` senza un commento `// TODO: type this`.
MUST NOT installare pacchetti senza dirlo nel commit / PR description.
MUST NOT scrivere a mano le interfacce TypeScript dei documenti Sanity quando lo schema cresce, usare `npx sanity@latest typegen generate`.

---

## Stack e struttura

- Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4
- Sanity CMS, Studio embedded su `/studio`. Project ID e dataset in `.env.local` / Vercel
- i18n: due lingue, `it` (default) ed `en`, route `app/[locale]/`; config in `lib/i18n.ts`; nei contenuti Sanity si usano i tipi `localeString`/`localeText`
- Vercel, push su `main` = deploy in produzione
- `sanity/client.ts` (client read), `sanity/queries.ts` (GROQ), `sanity/schemas/` (schemi), `sanity/structure.ts` (sidebar Studio)
- Singleton Sanity: `siteSettings` (gestito in `sanity/schemas/index.ts` → `SINGLETON_TYPES`)
- ISR: `export const revalidate = 3600` di default sulle pagine con dati Sanity

### Env var

| Nome | Cosa è |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID progetto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production`) |
| `SANITY_REVALIDATE_SECRET` | Firma del webhook Sanity → `/api/revalidate` (publish nello Studio = sito aggiornato in secondi) |

### Comandi

- `npm run dev` — sito su http://localhost:3000, Studio su http://localhost:3000/studio
- `npm run build` — build di produzione (lanciala prima di aprire una PR)
- `npm run lint` — lint

---

## Git workflow

MUST creare un branch per ogni feature/fix: `feat/descrizione-breve`, `fix/...`, `chore/...`.
MUST aprire una PR su GitHub per ogni branch, niente merge locali silenziosi su `main`.
MUST verificare che la preview Vercel sia verde prima di fare merge.
MUST tenere ogni PR focalizzata su una cosa sola.
MUST NOT pushare direttamente su `main`, mai force-push su `main`.

---

## CMS (Sanity)

**Cosa va nel CMS e cosa nel codice**: se è un contenuto che ha senso modificare senza riaprire l'editor di codice (testi, immagini, liste di card/testimonianze/FAQ, link dei social, parametri di branding), va in Sanity. Layout, struttura, comportamento e stile restano nel codice. Non hardcodare un testo che ha senso poter cambiare via Studio.

**Quando una modifica tocca il content model**, segui la skill `cms-change` (`.claude/skills/cms-change/`). In sintesi: schema → structure → frontend → seed dei contenuti iniziali → verifica visiva (sito + `/studio`).

**Regole di qualità degli schemi**:
- `title` e `description` di ogni campo in italiano sintetico ("Foto di copertina", non "Hero image asset").
- Ogni tipo di documento ha un `preview` leggibile (mai "Untitled" nelle liste).
- Validation `required` sui campi senza i quali la pagina si rompe; `description` che spiega cosa succede se manca.
- Testi sempre `localeString`/`localeText` (it + en); la pagina deve fare fallback senza rompersi se una lingua è vuota.
- Aggiorna sempre `sanity/structure.ts`: tutto ciò che si può editare deve essere raggiungibile dalla sidebar.

**Modifiche distruttive** (rinominare/rimuovere campi o tipi): prima migra i documenti esistenti (mutate API o script in `scripts/`), poi cambia lo schema; le query devono tollerare campi mancanti.

**Pubblicazione**: il webhook (`/api/revalidate`) propaga il Publish dello Studio al sito in pochi secondi. Se qualcosa "non si vede online", il primo posto da controllare è Sanity → API → Webhooks → attempts log, non la cache del browser.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
