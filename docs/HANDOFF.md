# Handoff

## Product summary
The Merch Maverick is a factory-direct B2B custom merchandise platform focused on Europe and America. The current app combines:

- a public marketing site for lead generation
- an authenticated client portal for quotes, orders, assets, and approvals
- an internal admin CRM for quote review, order conversion, and milestone updates

Current stage: **early production MVP — Sprint 2 fully complete, merged to main, live on Vercel (2026-04-20).**

## What is implemented now
- Public website with home page, vertical/solution pages, pricing, about, contact, sustainability, quote page, and testimonials
- Shared branding/navigation system across marketing pages
- Supabase auth with:
  - email/password sign-up and sign-in
  - password reset flow
  - Google OAuth callback handling (verified — no hardcoded URLs, graceful error redirects, profile upsert on first login)
- Client portal routes:
  - `/portal`
  - `/portal/orders`
  - `/portal/catalogue`
  - `/portal/quotes`
  - `/portal/assets` — upload, preview, download, and **delete** with inline confirmation
  - `/portal/account` — editable profile form (full name, business name, phone, country); email immutable
- Quote submission API with validation and approval record creation
- Asset upload/download/delete API backed by Supabase Storage (`DELETE /api/portal/assets/[assetId]` — ownership check, Storage + DB cleanup)
- Account profile edit API (`PATCH /api/portal/account`) — validates required fields, upserts to `profiles` table, never touches email
- Admin route `/admin` with internal CRM dashboard
- Admin APIs for:
  - updating quote/order/approval records
  - converting quotes into orders (returns Stripe deposit payment URL)
  - appending order events
- Stripe payment loop:
  - 60% deposit Checkout on order conversion
  - Webhook confirms deposit → order status `confirmed`
  - Final balance Checkout auto-generated on `shipped` status
  - Webhook confirms final balance → order status `delivered`
- Supabase schema for profiles, catalog items, quote requests, orders, order events, brand assets, and approvals
- Vercel deployment linkage via `.vercel/project.json`
- Transactional email system via Supabase Edge Function + Database Webhooks + Gmail SMTP
- Portal empty states — all sections show real empty UI when no data exists (mock fallback removed)
- Smoke test suite — 12 Playwright tests covering auth, portal redirects, API auth rejection
- Storage bucket — `portal-assets` confirmed exists and is private (public: false)
- `supabase/functions/` excluded from tsconfig.json to prevent Deno import TS errors in Next.js build

## How the app behaves today
- The public site is mostly static content rendered through App Router pages and component sections.
- Auth is handled through Supabase browser/server clients plus `/auth/callback`.
- The client portal is server-rendered around `getPortalDataBundle()`.
- Real empty states are shown in the portal when no Supabase records exist — mock fallback only remains for catalog items (needed for quote configurator to function).
- The internal CRM uses service-role access when available. If admin access is unavailable, it degrades to user-scoped or fully mock data.
- Transactional emails are sent automatically via the `send-notification-email` Edge Function triggered by Database Webhooks on `quote_requests`, `orders`, and `approvals` tables.
- The public `/quote` page uses a real POST flow — guest submissions persist to Supabase and trigger admin email via Edge Function.

## Sprint 2 — FULLY COMPLETE (2026-04-20)
Both agents done. Merged to `main`. Live on Vercel.

### Agent 1 — DONE
- Asset deletion: `DELETE /api/portal/assets/[assetId]` — auth + ownership check, Storage removal, DB cleanup
- `PortalAssetLibrary` UI — Trash2 icon, inline "Delete? Confirm / Cancel" confirmation, optimistic state removal
- Stripe webhook hardened — `export const runtime = "nodejs"` confirmed, raw body confirmed, both deposit + final-balance branches verified

### Agent 2 — DONE
- Account profile edit form (`ProfileEditForm` component) — editable inputs, disabled email, loading/success/error states
- Account profile PATCH API (`/api/portal/account`) — validates required fields, upserts to `profiles` table, email never touched
- `/portal/account` page updated — static display replaced with live editable form; Onboarding Signals panel preserved
- Google OAuth callback verified — correct code exchange, origin-based redirects, no hardcoded domains, graceful error handling

