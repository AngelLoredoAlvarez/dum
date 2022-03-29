/*
 * Table that will store all the suburbs in a town
 */
create table dum_public.suburbs (
  id uuid primary key default gen_random_uuid(),
  name text,
  zip_code text,
  town_id uuid not null references dum_public.towns on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table dum_public.suburbs enable row level security;

-- Suburbs are publicly visible.
create policy select_all on dum_public.suburbs for select using (true);

-- Grant SELECT to the :DATABASE_VISITOR role
grant select on dum_public.suburbs to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Suburbs owned by a particular Town.
create index idx_town_suburbs on dum_public.suburbs(town_id);

comment on table dum_public.suburbs is
  E'A Suburb registered to allow a user to set their addresses.';

comment on column dum_public.suburbs.name is
  E'The name of the suburb.';

create trigger _100_timestamps
  before insert or update on dum_public.suburbs
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Custom Query that returns all Suburs in a Specific Town
 */
create or replace function dum_public.suburbs_by_town_id(town_id uuid default null, search text default null) returns setof dum_public.suburbs as $$
  select * from dum_public.suburbs where dum_public.suburbs.town_id = $1;
$$ language sql stable;

-- Inserts the default suburbs associated to a specific town
insert into dum_public.suburbs(name, town_id, zip_code) values('CENTRO', '84673058-eca2-42b1-bd94-84b1ece47c0c', '79610'),
                                                              ('CENTRO', '0adb7363-baf9-4fb1-aeb8-18977861bd1b', '79650');
