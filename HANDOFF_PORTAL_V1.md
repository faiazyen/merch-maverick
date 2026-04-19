# Merch Maverick Portal / CRM Handoff

## Current checkpoint
- Branch: `codex/portal-v1-foundation`
- Production app: [https://merch-maverick.vercel.app](https://merch-maverick.vercel.app)
- Architecture remains `Supabase-first + graceful fallback`
- Portal route structure is intact:
  - `/portal`
  - `/portal/orders`
  - `/portal/catalogue`
  - `/portal/quotes`
  - `/portal/assets`
  - `/portal/account`
- Internal CRM/admin is intact:
  - `/admin`
- Auth flow is now:
  - email/password sign-up and sign-in
  - forgot-password recovery via Supabase
  - Google sign-in

## What is working live

### 1. Auth and onboarding
- Email/password auth is live and redirects successful users into `/portal`.
- Google OAuth is configured and working against production.
- The sign-in callback returns to the production portal instead of localhost.
- Profile onboarding supports richer business fields used by the portal and CRM.

### 2. Client portal
- Client dashboard, orders, catalogue, quotes, assets, and account pages are live.
- Quote submission persists through the portal API with server-side validation.
- Asset uploads use Supabase Storage through the `portal-assets` bucket.
- Client approvals are actionable from the portal.

### 3. Operations backend
- Quotes act as the canonical intake record.
- Admin can:
  - review quotes
  - update quote and order statuses
  - edit assigned owner
  - edit internal notes
  - convert approved/quoted requests into orders
  - add order milestones through `order_events`
  - update approvals
- The admin dashboard now includes:
  - quote detail drawer
  - internal notes editing
  - assigned owner editing
  - cleaner search and status filters for pipeline, clients, and orders

### 4. Workflow behavior
- Quote -> order conversion works in production.
- Order milestones persist and appear in the client order history.
- Order event progression normalizes older current milestones when a new active milestone is added.
- Admin and client views now reflect the same workflow state more closely.

## Supabase / Vercel configuration already completed
- Supabase project is connected to the live app.
- `portal-assets` bucket exists and is private.
- Vercel env vars in use:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ENABLE_INTERNAL_ROUTES=true`
  - `INTERNAL_ADMIN_EMAILS`
- Google OAuth is configured in:
  - Google Cloud
  - Supabase Auth provider settings
  - Supabase URL Configuration

## Schema notes
- The main schema lives in [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql).
- In addition to the broader schema run, the live project needed these profile columns to support the new onboarding/auth flow:

```sql
alter table public.profiles
  add column if not exists job_title text,
  add column if not exists estimated_order_volume text,
  add column if not exists preferred_categories text[] not null default '{}';
```

## Files that matter most
- [HANDOFF_PORTAL_V1.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/HANDOFF_PORTAL_V1.md)
- [src/components/internal/AdminDashboard.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/internal/AdminDashboard.tsx)
- [src/lib/portal/internal-data.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/portal/internal-data.ts)
- [src/lib/portal/types.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/portal/types.ts)
- [src/lib/portal/workflow.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/portal/workflow.ts)
- [src/lib/portal/order-events.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/portal/order-events.ts)
- [src/app/api/portal/quotes/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/portal/quotes/route.ts)
- [src/app/api/portal/assets/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/portal/assets/route.ts)
- [src/app/api/portal/approvals/[approvalId]/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/portal/approvals/[approvalId]/route.ts)
- [src/app/api/admin/records/[recordType]/[recordId]/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/admin/records/[recordType]/[recordId]/route.ts)
- [src/app/api/admin/quotes/[quoteId]/convert/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/admin/quotes/[quoteId]/convert/route.ts)
- [src/app/api/admin/orders/[orderId]/events/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/admin/orders/[orderId]/events/route.ts)
- [src/components/portal/PortalQuoteConfigurator.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/portal/PortalQuoteConfigurator.tsx)
- [src/app/portal/orders/page.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/portal/orders/page.tsx)
- [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql)

## Recent passes completed
- `5f23577` — backend completion pass:
  - quote workflow
  - approvals actions
  - quote-to-order conversion
  - catalog-backed quote handling
  - admin mutation APIs
- `04fa4a7` — order event progression cleanup:
  - cleaner milestone normalization
  - better client-facing order tracking behavior
- Current pass after `04fa4a7`:
  - admin quote detail drawer
  - internal notes editing
  - assigned owner editing
  - cleaner search and filters for clients, orders, and pipeline

## Testing completed
- `npm run lint` ✅
- `npm run build` ✅
- Production smoke-tested manually:
  - email/password sign-in
  - Google sign-in
  - quote submission
  - admin access
  - quote conversion to order
  - order milestone propagation to client portal

## Known rough edges
- There is still a minor non-blocking browser console `400` after portal load in some sessions.
- Timeline copy is functional but could be made more polished and business-specific.
- Catalogue is still seeded/curated rather than fully imported from a real catalogue spreadsheet.
- No automated integration or end-to-end test suite exists yet beyond lint/build and manual verification.

## Highest-value next priorities
1. Import the real catalogue dataset into `catalog_items` and tighten pricing/lead-time realism.
2. Improve order timeline language and milestone sequencing for real factory operations.
3. Add admin quote/order detail depth such as linked assets, audit history, and richer client context.
4. Add targeted E2E coverage for auth, quote submission, admin conversion, and order tracking.
5. Add outbound notifications for quote status changes, approvals, and production milestones.

## Suggested next session prompt
Paste this into the next Codex session:

```text
Continue from the handoff in /Users/faiazyen/Desktop/Merch Maverick Codex/HANDOFF_PORTAL_V1.md.

Current context:
- Production is live at https://merch-maverick.vercel.app
- Branch is codex/portal-v1-foundation
- Portal auth now uses email/password + Google
- Supabase schema/env/storage/oauth setup has already been completed
- Admin can review quotes, edit ops fields, convert quotes to orders, and add milestones

Start by:
1. Reading HANDOFF_PORTAL_V1.md
2. Reviewing AdminDashboard, internal-data, portal workflow helpers, order-events, quote API, and schema.sql
3. Re-running npm run lint and npm run build
4. Continuing with the next highest-value full-stack backend priorities

Important:
- Do not regress the portal route structure or auth flow
- Keep the Supabase-first plus graceful-fallback architecture
- Treat production as the current checkpoint
- Continue with planning and execution, not just analysis
```
