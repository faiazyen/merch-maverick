# Handoff

## Product summary
The Merch Maverick is a factory-direct B2B custom merchandise platform focused on Europe and America. The current app combines:

- a public marketing site for lead generation
- an authenticated client portal for quotes, orders, assets, and approvals
- an internal admin CRM for quote review, order conversion, and milestone updates

Current stage: **Sprint 4 fully complete — merged to main, deployed to Vercel (2026-04-21). DB migration applied. catalog-images bucket created.**

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

## Sprint 4 — FULLY COMPLETE AND LIVE (2026-04-21)
- Merged to `main` via PR #1
- Vercel deployment triggered automatically
- Supabase DB migration applied manually by CEO (SQL Editor)
- `catalog-images` Storage bucket created (public) by CEO
- `portal-assets` bucket already existed from Sprint 2

### Sprint 4A — Schema Foundation
- `supabase/migrations/20260421000000_sprint4_schema.sql` — catalog_categories, catalog_product_images, catalog_product_variants tables; additive columns on catalog_items, profiles, orders; 8 category seeds; data migration; RLS policies

### Sprint 4B — Admin Catalog Command Center
- New API routes: catalog categories (GET/POST/PATCH/DELETE), item images (multipart upload/reorder/delete with Storage cleanup), item variants (GET/POST/PATCH/DELETE/reorder)
- Extended `PATCH /api/admin/catalog/[itemId]` with pricingType, salePrice, compareAtPrice, labels, supportsDirectOrder, isActive, categoryId
- Rebuilt `AdminCatalogManager.tsx` — two-panel layout, 5-tab slide-in panel (Details/Images/Variants/Pricing/Labels), hex color picker for color variants
- New `AdminCategoryManager.tsx` — draggable category list, add/edit side panel, inline active toggle
- Updated `src/app/admin/catalogue/page.tsx` — Products | Categories tab switcher, enriched data fetch with joins

### Sprint 4C — Client Onboarding Flow
- `src/app/onboarding/` — standalone dark layout + server page with auth check + onboarding-complete redirect
- `src/components/onboarding/OnboardingFlow.tsx` — 5-step full-screen Typeform-style flow; localStorage persistence; slide animation; auto-advance on single-select
- `src/app/api/portal/account/onboarding/route.ts` — PATCH: saves onboarding_step, onboarding_completed; maps responses to profile fields
- `src/app/portal/layout.tsx` — redirects users with onboardingCompleted=false to /onboarding before rendering portal shell

### Sprint 4D — CatalogGrid Rebuild
- `src/components/portal/CatalogGrid.tsx` — ProductCard with multi-image gallery, color swatch row, label pills overlay, PriceDisplay (range/fixed/sale), dual CTAs (Order Now teal + Request a Quote outlined)
- `src/app/portal/catalogue/page.tsx` — calls getCatalogPageData(), passes items + categories to CatalogGrid

### Sprint 4E — Direct Order Flow + Stripe
- `src/app/api/portal/orders/direct/route.ts` — POST: validates item, MOQ, creates order with order_source=direct_order, seeds Order placed + Production scheduling events, creates Stripe checkout for 60% deposit with paymentType=direct-order
- `src/components/portal/DirectOrderFlow.tsx` — image gallery, color/size selectors, quantity input, order summary, checkout button, "Request a Quote instead" fallback
- `src/app/portal/order/[catalogItemId]/page.tsx` — auth guard, 404 for non-direct-order items
- Extended Stripe webhook with direct-order branch: sets order status confirmed, updates Order placed → done + Production scheduling → current, inserts Payment received event

## Sprint 4 — PLANNED, NOT YET STARTED (2026-04-20)

A full board meeting (CTO + Backend Engineer + PM + UI/UX Pro Max) was held. All decisions recorded in the approved plan file at:
`~/.claude/plans/themerchmaverick-com-this-is-correct-vivid-bengio.md`

### Key decisions made this session
- Domain confirmed: `themerchmaverick.com`
- Made-to-order only — no stock tracking, `is_active` toggle is the availability control
- Dual client flow: quote for bulk/custom, direct order for standard items (`supports_direct_order` per product)
- Client onboarding questionnaire: 5 questions, full-screen Typeform-style, between login and portal
- Admin Command Center rebuilt first — CEO enters products via UI, no data file ingestion
- Admin visual register: cooler, denser, blue CTA (#2563EB) vs portal teal
- Printify-inspired catalog cards: image-dominant, label pills, variant swatches, dual CTAs

### Sprint 4 plan (no code written yet)

**4A — Schema Foundation (start here)**
New tables: `catalog_categories`, `catalog_product_images`, `catalog_product_variants`
New columns on `catalog_items`: category_id, pricing_type, sale_price, compare_at_price, labels[], supports_direct_order, is_active
New columns on `profiles`: onboarding_completed, onboarding_step
New columns on `orders`: order_source, catalog_item_id, variant_ids, unit_price, cancellation_reason
Migration: additive only, migrate existing 8 catalog items + variants + images to new tables
File to create: `supabase/migrations/[timestamp]_sprint4_schema.sql`

**4B — Admin Command Center** (after 4A)
Rebuild `AdminCatalogManager` as two-panel layout + 5 tabs (Details, Images, Variants, Pricing, Labels)
New `AdminCategoryManager` component
New API routes for categories, variants, multi-image
Order cancellation flow in admin

**4C — Client Onboarding** (parallel with 4B after 4A)
New `/onboarding` page, `OnboardingFlow` component
Middleware redirect: `onboarding_completed = false` → `/onboarding`
5-question flow with localStorage resume
New `PATCH /api/portal/account/onboarding` endpoint

**4D — Portal Catalog Upgrade** (after 4A + 4B)
`CatalogGrid` rebuild: multi-image gallery, variant swatches, label pills, sale pricing, dual CTAs
New `getCatalogPageData()` with joins (separate from bundle)

**4E — Direct Order Flow** (parallel with 4D)
New `POST /api/portal/orders/direct` endpoint
New `/portal/order/[catalogItemId]` page
Stripe webhook extended with `direct-order` branch

## Resume from here
Next session pick-up order:

1. Read `docs/OPEN_TASKS.md` for Sprint 4 task breakdown
2. Read the approved plan: `~/.claude/plans/themerchmaverick-com-this-is-correct-vivid-bengio.md`
3. Run `npm run build` + `npm run test:e2e` — confirm baseline clean before touching anything
4. **Start Sprint 4A** — write `supabase/migrations/[timestamp]_sprint4_schema.sql`
5. After migration SQL is written, update `src/lib/portal/types.ts`, `record-mappers.ts`, `catalog.ts`
6. Verify build still passes before moving to 4B
