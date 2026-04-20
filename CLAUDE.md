# CLAUDE.md

## Project overview
This project is **The Merch Maverick**, a factory-direct B2B merchandise platform that combines a public marketing site, instant quote flow, client portal, and internal admin CRM for custom apparel, uniforms, and branded goods.
It is currently in **early production / MVP** stage.

## Session handoff rule — STRICT
When the user says **"next session"** or **"let's continue next session"** or any clear end-of-session signal:
1. You MUST update `docs/HANDOFF.md` to reflect the current implementation state, what was completed, known risks, and where to resume.
2. You MUST update `docs/OPEN_TASKS.md` to move completed items and reorder priorities based on what was done.
3. Do this automatically — do not wait to be asked. Do it before saying goodbye.

## Goal of current phase
The current goal is to continue implementation from the latest repo state without redesigning the product direction unless explicitly requested.

## Source of truth
- Primary repo: Git repository for this project
- Deployment: Vercel
- Backend/data: Supabase
- The codebase and docs in this repository are the source of truth
- Do not rely on old local folders unless explicitly asked

## Working rules
- Always inspect the current code before proposing structural changes
- Prefer incremental improvements over large rewrites
- Preserve working functionality
- Do not expose or hardcode secrets
- Ask for approval before destructive changes, dependency churn, schema resets, or production-impacting actions
- Prefer documenting assumptions inside [docs/HANDOFF.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/HANDOFF.md) or [docs/OPEN_TASKS.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/OPEN_TASKS.md)

## Tech stack
- Frontend: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- Backend: Next.js route handlers, Supabase Auth, Supabase Postgres, Supabase Storage
- Deployment: Vercel
- Database/Auth: Supabase
- Other tools: Anthropic SDK, Framer Motion, Lucide, Radix UI, next-themes

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start production build locally: `npm run start`
- Lint: `npm run lint`
- Test: No automated test script is configured in `package.json`

## Current implementation status
- Completed:
  - Public marketing site and solution pages
  - Email/password + Google-ready Supabase auth flow
  - Client portal shell, dashboard, quotes, orders, assets, account
  - Internal admin CRM pages and mutation APIs behind env gating
  - Supabase schema for profiles, catalog, quotes, orders, events, assets, approvals
  - Vercel deployment wiring
- In progress:
  - Copy and workflow polish across portal/admin/catalog
  - Replacing mock/fallback assumptions with fuller real data coverage
  - Hardening internal/admin operations
- Not started or incomplete:
  - Automated tests
  - Real payment processing
  - Transactional email flows
  - Production-grade notifications and audit tooling

## Product / UX direction
- Maintain the current premium B2B / concierge design language unless explicitly told otherwise
- Prioritize clean UI, responsive layout, and production-feasible flows
- Avoid unnecessary redesigns

## Integration notes
- Vercel env vars are managed outside the repo
- Supabase credentials must remain in environment variables / project secrets
- Do not commit secret keys
- Review [docs/ENVIRONMENT.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ENVIRONMENT.md) before changing integration logic

## Resume priority
When starting work, first:
1. Read [docs/HANDOFF.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/HANDOFF.md)
2. Read [docs/ARCHITECTURE.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/ARCHITECTURE.md)
3. Read [docs/OPEN_TASKS.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/docs/OPEN_TASKS.md)
4. Inspect `package.json`, `src/app`, and `src/lib`
5. Validate whether the app runs locally before coding

## Output expectations
When making changes:
- explain what changed
- mention impacted files
- call out risks
- keep documentation updated if architecture or setup changes
