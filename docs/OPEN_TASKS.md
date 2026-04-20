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
- Empty states added to: `PortalCards` (orders, quotes, assets, approvals), `PortalAssetLibrary`, `portal/orders/page.tsx`
- Playwright smoke test suite created — 12/12 passing (`npm run test:e2e`)
- `supabase/functions/` excluded from `tsconfig.json` — eliminates Deno import TS error in Next.js build
- Guest quote submission API, Edge Function patch, QuoteTool rewrite, copy fixes, deposit label
- Stripe: checkout, webhook, convert wired; lazy init fixed; env vars documented

## Priority 1 — Code (next agent sprint)

### CEO Audit Phase 2 — Product catalog content expansion
- Add more products to quote configurator product selection
- Add product images
- Expand product metadata (MOQ, materials, decoration options, pricing benchmarks)
- **Blocked on:** founder providing product data using the structured format documented in `CEO audit report and plan.txt` (Section 2.3)
- When ready: create `docs/content-updates/catalogue-products-update-v1.txt` and matching image folder

### CEO Audit Phase 4 — Admin catalog CRUD
- Build admin CRUD for catalog items (add/edit/remove products, upload images)
- Depends on: catalog content structure being finalized (Phase 2)

## Priority 1 — Manual (no code needed)

### End-to-end Stripe payment test
- Use Stripe test mode cards to verify deposit → order confirmed → final balance → delivered flow
- Confirm DB state after each webhook event

### Google OAuth end-to-end browser test
- Checklist (in `agent-two.txt`):
  1. Go to /login → click "Continue with Google"
  2. Complete Google OAuth flow
  3. Expect redirect to /portal
  4. Confirm portal loads user data correctly
  5. Refresh → still logged in
  6. Check Supabase Auth dashboard → user appears with Google provider
- Also confirm in Supabase dashboard: Google provider enabled, redirect URLs include both localhost and Vercel URL

### Swap email sender to business address
- Current sender: `fhmyen@gmail.com` (temporary)
- When business email is ready: update `GMAIL_USER` + `GMAIL_APP_PASSWORD` secrets
- Command: `supabase secrets set GMAIL_USER=orders@yourdomain.com GMAIL_APP_PASSWORD=xxx --project-ref ypocfxftazwoxqezafal`

## Priority 2

### CEO Audit Phase 3 — Catalog modernization
- Richer filters (category, material, MOQ, decoration type)
- Image-first browsing
- Product detail expansion
- Comparison functionality
- Depends on Phase 2 content being in place

### CEO Audit Phase 6 — History section UI/UX
- All portal history sections need UI/UX improvements
- Awaiting 21st dev references from CEO — do not execute until references are provided

### Server component cleanup (marketing pages)
- Move non-interactive marketing sections from client to server components
- Replace CSS-level Google font imports with Next.js `next/font`
- Remove broad `transition: all` rules, tighten animation scope

### Tier 2 copy audit
- Aspirational but not factually wrong marketing copy review
- Home page hero portal language
- Pricing page payment terms

### Harden admin workflow
- Typed workflow transitions instead of loosely coupled string statuses
- Validation gaps in mutation surfaces

## Nice to have
- Structured audit logging for admin actions
- In-app notifications for approvals and order milestones
- Analytics around quote submission and portal usage
- Automated email for final balance trigger (currently manual by design)

## Next session order
1. Run `npm run build` + `npm run test:e2e` — confirm still clean
2. Manual: Stripe E2E test with test cards (deposit → confirmed → shipped → final balance → delivered)
3. Manual: Google OAuth browser test (checklist above)
4. Config: business email swap when address is ready
5. Code sprint: CEO Audit Phase 2 — catalog content expansion (founder provides product data file first)
