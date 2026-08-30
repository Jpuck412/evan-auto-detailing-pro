create extension if not exists "pgcrypto";

create table if not exists shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  timezone text not null default 'America/New_York',
  currency text not null default 'USD',
  accounting_basis text not null default 'accrual' check (accounting_basis in ('cash','accrual')),
  tax_rate_bps integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists shop_members (
  shop_id uuid not null references shops(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner','manager','detailer','bookkeeper','viewer')),
  hourly_cost numeric(12,2) not null default 0,
  primary key (shop_id,user_id)
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  tags text[] not null default '{}',
  lifetime_value numeric(12,2) not null default 0,
  last_service_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_shop_idx on customers(shop_id);
create index if not exists customers_phone_idx on customers(shop_id,phone);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  year integer,
  make text,
  model text,
  trim text,
  color text,
  vin text,
  plate text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists service_packages (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  name text not null,
  description text,
  retail_price numeric(12,2) not null default 0,
  estimated_labor_minutes integer not null default 0,
  estimated_material_cost numeric(12,2) not null default 0,
  taxable boolean not null default true,
  active boolean not null default true
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_id uuid not null references customers(id),
  vehicle_id uuid not null references vehicles(id),
  stage text not null default 'lead' check (stage in ('lead','quoted','authorized','scheduled','checked_in','in_progress','quality_control','ready_for_pickup','completed','cancelled')),
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  collected numeric(12,2) not null default 0,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','partial','paid','refunded','void')),
  estimated_labor_minutes integer not null default 0,
  actual_labor_minutes integer not null default 0,
  material_cost numeric(12,2) not null default 0,
  labor_cost numeric(12,2) not null default 0,
  gross_profit numeric(12,2) not null default 0,
  gross_margin_pct numeric(7,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_schedule_idx on jobs(shop_id,scheduled_start);
create index if not exists jobs_customer_idx on jobs(shop_id,customer_id);

create table if not exists job_assignments (
  job_id uuid not null references jobs(id) on delete cascade,
  user_id uuid not null references profiles(id),
  primary key(job_id,user_id)
);

create table if not exists inspections (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  area text not null,
  condition text not null check (condition in ('good','attention','damaged')),
  notes text,
  photo_urls text[] not null default '{}',
  customer_acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists estimates (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  job_id uuid references jobs(id) on delete set null,
  customer_id uuid not null references customers(id),
  status text not null default 'draft' check (status in ('draft','sent','viewed','approved','declined','expired')),
  subtotal numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists estimate_lines (
  id uuid primary key default gen_random_uuid(),
  estimate_id uuid not null references estimates(id) on delete cascade,
  service_package_id uuid references service_packages(id),
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  unit_cost numeric(12,2) not null default 0,
  taxable boolean not null default true
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  job_id uuid references jobs(id) on delete set null,
  customer_id uuid not null references customers(id),
  invoice_number text not null,
  due_at timestamptz,
  subtotal numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  balance numeric(12,2) not null default 0,
  status text not null default 'unpaid' check (status in ('unpaid','partial','paid','refunded','void')),
  created_at timestamptz not null default now(),
  unique(shop_id,invoice_number)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete set null,
  job_id uuid references jobs(id) on delete set null,
  amount numeric(12,2) not null,
  tip_amount numeric(12,2) not null default 0,
  method text not null check (method in ('cash','card','ach','check','other')),
  processor text,
  processor_reference text,
  processed_at timestamptz not null default now()
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  code text not null,
  name text not null,
  type text not null check (type in ('asset','liability','equity','revenue','expense','cogs')),
  active boolean not null default true,
  unique(shop_id,code)
);

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  occurred_at timestamptz not null default now(),
  source_type text not null check (source_type in ('invoice','payment','expense','adjustment','deposit','refund')),
  source_id uuid,
  memo text,
  posted boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists journal_lines (
  id uuid primary key default gen_random_uuid(),
  journal_entry_id uuid not null references journal_entries(id) on delete cascade,
  account_id uuid not null references accounts(id),
  debit numeric(12,2) not null default 0,
  credit numeric(12,2) not null default 0,
  memo text,
  check (debit >= 0 and credit >= 0),
  check (not (debit > 0 and credit > 0))
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  vendor text,
  category_account_id uuid not null references accounts(id),
  amount numeric(12,2) not null,
  incurred_at timestamptz not null default now(),
  memo text,
  receipt_url text,
  job_id uuid references jobs(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  sku text,
  name text not null,
  unit text not null default 'each',
  quantity_on_hand numeric(12,3) not null default 0,
  reorder_point numeric(12,3) not null default 0,
  average_unit_cost numeric(12,4) not null default 0,
  retail_unit_price numeric(12,2),
  active boolean not null default true
);

create table if not exists inventory_movements (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  inventory_item_id uuid not null references inventory_items(id),
  job_id uuid references jobs(id) on delete set null,
  quantity_delta numeric(12,3) not null,
  unit_cost numeric(12,4) not null default 0,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists time_entries (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  user_id uuid not null references profiles(id),
  job_id uuid references jobs(id) on delete set null,
  started_at timestamptz not null,
  ended_at timestamptz,
  hourly_cost numeric(12,2) not null default 0
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null,
  interval text not null check (interval in ('month','quarter','year')),
  next_billing_at timestamptz not null,
  active boolean not null default true,
  processor_subscription_id text
);

create table if not exists audit_log (
  id bigint generated always as identity primary key,
  shop_id uuid not null references shops(id) on delete cascade,
  actor_user_id uuid references profiles(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create or replace function user_has_shop_access(target_shop uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from shop_members where shop_id=target_shop and user_id=auth.uid());
$$;

alter table shops enable row level security;
alter table shop_members enable row level security;
alter table customers enable row level security;
alter table vehicles enable row level security;
alter table service_packages enable row level security;
alter table jobs enable row level security;
alter table job_assignments enable row level security;
alter table inspections enable row level security;
alter table estimates enable row level security;
alter table estimate_lines enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table accounts enable row level security;
alter table journal_entries enable row level security;
alter table journal_lines enable row level security;
alter table expenses enable row level security;
alter table inventory_items enable row level security;
alter table inventory_movements enable row level security;
alter table time_entries enable row level security;
alter table memberships enable row level security;
alter table audit_log enable row level security;

create policy shops_member_read on shops for select using (user_has_shop_access(id));
create policy customers_member_all on customers for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy vehicles_member_all on vehicles for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy packages_member_all on service_packages for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy jobs_member_all on jobs for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy estimates_member_all on estimates for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy invoices_member_all on invoices for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy payments_member_all on payments for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy accounts_member_all on accounts for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy journals_member_all on journal_entries for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy expenses_member_all on expenses for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy inventory_member_all on inventory_items for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy inventory_moves_member_all on inventory_movements for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy time_member_all on time_entries for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy memberships_member_all on memberships for all using (user_has_shop_access(shop_id)) with check (user_has_shop_access(shop_id));
create policy audit_member_read on audit_log for select using (user_has_shop_access(shop_id));

-- Child-table policies derive access through their owning record.
create policy assignments_member_all on job_assignments for all
using (exists(select 1 from jobs j where j.id=job_id and user_has_shop_access(j.shop_id)))
with check (exists(select 1 from jobs j where j.id=job_id and user_has_shop_access(j.shop_id)));

create policy inspections_member_all on inspections for all
using (exists(select 1 from jobs j where j.id=job_id and user_has_shop_access(j.shop_id)))
with check (exists(select 1 from jobs j where j.id=job_id and user_has_shop_access(j.shop_id)));

create policy estimate_lines_member_all on estimate_lines for all
using (exists(select 1 from estimates e where e.id=estimate_id and user_has_shop_access(e.shop_id)))
with check (exists(select 1 from estimates e where e.id=estimate_id and user_has_shop_access(e.shop_id)));

create policy journal_lines_member_all on journal_lines for all
using (exists(select 1 from journal_entries j where j.id=journal_entry_id and user_has_shop_access(j.shop_id)))
with check (exists(select 1 from journal_entries j where j.id=journal_entry_id and user_has_shop_access(j.shop_id)));
