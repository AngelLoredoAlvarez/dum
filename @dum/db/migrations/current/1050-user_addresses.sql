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
    town_id uuid;
    suburb_id uuid;
    town_name text;
    settlement_type text;
    suburb_name text;
  begin
    select
      dum_public.user_addresses.town_id,
      dum_public.user_addresses.suburb_id
    into
      town_id,
      suburb_id
    from
      dum_public.user_addresses
    where
      is_main = true
    and
      user_id = u.id;

    select name from dum_public.towns where id = town_id into town_name;

    select
      type,
      name
    into
      settlement_type,
      suburb_name
    from
      dum_public.suburbs
    where
      id = suburb_id;

    return town_name || ', ' || settlement_type || ' ' || suburb_name;
  end;
$$ language plpgsql stable;

/*
 * Computed Column that returns a short version of the addresses related to a user
 */
create or replace function dum_public.user_addresses_full_address(ua dum_public.user_addresses) returns text as $$
  declare
    full_address text;
    street text;
    settlement_type text;
    suburb text;
    town text;
  begin
    select name from dum_public.streets where id = ua.street_id into street;

    select
      type,
      name
    into
      settlement_type,
      suburb
    from
      dum_public.suburbs
    where
      id = ua.suburb_id;

    select name from dum_public.towns where id = ua.town_id into town;

    if ua.int_number <> '' then
      full_address := 'CALLE ' || street || ' #' || ua.ext_number || ' Int. ' || ua.int_number || ', ' || settlement_type || ' ' || suburb || ', ' || town;
    else
      full_address := 'CALLE ' || street || ' #' || ua.ext_number || ', ' || settlement_type || ' ' || suburb || ', ' || town;
    end if;

    return full_address;
  end;
$$ language plpgsql stable;

/*
 * Computed Column that returns the Full Address from the Current User
 */
create or replace function dum_public.users_full_main_address(u dum_public.users) returns text as $$
  declare
    full_address text := 'FUCK';
    current_user_street_id uuid;
    current_user_street_name text;
    current_user_street_ext_number text;
    current_user_street_int_number text;
    current_user_suburb_id uuid;
    current_user_settlement_type text;
    current_user_suburb_name text;
    current_user_town_id uuid;
    current_user_town_name text;
  begin
    select
      street_id,
      ext_number,
      int_number,
      suburb_id,
      town_id
    into
      current_user_street_id,
      current_user_street_ext_number,
      current_user_street_int_number,
      current_user_suburb_id,
      current_user_town_id
    from
      dum_public.user_addresses
    where
      is_main = true
    and
      user_id = u.id;

    select name from dum_public.streets where id = current_user_street_id into current_user_street_name;

    select
      type,
      name
    into
      current_user_settlement_type,
      current_user_suburb_name
    from
      dum_public.suburbs
    where
      id = current_user_suburb_id;

    select name from dum_public.towns where id = current_user_town_id into current_user_town_name;

    if current_user_street_int_number <> '' then
      full_address := current_user_street_name || ' #' || current_user_street_ext_number || ', Int. ' || current_user_street_int_number || ', ' || current_user_settlement_type || ' ' || current_user_suburb_name || ', ' || current_user_town_name;
    else
      full_address := current_user_street_name || ' #' || current_user_street_ext_number || ', ' || current_user_settlement_type || ' ' || current_user_suburb_name || ', ' || current_user_town_name;
    end if;

    return full_address;
  end;
$$ language plpgsql stable;
