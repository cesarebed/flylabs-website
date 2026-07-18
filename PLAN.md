# PLAN.md — Roadmap e task in corso

Documento vivo per coordinare il lavoro tra **Cesare** e **Federico** (e i rispettivi agenti).
Regole d'uso in fondo al file. Ultimo aggiornamento: 2026-07-18 (Federico — sessione autonoma: footer CMS mergiato e live (PR #29, riprende la #27), Fase 4b typegen (PR #30), badge uniformati Claude Code+MCP (PR #31), Rich Results Test eseguito e nit fixato (PR #32). Nuovo fronte: chatbot AI sul sito + 2 nuovi use case, vedi righe 5 e task aperti).

---

## Stato del sito

- Live su https://www.flylabs.ai (Vercel, deploy da `main`)
- Landing v1 + `/stack` + privacy + form contatti (Sanity + Resend) — fatto da Cesare
- Su Sanity oggi: `siteSettings`, `page`, `contactSubmission`, `caseStudy`
- Contenuti landing ancora hardcoded in `lib/landing-content.ts` (temporaneo, per iterare sul design)

## Roadmap

| Fase | Cosa | Owner | Branch/PR | Stato |
|---|---|---|---|---|
| 0 | Accesso Sanity per Federico (progetto `hjdsajnv`) | Cesare | — | ✅ |
| 0 | Team Vercel: **non fattibile** (piano Hobby personale, niente membri). Vedi decisione sotto | — | — | ❌ chiuso |
| 0 | MCP Sanity per Claude Code: connesso e autenticato | Federico | — | ✅ |
| 0 | `npx sanity login` sulla macchina di Federico (serve solo ai seed script via CLI; opzionale ora che c'è l'MCP) | Federico | — | ⏳ opzionale |
| 1 | Migrare contenuti landing da `lib/landing-content.ts` a Sanity (quando il design è bloccato) + metriche reali al posto dei placeholder | Cesare | — | ⏳ in attesa design |
| 2 | Casi di successo: tipo `caseStudy`, route `/[locale]/lavori`, seed script | Federico | PR #3 | ✅ mergiata (+ fix da review: read token, remotePatterns) |
| 2b | Homepage "Alcune delle nostre soluzioni" da Sanity (metriche 1-2, badge tech con logo, `featured`, diagrammi bilingui IT/EN) + use case Isola dei Gabbiani | Federico | PR #17 | ✅ mergiata e LIVE (2026-07-15, contenuto importato su Sanity) |
| 2c | Use case Solair (issue #12): **pratiche RPA/connessione** + **creative ads loop** (Meta Ads), entrambi bilingui con diagramma (skill `excalidraw-diagram`, usata da Cesare da solo) | Cesare | PR #19, #20 | ✅ mergiate e LIVE |
| 3 | Blog: tipo `post` (Portable Text bilingue), `/[locale]/blog` + `[slug]`, RSS | Federico | — | ⏳ da fare |
| 4 | SEO tecnica: `robots.ts`, `sitemap.ts` (hreflang it/en, slug da Sanity), JSON-LD (Organization, BreadcrumbList, Article sui casi) | Federico | PR #24 | ✅ mergiata e LIVE (2026-07-16, issue #7+#16). Rich Results Test eseguito il 2026-07-18 sull'URL pubblico: **Article + Breadcrumb validi e idonei**; unico nit facoltativo (datePublished senza fuso) fixato in PR #32 |
| 4b | Typegen come fonte unica dei tipi (via `any`/interfacce a mano residue) | Federico | PR #30 | ✅ mergiata (2026-07-17: `SiteSettings` ora deriva da `SITE_SETTINGS_QUERY_RESULT`, nuovo `npm run typegen`, `SANITY_API_WRITE_TOKEN` documentato in `.env.example`) |
| 5 | **Chatbot AI sul sito**, formato su tutto il materiale del sito (richiesta Federico 2026-07-18) — riporta in vita il teaser rimosso con la #14 | Federico | — | 🔨 in decisione: embed del GPT Chatbot SaaS di Federico vs build nativa (Claude + AI SDK); proposta e domande in chat |

## Decisioni prese

- **Contenuti su Sanity, codice su GitHub**: testi/post/casi studio/FAQ editabili dallo Studio; layout, comportamento e schemi nel repo.
- **La landing non si tocca finché la Fase 2 non ha contenuti reali**: le card "Lavori" restano hardcoded; passeranno a riferimenti `caseStudy` solo dopo il seed dei dati veri.
- Ordine fasi 2 → 3: per un'agency i casi studio convertono più del blog.
- **Vercel su piano Hobby di Cesare**: la repo è **pubblica** (dal 2026-07), quindi il vincolo "Git author must have access" non blocca i deploy di produzione, che funzionano per commit di chiunque. I **preview delle PR invece falliscono per tutti** (vedi decisione 2026-07-17 più sotto). **Sia Cesare che Federico possono fare merge** (regola aggiornata 2026-07-04 su decisione di Federico; se la repo tornasse privata, torna valida la vecchia regola "solo Cesare fa merge" col workaround del commit vuoto).
- **Read token Sanity per il sito**: il dataset `production` limita la lettura pubblica ad alcuni tipi (es. `caseStudy` NON è leggibile senza auth, mentre `siteSettings` sì), quindi il client server-side (`sanity/client.ts`) legge con un **read token** (`SANITY_API_READ_TOKEN`, su Vercel prod) e `perspective: "published"`. Emerso dalla code review della PR #3.
- **`/lavori` in produzione parte VUOTA**: i 3 casi seedati da `feat/case-study` avevano metriche placeholder → cancellati per non pubblicare numeri finti sul dominio live; la route non è ancora linkata in nav. Va seedato con dati REALI e poi linkato.
- **Sezione homepage "Alcune delle nostre soluzioni" (weekly 2026-07-14)**: 2-3 card di use case REALI da Sanity (tag settore, breve descrizione, 1-2 metriche, badge tecnologie) → pagina dettaglio con diagramma Excalidraw + testo esteso + stack. Primi due use case: Isola dei Gabbiani (Federico) e progetto di Cesare (Meta Ads optimizer + Zoho→Enel, issue #12). Finché non ci sono casi `featured` su Sanity, la home mostra le card hardcoded di prima (fallback).
- **Modello metrica → `metrics` (1-2 voci)**: la card mostra 1 o 2 numeri reali (decisione call: "una o due metriche"); sostituiti i campi `metric`/`metricLabel` senza migrazione perché in produzione non esisteva alcun documento `caseStudy`.
- **Brand formalizzato nel vault** (2026-07-14): palette UI, tipografia e voce documentate in `flylabs-brain/03_Resources/materials/brand/` (`ui-style.md`, `voce.md`, `tipografia.md`); palette UI del sito e palette diagrammi restano volutamente separate. Fonte di verità tecnica: `app/globals.css`.
- **Generatore diagrammi condiviso, non più nel vault personale di Federico** (2026-07-15): modulo Python in `flylabs-brain/03_Resources/materials/brand/diagrams/flylabs_excalidraw.py` + skill Claude Code `excalidraw-diagram` in questo repo per l'export bilingue PNG. Confermato funzionante da entrambi: Cesare l'ha già usata in autonomia per i suoi 2 use case.
- **Homepage "piena" (3/3 card featured)**: la query prende i 3 più recenti; un 4° caso `featured` fa uscire il più vecchio dalla home (resta comunque su `/lavori`). Se si vuole un carosello o più di 3 card, è una modifica di prodotto da decidere insieme, non implicita.
- **`metric.value` → `localeString` (2026-07-16)**: il valore della metrica era `string` "uguale in tutte le lingue", ma "1 sessione" (caso creative-ads) restava in italiano su /en. Ora anche il valore è bilingue; il frontend tollera entrambe le forme (`pickLocaleLoose`) così il deploy è sicuro PRIMA della migrazione dei documenti. Migrazione = re-import dei JSON (`import-case-studies.mjs`) DOPO il deploy, mai prima (il codice vecchio in prod renderebbe oggetti).
- **`/lavori` raggiungibile dalla home (issue #13, 2026-07-16)**: la voce nav resta l'ancora `#lavori` (è una landing one-page); in fondo alla sezione c'è "Tutti i lavori →" verso `/[locale]/lavori`, mostrato solo quando le card vengono dai casi reali su Sanity (col fallback hardcoded la pagina archivio sarebbe fuorviante). Una voce nav dedicata resta un'opzione futura se i casi crescono.
- **Email pubblica di contatto = `info@flylabs.ai`** (2026-07-17, deciso da Federico in sessione): vive in `siteSettings.contactEmail` (campo introdotto dalla PR #27) e alimenta il link "Email" del footer come mailto. La **pagina LinkedIn aziendale non esiste ancora**: il link resta nascosto finché non c'è; quando esisterà, URL in Studio → Impostazioni sito → Profili social (finisce anche nel `sameAs` del JSON-LD).
- **Preview Vercel rossi per TUTTE le PR (scoperto 2026-07-17)**: ogni preview deployment dalla PR #3 alla #27 è `failure` indipendentemente dall'autore (anche le PR di Cesare #19/#20), mentre i deploy di produzione da `main` sono sempre verdi. Causa più probabile: env var non abilitate per l'ambiente **Preview** del progetto Vercel (es. `NEXT_PUBLIC_SANITY_PROJECT_ID`/`SANITY_API_READ_TOKEN` spuntate solo su Production; i log dei deployment sono leggibili solo dall'account Vercel di Cesare, che deve verificare: Settings → Environment Variables → abilitare Preview). Finché non è sistemato, il gate di merge è **`npm run build` locale verde + verifica del deploy di produzione post-merge**; la regola "preview verde prima del merge" è sospesa perché oggi impossibile da soddisfare.

## Task aperti (fuori roadmap)

- [ ] Use case **bike rental Tucson** (RAG chatbot su 3 siti + Instagram/Messenger/WhatsApp, escalation a umano): nota skeleton creata nel brain (`01_Projects/bike-rental-tucson-chatbot/`) il 2026-07-18; in attesa da Federico di metriche reali, stack e anonimizzazione, poi skill `use-case-publish`
- [ ] Use case **Close Tattoo** (form sito → WhatsApp outbound con promo casuale → chatbot su WhatsApp): nota skeleton creata nel brain (`01_Projects/close-tattoo-whatsapp-promo/`) il 2026-07-18; stessi buchi da riempire, poi skill `use-case-publish`
- [ ] **Vercel: env var mancanti sull'ambiente Preview** (causa più probabile dei preview rossi su tutte le PR) — solo Cesare può verificare/sistemare dal suo account: Settings → Environment Variables → abilitare Preview
- [x] Sostituire i numeri placeholder delle work card con dati reali dei clienti → fatto: 3 casi `featured` reali su Sanity, le card hardcoded non compaiono più
- [x] Seedare i `caseStudy` con dati REALI: 3/3 use case importati e LIVE (2026-07-15). Link `/lavori` dalla home: fatto il 2026-07-16 (issue #13, vedi Decisioni)
- [x] Issue #14 (teaser chatbot con CTA morta in home): teaser rimosso il 2026-07-16 come proposto nella issue — si riaggiunge quando il widget esiste davvero
- [x] (nit review PR #3) ordinamento Studio/sito allineato: `date` ora required con initialValue = oggi (Federico, `fix/case-study-date-ordering`) + `SANITY_API_READ_TOKEN` documentato in `.env.example` e CLAUDE.md
- [x] Badge tech uniformati (2026-07-17, richiesta di Federico): "Claude" → "Claude Code" e aggiunto "MCP" al caso struttura ricettiva; testi delle 3 card verificati già allineati (stile, lunghezze, terminologia "AI", formato metriche)
- [x] Issue #5 + #6 (hardening form contatti): escape HTML nella mail, limiti lunghezza, allowlist locale, rate limit 3/10min per email o hash IP (Federico, `fix/contact-hardening`)
- [x] Footer: link "LinkedIn"/"Email" morti (`href="#"`) → campi `socialLinks` + `contactEmail` su `siteSettings`; il footer nasconde i link senza valore, gli URL social alimentano il `sameAs` del JSON-LD Organization (Federico, `feat/footer-social-links`, PR #27 riaperta e mergiata il 2026-07-17). Email `info@flylabs.ai` da valorizzare su Sanity (`scripts/` con write token, oppure Studio → Impostazioni sito → Publish); LinkedIn nascosto finché la pagina aziendale non esiste

## Tooling / skill

Indice completo in `.claude/skills/README.md`. Le due rilevanti per i case study:
- **`use-case-publish`**: genera use case ANONIMIZZATI da flylabs-brain → aggiorna la nota nel brain + crea `content/case-studies/<slug>.json` pronto per Sanity, con importer dedicato. Regola d'oro: niente metriche inventate.
- **`excalidraw-diagram`** (nuova, 2026-07-15, PR #18): disegno (Obsidian a mano o script Python condiviso in `flylabs-brain/03_Resources/materials/brand/diagrams/`) + export bilingue IT/EN in PNG, pronto per il campo `diagrams` di `use-case-publish`. Testata da entrambi.

---

## Regole d'uso di questo file

1. **Prima di iniziare un lavoro**: controlla che nessuno (persona o agente) abbia la stessa fase/area "in corso"; poi segna la riga con il tuo nome, il branch e lo stato 🔨.
2. **Quando apri la PR**: linka la PR nella riga. **Quando è mergiata**: stato ✅.
3. Le **decisioni di architettura o prodotto** prese in chat/call vanno aggiunte a "Decisioni prese", una riga ciascuna.
4. Aggiorna la data e il nome in testa al file a ogni modifica.
5. Il file si aggiorna **nella stessa PR del lavoro** quando possibile, altrimenti direttamente su `main` è tollerato (è solo documentazione).
