# Open Tasks

## 🚀 LAUNCH PREP — CURRENT PRIORITY (2026-04-26)

### Code tasks (Agent 1)
- [ ] **Catalog RLS audit** — verify `catalog_items` SELECT is open to all authenticated portal users; write migration if not (`supabase/migrations/20260426000000_catalog_public_read.sql`) — SQL for CEO to run
- [ ] **CatalogGrid empty state** — add graceful "Products coming soon" state when zero items returned
- [ ] **Email sender audit** — confirm `send-notification-email` Edge Function reads from env secrets, not hardcoded; document swap instructions in HANDOFF
- [ ] **Guest quote admin display** — verify quotes with `user_id: null` show contact info cleanly in AdminDashboard
- [ ] **Build + push** — lint + build + pre-push hook passing, push to `main`

### CEO manual actions (not code)
- [ ] Enter product data via `/admin/catalogue` — add images, variants, pricing, toggle `supportsDirectOrder`
- [ ] Run catalog RLS migration (if Agent 1 produces SQL)
- [ ] Swap email secret: `supabase secrets set GMAIL_USER=orders@themerchmaverick.com ...`
- [ ] Stripe E2E test — real card on live Vercel URL
- [ ] DNS + HTTPS check on `themerchmaverick.com`

### Testing (Agent 2)
- [ ] `npm run build` + `npm run test:e2e` — all passing
- [ ] Auth + onboarding flow (fresh incognito)
- [ ] Portal catalogue, quote, asset, account flows
- [ ] Admin CRM — dashboard, catalogue manager
- [ ] Public site — homepage, pricing, quote form
- [ ] Mobile responsiveness — portal shell drawer

---

## ✅ DONE THIS SESSION (2026-04-26)
- [x] All AI-generated testimonials and success stories fully purged (images, data, components, page, nav links)
- [x] Build clean at 45 pages — pushed to `main`
- [x] Navbar + Footer updated to link "Brands" → `/brands`

---

## 🚨 SPRINT 6 — PRINTIFY UI/UX CLONE (approved 2026-04-22, in progress)

CEO directive: redesign the entire app to match Printify's clean white SaaS UI with our lime `#C4F542` brand color. Reference screenshots shared in conversation.

### Sprint 6A/6B — Admin Printify Redesign ✅ PARTIAL (2026-04-22)
- [x] `src/components/internal/AdminDashboard.tsx` — full Printify-style redesign: warm canvas, white header, 3xl bold title, lime CTAs, sign out button → `/`, 15px body text
- [x] `src/components/internal/AdminCatalogManager.tsx` — lime Add Product button, lime tab underline, lime footer CTAs, updated input styles
- [x] `src/app/admin/catalogue/page.tsx` — white header with bold title, dark tab pills, warm canvas
- [x] `src/components/internal/AdminCatalogManager.tsx` — remaining color passes: decoration methods toggles, variant Add button, pricing type buttons, toggle switches, table badge/row colors, search input border
- [x] `src/components/internal/AdminCategoryManager.tsx` — full Printify treatment (lime CTAs, warm borders, warm table header/hover)

### Sprint 6C — Portal Inner Pages ✅ DONE (2026-04-22)
- [x] `src/components/portal/PortalAssetLibrary.tsx` — white cards on warm border, neutral hover states
- [x] `src/components/portal/PortalQuoteConfigurator.tsx` — full lime/warm pass: selected states, step indicator, quantity presets, decoration options, submit CTA, all border/surface tokens
- [x] `src/components/portal/ProfileEditForm.tsx` — lime Save CTA, warm borders, lime focus, warm disabled bg

---

## 🚨 SPRINT 5 — EMERGENCY REBUILD (approved 2026-04-21, execute next session)

Full board meeting held. Sprint 4 rejected. Plan: `~/.claude/plans/okay-claude-we-need-immutable-squid.md`

### Sprint 5A — Critical Bug Fixes ✅ DONE (2026-04-22)
- [x] `src/lib/portal/internal-data.ts` — Pipeline value: exclude `cancelled`/`delivered` orders from sum; totalPipeline now sums active orders (not quotes); fix applied to all 3 code paths
- [x] `src/components/layout/Navbar.tsx` — Login icon href changed to `/sign-in?mode=login`

### Sprint 5B — Security Hardening ✅ DONE (2026-04-22)
- [x] `src/components/ui/signup-1.tsx` — `disableSignup` prop added; tab switcher hidden, mode forced to login
- [x] `src/app/sign-in/page.tsx` — `disableSignup={isAdminAccess}` wired; admin path shows login only
- [x] `src/middleware.ts` — Edge-level guard for `/admin/*` + `/api/admin/*`; checks ENABLE_INTERNAL_ROUTES, session, INTERNAL_ADMIN_EMAILS

