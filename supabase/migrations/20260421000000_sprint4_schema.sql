-- Sprint 4 Schema Migration
-- Additive only — no existing columns removed
-- Run against: ypocfxftazwoxqezafal

-- ─────────────────────────────────────────────
-- 1. catalog_categories
-- ─────────────────────────────────────────────
create table if not exists catalog_categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  display_order integer default 0,
  is_active     boolean default true,
  icon          text,
  created_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- 2. catalog_product_images
-- ─────────────────────────────────────────────
create table if not exists catalog_product_images (
  id            uuid primary key default gen_random_uuid(),
  item_id       uuid references catalog_items(id) on delete cascade,
  url           text not null,
  alt_text      text,
  is_primary    boolean default false,
  display_order integer default 0,
  created_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- 3. catalog_product_variants
-- ─────────────────────────────────────────────
create table if not exists catalog_product_variants (
  id            uuid primary key default gen_random_uuid(),
  item_id       uuid references catalog_items(id) on delete cascade,
  type          text not null,   -- 'color' | 'size'
  label         text not null,
  value         text,            -- hex for color, null for size
  display_order integer default 0,
  is_available  boolean default true,
  created_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- 4. catalog_items — additive columns
-- ─────────────────────────────────────────────
alter table catalog_items
  add column if not exists category_id           uuid references catalog_categories(id),
  add column if not exists pricing_type          text default 'range',
  add column if not exists sale_price            numeric default 0,
  add column if not exists compare_at_price      numeric default 0,
  add column if not exists labels                text[] default '{}',
  add column if not exists supports_direct_order boolean default false,
  add column if not exists is_active             boolean default true;

-- ─────────────────────────────────────────────
-- 5. profiles — additive columns
-- ─────────────────────────────────────────────
alter table profiles
  add column if not exists onboarding_completed boolean default false,
  add column if not exists onboarding_step      integer default 0;

-- ─────────────────────────────────────────────
-- 6. orders — additive columns
-- ─────────────────────────────────────────────
alter table orders
  add column if not exists order_source         text default 'quote_conversion',
  add column if not exists catalog_item_id      uuid references catalog_items(id),
  add column if not exists variant_ids          uuid[] default '{}',
  add column if not exists unit_price           numeric default 0,
  add column if not exists cancellation_reason  text;

-- ─────────────────────────────────────────────
-- 7. Seed catalog_categories
-- ─────────────────────────────────────────────
insert into catalog_categories (slug, name, display_order) values
  ('apparel',      'Apparel',       1),
  ('accessories',  'Accessories',   2),
  ('office',       'Office',        3),
  ('stationery',   'Stationery',    4),
  ('headwear',     'Headwear',      5),
  ('bags',         'Bags',          6),
  ('tech',         'Tech',          7),
  ('drinkware',    'Drinkware',     8)
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────
-- 8. Migrate existing catalog_items data
--    badge → labels[], image → catalog_product_images,
--    variants[] → catalog_product_variants (color),
--    category text → category_id FK
-- ─────────────────────────────────────────────

-- 8a. Set category_id from existing category text
update catalog_items ci
set category_id = cc.id
from catalog_categories cc
where lower(ci.category) = lower(cc.name)
  and ci.category_id is null;

-- 8b. Migrate badge → labels[] (single-element array)
update catalog_items
set labels = array[badge]
where badge is not null
  and badge <> ''
  and (labels is null or labels = '{}');

-- 8c. Migrate primary image
insert into catalog_product_images (item_id, url, alt_text, is_primary, display_order)
select id, image, title, true, 0
from catalog_items
where image is not null and image <> ''
  and not exists (
    select 1 from catalog_product_images pi2
    where pi2.item_id = catalog_items.id and pi2.is_primary = true
  );

-- 8d. Migrate flat variants[] → catalog_product_variants (type=color)
insert into catalog_product_variants (item_id, type, label, display_order)
select
  ci.id,
  'color',
  v.label,
  row_number() over (partition by ci.id order by v.ord) - 1
from catalog_items ci,
  lateral unnest(ci.variants) with ordinality as v(label, ord)
where ci.variants is not null
  and array_length(ci.variants, 1) > 0
  and not exists (
    select 1 from catalog_product_variants pv
    where pv.item_id = ci.id
  );

-- ─────────────────────────────────────────────
-- 9. RLS policies for new tables
-- ─────────────────────────────────────────────

-- catalog_categories: public read, no direct user write
alter table catalog_categories enable row level security;

create policy "catalog_categories_public_read"
  on catalog_categories for select
  using (true);

-- catalog_product_images: public read
alter table catalog_product_images enable row level security;

create policy "catalog_product_images_public_read"
  on catalog_product_images for select
  using (true);

-- catalog_product_variants: public read
alter table catalog_product_variants enable row level security;

create policy "catalog_product_variants_public_read"
  on catalog_product_variants for select
  using (true);
