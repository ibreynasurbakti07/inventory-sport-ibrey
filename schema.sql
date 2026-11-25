-- Sistem persediaan untuk usaha mikro. Stok hanya berubah melalui
-- record_stock_document agar setiap perubahan memiliki dokumen dan jejak kartu gudang.
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

insert into public.categories (name) values
  ('Sepak Bola & Futsal'),
  ('Badminton'),
  ('Basket'),
  ('Running / Lari'),
  ('Gym / Fitness'),
  ('Tenis')
on conflict (name) do nothing;

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default '',
  role text not null default 'employee' check (role in ('manager', 'supervisor', 'employee')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.user_profiles add column if not exists email text not null default '';

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select role from public.user_profiles
  where user_id = auth.uid() and is_active
$$;

create or replace function public.create_employee_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.user_profiles (user_id, email, display_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists create_employee_profile_after_signup on auth.users;
create trigger create_employee_profile_after_signup
after insert on auth.users
for each row execute function public.create_employee_profile();

insert into public.user_profiles (user_id, email, display_name)
select id, coalesce(email, ''), coalesce(raw_user_meta_data->>'full_name', '')
from auth.users
on conflict (user_id) do update
set email = excluded.email
where public.user_profiles.email = '';

create or replace function public.set_user_role(p_user_id uuid, p_role text, p_is_active boolean default true)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'manager' then
    raise exception 'Hanya manager yang dapat mengelola akun dan role.';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'Manager tidak dapat mengubah role atau status akunnya sendiri.';
  end if;
  if p_role is null or p_role not in ('manager', 'supervisor', 'employee') then
    raise exception 'Role pengguna tidak valid.';
  end if;
  if exists (
    select 1 from public.user_profiles
    where user_id = p_user_id and role = 'manager' and is_active
  ) and (p_role <> 'manager' or not p_is_active) and not exists (
    select 1 from public.user_profiles
    where user_id <> p_user_id and role = 'manager' and is_active
  ) then
    raise exception 'Sistem harus memiliki setidaknya satu manager aktif.';
  end if;
  update public.user_profiles
  set role = p_role, is_active = p_is_active, updated_at = now()
  where user_id = p_user_id;
  if not found then
    raise exception 'Profil pengguna tidak ditemukan.';
  end if;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  supplier_id uuid references public.suppliers(id) on delete set null,
  name text not null,
  brand text not null default '',
  sku text not null unique,
  unit text not null default 'pcs',
  selling_price bigint check (selling_price is null or selling_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  min_stock integer not null default 5 check (min_stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Menambahkan dokumen dan kartu gudang pada instalasi lama tanpa menghapus katalog.
alter table public.products add column if not exists updated_at timestamptz not null default now();
alter table public.products add column if not exists brand text not null default '';
alter table public.products add column if not exists selling_price bigint check (selling_price is null or selling_price >= 0);

-- Initial catalog and balances are demo data; replace the quantities after physical counting.
with catalog (sample_index, sku, category_name, name, brand, unit, selling_price) as (values
  (1, 'SFF-001', 'Sepak Bola & Futsal', 'Bola Sepak Bola', 'Adidas', 'pcs', 450000),
  (2, 'SFF-002', 'Sepak Bola & Futsal', 'Bola Sepak Bola', 'Nike', 'pcs', 500000),
  (3, 'SFF-003', 'Sepak Bola & Futsal', 'Bola Futsal', 'Specs', 'pcs', 250000),
  (4, 'SFF-004', 'Sepak Bola & Futsal', 'Bola Futsal', 'Mikasa', 'pcs', 350000),
  (5, 'SFF-005', 'Sepak Bola & Futsal', 'Sepatu Futsal', 'Specs', 'pasang', 450000),
  (6, 'SFF-006', 'Sepak Bola & Futsal', 'Sepatu Futsal', 'Ortuseight', 'pasang', 550000),
  (7, 'SFF-007', 'Sepak Bola & Futsal', 'Sepatu Bola', 'Adidas', 'pasang', 1200000),
  (8, 'SFF-008', 'Sepak Bola & Futsal', 'Sepatu Bola', 'Nike', 'pasang', 1350000),
  (9, 'SFF-009', 'Sepak Bola & Futsal', 'Jersey Sepak Bola', 'Adidas', 'pcs', 650000),
  (10, 'SFF-010', 'Sepak Bola & Futsal', 'Jersey Sepak Bola', 'Nike', 'pcs', 700000),
  (11, 'SFF-011', 'Sepak Bola & Futsal', 'Kaos Kaki Bola', 'Specs', 'pasang', 75000),
  (12, 'SFF-012', 'Sepak Bola & Futsal', 'Shin Guard', 'Nike', 'pasang', 150000),
  (13, 'SFF-013', 'Sepak Bola & Futsal', 'Sarung Tangan Kiper', 'Adidas', 'pasang', 450000),
  (14, 'SFF-014', 'Sepak Bola & Futsal', 'Tas Sepak Bola', 'Adidas', 'pcs', 650000),
  (15, 'SFF-015', 'Sepak Bola & Futsal', 'Cone Latihan', 'Specs', 'pcs', 25000),
  (16, 'BDM-001', 'Badminton', 'Raket Badminton', 'Yonex', 'pcs', 1200000),
  (17, 'BDM-002', 'Badminton', 'Raket Badminton', 'Li-Ning', 'pcs', 1000000),
  (18, 'BDM-003', 'Badminton', 'Raket Badminton', 'Victor', 'pcs', 1300000),
  (19, 'BDM-004', 'Badminton', 'Shuttlecock', 'Yonex', 'tube', 250000),
  (20, 'BDM-005', 'Badminton', 'Shuttlecock', 'RSL', 'tube', 220000),
  (21, 'BDM-006', 'Badminton', 'Grip Raket', 'Yonex', 'pcs', 35000),
  (22, 'BDM-007', 'Badminton', 'Grip Raket', 'Li-Ning', 'pcs', 30000),
  (23, 'BDM-008', 'Badminton', 'Senar Raket', 'Yonex', 'pcs', 120000),
  (24, 'BDM-009', 'Badminton', 'Tas Raket', 'Yonex', 'pcs', 650000),
  (25, 'BDM-010', 'Badminton', 'Sepatu Badminton', 'Yonex', 'pasang', 850000),
  (26, 'BDM-011', 'Badminton', 'Kaos Badminton', 'Li-Ning', 'pcs', 350000),
  (27, 'BSK-001', 'Basket', 'Bola Basket', 'Molten', 'pcs', 550000),
  (28, 'BSK-002', 'Basket', 'Bola Basket', 'Spalding', 'pcs', 650000),
  (29, 'BSK-003', 'Basket', 'Sepatu Basket', 'Nike', 'pasang', 1500000),
  (30, 'BSK-004', 'Basket', 'Sepatu Basket', 'Adidas', 'pasang', 1400000),
  (31, 'BSK-005', 'Basket', 'Jersey Basket', 'Nike', 'pcs', 650000),
  (32, 'BSK-006', 'Basket', 'Kaos Kaki Basket', 'Nike', 'pasang', 100000),
  (33, 'BSK-007', 'Basket', 'Ring Basket Mini', 'Spalding', 'pcs', 850000),
  (34, 'BSK-008', 'Basket', 'Wristband', 'Nike', 'pcs', 100000),
  (35, 'RUN-001', 'Running / Lari', 'Sepatu Running', 'Nike', 'pasang', 1500000),
  (36, 'RUN-002', 'Running / Lari', 'Sepatu Running', 'Adidas', 'pasang', 1400000),
  (37, 'RUN-003', 'Running / Lari', 'Sepatu Running', 'Asics', 'pasang', 1600000),
  (38, 'RUN-004', 'Running / Lari', 'Sepatu Running', 'New Balance', 'pasang', 1500000),
  (39, 'RUN-005', 'Running / Lari', 'Running Shorts', 'Adidas', 'pcs', 400000),
  (40, 'RUN-006', 'Running / Lari', 'Running Shirt', 'Nike', 'pcs', 450000),
  (41, 'RUN-007', 'Running / Lari', 'Kaos Kaki Running', 'Asics', 'pasang', 120000),
  (42, 'RUN-008', 'Running / Lari', 'Running Cap', 'Nike', 'pcs', 250000),
  (43, 'RUN-009', 'Running / Lari', 'Running Belt', 'Adidas', 'pcs', 300000),
  (44, 'RUN-010', 'Running / Lari', 'Botol Minum', 'Adidas', 'pcs', 250000),
  (45, 'FIT-001', 'Gym / Fitness', 'Dumbbell 5 kg', 'Adidas', 'pcs', 450000),
  (46, 'FIT-002', 'Gym / Fitness', 'Dumbbell 10 kg', 'Adidas', 'pcs', 800000),
  (47, 'FIT-003', 'Gym / Fitness', 'Kettlebell 8 kg', 'Adidas', 'pcs', 700000),
  (48, 'FIT-004', 'Gym / Fitness', 'Resistance Band', 'Adidas', 'pcs', 250000),
  (49, 'FIT-005', 'Gym / Fitness', 'Yoga Mat', 'Adidas', 'pcs', 400000),
  (50, 'FIT-006', 'Gym / Fitness', 'Skipping Rope', 'Nike', 'pcs', 250000),
  (51, 'FIT-007', 'Gym / Fitness', 'Gym Gloves', 'Nike', 'pasang', 300000),
  (52, 'FIT-008', 'Gym / Fitness', 'Wrist Wrap', 'Adidas', 'pasang', 250000),
  (53, 'FIT-009', 'Gym / Fitness', 'Weightlifting Belt', 'Adidas', 'pcs', 500000),
  (54, 'FIT-010', 'Gym / Fitness', 'Foam Roller', 'Adidas', 'pcs', 450000),
  (55, 'FIT-011', 'Gym / Fitness', 'Gym Bag', 'Nike', 'pcs', 600000),
  (56, 'FIT-012', 'Gym / Fitness', 'Shaker Bottle', 'Adidas', 'pcs', 200000),
  (57, 'TNS-001', 'Tenis', 'Raket Tenis', 'Wilson', 'pcs', 1500000),
  (58, 'TNS-002', 'Tenis', 'Raket Tenis', 'Babolat', 'pcs', 1800000),
  (59, 'TNS-003', 'Tenis', 'Bola Tenis', 'Wilson', 'tube', 150000),
  (60, 'TNS-004', 'Tenis', 'Bola Tenis', 'Head', 'tube', 140000),
  (61, 'TNS-005', 'Tenis', 'Sepatu Tenis', 'Adidas', 'pasang', 1300000),
  (62, 'TNS-006', 'Tenis', 'Grip Raket', 'Wilson', 'pcs', 40000),
  (63, 'TNS-007', 'Tenis', 'Tas Raket Tenis', 'Wilson', 'pcs', 700000)
)
insert into public.products
  (category_id, name, brand, sku, unit, selling_price, stock, min_stock)
select categories.id, catalog.name, catalog.brand, catalog.sku, catalog.unit, catalog.selling_price,
       case when mod(catalog.sample_index - 1, 17) = 6 then 0
            else 6 + mod((catalog.sample_index - 1) * 11 + 4, 25) end,
       8
from catalog
join public.categories on categories.name = catalog.category_name
on conflict (sku) do nothing;

create table if not exists public.stock_documents (
  id uuid primary key default gen_random_uuid(),
  document_no text not null unique,
  document_type text not null check (
    document_type in ('opening', 'purchase', 'sale', 'purchase_return', 'sales_return', 'stocktake')
  ),
  document_date date not null default current_date,
  partner_name text,
  purchase_location text,
  received_by text,
  handled_by text,
  note text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  recorded_by uuid references auth.users(id) on delete set null,
  recorded_by_email text,
  approved_by uuid references auth.users(id) on delete set null,
  approved_by_email text,
  approved_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now()
);

alter table public.stock_documents add column if not exists recorded_by_email text;
alter table public.stock_documents add column if not exists purchase_location text;
alter table public.stock_documents add column if not exists received_by text;
alter table public.stock_documents add column if not exists status text not null default 'approved';
alter table public.stock_documents add column if not exists approved_by uuid references auth.users(id) on delete set null;
alter table public.stock_documents add column if not exists approved_by_email text;
alter table public.stock_documents add column if not exists approved_at timestamptz;
alter table public.stock_documents add column if not exists rejection_reason text;
alter table public.stock_documents add column if not exists rejected_by uuid references auth.users(id) on delete set null;
alter table public.stock_documents add column if not exists rejected_by_email text;
alter table public.stock_documents add column if not exists rejected_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.stock_documents'::regclass
      and conname = 'stock_documents_status_check'
  ) then
    alter table public.stock_documents
      add constraint stock_documents_status_check check (status in ('pending', 'approved', 'rejected'));
  end if;
end;
$$;

create table if not exists public.stock_document_lines (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.stock_documents(id) on delete restrict,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity >= 0),
  system_stock integer not null check (system_stock >= 0),
  physical_stock integer check (physical_stock >= 0),
  difference integer,
  counted_by text,
  created_at timestamptz not null default now(),
  unique (document_id, product_id),
  check (
    (physical_stock is null and difference is null and counted_by is null)
    or (physical_stock is not null and difference = physical_stock - system_stock and counted_by is not null)
  )
);

create table if not exists public.warehouse_card_entries (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.stock_documents(id) on delete restrict,
  document_line_id uuid not null unique references public.stock_document_lines(id) on delete restrict,
  product_id uuid not null references public.products(id) on delete restrict,
  movement_type text not null check (movement_type in ('in', 'out')),
  quantity integer not null check (quantity > 0),
  stock_before integer not null check (stock_before >= 0),
  stock_after integer not null check (stock_after >= 0),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  check (
    (movement_type = 'in' and stock_after = stock_before + quantity)
    or (movement_type = 'out' and stock_before = stock_after + quantity)
  )
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_supplier_id_idx on public.products(supplier_id);
create index if not exists stock_documents_date_idx on public.stock_documents(document_date desc);
create index if not exists stock_document_lines_product_idx on public.stock_document_lines(product_id, created_at desc);
create index if not exists warehouse_card_product_created_idx on public.warehouse_card_entries(product_id, created_at);
create index if not exists warehouse_card_document_idx on public.warehouse_card_entries(document_id);

-- Hentikan trigger mutasi lama: pencatatan stok sekarang dilakukan atomik oleh RPC.
do $$
begin
  if to_regclass('public.stock_movements') is not null then
    execute 'drop trigger if exists stock_movement_updates_product on public.stock_movements';
    execute 'revoke all on public.stock_movements from authenticated';
  end if;
end;
$$;

-- Saldo saat skema diterapkan menjadi saldo awal kartu gudang, termasuk pada instalasi lama.
insert into public.stock_documents (document_no, document_type, document_date, note, status)
values ('SALDO-AWAL-SKEMA-V1', 'opening', current_date, 'Saldo sistem saat skema persediaan diterapkan.', 'approved')
on conflict (document_no) do nothing;

insert into public.stock_document_lines
  (document_id, product_id, quantity, system_stock)
select d.id, p.id, p.stock, 0
from public.stock_documents d
cross join public.products p
where d.document_no = 'SALDO-AWAL-SKEMA-V1'
  and p.stock > 0
  and not exists (
    select 1 from public.warehouse_card_entries e where e.product_id = p.id
  )
on conflict (document_id, product_id) do nothing;

insert into public.warehouse_card_entries
  (document_id, document_line_id, product_id, movement_type, quantity, stock_before, stock_after)
select l.document_id, l.id, l.product_id, 'in', l.quantity, 0, l.quantity
from public.stock_document_lines l
join public.stock_documents d on d.id = l.document_id
where d.document_no = 'SALDO-AWAL-SKEMA-V1'
  and l.quantity > 0
  and not exists (
    select 1 from public.warehouse_card_entries e where e.document_line_id = l.id
  );

insert into public.stock_documents
  (document_no, document_type, document_date, partner_name, purchase_location, received_by,
   handled_by, note, status, recorded_by_email, approved_by_email, approved_at, created_at)
values
  ('DEMO-BELI-001', 'purchase', current_date, 'Toko Olahraga Jaya', 'Bandung · Toko fisik', 'Rina Penerima',
   null, 'Contoh pembelian bola dan raket; data demo.', 'approved', 'andi.gudang@demo.sportstock.test', 'sari.spv@demo.sportstock.test', now(), now() + interval '1 second'),
  ('DEMO-JUAL-001', 'sale', current_date, 'Pelanggan Demo', null, null,
   null, 'Contoh pengeluaran barang; data demo.', 'approved', 'andi.gudang@demo.sportstock.test', 'sari.spv@demo.sportstock.test', now(), now() + interval '2 seconds'),
  ('DEMO-RETUR-BELI-001', 'purchase_return', current_date, 'Toko Olahraga Jaya', 'Bandung · Toko fisik', null,
   null, 'Contoh retur pembelian; data demo.', 'approved', 'andi.gudang@demo.sportstock.test', 'sari.spv@demo.sportstock.test', now(), now() + interval '3 seconds'),
  ('DEMO-RETUR-JUAL-001', 'sales_return', current_date, 'Pelanggan Demo', null, 'Rina Penerima',
   null, 'Contoh retur penjualan; data demo.', 'approved', 'andi.gudang@demo.sportstock.test', 'sari.spv@demo.sportstock.test', now(), now() + interval '4 seconds'),
  ('DEMO-OPNAME-001', 'stocktake', current_date, null, null, null,
   'Sari SPV', 'Contoh pemeriksaan dan penyesuaian fisik; data demo.', 'approved', 'andi.gudang@demo.sportstock.test', 'sari.spv@demo.sportstock.test', now(), now() + interval '5 seconds')
on conflict (document_no) do nothing;

insert into public.stock_document_lines
  (document_id, product_id, quantity, system_stock, physical_stock, difference, counted_by)
select d.id, p.id, sample.quantity, sample.system_stock, sample.physical_stock, sample.difference, sample.counted_by
from (values
  ('DEMO-BELI-001', 'SFF-001', 5, 10, null::integer, null::integer, null::text),
  ('DEMO-BELI-001', 'BDM-001', 3, 25, null::integer, null::integer, null::text),
  ('DEMO-JUAL-001', 'SFF-001', 2, 15, null::integer, null::integer, null::text),
  ('DEMO-JUAL-001', 'BDM-001', 2, 28, null::integer, null::integer, null::text),
  ('DEMO-RETUR-BELI-001', 'SFF-001', 1, 13, null::integer, null::integer, null::text),
  ('DEMO-RETUR-JUAL-001', 'BDM-001', 1, 26, null::integer, null::integer, null::text),
  ('DEMO-OPNAME-001', 'SFF-001', 2, 12, 10, -2, 'Rina Penghitung'),
  ('DEMO-OPNAME-001', 'BDM-001', 3, 27, 25, -2, 'Rina Penghitung')
) as sample(document_no, sku, quantity, system_stock, physical_stock, difference, counted_by)
join public.stock_documents d on d.document_no = sample.document_no
join public.products p on p.sku = sample.sku
on conflict (document_id, product_id) do nothing;

insert into public.warehouse_card_entries
  (document_id, document_line_id, product_id, movement_type, quantity, stock_before, stock_after, created_at)
select d.id, l.id, p.id, sample.movement_type, sample.quantity, sample.stock_before,
       sample.stock_after, d.created_at
from (values
  ('DEMO-BELI-001', 'SFF-001', 'in', 5, 10, 15),
  ('DEMO-BELI-001', 'BDM-001', 'in', 3, 25, 28),
  ('DEMO-JUAL-001', 'SFF-001', 'out', 2, 15, 13),
  ('DEMO-JUAL-001', 'BDM-001', 'out', 2, 28, 26),
  ('DEMO-RETUR-BELI-001', 'SFF-001', 'out', 1, 13, 12),
  ('DEMO-RETUR-JUAL-001', 'BDM-001', 'in', 1, 26, 27),
  ('DEMO-OPNAME-001', 'SFF-001', 'out', 2, 12, 10),
  ('DEMO-OPNAME-001', 'BDM-001', 'out', 2, 27, 25)
) as sample(document_no, sku, movement_type, quantity, stock_before, stock_after)
join public.stock_documents d on d.document_no = sample.document_no
join public.stock_document_lines l on l.document_id = d.id
join public.products p on p.id = l.product_id and p.sku = sample.sku
on conflict (document_line_id) do nothing;

drop function if exists public.record_stock_document(text, text, date, text, text, text, jsonb);

create or replace function public.record_stock_document(
  p_document_no text,
  p_document_type text,
  p_document_date date,
  p_partner_name text,
  p_handled_by text,
  p_purchase_location text,
  p_received_by text,
  p_note text,
  p_lines jsonb
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
declare
  v_document_id uuid;
  v_line jsonb;
  v_product_id uuid;
  v_stock integer;
  v_quantity integer;
  v_physical_stock integer;
  v_difference integer;
  v_new_stock integer;
  v_line_count integer := 0;
begin
  if auth.uid() is null then
    raise exception 'Silakan masuk untuk mencatat dokumen persediaan.';
  end if;
  if public.current_app_role() is distinct from 'employee' then
    raise exception 'Hanya karyawan yang dapat mencatat dokumen persediaan.';
  end if;
  if p_document_type is null or p_document_type not in ('opening', 'purchase', 'sale', 'purchase_return', 'sales_return', 'stocktake') then
    raise exception 'Jenis dokumen persediaan tidak valid.';
  end if;
  if nullif(trim(p_document_no), '') is null then
    raise exception 'Nomor dokumen wajib diisi.';
  end if;
  if p_lines is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) = 0 then
    raise exception 'Dokumen harus memuat setidaknya satu barang.';
  end if;
  if p_document_type = 'stocktake' and nullif(trim(p_handled_by), '') is null then
    raise exception 'Nama petugas yang melakukan stok opname wajib diisi.';
  end if;
  if p_document_type = 'purchase' and (
    nullif(trim(p_partner_name), '') is null
    or nullif(trim(p_purchase_location), '') is null
    or nullif(trim(p_received_by), '') is null
  ) then
    raise exception 'Nama vendor, lokasi pembelian, dan petugas penerima wajib diisi.';
  end if;

  insert into public.stock_documents
    (document_no, document_type, document_date, partner_name, purchase_location, received_by,
     handled_by, note, status, recorded_by, recorded_by_email)
  values
    (trim(p_document_no), p_document_type, coalesce(p_document_date, current_date),
     nullif(trim(p_partner_name), ''), nullif(trim(p_purchase_location), ''),
     nullif(trim(p_received_by), ''), nullif(trim(p_handled_by), ''),
     nullif(trim(p_note), ''), 'pending', auth.uid(), auth.jwt()->>'email')
  returning id into v_document_id;

  for v_line in
    select value from jsonb_array_elements(p_lines)
    order by (value->>'product_id')::uuid
  loop
    v_line_count := v_line_count + 1;
    v_product_id := (v_line->>'product_id')::uuid;
    select stock into v_stock
    from public.products
    where id = v_product_id
    for update;
    if not found then
      raise exception 'Barang pada dokumen tidak ditemukan.';
    end if;

    if p_document_type = 'stocktake' then
      v_physical_stock := (v_line->>'physical_stock')::integer;
      if v_physical_stock is null or v_physical_stock < 0 then
        raise exception 'Jumlah stok fisik harus berupa bilangan nol atau lebih.';
      end if;
      if nullif(trim(v_line->>'counted_by'), '') is null then
        raise exception 'Nama pencatat hitung fisik wajib diisi.';
      end if;
      v_difference := v_physical_stock - v_stock;
      v_quantity := abs(v_difference);
      v_new_stock := v_physical_stock;
    else
      v_quantity := (v_line->>'quantity')::integer;
      if v_quantity is null or v_quantity <= 0 then
        raise exception 'Jumlah barang harus lebih dari nol.';
      end if;
      if p_document_type = 'opening' and (v_stock <> 0 or exists (
        select 1 from public.warehouse_card_entries where product_id = v_product_id
      )) then
        raise exception 'Saldo awal hanya dapat dicatat sebelum barang memiliki saldo atau kartu gudang.';
      end if;
      v_physical_stock := null;
      v_difference := null;
      v_new_stock := case
        when p_document_type in ('opening', 'purchase', 'sales_return') then v_stock + v_quantity
        else v_stock - v_quantity
      end;
      if v_new_stock < 0 then
        raise exception 'Stok tidak mencukupi untuk dokumen barang keluar.';
      end if;
    end if;

    insert into public.stock_document_lines
      (document_id, product_id, quantity, system_stock, physical_stock, difference, counted_by)
    values
      (v_document_id, v_product_id, v_quantity, v_stock, v_physical_stock, v_difference,
       nullif(trim(v_line->>'counted_by'), ''));
  end loop;

  if v_line_count <> jsonb_array_length(p_lines) then
    raise exception 'Dokumen mengandung baris barang yang tidak valid.';
  end if;
  return v_document_id;
end;
$$;

create or replace function public.approve_stock_document(p_document_id uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
declare
  v_document public.stock_documents%rowtype;
  v_line public.stock_document_lines%rowtype;
  v_stock integer;
  v_new_stock integer;
  v_difference integer;
  v_movement_type text;
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'supervisor' then
    raise exception 'Hanya SPV yang dapat menyetujui dokumen.';
  end if;

  select * into v_document
  from public.stock_documents
  where id = p_document_id
  for update;
  if not found or v_document.status <> 'pending' then
    raise exception 'Dokumen tidak ditemukan atau sudah diproses.';
  end if;
  if v_document.recorded_by = auth.uid() then
    raise exception 'Pencatat tidak boleh menyetujui dokumennya sendiri.';
  end if;

  for v_line in
    select * from public.stock_document_lines
    where document_id = v_document.id
    order by product_id
    for update
  loop
    select stock into v_stock
    from public.products
    where id = v_line.product_id
    for update;
    if not found then
      raise exception 'Barang pada dokumen tidak ditemukan.';
    end if;

    if v_document.document_type = 'stocktake' then
      if v_stock <> v_line.system_stock then
        raise exception 'Saldo barang berubah sejak penghitungan. Tolak dokumen ini dan minta stok opname ulang.';
      end if;
      v_difference := v_line.physical_stock - v_stock;
      v_new_stock := v_line.physical_stock;
      update public.stock_document_lines
      set system_stock = v_stock, difference = v_difference, quantity = abs(v_difference)
      where id = v_line.id;
    else
      v_new_stock := case
        when v_document.document_type in ('opening', 'purchase', 'sales_return') then v_stock + v_line.quantity
        else v_stock - v_line.quantity
      end;
      if v_document.document_type = 'opening' and (v_stock <> 0 or exists (
        select 1 from public.warehouse_card_entries where product_id = v_line.product_id
      )) then
        raise exception 'Saldo awal hanya dapat disetujui sebelum barang memiliki saldo atau kartu gudang.';
      end if;
      if v_new_stock < 0 then
        raise exception 'Stok tidak mencukupi untuk menyetujui dokumen barang keluar.';
      end if;
      update public.stock_document_lines
      set system_stock = v_stock
      where id = v_line.id;
    end if;

    if v_new_stock <> v_stock then
      v_movement_type := case when v_new_stock > v_stock then 'in' else 'out' end;
      update public.products
      set stock = v_new_stock, updated_at = now()
      where id = v_line.product_id;
      insert into public.warehouse_card_entries
        (document_id, document_line_id, product_id, movement_type, quantity,
         stock_before, stock_after, created_by)
      values
        (v_document.id, v_line.id, v_line.product_id, v_movement_type, abs(v_new_stock - v_stock),
         v_stock, v_new_stock, auth.uid());
    end if;
  end loop;

  update public.stock_documents
  set status = 'approved', approved_by = auth.uid(),
      approved_by_email = auth.jwt()->>'email', approved_at = now()
  where id = v_document.id;
end;
$$;

create or replace function public.reject_stock_document(p_document_id uuid, p_reason text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
declare
  v_document public.stock_documents%rowtype;
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'supervisor' then
    raise exception 'Hanya SPV yang dapat menolak dokumen.';
  end if;
  select * into v_document
  from public.stock_documents
  where id = p_document_id
  for update;
  if not found or v_document.status <> 'pending' then
    raise exception 'Dokumen tidak ditemukan atau sudah diproses.';
  end if;
  if v_document.recorded_by = auth.uid() then
    raise exception 'Pencatat tidak boleh menolak dokumennya sendiri.';
  end if;
  if nullif(trim(p_reason), '') is null then
    raise exception 'Alasan penolakan wajib diisi.';
  end if;
  update public.stock_documents
  set status = 'rejected', rejection_reason = trim(p_reason),
      rejected_by = auth.uid(), rejected_by_email = auth.jwt()->>'email', rejected_at = now()
  where id = v_document.id;
end;
$$;

revoke all on function public.record_stock_document(text, text, date, text, text, text, text, text, jsonb) from public;
grant execute on function public.record_stock_document(text, text, date, text, text, text, text, text, jsonb) to authenticated;
revoke all on function public.approve_stock_document(uuid) from public;
grant execute on function public.approve_stock_document(uuid) to authenticated;
revoke all on function public.reject_stock_document(uuid, text) from public;
grant execute on function public.reject_stock_document(uuid, text) to authenticated;
revoke all on function public.set_user_role(uuid, text, boolean) from public;
grant execute on function public.set_user_role(uuid, text, boolean) to authenticated;
revoke all on function public.current_app_role() from public;
grant execute on function public.current_app_role() to authenticated;

alter table public.categories enable row level security;
alter table public.suppliers enable row level security;
alter table public.user_profiles enable row level security;
alter table public.products enable row level security;
alter table public.stock_documents enable row level security;
alter table public.stock_document_lines enable row level security;
alter table public.warehouse_card_entries enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.categories, public.suppliers to authenticated;
grant select on public.user_profiles to authenticated;
revoke insert, update, delete on public.user_profiles from authenticated;
grant select on public.products, public.stock_documents, public.stock_document_lines, public.warehouse_card_entries to authenticated;
revoke insert, update, delete on public.products from authenticated;
revoke insert (stock), update (stock) on public.products from authenticated;
grant insert (category_id, supplier_id, name, brand, sku, unit, selling_price, min_stock) on public.products to authenticated;
grant update (category_id, supplier_id, name, brand, sku, unit, selling_price, min_stock) on public.products to authenticated;

drop policy if exists "Authenticated users manage categories" on public.categories;
drop policy if exists "Authenticated users read categories" on public.categories;
drop policy if exists "Managers manage categories" on public.categories;
create policy "Authenticated users read categories" on public.categories
for select to authenticated using (public.current_app_role() is not null);
create policy "Managers manage categories" on public.categories
for all to authenticated using (public.current_app_role() = 'manager')
with check (public.current_app_role() = 'manager');

drop policy if exists "Authenticated users manage suppliers" on public.suppliers;
drop policy if exists "Authenticated users read suppliers" on public.suppliers;
drop policy if exists "Managers manage suppliers" on public.suppliers;
create policy "Authenticated users read suppliers" on public.suppliers
for select to authenticated using (public.current_app_role() is not null);
create policy "Managers manage suppliers" on public.suppliers
for all to authenticated using (public.current_app_role() = 'manager')
with check (public.current_app_role() = 'manager');

drop policy if exists "Users read own or managers read all profiles" on public.user_profiles;
create policy "Users read own or managers read all profiles" on public.user_profiles
for select to authenticated using (
  user_id = auth.uid() or public.current_app_role() = 'manager'
);

drop policy if exists "Authenticated users manage products" on public.products;
drop policy if exists "Authenticated users create products" on public.products;
drop policy if exists "Authenticated users edit product details" on public.products;
drop policy if exists "Authenticated users read products" on public.products;
drop policy if exists "Managers manage products" on public.products;
create policy "Authenticated users read products" on public.products
for select to authenticated using (public.current_app_role() is not null);
create policy "Managers manage products" on public.products
for all to authenticated using (public.current_app_role() = 'manager')
with check (public.current_app_role() = 'manager');

drop policy if exists "Authenticated users read stock documents" on public.stock_documents;
create policy "Authenticated users read stock documents" on public.stock_documents
for select to authenticated using (public.current_app_role() is not null);

drop policy if exists "Authenticated users read stock document lines" on public.stock_document_lines;
create policy "Authenticated users read stock document lines" on public.stock_document_lines
for select to authenticated using (public.current_app_role() is not null);

drop policy if exists "Authenticated users read warehouse card" on public.warehouse_card_entries;
create policy "Authenticated users read warehouse card" on public.warehouse_card_entries
for select to authenticated using (public.current_app_role() is not null);
