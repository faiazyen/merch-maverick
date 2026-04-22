# Environment

## Overview
This project relies on Vercel-hosted environment variables plus Supabase project configuration. Secrets must never be committed to the repository.

## Required environment variables

### Public client variables
These are used by browser and server code and are expected in local env files and Vercel project settings.

- `NEXT_PUBLIC_SUPABASE_URL`
  - Supabase project URL
  - used by browser/server/admin client creation
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Supabase anon key
  - used by browser/server auth flows

### Server-only required for internal/admin/storage
- `SUPABASE_SERVICE_ROLE_KEY`
  - required for internal CRM aggregation
  - required for asset upload/download route handlers
  - must never be exposed to the browser

### Server-only required for Stripe payments
- `STRIPE_SECRET_KEY`
  - Stripe secret API key in `sk_test_...` or `sk_live_...` format
  - required for creating deposit and final-balance Checkout sessions
  - must never be exposed to the browser
- `STRIPE_WEBHOOK_SECRET`
  - Stripe webhook signing secret in `whsec_...` format
  - required for verifying `/api/stripe/webhook` signatures
  - use the Stripe CLI secret locally and the dashboard secret in hosted environments
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Stripe publishable key in `pk_test_...` or `pk_live_...` format
  - safe to expose to the browser
  - used by any client-side Stripe.js integration (currently none, reserved)

### Public app URL
- `NEXT_PUBLIC_APP_URL`
  - absolute app origin such as `http://localhost:3000` or `https://your-domain.vercel.app`
  - used for Stripe Checkout success and cancel redirects

### Server-only required for AI assistant
- `ANTHROPIC_API_KEY`
  - required for `/api/chat`
  - must never be committed

### Server-only required for transactional email
- `GMAIL_USER`
  - Gmail sender address (e.g. `orders@themerchmaverick.com`)
  - set as a Supabase Edge Function secret, not a Vercel env var
  - used by `supabase/functions/send-notification-email`
- `GMAIL_APP_PASSWORD`
  - Gmail app password (not the account password)
  - set as a Supabase Edge Function secret
  - **broken if not set** — quote/order webhook emails silently fail

### Operational flags
- `ENABLE_INTERNAL_ROUTES`
  - expected values: `true` or unset/false
  - enables `/admin`, admin APIs, and `/preview`
  - **must be `true` in Vercel production** for CEO to access admin panel
- `INTERNAL_ADMIN_EMAILS`
  - comma-separated list of allowed admin email addresses (e.g. `ceo@themerchmaverick.com`)
  - checked at middleware edge level and in API guards
  - **broken if not set** — admin panel shows 403 even with `ENABLE_INTERNAL_ROUTES=true`

## Variables present in code but not fully documented in `.env.example`
The current `.env.example` only includes:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

It should be expanded before future onboarding so the rest of the runtime requirements are visible without exposing secret values.

## Supabase requirements

### Auth
- Email/password auth is active in the app
- Google OAuth is supported by the UI/callback flow, but provider enablement is configured in Supabase, not in repo code

### Database
- Apply [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql) to the target Supabase project
- Tables required:
  - `profiles`
  - `catalog_items`
  - `quote_requests`
  - `orders`
  - `order_events`
  - `brand_assets`
  - `approvals`

### Storage buckets
| Bucket | Visibility | Purpose |
|---|---|---|
| `portal-assets` | **Private** | Client brand file uploads — signed URLs, auth-gated |
| `catalog-images` | **Public** | Product images served in catalog cards |

Both buckets must be created manually in the Supabase Storage dashboard before first use.

### Sprint 4 schema
Run `supabase/migrations/20260421000000_sprint4_schema.sql` against the Supabase project SQL Editor before any Sprint 4+ features will work. New tables: `catalog_categories`, `catalog_product_images`, `catalog_product_variants`. New columns on `catalog_items`, `profiles`, `orders`.

## CI/CD

### GitHub Actions
`.github/workflows/ci.yml` runs on every PR to `main` and on direct pushes to `main`.
- Runs `npm run lint` then `npm run build`
- Uses placeholder env vars so the build compiles without real secrets
- **Does not run Playwright tests** — test runner requires a live Supabase instance; run `npm run test:e2e` manually

### Pre-push hook
`.githooks/pre-push` runs `npm run lint && npm run build` before any push.
**Activate once per clone:** `npm run setup-hooks`
The hook is versioned in the repo — new team members must run `setup-hooks` after cloning.

## Vercel notes
- The repo is already linked to a Vercel project through `.vercel/project.json`
- Production env vars should be managed in Vercel project settings, not in committed files
- Any change to auth/admin/storage behavior should be mirrored in Vercel env configuration before deploy

## Local development setup
Recommended local setup:

1. Copy `.env.example` into a local env file
2. Add the missing server-only values manually from the proper secret stores
3. Run `npm install`
4. Run `npm run dev`

## Secret handling rules
- Never commit:
  - service role keys
  - AI provider keys
  - email provider keys
  - real anon/public keys from production
  - internal allowlists from live environments
- Never print secret values into docs, issues, or commits
- Rotate credentials immediately if they were ever committed or shared

## Immediate security concern
The repo currently includes tracked env files that appear to contain real credentials:

- `.env.production.verify`
- `.env.auth-test.local`

Treat all secrets found in those files as compromised. The next maintainer should:

1. rotate the exposed credentials
2. remove the files from version control
3. replace them with safe local-only or secret-manager-backed equivalents
