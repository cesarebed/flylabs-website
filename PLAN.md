# PLAN.md — Roadmap e task in corso

Documento vivo per coordinare il lavoro tra **Cesare** e **Federico** (e i rispettivi agenti).
Regole d'uso in fondo al file. Ultimo aggiornamento: 2026-07-19 (Federico — sessione autonoma: carosello a una card per pagina su mobile, wording Close Tattoo "l'artista" → "lo studio" (testi + diagramma), diagramma bici ridisegnato hub-and-spoke (3 siti → 1 assistente → 4 canali)).

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
| 5 | **Chatbot AI sul sito**, formato sul materiale del sito (richiesta Federico 2026-07-18) | Federico | PR #34 | ✅ mergiata e LIVE: **embed del GPT Chatbot SaaS** di Federico (opzione A). Chatbot provisionato via API `gptchatbot_api` (UUID `30d345be…`, agente bilingue IT/EN, 9 pagine di flylabs.ai come sorgenti RAG). Widget via `next/script` in `app/[locale]/layout.tsx`. Dominio autorizzato in dashboard da Federico |
| 6 | **Carosello dei casi di successo in home** + rewording (richiesta Federico 2026-07-18) | Federico | PR #37 | ✅ mergiata e LIVE. Fix successivi in PR #38 (autoplay + contatore a intervallo) |
| 7 | **Arricchimento contenuti**: +6 FAQ, +3 card "Cosa costruiamo", offerta con tempi/incluso + pagina `/servizi` (richiesta Federico 2026-07-18) | Federico | PR #38 | ✅ mergiata e LIVE. Fix carosello (autoplay/hover/contatore) inclusi nella stessa PR; lampeggio SSR del contatore fixato in PR #40 |
| 8 | **Rifiniture carosello + wording + diagramma bici** (richiesta Federico 2026-07-19): card intera su mobile (niente peek tagliato), "l'artista" → "lo studio" nel caso Close Tattoo (testi + diagramma), diagramma bici ridisegnato hub-and-spoke (3 siti → 1 assistente → 4 canali) | Federico | PR #41 | 🔨 |

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
- ~~**Homepage "piena" (3/3 card featured)**~~ **superata dal carosello (2026-07-18)**: la sezione home non ha più il tetto di 3. `FEATURED_CASE_STUDIES_QUERY` restituisce **tutti** i casi `featured` (dal più recente) e il carosello li fa scorrere. Il flag `featured` resta la leva editoriale su Studio: si aggiunge/toglie un caso dalla home senza toccare il codice. Oggi sono in evidenza tutti e 5.
- **Sezione home = carosello dei casi di successo (2026-07-18, richiesta di Federico)**: scorrimento automatico lento (5s, in pausa su hover/focus, disattivato con `prefers-reduced-motion`), frecce e contatore `01 / 05` che dicono quanti casi esistono davvero, card successiva intravista ("peek"). **Il movimento è una `transform` sul track, non uno scroll del container**: con `scroll-snap` + `scroll-behavior: smooth` + lo `zoom: 1.15` del layout lo scroll programmatico veniva ignorato (verificato: lo scroll manuale funzionava, `scrollTo`/`scrollLeft` no). Chi tocca `components/landing/work-carousel.tsx` non torni allo scroll nativo senza rifare quella verifica.
- **Contenuti arricchiti (2026-07-18)**: FAQ da 3 a 9 (tempi, errori dell'AI, integrazioni, scelta del modello, dati, cosa serve dal cliente), "Cosa costruiamo" da 5 a 8 card (ricerca nei documenti, report, recensioni), e i tre binari dell'offerta ora dichiarano **tempi e cosa è incluso** in home. Nuova pagina **`/servizi`** con il deep dive (per chi è, cosa è incluso, come funziona passo per passo), linkata dalla sezione offerta e in sitemap. I contenuti dei binari restano in `offer.tracks`: la pagina li riusa, non li duplica.
- **Vercel può saltare il deploy di produzione su un merge** (visto il 2026-07-18 sul merge della PR #38): la preview del branch viene costruita, ma per il commit di merge non nasce alcun deployment `Production` e lo status del commit resta `pending` **senza nemmeno un contesto Vercel**. Non è un errore di build. Come accorgersene: `gh api "repos/cesarebed/flylabs-website/deployments?environment=Production&per_page=1"` mostra ancora lo sha precedente, e il sito serve i contenuti vecchi. Rimedio: Redeploy dalla dashboard Vercel, oppure un commit successivo su `main` (via PR, mai push diretto) che rilancia la pipeline.
- **La FAQ sui dati è una promessa di processo, non una garanzia tecnica** (2026-07-18): dice che i dati restano nei sistemi del cliente e che prima di partire si dichiara quali servizi tocca il flusso. Se un giorno servisse una claim più forte (es. "nessun training sui tuoi dati"), va verificata sui contratti dei fornitori prima di scriverla.
- **Carosello: card intera per pagina su mobile (2026-07-19)**: sotto il breakpoint `sm` la card è `w-full` invece di `w-[85%]` — col "peek" dell'85% su schermi stretti (~375px) i ~56px della card successiva sembravano un taglio a metà, non un invito a scorrere. Dal breakpoint `sm` in su il peek resta (`sm:w-[46%] lg:w-[31.5%]`), perché lì c'è margine per farlo leggere bene.
- **Close Tattoo: "l'artista" → "lo studio" (2026-07-19)**: wording più professionale e coerente con "lo studio ha più tatuatori" invece di farne intuire uno solo. Cambiato ovunque compare (testi del caso + testo disegnato dentro il PNG del diagramma, non solo CSS/JSX — i testi dei diagrammi sono pixel, vedi skill `excalidraw-diagram`).
- **Diagramma bici ridisegnato hub-and-spoke (2026-07-19)**: da catena verticale a 4 nodi a un layout con 3 box "sito" in alto che confluiscono su un unico box AI, che poi si dirama su 4 box canale (sito, Instagram, Facebook Messenger, WhatsApp Business) prima di riconvergere su risposta ed escalation. Costruito a mano con le primitive base `rect`/`arrow` di `flylabs_excalidraw.py` (non `vchain`, pensata solo per una colonna a un nodo per riga).
- **Re-import di un diagramma già pubblicato non basta a far ricaricare l'immagine**: l'importer (`import-case-studies.mjs`) è idempotente sull'asset per `_key` + lingua — se il documento su Sanity ha già un asset per quella voce lo riusa e NON ricarica il file anche se il PNG locale è cambiato. Per forzare il refresh di un'immagine con contenuto diverso ma stesso nome file, bisogna cambiare la `_key` della voce `diagrams` nel JSON (es. `d1` → `d2`): l'importer non trova corrispondenza nel documento esistente e carica l'asset nuovo. L'asset vecchio resta nella media library di Sanity come orfano (innocuo, non referenziato).
- **Rewording della sezione (2026-07-18)**: kicker `Lavori` → `Casi di successo`, titolo `Alcune delle nostre soluzioni` → **"Clienti veri, risultati misurati"**, più un deck che dichiara che sono progetti in produzione per clienti veri. Sulle card i badge sono limitati a 5 + chip `+N` (con 10-12 tecnologie occupavano più spazio del contenuto); la lista completa resta sulla pagina di dettaglio.
- **`metric.value` → `localeString` (2026-07-16)**: il valore della metrica era `string` "uguale in tutte le lingue", ma "1 sessione" (caso creative-ads) restava in italiano su /en. Ora anche il valore è bilingue; il frontend tollera entrambe le forme (`pickLocaleLoose`) così il deploy è sicuro PRIMA della migrazione dei documenti. Migrazione = re-import dei JSON (`import-case-studies.mjs`) DOPO il deploy, mai prima (il codice vecchio in prod renderebbe oggetti).
- **`/lavori` raggiungibile dalla home (issue #13, 2026-07-16)**: la voce nav resta l'ancora `#lavori` (è una landing one-page); in fondo alla sezione c'è "Tutti i lavori →" verso `/[locale]/lavori`, mostrato solo quando le card vengono dai casi reali su Sanity (col fallback hardcoded la pagina archivio sarebbe fuorviante). Una voce nav dedicata resta un'opzione futura se i casi crescono.
- **Email pubblica di contatto = `info@flylabs.ai`** (2026-07-17, deciso da Federico in sessione): vive in `siteSettings.contactEmail` (campo introdotto dalla PR #27) e alimenta il link "Email" del footer come mailto. La **pagina LinkedIn aziendale non esiste ancora**: il link resta nascosto finché non c'è; quando esisterà, URL in Studio → Impostazioni sito → Profili social (finisce anche nel `sameAs` del JSON-LD).
- **Preview Vercel rossi per TUTTE le PR (scoperto 2026-07-17)**: ogni preview deployment dalla PR #3 alla #27 è `failure` indipendentemente dall'autore (anche le PR di Cesare #19/#20), mentre i deploy di produzione da `main` sono sempre verdi. Causa più probabile: env var non abilitate per l'ambiente **Preview** del progetto Vercel (es. `NEXT_PUBLIC_SANITY_PROJECT_ID`/`SANITY_API_READ_TOKEN` spuntate solo su Production; i log dei deployment sono leggibili solo dall'account Vercel di Cesare, che deve verificare: Settings → Environment Variables → abilitare Preview). Finché non è sistemato, il gate di merge è **`npm run build` locale verde + verifica del deploy di produzione post-merge**; la regola "preview verde prima del merge" è sospesa perché oggi impossibile da soddisfare.

## Task aperti (fuori roadmap)

- [x] Use case **noleggio bici multi-sito** (ex "bike rental Tucson"): scheda anonimizzata `content/case-studies/assistenti-noleggio-multisito.json` (PR #35, metriche 100+ msg/giorno e 3 siti). Ricerca da email nel vault `sbf` (`clients/bike-tucson/`), NON in flylabs-brain (lavoro solo di Federico via GPT Chatbot SaaS). `featured: false` (non tocca la home 3/3): flippare in Studio se lo si vuole in evidenza
- [x] Use case **Close Tattoo** (form sito → WhatsApp promo casuale → chatbot WhatsApp): scheda anonimizzata `content/case-studies/form-whatsapp-promo-conversione.json` (PR #35, metriche 2x riscatto promo, 3 lingue). Ricostruito dal chatbot "Mario" su gptchatbot.it + descrizione di Federico; nota in `sbf` (`clients/close-tattoo.md`). `featured: false`. > TODO Federico: confermare tool outbound (Make/Brevo?) per il badge, e ri-condividere il `_chat.txt` (non era su disco) se servono più dettagli
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