### Sprint 1 — DONE (prior session)
- Guest quote submission API, Edge Function patch, QuoteTool rewrite, copy fixes, deposit label
- Stripe: checkout, webhook, convert wired; lazy init fixed; env vars documented

## Email system
- Edge Function: `supabase/functions/send-notification-email/index.ts`
- Transport: Gmail SMTP via `denomailer` Deno library
- Secrets set in Supabase: `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- Current sender: `fhmyen@gmail.com` (temporary — replace with business email when ready)
- Webhooks configured on: `quote_requests` (INSERT+UPDATE), `orders` (UPDATE), `approvals` (INSERT+UPDATE)
- Setup reference: `supabase/webhooks.md`

## Important implementation details
- Internal/admin routes are disabled unless `ENABLE_INTERNAL_ROUTES=true`.
- Admin access also depends on the signed-in user email being present in `INTERNAL_ADMIN_EMAILS`.
- Service-role-backed features require `SUPABASE_SERVICE_ROLE_KEY`.
- The portal asset flow assumes a private Supabase Storage bucket named `portal-assets` — confirmed exists and private.
- The AI chat widget calls `/api/chat`, which depends on `ANTHROPIC_API_KEY`.
- `/preview` is gated by the same admin auth as `/admin` (session + email allowlist).
- Smoke tests run via: `npm run test:e2e` (Playwright, 12 tests, chromium only)
- Deno edge functions excluded from Next.js TypeScript checking via `tsconfig.json` exclude

## Removed dependencies
- `resend` — removed from package.json (email handled by Edge Function)

## Partially implemented / placeholder areas
- Quote pricing is a guided benchmark flow, not a complete pricing engine
- Manual surcharges are note-driven and admin-managed, not structured as line items
- Preview tooling exists at `/preview`, gated behind admin auth

## Known issues / risks
- **Guest quote user_id:** Guest quotes have `user_id: null` in `quote_requests` — admin CRM reads contact block from structured notes field
- **Storage:** `portal-assets` Supabase Storage bucket confirmed private — verified 2026-04-20
- **Testing gap:** Smoke tests cover auth and redirects; no end-to-end Stripe payment flow test yet
- **Email sender:** Current Gmail sender `fhmyen@gmail.com` is temporary — swap to business email before public launch
- **Stripe test:** Deposit → webhook → order confirmation flow not yet verified end-to-end with real test cards

## Local development
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Start built app: `npm run start`
- Lint: `npm run lint`
- Smoke tests: `npm run test:e2e`

Expected local URL: http://localhost:3000

## Supabase project
- Project ref: `ypocfxftazwoxqezafal`
- CLI link: `supabase link --project-ref ypocfxftazwoxqezafal`
- Functions dashboard: https://supabase.com/dashboard/project/ypocfxftazwoxqezafal/functions

## Deployment workflow (locked)
- All agent work pushes to `codex/portal-v1-foundation` first
- Vercel generates a preview URL for that branch — review it before going live
- Only merge to `main` when founder explicitly says "deploy"
- Never auto-merge to main as part of a sprint

## Resume from here
Next session pick-up order:

1. Read `docs/OPEN_TASKS.md` for priority order
2. Run `npm run build` + `npm run test:e2e` — confirm still clean
3. Priority 1 (manual): Stripe end-to-end test with test cards (deposit → confirmed → shipped → final balance → delivered)
4. Priority 1 (manual): Google OAuth E2E browser test (see checklist in OPEN_TASKS)
5. Priority 1 (config): Swap Gmail sender to business email when address is ready
6. Priority 1 (next code sprint): CEO Audit Phase 2 — product catalog content expansion
   → Founder must provide product data first using format in `CEO audit report and plan.txt` Section 2.3
   → Drop file at `docs/content-updates/catalogue-products-update-v1.txt` when ready
