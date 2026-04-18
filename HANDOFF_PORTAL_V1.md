# Merch Maverick Portal V1 Handoff

## Current state
- Implemented a new authenticated client platform structure inspired by the Stitch references.
- Replaced the old placeholder `/portal` page with a multi-route product workspace:
  - `/portal`
  - `/portal/orders`
  - `/portal/catalogue`
  - `/portal/quotes`
  - `/portal/assets`
  - `/portal/account`
- Added a product-specific portal shell and blue-forward authenticated UI while keeping marketing surfaces separate.
- Added an internal CRM/admin path that is gated by:
  - `ENABLE_INTERNAL_ROUTES=true`
  - `INTERNAL_ADMIN_EMAILS`
- Expanded onboarding fields in auth and persisted those fields through the auth callback into `profiles`.
- Added a Supabase-first quote persistence API at `/api/portal/quotes`.
- Added a broader Supabase schema for:
  - `profiles`
  - `catalog_items`
  - `quote_requests`
  - `orders`
  - `order_events`
  - `brand_assets`
  - `approvals`
- Added a service-role admin client for future internal CRM aggregation across all client accounts.

## Testing already completed
- `npm run lint` ✅
- `npm run build` ✅

## Important implementation notes
- The portal data layer is intentionally dual-mode:
  - If the new Supabase tables exist, the app reads real data.
  - If they do not exist yet, the app falls back to seeded mock portal data so the UI remains usable.
- Quote saving also has a graceful fallback:
  - It tries to save through `/api/portal/quotes`.
  - If the backend tables are not ready, the configurator stores drafts/submissions locally in browser storage.
- `/quote` now redirects signed-in users to `/portal/quotes`.
- Marketing navbar/footer are hidden on `/portal`, `/admin`, and `/internal` routes so the authenticated product shell can take over.

## Files to review first next session
- [HANDOFF_PORTAL_V1.md](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/HANDOFF_PORTAL_V1.md)
- [src/lib/portal/data.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/portal/data.ts)
- [src/components/portal/PortalShell.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/portal/PortalShell.tsx)
- [src/components/portal/PortalQuoteConfigurator.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/portal/PortalQuoteConfigurator.tsx)
- [src/app/api/portal/quotes/route.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/api/portal/quotes/route.ts)
- [src/components/internal/AdminDashboard.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/internal/AdminDashboard.tsx)
- [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql)

## What is still incomplete
- Real file uploads are not wired to Supabase Storage yet.
  - The current asset flow is metadata-first, not binary file storage.
- Internal CRM currently supports real cross-client aggregation only when `SUPABASE_SERVICE_ROLE_KEY` is configured.
- Catalogue is still curated/seeded and not yet seeded automatically into Supabase.
- Orders and approvals are rendered from shared models, but there is not yet a staff editing UI for changing statuses directly.
- No automated test suite was added yet beyond lint/build validation.

## Recommended next-session priorities
1. Wire real asset upload and storage with Supabase Storage.
2. Seed and sync curated catalogue data into `catalog_items`.
3. Add internal CRM actions for updating quote/order/approval statuses.
4. Add route-level metadata and polish for portal pages.
5. Add targeted automated tests for auth callback, quote persistence, and protected portal behavior.

## Environment/config needed for full functionality
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `INTERNAL_ADMIN_EMAILS`
- `ENABLE_INTERNAL_ROUTES=true`

## New session prompt
Paste this into the next Codex session:

```text
Continue from the handoff in /Users/faiazyen/Desktop/Merch Maverick Codex/HANDOFF_PORTAL_V1.md.

Context:
- The client platform V1 foundation has already been implemented.
- Portal routes, quote configurator, admin gating, and Supabase schema expansion are in place.
- Lint and build were already passing at the end of the last session.

Start by:
1. Reading HANDOFF_PORTAL_V1.md
2. Reviewing the portal data layer, portal shell, configurator, admin dashboard, and supabase/schema.sql
3. Re-validating the current state with lint/build
4. Then continue implementation from the recommended priorities in the handoff

Be careful not to regress the existing portal route structure or auth flow.
Prefer building on the current Supabase-first plus graceful-fallback architecture rather than replacing it.
```
