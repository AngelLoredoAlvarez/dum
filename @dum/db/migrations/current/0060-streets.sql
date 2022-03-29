/*
 * Table that will store all the streets names associated to a specific suburb
 */
create table dum_public.streets (
  id uuid primary key default gen_random_uuid(),
  name text,
  suburb_id uuid not null references dum_public.suburbs on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table dum_public.streets enable row level security;

-- Streets are publicly visible.
create policy select_all on dum_public.streets for select using (true);

-- Grant SELECT to the :DATABASE_VISITOR role
grant select on dum_public.streets to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Streets owned by a particular Suburb.
create index idx_suburb_streets on dum_public.streets(suburb_id);

comment on table dum_public.streets is
  E'A Street registered to allow a user to set their addresses.';

comment on column dum_public.streets.name is
  E'The name of the suburb.';

create trigger _100_timestamps
  before insert or update on dum_public.streets
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Custom Query that returns all the Streets in a Specific Suburb
 */
create or replace function dum_public.streets_by_suburb_id(suburb_id uuid default null) returns setof dum_public.streets as $$
  select * from dum_public.streets where dum_public.streets.suburb_id = $1;
$$ language sql stable;

-- Inserts MOCK data in the dum_public.streets DELETE BEFORE LAUNCH TO PROD!!!!!
insert into dum_public.streets(name, suburb_id) values('MORELOS', 'c5ef579f-61d5-4441-82a5-108247ec4058'),
                                                      ('MORELOS', 'a86ee345-7012-4eb4-b97c-7513ea7be919');
