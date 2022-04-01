/*
 * The users table stores (unsurprisingly) the users of our application. You'll
 * notice that it does NOT contain private information such as the user's
 * password or their email address; that's because the users table is seen as
 * public - anyone who can "see" the user can see this information.
 *
 * The author sees `is_admin` and `is_verified` as public information; if you
 * disagree then you should relocate these attributes to another table, such as
 * `user_secrets`.
 */
create table dum_public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  first_surname text,
  second_surname text,
  avatar_url text check(avatar_url ~ '^$|^https?://[^/]+'),
  is_admin boolean not null default false,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table dum_public.users enable row level security;

-- We couldn't implement this relationship on the sessions table until the users table existed!
alter table dum_private.sessions
  add constraint sessions_user_id_fkey
  foreign key ("user_id") references dum_public.users on delete cascade;

-- Users are publicly visible, like on GitHub, Twitter, Facebook, Trello, etc.
create policy select_all on dum_public.users for select using (true);
-- You can only update yourself.
create policy update_self on dum_public.users for update using (id = dum_public.current_user_id());
grant select on dum_public.users to :DATABASE_VISITOR;
-- NOTE: `insert` is not granted, because we'll handle that separately
grant update(name, first_surname, second_surname, avatar_url) on dum_public.users to :DATABASE_VISITOR;
-- NOTE: `delete` is not granted, because we require confirmation via request_account_deletion/confirm_account_deletion

comment on table dum_public.users is
  E'A user who can log in to the application.';

comment on column dum_public.users.id is
  E'Unique identifier for the user.';
comment on column dum_public.users.name is
  E'The name of the user.';
comment on column dum_public.users.name is
  E'The First Surname of the user.';
comment on column dum_public.users.name is
  E'The Second Surname of the user.';
comment on column dum_public.users.avatar_url is
  E'Optional avatar URL.';
comment on column dum_public.users.is_admin is
  E'If true, the user has elevated privileges.';

create trigger _100_timestamps
  before insert or update on dum_public.users
  for each row
  execute procedure dum_private.tg__timestamps();

/**********/

-- Returns the current user; this is a "custom query" function; see:
-- https://www.graphile.org/postgraphile/custom-queries/
-- So this will be queryable via GraphQL as `{ currentUser { ... } }`
create function dum_public.current_user() returns dum_public.users as $$
  select users.* from dum_public.users where id = dum_public.current_user_id();
$$ language sql stable;
comment on function dum_public.current_user() is
  E'The currently logged in user (or null if not logged in).';

/**********/

-- The users table contains all the public information, but we need somewhere
-- to store private information. In fact, this data is so private that we don't
-- want the user themselves to be able to see it - things like the bcrypted
-- password hash, timestamps of recent login attempts (to allow us to
-- auto-protect user accounts that are under attack), etc.
create table dum_private.user_secrets (
  user_id uuid not null primary key references dum_public.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz
);
alter table dum_private.user_secrets enable row level security;
comment on table dum_private.user_secrets is
  E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';

/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function dum_private.tg_user_secrets__insert_with_user() returns trigger as $$
begin
  insert into dum_private.user_secrets(user_id) values(NEW.id);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
create trigger _500_insert_secrets
  after insert on dum_public.users
  for each row
  execute procedure dum_private.tg_user_secrets__insert_with_user();
comment on function dum_private.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

/*
 * Because you can register with email/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
create function dum_public.users_has_password(u dum_public.users) returns boolean as $$
  select (password_hash is not null) from dum_private.user_secrets where user_secrets.user_id = u.id and u.id = dum_public.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

/*
 * When the user validates their email address we want the UI to be notified
 * immediately, so we'll issue a notification to the `graphql:user:*` topic
 * which GraphQL users can subscribe to via the `currentUserUpdated`
 * subscription field.
 */
create trigger _500_gql_update
  after update on dum_public.users
  for each row
  execute procedure dum_public.tg__graphql_subscription(
    'userChanged', -- the "event" string, useful for the client to know what happened
    'graphql:user:$1', -- the "topic" the event will be published to, as a template
    'id' -- If specified, `$1` above will be replaced with NEW.id or OLD.id from the trigger.
  );

  /*
   * Custom Query that RETURNS the FULL NAME of the CURRENT USER
   */
  create function dum_public.users_full_name(u dum_public.users) returns text as $$
    select u.name || ' ' || u.first_surname || ' ' || u.second_surname;
  $$ language sql stable;
