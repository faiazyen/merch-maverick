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
  title text not null,
  category text not null,
  subcategory text,
  description text,
  material text,
  color_family text,
  min_price numeric(12,2) not null default 0,
  image text,
  badge text,
  moq integer not null default 0,
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
  created_at timestamptz not null default now()
);

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
  reorder_quote_id uuid,
  created_at timestamptz not null default now()
);

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
  created_at timestamptz not null default now()
);

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
  size_label text,
  linked_to text not null default 'account',
  linked_id uuid,
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
  created_at timestamptz not null default now()
);

alter table public.approvals enable row level security;

drop policy if exists "Users can view their own approvals" on public.approvals;
create policy "Users can view their own approvals"
on public.approvals
for select
using (auth.uid() = user_id);