### Sprint 5C — Admin Full Command Center ✅ DONE (2026-04-22)
- [x] `src/app/api/admin/records/[recordType]/[recordId]/route.ts` — order PATCH extended with quantity, unitPrice, totalValue, catalogItemId, expectedDeliveryDate
- [x] `src/app/api/admin/clients/[userId]/route.ts` — New GET + PATCH endpoint; edits all profile fields + suspended flag
- [x] `src/lib/portal/internal-data.ts` — Live Supabase queries (done in 5A)
- [x] `src/components/internal/AdminDashboard.tsx` — Order edit drawer + client detail drawer with full profile edit + linked orders/quotes

### Sprint 5D — Full UI/UX Redesign (THE BIG ONE) ✅ DONE (2026-04-22)
- [x] `src/app/globals.css` — Portal token system: lime `#C4F542`, cream `#F7F4EF`, warm border `#E5E2DB`
- [x] `src/app/layout.tsx` — Plus Jakarta Sans (replaces Inter)
- [x] `src/components/portal/PortalShell.tsx` — Full rewrite: fixed `w-60` sidebar at `lg+`, lime left-accent nav, mobile drawer (Framer Motion), `max-w-[1400px]` content
- [x] `src/components/portal/PortalCards.tsx` — Warm palette, lime CTAs, semantic status chips
- [x] `src/app/portal/page.tsx` — Quick Actions panel + warm-palette dashboard
- [x] `src/components/portal/CatalogGrid.tsx` — Lime "Order Now" CTA, aspect-square object-cover images, inline ImageLightbox, card hover lift, warm filter pills
- [x] `src/components/portal/OrdersView.tsx` — New client component: status chip filters with counts, expandable order cards, production timeline icons
- [x] `src/app/portal/orders/page.tsx` — Server wrapper for OrdersView
- [ ] `src/components/internal/AdminDashboard.tsx` — Dense professional layout, full-width on large screens (deferred to next session)

### Sprint 5E — Onboarding Fix ✅ DONE (2026-04-22)
- [x] `src/app/api/portal/account/onboarding/route.ts` — forces `onboarding_step=5` when `completed=true` so redirect guard can't re-trigger
- [x] `src/components/onboarding/OnboardingFlow.tsx` — lazy `useState` initializers read localStorage (no setState-in-effect lint error); "Complete Later" escape hatch on step 1; done screen CTA updated to lime

### Sprint 5F — CI/CD & Testing ✅ DONE (2026-04-22)
- [x] `.githooks/pre-push` — blocks pushes that fail lint or build (activate: `npm run setup-hooks`)
- [x] `package.json` — added `setup-hooks` script
- [x] `.github/workflows/ci.yml` — lint + build on all PRs to main and direct main pushes
- [x] `docs/ENVIRONMENT.md` — full env var documentation (GMAIL, Stripe, flags, storage buckets, Sprint 4 schema, CI/CD section)
- [ ] Expand Playwright suite: admin access, onboarding, direct order, catalog CRUD (deferred)

---

## Completed — Sprint 2 (2026-04-20) — BOTH AGENTS DONE, MERGED TO MAIN

### Agent 1 — DONE
- [x] `src/app/api/portal/assets/[assetId]/route.ts` — DELETE handler with auth, ownership check, Storage + DB cleanup
- [x] `src/components/portal/PortalAssetLibrary.tsx` — Trash2 icon, inline confirmation (Delete? / Confirm / Cancel), optimistic removal
- [x] `src/app/api/stripe/webhook/route.ts` — runtime=nodejs confirmed, raw body confirmed, both payment branches verified

### Agent 2 — DONE
- [x] `src/app/api/portal/account/route.ts` — PATCH handler, validates required fields, upserts to profiles, email never touched
- [x] `src/components/portal/ProfileEditForm.tsx` — client form component, pre-filled inputs, save/success/error states
- [x] `src/app/portal/account/page.tsx` — replaced static display with live ProfileEditForm
- [x] `src/app/auth/callback/route.ts` — verified: correct code exchange, origin-based redirects, graceful error handling
- [x] `npm run build` — clean, 40 pages, zero errors

## Completed — Sprint 1 (2026-04-20)
- Storage bucket `portal-assets` verified — exists, private (public: false)
- Mock-data fallback removed from `getPortalDataBundle()` — user data sections return real empty arrays
- `catalogSeed` exported from `mock-data.ts` and used as catalog fallback only
- Empty states added to portal sections
- Playwright smoke test suite created — 12/12 passing
- Stripe: checkout, webhook, convert wired; lazy init fixed; env vars documented

