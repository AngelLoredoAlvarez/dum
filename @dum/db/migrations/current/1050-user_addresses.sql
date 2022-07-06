/*
 * Table that will store all the Addresses from a User
 */
create table dum_public.user_addresses (
  id uuid primary key default gen_random_uuid(),
  town_id uuid references dum_public.towns(id) on update cascade on delete cascade,
  suburb_id uuid references dum_public.suburbs(id) on update cascade on delete cascade,
  street_id uuid references dum_public.streets(id) on update cascade on delete cascade,
  ext_number text,
  int_number text,
  is_main boolean default false,
  user_id uuid not null references dum_public.users(id) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.user_addresses enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.user_addresses to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Towns, Suburbs, Streets owned by a particular User.
create index idx_user_addresses_town on dum_public.user_addresses(town_id);
create index idx_user_addresses_suburb on dum_public.user_addresses(suburb_id);
create index idx_user_addresses_street on dum_public.user_addresses(street_id);
create index idx_user_addresses_user on dum_public.user_addresses(user_id);

-- Users may only manage their own Addresses.
create policy select_own on dum_public.user_addresses for select using (user_id = dum_public.current_user_id());
create policy insert_own on dum_public.user_addresses for insert with check (user_id = dum_public.current_user_id());

comment on table dum_public.user_addresses is
  E'An address own by a User.';

comment on column dum_public.user_addresses.id is
  E'Unique identifier for the Address.';
comment on column dum_public.user_addresses.is_main is
  E'The Main Address of the User';

create trigger _100_timestamps
  before insert or update on dum_public.user_addresses
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Function that returns all the Addresses from the User
 */
 create or replace function dum_public.user_addresses() returns setof dum_public.user_addresses as $$
  select * from dum_public.user_addresses where user_id = dum_public.current_user_id();
 $$ language sql stable;

/*
 * Computed Column that returns the Main Address of the Current User
 */
create or replace function dum_public.users_short_main_address(u dum_public.users) returns text as $$
  declare
    suburb_id uuid;
    suburb_zip_code text;
    settlement_type text;
    suburb_name text;
  begin
    select dum_public.user_addresses.suburb_id from dum_public.user_addresses where is_main = true and user_id = u.id into suburb_id;

    select
      zip_code,
      type,
      name
    into
      suburb_zip_code,
      settlement_type,
      suburb_name
    from
      dum_public.suburbs
    where
      id = suburb_id;

    return suburb_zip_code || ', ' || settlement_type || ' ' || suburb_name;
  end;
$$ language plpgsql stable;
