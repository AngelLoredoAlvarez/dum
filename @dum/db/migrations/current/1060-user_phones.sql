/*
 * Table that will store all the Phone Numbers from a User
 */
create table dum_public.user_phone_numbers (
  id uuid primary key default gen_random_uuid(),
  phone_number text,
  user_id uuid not null references dum_public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.user_phone_numbers enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.user_phone_numbers to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Phone Numbers owned by a particular User.
create index idx_user_phone_numbers on dum_public.user_phone_numbers(user_id);

-- Users may only manage their own Phone Numbers.
create policy select_own on dum_public.user_phone_numbers for select using (user_id = dum_public.current_user_id());
create policy insert_own on dum_public.user_phone_numbers for insert with check (user_id = dum_public.current_user_id());

comment on table dum_public.user_phone_numbers is
  E'An address own by a User.';

comment on column dum_public.user_phone_numbers.id is
  E'Unique identifier for the Address.';
comment on column dum_public.user_phone_numbers.phone_number is
  E'The Phone Number of the User.';

create trigger _100_timestamps
  before insert or update on dum_public.user_phone_numbers
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Function that returns all the Phone Numbers from the User
 */
 create or replace function dum_public.user_phone_numbers() returns setof dum_public.user_phone_numbers as $$
  select * from dum_public.user_phone_numbers where user_id = dum_public.current_user_id();
 $$ language sql stable;

