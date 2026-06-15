# flylabs-website

Sito di Flylabs (AI agency). Next.js 16 + Sanity CMS, hosting su Vercel. Due lingue: italiano (default) e inglese.

## Setup

```bash
npm install
cp .env.example .env.local   # oppure: vercel env pull .env.local
npm run dev
```

- Sito: http://localhost:3000 (rotte per lingua: `/it`, `/en`)
- Studio Sanity: http://localhost:3000/studio
- Build di verifica: `npm run build`

## Stack

| Cosa | Dove |
|---|---|
| Pagine | `app/[locale]/` |
| Lingue supportate | `lib/i18n.ts` |
| Schemi Sanity | `sanity/schemas/` |
| Query GROQ | `sanity/queries.ts` |
| Config Studio | `sanity.config.ts` |

Deploy: push su `main` produce il deploy in produzione su Vercel, ogni PR ha la sua preview.

Convenzioni complete (branch, PR, regole di codice) in [CLAUDE.md](CLAUDE.md).
