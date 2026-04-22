-- Fix: catalog_items was missing a public read RLS policy.
-- The portal client (anon key) could not read the table, causing
-- getCatalogPageData() to fall back to hardcoded seed items instead
-- of showing what admin entered.

alter table catalog_items enable row level security;

drop policy if exists "catalog_items_public_read" on catalog_items;

-- Active items are readable by everyone (anon + authenticated)
create policy "catalog_items_public_read"
  on catalog_items for select
  using (is_active = true);
