---
name: visual-check
description: Verifica visivamente una modifica UI con Playwright — avvia il dev server, naviga le pagine toccate, fa screenshot e controlla la console. Da usare dopo OGNI modifica visiva, prima di dichiararla finita.
---

# Visual check con Playwright

1. Assicurati che il dev server giri: `npm run dev` (background). Se è già attivo su :3000, riusalo.
2. Con i tool MCP Playwright (`browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_console_messages`):
   - Naviga ogni pagina toccata dalla modifica, in entrambe le lingue se rilevante (`/it/...` e `/en/...`).
   - Fai uno screenshot per pagina (desktop 1280×800; aggiungi mobile 390×844 con `browser_resize` se la modifica riguarda il layout).
   - Se la modifica tocca scroll-reveal, sezioni lunghe o il form, prova anche i viewport "bassi" dei telefoni reali con le barre del browser visibili: **375×548, 390×664 e 320×640**. A 390×844 certi bug non si vedono (es. il reveal di gruppo che lasciava "Cosa costruiamo" a opacity 0): scrolla tutta la pagina e controlla che ogni card sia visibile.
   - Per contenuti che devono esserci sempre (form contatti, card), fai anche un giro con JS disattivato (`javaScriptEnabled: false` in Playwright): niente deve restare a opacity 0.
   - Leggi i messaggi di console: zero errori attesi. Hydration warning = bug da sistemare.
3. Confronta lo screenshot con l'intento della modifica. Se qualcosa è storto, sistemalo e ripeti.
4. Per modifiche allo Studio o agli schemi Sanity, verifica anche http://localhost:3000/studio (lo Studio carica, lo schema appare, niente errori in console).
