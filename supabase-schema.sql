-- Run once in Supabase SQL Editor. Never expose the service_role key in config.js.
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  product_id text not null,
  product_name text not null,
  unit_price numeric(10,2) not null check (unit_price >= 0),
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  customer_phone text not null check (char_length(customer_phone) between 7 and 20),
  note text check (char_length(note) <= 400),
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "anonymous order inserts only" on public.orders for insert to anon with check (true);
-- No anonymous SELECT policy: visitors cannot read orders.
