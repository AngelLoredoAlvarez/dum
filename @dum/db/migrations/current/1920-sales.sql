/*
 * Table that will store all the information about a customer sale
 */
create table dum_public.sales (
  id uuid primary key default gen_random_uuid(),
  unformated_total numeric(8,2) not null,
  user_id uuid not null references dum_public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table dum_public.sales is
  E'A sale associated to a user';

comment on column dum_public.sales.id is
  E'A unique identifier for a sale.';
comment on column dum_public.sales.unformated_total is
  E'The total cost of the sale.';

-- Enable ROW lEVEL SECURITY
alter table dum_public.sales enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.sales to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Sales owned by a particular User.
create index idx_user_sales on dum_public.sales(user_id);

-- Users may only manage their own sales.
create policy select_own on dum_public.sales for select using (user_id = dum_public.current_user_id());
create policy insert_own on dum_public.sales for insert with check (user_id = dum_public.current_user_id());

/*
 * Computed Column that returns the price in a users friendly format
 */
create or replace function dum_public.sales_total(sale dum_public.sales) returns text as $$
  select cast(sale.unformated_total as money);
$$ language sql stable;

