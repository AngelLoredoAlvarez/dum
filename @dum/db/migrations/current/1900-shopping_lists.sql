/*
 * Table that will store all the information related to a Shopping List of a user
 */
 create table dum_public.shopping_lists (
   id uuid primary key default gen_random_uuid(),
   is_open boolean default true,
   user_id uuid not null references dum_public.users(id),
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
 );

 -- Enable ROW lEVEL SECURITY
alter table dum_public.shopping_lists enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.shopping_lists to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Shopping Lists owned by a particular User.
create index idx_user_shopping_lists on dum_public.shopping_lists(user_id);

-- Users may only manage their own Shopping Lists.
create policy select_own on dum_public.shopping_lists for select using (user_id = dum_public.current_user_id());
create policy insert_own on dum_public.shopping_lists for insert with check (user_id = dum_public.current_user_id());

comment on table dum_public.shopping_lists is
  E'A Shopping List own by a User.';

comment on column dum_public.shopping_lists.id is
  E'Unique identifier for the Shopping List.';
comment on column dum_public.shopping_lists.is_open is
  E'The state of the Shopping List, true if is open or false if is already closed and sold.';

create trigger _100_timestamps
  before insert or update on dum_public.shopping_lists
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Function that returns the id from an open Shopping List
 */
 create or replace function dum_public.opened_shopping_list_id() returns uuid as $$
  select id from dum_public.shopping_lists where is_open = true and user_id = dum_public.current_user_id();
 $$ language sql stable;

/*
 * Function that returns the Current User Shopping List
 */
create or replace function dum_public.current_user_opened_shopping_list() returns dum_public.shopping_lists as $$
  select * from dum_public.shopping_lists where id = dum_public.opened_shopping_list_id();
$$ language sql stable;
