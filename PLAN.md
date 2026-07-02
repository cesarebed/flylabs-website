# PLAN.md — Roadmap e task in corso

Documento vivo per coordinare il lavoro tra **Cesare** e **Federico** (e i rispettivi agenti).
Regole d'uso in fondo al file. Ultimo aggiornamento: 2026-07-02 (Federico).

---

## Stato del sito

- Live su https://www.flylabs.ai (Vercel, deploy da `main`)
- Landing v1 + `/stack` + privacy + form contatti (Sanity + Resend) — fatto da Cesare
- Su Sanity oggi: `siteSettings`, `page`, `contactSubmission`
- Contenuti landing ancora hardcoded in `lib/landing-content.ts` (temporaneo, per iterare sul design)

## Roadmap

| Fase | Cosa | Owner | Branch/PR | Stato |
|---|---|---|---|---|
| 0 | Accessi: invito Federico al progetto Sanity (`hjdsajnv`) e al team Vercel | Cesare | — | ⏳ da fare |
| 0 | MCP Sanity per Claude Code (`claude mcp add Sanity -t http https://mcp.sanity.io --scope user`) | Federico | — | ⏳ da fare |
| 1 | Migrare contenuti landing da `lib/landing-content.ts` a Sanity (quando il design è bloccato) + metriche reali al posto dei placeholder | Cesare | — | ⏳ in attesa design |
| 2 | Casi di successo: tipo `caseStudy`, route `/[locale]/lavori`, seed script | Federico | `feat/case-study` | 🔨 in corso |
| 3 | Blog: tipo `post` (Portable Text bilingue), `/[locale]/blog` + `[slug]`, RSS | Federico | — | ⏳ da fare |
| 4 | SEO tecnica: sitemap dinamica, robots, JSON-LD, typegen come fonte unica dei tipi | — | — | ⏳ da fare |

## Decisioni prese

- **Contenuti su Sanity, codice su GitHub**: testi/post/casi studio/FAQ editabili dallo Studio; layout, comportamento e schemi nel repo.
- **La landing non si tocca finché la Fase 2 non ha contenuti reali**: le card "Lavori" restano hardcoded; passeranno a riferimenti `caseStudy` solo dopo il seed dei dati veri.
- Ordine fasi 2 → 3: per un'agency i casi studio convertono più del blog.

## Task aperti (fuori roadmap)

- [ ] Sostituire i numeri placeholder delle work card con dati reali dei clienti (Cesare)

---

## Regole d'uso di questo file

1. **Prima di iniziare un lavoro**: controlla che nessuno (persona o agente) abbia la stessa fase/area "in corso"; poi segna la riga con il tuo nome, il branch e lo stato 🔨.
2. **Quando apri la PR**: linka la PR nella riga. **Quando è mergiata**: stato ✅.
3. Le **decisioni di architettura o prodotto** prese in chat/call vanno aggiunte a "Decisioni prese", una riga ciascuna.
4. Aggiorna la data e il nome in testa al file a ogni modifica.
5. Il file si aggiorna **nella stessa PR del lavoro** quando possibile, altrimenti direttamente su `main` è tollerato (è solo documentazione).
