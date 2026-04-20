# Architecture

## Stack
- Next.js 16.2.2 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase Auth, Postgres, and Storage
- Vercel deployment
- Anthropic SDK for the website chat assistant

## High-level architecture
The app is a single Next.js deployment with three layers:

1. Public marketing site
2. Authenticated client portal
3. Internal admin CRM

There is no separate backend service. Server logic lives in Next.js route handlers and server-side data loaders.

## Route map

### Public pages
- `/`
- `/about`
- `/contact`
- `/pricing`
- `/quote`
- `/testimonials`
- `/sustainability`
- `/solutions/corporate`
- `/solutions/events`
- `/solutions/fitness`
- `/solutions/hospitality`
- `/solutions/industrial`
- `/solutions/influencers-artists`

### Convenience/alias pages
- `/corporate`
- `/events`
- `/fitness`
- `/hospitality`
- `/industrial`

### Auth
- `/sign-in`
- `/signin`
- `/sign-up`
- `/auth/callback`

### Client portal
- `/portal`
- `/portal/orders`
- `/portal/catalogue`
- `/portal/quotes`
- `/portal/assets`
- `/portal/account`

### Internal
- `/admin`
- `/preview`

## Main application flow

### Marketing
- `src/app/layout.tsx` provides the global shell.
- `src/app/page.tsx` assembles the public landing page from `src/components/home/*`.
- Shared nav/footer/branding live under `src/components/layout` and `src/components/branding`.

### Auth flow
- Browser auth uses `src/lib/supabase/client.ts`.
- Server auth uses `src/lib/supabase/server.ts`.
- `/auth/callback` exchanges the Supabase auth code for a session and upserts `profiles`.
- Sign-in/sign-up/reset UI is centered in `src/components/ui/signup-1.tsx`.

### Client portal flow
- `src/app/portal/layout.tsx` requires an authenticated portal bundle.
- `src/lib/portal/data.ts` loads:
  - profile
  - orders + order events
  - quote requests
  - brand assets
  - approvals
  - catalog items
- Records are normalized through `src/lib/portal/record-mappers.ts`.
- If a section is empty or unavailable, fallback mock data from `src/lib/portal/mock-data.ts` is used.

### Internal CRM flow
- `/admin` is protected by:
  - `ENABLE_INTERNAL_ROUTES`
  - signed-in Supabase session
  - `INTERNAL_ADMIN_EMAILS` allowlist
  - `SUPABASE_SERVICE_ROLE_KEY`
- `src/lib/portal/internal-data.ts` aggregates all-client data through the service-role client.
- If service-role access fails, the CRM degrades to user-scoped or mock data.

## API routes

### Public/utility
- `src/app/api/chat/route.ts`
  - Anthropic-powered assistant
  - requires `ANTHROPIC_API_KEY`
  - business prompt is hardcoded in the route

### Portal APIs
- `src/app/api/portal/quotes/route.ts`
  - validates and saves quote requests
  - creates approval records when submitted
- `src/app/api/portal/assets/route.ts`
  - uploads files to Supabase Storage
- `src/app/api/portal/assets/[assetId]/route.ts`
  - returns signed access to a stored asset
- `src/app/api/portal/approvals/[approvalId]/route.ts`
  - updates approval decision from the client side

### Admin APIs
- `src/app/api/admin/records/[recordType]/[recordId]/route.ts`
  - PATCH updates for quotes, orders, approvals
- `src/app/api/admin/quotes/[quoteId]/convert/route.ts`
  - converts quote to order and creates initial order events
- `src/app/api/admin/orders/[orderId]/events/route.ts`
  - appends manual order events

## Supabase data model
Defined in [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql).

### Tables
- `profiles`
- `catalog_items`
- `quote_requests`
- `orders`
- `order_events`
- `brand_assets`
- `approvals`

### RLS
- User-owned read/write access is enabled for portal-facing tables.
- Admin/global aggregation depends on the service-role client, not elevated app-level role logic.

### Seed data
- `catalog_items` includes SQL seed rows.
- Additional UI mock content lives in `src/lib/portal/mock-data.ts`.

## Folder guide
- `src/app`
  - route pages, layouts, and route handlers
- `src/components`
  - public site sections
  - portal UI
  - internal admin UI
  - shared layout/branding/ui primitives
- `src/lib`
  - Supabase clients/config
  - portal data shaping
  - catalog/workflow logic
  - marketing content/data
- `public`
  - images and icons
- `supabase`
  - schema SQL
- `docs`
  - handoff and setup docs

## Current architectural tradeoffs
- Mock fallback keeps the portal demoable but blurs the line between live and synthetic data.
- Admin functionality is delivered inside the main app rather than as a separate private console.
- Operational workflow is encoded mostly in status strings, notes, and manual events rather than typed workflow state machines.
- Some installed dependencies are forward-looking scaffolds rather than active production integrations.
