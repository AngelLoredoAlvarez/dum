/*
 * The Table that will store all the towns registered in the APP
 */
create table dum_public.towns (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table dum_public.towns enable row level security;

-- Towns are publicly visible.
create policy select_all on dum_public.towns for select using (true);

-- Grant SELECT to the :DATABASE_VISITOR role
grant select on dum_public.towns to :DATABASE_VISITOR;

comment on table dum_public.towns is
  E'A Town registered to allow a user to set their address.';

comment on column dum_public.towns.name is
  E'The name of the town.';

create trigger _100_timestamps
  before insert or update on dum_public.towns
  for each row
  execute procedure dum_private.tg__timestamps();

-- Inserts the Default Values in the dum_public.towns table
insert into dum_public.towns(id, name) values('84673058-eca2-42b1-bd94-84b1ece47c0c', 'Rioverde'),
                                             ('0adb7363-baf9-4fb1-aeb8-18977861bd1b', 'Ciudad Fernández');
