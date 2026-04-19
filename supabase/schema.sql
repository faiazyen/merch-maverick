create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  business_name text,
  job_title text,
  website text,
  phone text,
  industry text,
  country text,
  estimated_order_volume text,
  preferred_categories text[] not null default '{}',
  marketing_opt_in boolean not null default false,
  profile_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_profile_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_profile_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id);

create table if not exists public.catalog_items (
  id uuid primary key,
  slug text not null unique,
  sku text,
  title text not null,
  category text not null,
  subcategory text,
  description text,
  material text,
  color_family text,
  min_price numeric(12,2) not null default 0,
  max_price numeric(12,2) not null default 0,
  image text,
  badge text,
  moq integer not null default 0,
  lead_time_days integer not null default 21,
  lead_time_label text,
  decoration_methods text[] not null default '{}',
  variants text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.catalog_items enable row level security;

drop policy if exists "Catalog is readable by authenticated users" on public.catalog_items;
create policy "Catalog is readable by authenticated users"
on public.catalog_items
for select
using (auth.role() = 'authenticated');

create table if not exists public.quote_requests (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  catalog_item_id uuid references public.catalog_items(id),
  title text not null,
  category text not null,
  product_name text not null,
  quantity integer not null,
  decoration_method text not null,
  rush boolean not null default false,
  unit_price_min numeric(12,2) not null default 0,
  unit_price_max numeric(12,2) not null default 0,
  total_min numeric(12,2) not null default 0,
  total_max numeric(12,2) not null default 0,
  lead_time text,
  destination text,
  shipping_method text,
  notes text,
  status text not null default 'draft',
  linked_asset_ids uuid[] not null default '{}',
  assigned_to text,
  internal_notes text,
  converted_order_id uuid,
  created_at timestamptz not null default now()
);

alter table public.quote_requests
  add column if not exists catalog_item_id uuid references public.catalog_items(id),
  add column if not exists assigned_to text,
  add column if not exists internal_notes text,
  add column if not exists converted_order_id uuid,
  add column if not exists updated_at timestamptz not null default now();

alter table public.quote_requests enable row level security;

drop policy if exists "Users can view their own quote requests" on public.quote_requests;
create policy "Users can view their own quote requests"
on public.quote_requests
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own quote requests" on public.quote_requests;
create policy "Users can insert their own quote requests"
on public.quote_requests
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own quote requests" on public.quote_requests;
create policy "Users can update their own quote requests"
on public.quote_requests
for update
using (auth.uid() = user_id);

create table if not exists public.orders (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  product_name text not null,
  category text not null,
  quantity integer not null,
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'confirmed',
  status_label text not null default 'Confirmed',
  delivery_date timestamptz,
  source_quote_id uuid,
  reorder_quote_id uuid,
  assigned_to text,
  internal_notes text,
  created_at timestamptz not null default now()
);

alter table public.orders
  add column if not exists source_quote_id uuid,
  add column if not exists assigned_to text,
  add column if not exists internal_notes text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.orders enable row level security;

drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
on public.orders
for select
using (auth.uid() = user_id);

create table if not exists public.order_events (
  id uuid primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  description text,
  state text not null default 'upcoming',
  internal_only boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.order_events
  add column if not exists internal_only boolean not null default false;

alter table public.order_events enable row level security;

drop policy if exists "Users can view their own order events" on public.order_events;
create policy "Users can view their own order events"
on public.order_events
for select
using (auth.uid() = user_id);

create table if not exists public.brand_assets (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text,
  mime_type text,
  size_label text,
  linked_to text not null default 'account',
  linked_id uuid,
  storage_path text,
  status text not null default 'ready',
  created_at timestamptz not null default now()
);

alter table public.brand_assets enable row level security;

drop policy if exists "Users can view their own brand assets" on public.brand_assets;
create policy "Users can view their own brand assets"
on public.brand_assets
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own brand assets" on public.brand_assets;
create policy "Users can insert their own brand assets"
on public.brand_assets
for insert
with check (auth.uid() = user_id);

create table if not exists public.approvals (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'pending',
  due_label text,
  linked_record_type text,
  linked_record_id uuid,
  notes text,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.approvals
  add column if not exists linked_record_type text,
  add column if not exists linked_record_id uuid,
  add column if not exists notes text,
  add column if not exists resolved_at timestamptz;

alter table public.approvals enable row level security;

drop policy if exists "Users can view their own approvals" on public.approvals;
create policy "Users can view their own approvals"
on public.approvals
for select
using (auth.uid() = user_id);

drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at
before update on public.quote_requests
for each row
execute function public.handle_profile_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.handle_profile_updated_at();

insert into public.catalog_items (
  id,
  slug,
  sku,
  title,
  category,
  subcategory,
  description,
  material,
  color_family,
  min_price,
  max_price,
  image,
  badge,
  moq,
  lead_time_days,
  lead_time_label,
  decoration_methods,
  variants
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'premium-cotton-hoodie',
    'MM-HOOD-001',
    'Premium Cotton Hoodie',
    'Apparel',
    'Hoodies',
    'Heavyweight cotton fleece hoodie for team kits, retail drops, and premium onboarding packs.',
    'Organic Cotton',
    'Navy',
    18.50,
    22.50,
    '/images/solutions/corporate/product.jpg',
    'Best Seller',
    50,
    28,
    '3-5 weeks',
    array['embroidery', 'screen-print', 'dtg'],
    array['Navy', 'Black', 'Heather Grey']
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'matte-ceramic-mug',
    'MM-MUG-002',
    'Matte Ceramic Mug',
    'Drinkware',
    'Mugs',
    'Minimal matte mug designed for gifting programs and enterprise welcome kits.',
    'Ceramic',
    'White',
    10.80,
    12.00,
    '/images/solutions/corporate/process.jpg',
    null,
    100,
    24,
    '3-4 weeks',
    array['screen-print', 'sublimation'],
    array['White', 'Charcoal']
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'eco-friendly-tote-bag',
    'MM-TOTE-003',
    'Eco-friendly Tote Bag',
    'Accessories',
    'Tote Bags',
    'Canvas tote with reinforced handles and a generous print-ready front panel.',
    'Organic Cotton',
    'Natural',
    7.50,
    9.80,
    '/images/solutions/events/product.jpg',
    'Program Favorite',
    100,
    21,
    '3-4 weeks',
    array['screen-print', 'embroidery', 'dtg'],
    array['Natural', 'Black', 'Olive']
  )
on conflict (id) do update set
  slug = excluded.slug,
  sku = excluded.sku,
  title = excluded.title,
  category = excluded.category,
  subcategory = excluded.subcategory,
  description = excluded.description,
  material = excluded.material,
  color_family = excluded.color_family,
  min_price = excluded.min_price,
  max_price = excluded.max_price,
  image = excluded.image,
  badge = excluded.badge,
  moq = excluded.moq,
  lead_time_days = excluded.lead_time_days,
  lead_time_label = excluded.lead_time_label,
  decoration_methods = excluded.decoration_methods,
  variants = excluded.variants;
