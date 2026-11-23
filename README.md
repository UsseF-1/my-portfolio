# Youssef Ahmed — DevOps portfolio

Next.js (App Router) + TypeScript (strict) + Tailwind, static export.

## Run / build

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck
npm run build      # static site in ./out
npx serve out      # preview the export
```

All content lives in typed files under `data/`. Unknown values are visible TODOs and print a build warning.

## Deploy

CI (`.github/workflows/ci.yml`) runs install, lint, typecheck, build and Lighthouse CI (>= 0.95 per category), then deploys to Vercel on pushes to `main`.
Add repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Disable Vercel's own Git auto-deploy to avoid double deploys.

## Still to provide

- `public/images/youssef.jpg` (about 4:5) and `public/cv/youssef-ahmed-devops-resume.pdf`
- `repo` in `data/profile.ts` (footer badge and link)
- `[PROOF]` URLs in `data/achievements.ts`
- Replace the draft diagrams in `public/diagrams/` if you have real ones
