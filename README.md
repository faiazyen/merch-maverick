# The Merch Maverick

Factory-direct B2B custom merchandise platform built with Next.js, Supabase, and Vercel.

## What this repo contains
- public marketing website
- authenticated client portal
- internal admin CRM
- Supabase schema and integration code

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

There is currently no automated `test` script in `package.json`.

## Required environment
At minimum, the app expects:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Additional server-side features require:

- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `ENABLE_INTERNAL_ROUTES`
- `INTERNAL_ADMIN_EMAILS`

Read [docs/ENVIRONMENT.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ENVIRONMENT.md) before running or deploying the app.

## Project docs
- [CLAUDE.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/CLAUDE.md)
- [docs/HANDOFF.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/HANDOFF.md)
- [docs/ARCHITECTURE.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ARCHITECTURE.md)
- [docs/ENVIRONMENT.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ENVIRONMENT.md)
- [docs/OPEN_TASKS.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/OPEN_TASKS.md)

## Key implementation notes
- The app uses Next.js App Router.
- Client portal and admin views can fall back to mock data if live Supabase data is missing.
- Internal/admin functionality depends on env gating plus an email allowlist.
- The repository currently contains tracked env files that appear to hold secrets; see `docs/ENVIRONMENT.md` and `docs/HANDOFF.md` before doing any production work.

## Deployment
- Hosting: Vercel
- Backend/data: Supabase
- Vercel project linkage is stored in `.vercel/project.json`

## Recommended onboarding sequence for a new coding agent
1. Read [docs/HANDOFF.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/HANDOFF.md)
2. Read [docs/ARCHITECTURE.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ARCHITECTURE.md)
3. Read [docs/ENVIRONMENT.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ENVIRONMENT.md)
4. Read [docs/OPEN_TASKS.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/OPEN_TASKS.md)
5. Run `npm run dev`, `npm run lint`, and `npm run build`