## Completed — Planning Session (2026-04-20)
- [x] CEO manual task guide reviewed — all 4 tasks addressed
- [x] CEO Q&A completed: made-to-order confirmed, dual flow confirmed, onboarding questionnaire confirmed, admin-first confirmed
- [x] Domain confirmed: `themerchmaverick.com`
- [x] Full board meeting held (CTO + Backend Engineer + PM + UI/UX Pro Max)
- [x] Printify inspiration analysed and design direction set
- [x] Sprint 4 plan written and approved — see `~/.claude/plans/themerchmaverick-com-this-is-correct-vivid-bengio.md`
- [x] Manual tasks disposition:
  - Stripe E2E: CEO using live mode, deferred
  - Google OAuth: previously verified as working
  - Business email: domain `themerchmaverick.com` purchased, email setup pending
  - Product data file: **superseded** — admin UI will be built first, CEO enters products via UI

---

## Completed — Sprint 4 FULLY DONE (2026-04-21, committed to codex/portal-v1-foundation)

### 4A — Schema Foundation
- [x] `supabase/migrations/20260421000000_sprint4_schema.sql` — catalog_categories, catalog_product_images, catalog_product_variants tables; additive columns; seeds; data migration; RLS
- [x] `src/lib/portal/types.ts` — all Sprint 4 types
- [x] `src/lib/portal/record-mappers.ts` — all new mappers + updated existing
- [x] `src/lib/portal/catalog.ts` — getCatalogPageData() with full joins; getCatalogItemsLight()
- [x] `src/lib/portal/workflow.ts` — 'cancelled' status + transitions

### 4B — Admin Command Center
- [x] All category + image + variant CRUD API routes
- [x] Extended `PATCH /api/admin/catalog/[itemId]` with Sprint 4 fields
- [x] `src/app/api/admin/records/[recordType]/[recordId]/route.ts` — cancellation_reason
- [x] Rebuilt `AdminCatalogManager.tsx` — two-panel, 5-tab panel
- [x] New `AdminCategoryManager.tsx` — list + add/edit panel + active toggle
- [x] Updated `src/app/admin/catalogue/page.tsx` — Products | Categories tab switcher

### 4C — Client Onboarding
- [x] `src/app/onboarding/` — page + standalone dark layout
- [x] `src/components/onboarding/OnboardingFlow.tsx` — 5-step full-screen flow
- [x] `src/app/api/portal/account/onboarding/route.ts`
- [x] `src/app/portal/layout.tsx` — onboarding redirect guard

### 4D — Portal CatalogGrid Rebuild
- [x] Rebuilt `CatalogGrid.tsx` — ProductCard with multi-image gallery, color swatches, label pills, dual CTAs
- [x] Updated `src/app/portal/catalogue/page.tsx` — getCatalogPageData()

### 4E — Direct Order Flow
- [x] `src/app/api/portal/orders/direct/route.ts`
- [x] `src/components/portal/DirectOrderFlow.tsx`
- [x] `src/app/portal/order/[catalogItemId]/page.tsx`
- [x] Extended Stripe webhook with direct-order branch

---

## Priority 1 — Manual (deferred, no code needed)

### Business email setup
- Domain `themerchmaverick.com` purchased
- When business email is configured: update `GMAIL_USER` + `GMAIL_APP_PASSWORD` in Supabase secrets
- Command: `supabase secrets set GMAIL_USER=orders@themerchmaverick.com GMAIL_APP_PASSWORD=xxx --project-ref ypocfxftazwoxqezafal`

### Stripe end-to-end test
- CEO deferred — using live mode, will test when ready
- Use real payment with real card on live Vercel URL

---

## Priority 2 (post-Sprint 4)

### CEO Audit Phase 6 — History section UI/UX
- All portal history sections (orders, quotes) need UI/UX improvements
- Awaiting 21st dev UI references from CEO — do not execute until references are provided

### Server component cleanup (marketing pages)
- Move non-interactive marketing sections from client to server components
- Replace CSS-level Google font imports with Next.js `next/font`

### Harden admin workflow
- Typed workflow transitions instead of loosely coupled string statuses
- Full order edit (quantity, delivery date, total) from admin panel

## Nice to have
- Structured audit logging for admin actions
- In-app notifications for approvals and order milestones
- Analytics around quote submission and portal usage
- Automated email for final balance trigger

---

## Next session order
1. Read `docs/HANDOFF.md` — Sprint 4 fully live on Vercel as of 2026-04-21
2. Confirm Vercel deployment is green (check dashboard if not already confirmed)
3. CEO product data entry: go to `/admin/catalogue` → add images, variants, pricing per product → toggle `supportsDirectOrder` on eligible items
4. Test onboarding flow: sign up with a fresh incognito account, confirm 5-step flow appears, confirm it doesn't repeat on second login
5. Test direct order flow: find a product with `supportsDirectOrder` ON → click "Order Now" → confirm Stripe checkout loads
6. Review Priority 2 tasks — portal history UI/UX + admin workflow hardening
