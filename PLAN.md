# PLAN.md — Roadmap e task in corso

Documento vivo per coordinare il lavoro tra **Cesare** e **Federico** (e i rispettivi agenti).
Regole d'uso in fondo al file. Ultimo aggiornamento: 2026-07-14 (Federico — sezione "soluzioni" homepage + use case Isola dei Gabbiani, issue #11-#16).

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
| 2b | Homepage "Alcune delle nostre soluzioni" da Sanity (metriche 1-2, badge tech, `featured`, diagrammi) + use case Isola dei Gabbiani (issue #11) | Federico | `feat/soluzioni-home` | 🔨 in corso |
| 2c | Use case Meta Ads optimizer + Zoho CRM → form Enel (issue #12) | Cesare | — | ⏳ da fare |
| 3 | Blog: tipo `post` (Portable Text bilingue), `/[locale]/blog` + `[slug]`, RSS | Federico | — | ⏳ da fare |
| 4 | SEO tecnica: sitemap dinamica, robots, JSON-LD, typegen come fonte unica dei tipi | — | — | ⏳ da fare |

## Decisioni prese

- **Contenuti su Sanity, codice su GitHub**: testi/post/casi studio/FAQ editabili dallo Studio; layout, comportamento e schemi nel repo.
- **La landing non si tocca finché la Fase 2 non ha contenuti reali**: le card "Lavori" restano hardcoded; passeranno a riferimenti `caseStudy` solo dopo il seed dei dati veri.
- Ordine fasi 2 → 3: per un'agency i casi studio convertono più del blog.
- **Vercel su piano Hobby di Cesare**: la repo è **pubblica** (dal 2026-07), quindi il vincolo "Git author must have access" non si applica più: preview e deploy di produzione funzionano per commit di chiunque. **Sia Cesare che Federico possono fare merge** (regola aggiornata 2026-07-04 su decisione di Federico; se la repo tornasse privata, torna valida la vecchia regola "solo Cesare fa merge" col workaround del commit vuoto).
- **Read token Sanity per il sito**: il dataset `production` limita la lettura pubblica ad alcuni tipi (es. `caseStudy` NON è leggibile senza auth, mentre `siteSettings` sì), quindi il client server-side (`sanity/client.ts`) legge con un **read token** (`SANITY_API_READ_TOKEN`, su Vercel prod) e `perspective: "published"`. Emerso dalla code review della PR #3.
- **`/lavori` in produzione parte VUOTA**: i 3 casi seedati da `feat/case-study` avevano metriche placeholder → cancellati per non pubblicare numeri finti sul dominio live; la route non è ancora linkata in nav. Va seedato con dati REALI e poi linkato.
- **Sezione homepage "Alcune delle nostre soluzioni" (weekly 2026-07-14)**: 2-3 card di use case REALI da Sanity (tag settore, breve descrizione, 1-2 metriche, badge tecnologie) → pagina dettaglio con diagramma Excalidraw + testo esteso + stack. Primi due use case: Isola dei Gabbiani (Federico) e progetto di Cesare (Meta Ads optimizer + Zoho→Enel, issue #12). Finché non ci sono casi `featured` su Sanity, la home mostra le card hardcoded di prima (fallback).
- **Modello metrica → `metrics` (1-2 voci)**: la card mostra 1 o 2 numeri reali (decisione call: "una o due metriche"); sostituiti i campi `metric`/`metricLabel` senza migrazione perché in produzione non esisteva alcun documento `caseStudy`.
- **Brand formalizzato nel vault** (2026-07-14): palette UI, tipografia e voce documentate in `flylabs-brain/03_Resources/materials/brand/` (`ui-style.md`, `voce.md`, `tipografia.md`); palette UI del sito e palette diagrammi restano volutamente separate. Fonte di verità tecnica: `app/globals.css`.

## Task aperti (fuori roadmap)

- [ ] Sostituire i numeri placeholder delle work card con dati reali dei clienti → superato da Fase 2b: quando i casi `featured` sono su Sanity, le card hardcoded spariscono da sole (fallback)
- [ ] Seedare i `caseStudy` con dati REALI: JSON Isola dei Gabbiani pronto in `content/case-studies/` con asset diagrammi; **manca solo l'import** (`node .claude/skills/use-case-publish/scripts/import-case-studies.mjs`, serve `SANITY_API_WRITE_TOKEN` in `.env.local` — il classifier di Claude Code blocca la creazione autonoma di token di scrittura). Poi decidere il link `/lavori` in nav (issue #13)
- [x] (nit review PR #3) ordinamento Studio/sito allineato: `date` ora required con initialValue = oggi (Federico, `fix/case-study-date-ordering`) + `SANITY_API_READ_TOKEN` documentato in `.env.example` e CLAUDE.md
- [x] Issue #5 + #6 (hardening form contatti): escape HTML nella mail, limiti lunghezza, allowlist locale, rate limit 3/10min per email o hash IP (Federico, `fix/contact-hardening`)

## Tooling / skill

- Skill **`use-case-publish`** (`.claude/skills/use-case-publish/`): genera use case ANONIMIZZATI da flylabs-brain → aggiorna la nota nel brain + crea `content/case-studies/<slug>.json` pronto per Sanity, con importer dedicato. Regola d'oro: niente metriche inventate. Branch `feat/skill-use-case` (Claude/Cesare). Disponibile a Federico via git dopo il merge.

---

## Regole d'uso di questo file

1. **Prima di iniziare un lavoro**: controlla che nessuno (persona o agente) abbia la stessa fase/area "in corso"; poi segna la riga con il tuo nome, il branch e lo stato 🔨.
2. **Quando apri la PR**: linka la PR nella riga. **Quando è mergiata**: stato ✅.
3. Le **decisioni di architettura o prodotto** prese in chat/call vanno aggiunte a "Decisioni prese", una riga ciascuna.
4. Aggiorna la data e il nome in testa al file a ogni modifica.
5. Il file si aggiorna **nella stessa PR del lavoro** quando possibile, altrimenti direttamente su `main` è tollerato (è solo documentazione).
