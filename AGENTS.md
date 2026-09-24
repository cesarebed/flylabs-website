<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — flylabs-website

Sito di Flylabs (AI agency di Cesare + Federico). Next.js 16 (App Router) + TypeScript + Tailwind v4 + Sanity CMS. Deploy su Vercel.

---

## Contesto persone

Su questo repo lavorano due persone, **entrambe tecniche**, entrambe data scientist con esperienza dev:

- **Cesare** (GitHub: `cesarebed`)
- **Federico De Cillia** (GitHub: `fedcillia`, da confermare)

Stesso livello di accesso e competenze. Niente onboarding "non tecnico", niente schermate da semplificare, niente distinzione fra committer di codice e committer di contenuti. Parla tecnico, proponi trade-off, procedi.

---

## Coordinamento: PLAN.md

`PLAN.md` è la roadmap viva del sito e la mappa di chi sta lavorando a cosa (Cesare, Federico e i rispettivi agenti).

MUST leggere `PLAN.md` all'inizio di ogni task non banale: se la fase/area è già "in corso" da qualcun altro, fermati e segnalalo invece di lavorarci.
MUST aggiornare `PLAN.md` quando prendi in carico un lavoro (owner, branch, stato), quando apri la PR (link) e quando viene mergiata (✅) — di norma nella stessa PR del lavoro.
MUST registrare in `PLAN.md → Decisioni prese` le decisioni di prodotto/architettura concordate in chat o in call.

---

## Skill (`.claude/skills/`, indice in `.claude/skills/README.md`)

`flylabs-brain` è la repo gemella, di norma `../flylabs-brain`. Il brand (palette, tipografia, tono di voce, palette diagrammi) vive in `flylabs-brain/03_Resources/materials/brand/` — non duplicarlo qui, le skill lo leggono da lì.

## MUST / MUST NOT

MUST usare sempre la skill più rilevante per il task; se manca una skill per un flusso ricorrente, creala in `.claude/skills/` e aggiungila all'indice.
MUST verificare visivamente ogni modifica UI con Playwright (browser MCP o skill `visual-check`): avvia `npm run dev`, naviga, screenshot. Mai dichiarare finita una modifica UI senza averla vista.
MUST usare App Router, mai Pages Router.
MUST fare fetch dei dati in Server Components, mai useEffect+fetch per dati di render.
MUST tenere tutte le query GROQ in `sanity/queries.ts`, mai inline nelle pagine.
MUST fare ogni fetch Sanity tramite `sanityFetch` (`sanity/fetch.ts`) passando i tag del tipo di documento, mai `client.fetch` diretto nelle pagine: i tag alimentano la revalidation on-demand del webhook.
MUST usare `next/image` con `alt` su ogni immagine.
MUST esportare `metadata` (o `generateMetadata`) su ogni pagina; `viewport` vive nel root layout (`app/[locale]/layout.tsx`), override per pagina solo se serve.
MUST avere un solo `<h1>` per pagina.
MUST usare `localeString`/`localeText` per ogni testo editabile (italiano + inglese) negli schemi Sanity.
MUST chiamare `notFound()` quando un documento Sanity è null.
MUST aggiungere `loading.tsx`, `error.tsx`, `not-found.tsx` a ogni route dinamica con dati.
MUST aggiungere le nuove env var a `.env.local`, `.env.example` e a Vercel (`vercel env add`).

MUST NOT committare `.env.local`.
MUST NOT nominare i clienti in PLAN.md, skill, commit, PR o issue: solo lo slug del caso o una descrizione generica (il repo è pubblico e i casi sono anonimi; i nomi restano in `flylabs-brain`).
MUST NOT usare `any` senza un commento `// TODO: type this`.
MUST NOT installare pacchetti senza dirlo nel commit / PR description.
MUST NOT scrivere a mano le interfacce TypeScript dei documenti Sanity quando lo schema cresce, usare `npx sanity@latest typegen generate`.

---

## Stack

- Push su `main` = deploy in produzione su Vercel.
- ISR: `export const revalidate = 3600` di default sulle pagine con dati Sanity.
- `npm run build` prima di aprire una PR. Studio embedded su `/studio`. Env var documentate in `.env.example`.
- `/` è gestita da `proxy.ts` (redirect per lingua del browser). Header di sicurezza e CSP (Report-Only per gli script) in `next.config.ts`: se aggiungi uno script o un servizio di terze parti, aggiorna l'allowlist e la cookie policy.

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

**Quando una modifica tocca il content model**, segui la skill `cms-change`: contiene le regole di qualità degli schemi e la procedura per le modifiche distruttive (rinominare/rimuovere campi o tipi: migra PRIMA i documenti esistenti, poi cambia lo schema).

**Modifiche ai contenuti da agente**: via MCP Sanity (servono le allow rule per patch/publish/create nel proprio `.claude/settings.local.json`, vedi PLAN.md → Decisioni): patch (crea il draft) → query di controllo sul draft → publish. Se tocchi un `caseStudy`, aggiorna anche il suo JSON in `content/case-studies/`, altrimenti un reimport riporta il testo vecchio.

**Pubblicazione**: il webhook (`/api/revalidate`) propaga il Publish dello Studio al sito in pochi secondi. Se qualcosa "non si vede online", il primo posto da controllare è Sanity → API → Webhooks → attempts log, non la cache del browser.
