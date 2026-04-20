# Handoff

## Product summary
The Merch Maverick is a factory-direct B2B custom merchandise platform focused on Europe and America. The current app combines:

- a public marketing site for lead generation
- an authenticated client portal for quotes, orders, assets, and approvals
- an internal admin CRM for quote review, order conversion, and milestone updates

Current stage: **early production MVP — active sprint in progress.**

## What is implemented now
- Public website with home page, vertical/solution pages, pricing, about, contact, sustainability, quote page, and testimonials
- Shared branding/navigation system across marketing pages
- Supabase auth with:
  - email/password sign-up and sign-in
  - password reset flow
  - Google OAuth callback handling
- Client portal routes:
  - `/portal`
  - `/portal/orders`
  - `/portal/catalogue`
  - `/portal/quotes`
  - `/portal/assets`
  - `/portal/account`
- Quote submission API with validation and approval record creation
- Asset upload/download API backed by Supabase Storage
- Admin route `/admin` with internal CRM dashboard
- Admin APIs for:
  - updating quote/order/approval records
  - converting quotes into orders
  - appending order events
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
- The public `/quote` page still uses a mailto flow (QuoteTool) — this is the active task in the current sprint.

## Sprint — COMPLETE (2026-04-20)
Both agents finished. `agent-one.txt` and `agent-two.txt` can be deleted.

### What shipped
- Guest quote submission API (`/api/quote/submit`) — persists to Supabase, triggers DB webhook
- Edge Function patched — guest quotes (null user_id) send admin notification with full notes instead of crashing
- QuoteTool fully rewritten — real POST, success card, zero mailto
- Quote page and contact page copy aligned to production reality
- Deposit label corrected (60% on confirmation)
- `profile_completed` semantics tightened
- Stripe Checkout for 60% deposit wired into admin convert flow
- Stripe webhook handler — deposit confirms order, final balance triggers delivered
- Final balance Checkout generated automatically on `shipped` status update
- Stripe lazy init fixed — build passes clean with no STRIPE_SECRET_KEY at build time

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
- `stripe` — not yet installed; Agent 2 installs in active sprint

## Partially implemented / placeholder areas
- Public `/quote` page still uses mailto (QuoteTool) — being replaced in active sprint
- Quote pricing is a guided benchmark flow, not a complete pricing engine
- Manual surcharges are note-driven and admin-managed, not structured as line items
- Stripe payment processing — being wired in active sprint
- Preview tooling exists at `/preview`, gated behind admin auth

## Known issues / risks
- **mailto gap:** Every visitor who completes the /quote flow generates zero app data — active sprint fixes this
- **Guest quote user_id:** Guest quotes will have `user_id: null` in `quote_requests` — admin CRM renders the contact block from the structured notes field
- **Stripe webhook raw body:** Next.js App Router requires `request.text()` + `runtime = "nodejs"` for Stripe signature verification — documented in agent-two.txt
- **Storage:** `portal-assets` Supabase Storage bucket confirmed private — verified 2026-04-20
- **Testing gap:** Smoke tests cover auth and redirects; no end-to-end payment flow test yet
- **Email sender:** Current Gmail sender is temporary — swap to business email before public launch

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

## Resume from here
Sprint is confirmed complete. Next session should:

1. Deploy Edge Function: `supabase functions deploy send-notification-email --project-ref ypocfxftazwoxqezafal`
2. End-to-end Stripe test in test mode — submit guest quote → admin converts → deposit Checkout → webhook fires → order confirmed
3. Verify final balance link appears in order `internal_notes` after admin moves order to `shipped`
4. Delete `agent-one.txt` and `agent-two.txt`
5. Swap Gmail sender to business email when ready

## Recommended next actions
1. Deploy the Edge Function (guest quote emails won't work until this is done)
2. Stripe end-to-end test with test cards
3. Google OAuth end-to-end verification
4. Server component cleanup on marketing pages (Tier 2)
5. Copy audit across remaining pages (Tier 2)
