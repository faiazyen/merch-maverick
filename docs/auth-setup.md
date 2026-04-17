# Auth Setup

Merch Maverick uses Supabase Auth plus a `profiles` table for business account data.

## What to create

1. Create a Supabase project.
2. Copy your project URL and anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the SQL in [supabase/schema.sql](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/supabase/schema.sql) inside the Supabase SQL editor.

## Auth URLs

Add these redirect URLs in Supabase Auth settings:

- `http://localhost:3000/auth/callback`
- your production URL with `/auth/callback`

Example:

- `https://merch-maverick-preview.vercel.app/auth/callback`

## Optional provider setup

If you want the Google button to work, enable Google in Supabase Auth providers and add the same callback URL there too.

## What gets stored

Each new client account can store:

- full name
- business name
- website
- phone
- industry
- country
- email
- marketing opt-in preference

That data is saved in `public.profiles` and can later support reorders, CRM workflows, and sales follow-ups.
