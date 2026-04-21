# Open Tasks

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

## Completed — Sprint 4A (2026-04-21)
- [x] `supabase/migrations/20260421000000_sprint4_schema.sql` — all 3 new tables, all additive columns, category seed, data migration, RLS
- [x] `src/lib/portal/types.ts` — all Sprint 4 types added
- [x] `src/lib/portal/record-mappers.ts` — all new mappers, updated existing
- [x] `src/lib/portal/catalog.ts` — getCatalogPageData(), getCatalogItemsLight()

## Completed — Sprint 4B API layer (2026-04-21)
- [x] `src/app/api/admin/catalog/categories/route.ts`
- [x] `src/app/api/admin/catalog/categories/[categoryId]/route.ts`
- [x] `src/app/api/admin/catalog/[itemId]/variants/route.ts`
- [x] `src/app/api/admin/catalog/[itemId]/variants/[variantId]/route.ts`
- [x] `src/app/api/admin/catalog/[itemId]/images/route.ts`
- [x] `src/app/api/admin/catalog/[itemId]/images/[imageId]/route.ts`
- [x] `src/app/api/admin/catalog/[itemId]/route.ts` — Sprint 4 fields added
- [x] `src/lib/portal/workflow.ts` — 'cancelled' status + transitions
- [x] `src/app/api/admin/records/[recordType]/[recordId]/route.ts` — cancellation_reason

---

## Priority 1 — SPRINT 4A (start here next session)

**Dependency:** Must complete before 4B, 4C, 4D, 4E.

### Schema migration — `supabase/migrations/[timestamp]_sprint4_schema.sql`
- [ ] Create `catalog_categories` table (id, slug, name, description, display_order, is_active, icon, created_at)
- [ ] Create `catalog_product_images` table (id, item_id FK, url, alt_text, is_primary, display_order, created_at)
- [ ] Create `catalog_product_variants` table (id, item_id FK, type, label, value, display_order, is_available, created_at)
- [ ] Add to `catalog_items`: category_id FK, pricing_type, sale_price, compare_at_price, labels[], supports_direct_order, is_active
- [ ] Add to `profiles`: onboarding_completed, onboarding_step
- [ ] Add to `orders`: order_source, catalog_item_id, variant_ids, unit_price, cancellation_reason
- [ ] Seed `catalog_categories` from existing category text values (Apparel, Accessories, Office, Stationery, Headwear, Bags, Tech, Drinkware)
- [ ] Migrate existing `badge` → `labels[]`, `image` → `catalog_product_images`, `variants[]` → `catalog_product_variants`
- [ ] RLS policies for new tables

### TypeScript + data layer updates
- [ ] `src/lib/portal/types.ts` — add CatalogCategory, ProductImage, ProductVariant types; update CatalogItem; update PortalProfile with onboardingCompleted/Step; update OrderStatus to include 'cancelled'; add OrderSource type
- [ ] `src/lib/portal/record-mappers.ts` — update mapCatalogItems to handle new fields; add mapCatalogCategories, mapProductImages, mapProductVariants
- [ ] `src/lib/portal/catalog.ts` — update queries to join new tables; add getCatalogPageData() with full joins

### Verification
- [ ] `npm run build` passes clean
- [ ] Existing portal pages still render
- [ ] Existing admin CRM tabs still functional

---

## Priority 1 — SPRINT 4B (after 4A)

### Admin Command Center rebuild
- [ ] Rebuild `src/components/internal/AdminCatalogManager.tsx` — two-panel layout, 5 tabs: Details / Images / Variants / Pricing / Labels
- [ ] New `src/components/internal/AdminCategoryManager.tsx` — draggable list, add/edit/delete, active toggle
- [ ] Update `src/app/admin/catalogue/page.tsx` — load categories + enriched product data
- [ ] `src/app/api/admin/catalog/categories/route.ts` — GET + POST
- [ ] `src/app/api/admin/catalog/categories/[categoryId]/route.ts` — PATCH + DELETE
- [ ] `src/app/api/admin/catalog/[itemId]/variants/route.ts` — POST + reorder PATCH
- [ ] `src/app/api/admin/catalog/[itemId]/variants/[variantId]/route.ts` — PATCH + DELETE
- [ ] `src/app/api/admin/catalog/[itemId]/images/route.ts` — POST (multi-upload) + reorder PATCH
- [ ] `src/app/api/admin/catalog/[itemId]/images/[imageId]/route.ts` — PATCH + DELETE
- [ ] Update `src/app/api/admin/catalog/[itemId]/route.ts` — handle new pricing fields, labels, supports_direct_order, is_active, category_id
- [ ] Order cancellation: add 'cancelled' to valid transitions in `src/lib/portal/workflow.ts`, add cancellation reason UI in admin, update `src/app/api/admin/records/[recordType]/[recordId]/route.ts`

---

## Priority 1 — SPRINT 4C (parallel with 4B, after 4A)

### Client onboarding flow
- [ ] `src/app/onboarding/page.tsx` — new page
- [ ] `src/app/onboarding/layout.tsx` — standalone layout (no portal shell)
- [ ] `src/components/onboarding/OnboardingFlow.tsx` — 5-question full-screen flow, slide transitions, auto-advance on single select, localStorage resume
- [ ] `src/app/api/portal/account/onboarding/route.ts` — PATCH endpoint, saves answers + updates onboarding_step, sets onboarding_completed on finish
- [ ] `src/app/portal/layout.tsx` — add redirect: if authenticated + onboarding_completed = false → /onboarding
- [ ] Portal dashboard welcome banner — first visit after onboarding completion, auto-dismisses after 5s

---

## Priority 1 — SPRINT 4D (after 4A + 4B)

### Portal catalog upgrade
- [ ] Add `getCatalogPageData()` to `src/lib/portal/catalog.ts` — full join with images, variants, categories
- [ ] Rebuild `src/components/portal/CatalogGrid.tsx` — multi-image gallery, color swatch variants, label pills (Best Seller/New/Eco/Premium), sale pricing display, dual CTAs (Order Now + Request a Quote)
- [ ] Update `src/app/portal/catalogue/page.tsx` — use getCatalogPageData() instead of bundle catalog

---

## Priority 1 — SPRINT 4E (parallel with 4D, after 4A)

### Direct order flow
- [ ] `src/app/api/portal/orders/direct/route.ts` — POST: validate supports_direct_order, create order, initiate Stripe checkout
- [ ] `src/app/portal/order/[catalogItemId]/page.tsx` — variant selector, quantity input with MOQ, live price calc, Proceed to Checkout CTA
- [ ] `src/components/portal/DirectOrderFlow.tsx` — direct order UI component
- [ ] `src/app/api/stripe/webhook/route.ts` — add `direct-order` paymentType branch

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
1. Read `docs/HANDOFF.md` for Sprint 4 summary
2. Read approved plan: `~/.claude/plans/themerchmaverick-com-this-is-correct-vivid-bengio.md`
3. Run `npm run build` + `npm run test:e2e` — confirm baseline clean
4. **Start Sprint 4A** — write `supabase/migrations/[timestamp]_sprint4_schema.sql`
5. Then update `src/lib/portal/types.ts`, `record-mappers.ts`, `catalog.ts`
6. Verify build passes, then move to 4B + 4C in parallel
