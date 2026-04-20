# Open Tasks

## Completed this session (2026-04-20)
- Storage bucket `portal-assets` verified — exists, private (public: false)
- Mock-data fallback removed from `getPortalDataBundle()` — user data sections return real empty arrays
- `catalogSeed` exported from `mock-data.ts` and used as catalog fallback only
- Empty states added to: `PortalCards` (orders, quotes, assets, approvals), `PortalAssetLibrary`, `portal/orders/page.tsx`
- Playwright smoke test suite created — 12/12 passing (`npm run test:e2e`)
- `supabase/functions/` excluded from `tsconfig.json` — eliminates Deno import TS error in Next.js build
- CTO + PM sprint plan locked — two-agent execution briefs written

## Sprint — COMPLETE (2026-04-20)
Agent brief files can be deleted.

### Agent 1 — DONE
- [x] `src/app/api/quote/submit/route.ts` — guest quote submission API
- [x] Edge Function patched — guest quotes send admin notification with full notes block
- [x] QuoteTool step 5 — real POST, success card, all mailto removed
- [x] `/quote` page metadata and badge copy updated
- [x] Deposit label fixed (50% → 60% on confirmation)
- [x] `profile_completed` semantics — requires name, business_name, country non-empty
- [x] Stripe lazy init fixed in 3 routes — build clean

### Agent 2 — DONE
- [x] `npm install stripe` — stripe in dependencies
- [x] `src/app/api/stripe/checkout/route.ts` — 60% deposit Checkout session
- [x] Deposit wired into admin convert route — returns `paymentUrl`
- [x] `src/app/api/stripe/webhook/route.ts` — raw body, nodejs runtime, deposit + final-balance handlers
- [x] Final balance Checkout session triggered on `shipped` status in records route
- [x] Stripe env vars documented in `docs/ENVIRONMENT.md`

## Priority 1 — After Sprint Completes

### Swap email sender to business address
- Current sender: `fhmyen@gmail.com` (temporary)
- When business email is ready: update `GMAIL_USER` + `GMAIL_APP_PASSWORD` secrets
- Command: `supabase secrets set GMAIL_USER=orders@yourdomain.com GMAIL_APP_PASSWORD=xxx --project-ref ypocfxftazwoxqezafal`

### End-to-end Stripe payment test
- Use Stripe test mode cards to verify deposit → order confirmed → final balance → delivered flow
- Confirm DB state after each webhook event

### Google OAuth end-to-end
- Auth callback at `/auth/callback` exists but not fully tested with real Google OAuth flow

## Priority 2

### Server component cleanup (marketing pages)
- Move non-interactive marketing sections from client to server components
- Replace CSS-level Google font imports with Next.js `next/font`
- Remove broad `transition: all` rules, tighten animation scope
- Deferred from active sprint — zero revenue impact

### Tier 2 copy audit
- Aspirational but not factually wrong marketing copy review
- Home page hero portal language
- Pricing page payment terms
- Deferred from active sprint — Tier 1 copy (factually wrong) handled by Agent 1

### Harden admin workflow
- Typed workflow transitions instead of loosely coupled string statuses
- Validation gaps in mutation surfaces

### Expand production catalog
- Current catalog seeding is demo-oriented
- Replace with production-ready catalog data when client relationships are established

## Nice to have
- Structured audit logging for admin actions
- In-app notifications for approvals and order milestones
- Analytics around quote submission and portal usage
- Automated email for final balance trigger (currently manual by design)

## Next session order
1. Delete `agent-one.txt` and `agent-two.txt` — sprint is done
2. Stripe end-to-end test in test mode (Priority 1)
3. Business email swap when address is ready (Priority 1)
4. Google OAuth end-to-end verification (Priority 1)
5. Server component cleanup (Priority 2)
6. Remaining copy audit (Priority 2)
