/*
 * In addition to logging in with email and password, users may use
 * other authentication methods, such as "social login" (OAuth) with GitHub,
 * Twitter, Facebook, etc. We store details of these logins to the
 * user_authentications and user_authentication_secrets tables.
 *
 * The user is allowed to delete entries in this table (which will unlink them
 * from that service), but adding records to the table requires elevated
 * privileges (it's managed by the `installPassportStrategy.ts` middleware,
 * which calls out to the `dum_private.link_or_register_user` database
 * function).
 */
create table dum_public.user_authentications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references dum_public.users on delete cascade,
  service text not null,
  identifier text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uniq_user_authentications unique(service, identifier)
);

alter table dum_public.user_authentications enable row level security;

-- Make it efficient to find all the authentications for a particular user.
create index on dum_public.user_authentications(user_id);

-- Keep created_at and updated_at up to date.
create trigger _100_timestamps
  before insert or update on dum_public.user_authentications
  for each row
  execute procedure dum_private.tg__timestamps();

comment on table dum_public.user_authentications is
  E'Contains information about the login providers this user has used, so that they may disconnect them should they wish.';
comment on column dum_public.user_authentications.service is
  E'The login service used, e.g. `twitter` or `github`.';
comment on column dum_public.user_authentications.identifier is
  E'A unique identifier for the user within the login service.';
comment on column dum_public.user_authentications.details is
  E'Additional profile details extracted from this login method';

-- Users may view and delete their social logins.
create policy select_own on dum_public.user_authentications for select using (user_id = dum_public.current_user_id());
create policy delete_own on dum_public.user_authentications for delete using (user_id = dum_public.current_user_id());
-- TODO: on delete, check this isn't the last one, or that they have a verified
-- email address or password. For now we're not worrying about that since all
-- the OAuth providers we use verify the email address.

-- Notify the user if a social login is removed.
create trigger _500_audit_removed
  after delete on dum_public.user_authentications
  for each row
  execute procedure dum_private.tg__add_audit_job(
    'unlinked_account',
    'user_id',
    'service',
    'identifier'
  );
-- NOTE: we don't need to notify when a linked account is added here because
-- that's handled in the link_or_register_user function.

grant select on dum_public.user_authentications to :DATABASE_VISITOR;
grant delete on dum_public.user_authentications to :DATABASE_VISITOR;

/**********/

-- This table contains secret information for each user_authentication; could
-- be things like access tokens, refresh tokens, profile information. Whatever
-- the passport strategy deems necessary.
create table dum_private.user_authentication_secrets (
  user_authentication_id uuid not null primary key references dum_public.user_authentications on delete cascade,
  details jsonb not null default '{}'::jsonb
);
alter table dum_private.user_authentication_secrets enable row level security;

-- NOTE: user_authentication_secrets doesn't need an auto-inserter as we handle
-- that everywhere that can create a user_authentication row.
