/*
 * A user account may be created explicitly via the GraphQL `register` mutation
 * (which calls `really_create_user` below), or via OAuth (which, via
 * `installPassportStrategy.ts`, calls link_or_register_user below, which may
 * then call really_create_user). Ultimately `really_create_user` is called in
 * all cases to create a user account within our system, so it must do
 * everything we'd expect in this case including validating email/password,
 * setting the password (if any), storing the email address, etc.
 */

create function dum_private.really_create_user(
  name text,
  first_surname text,
  second_surname text,
  town_id uuid,
  suburb_id uuid,
  street_id uuid,
  exterior_number text,
  interior_number text,
  phone_one text,
  phone_two text,
  phone_three text,
  avatar_url text,
  email text,
  password text default null,
  email_is_verified bool default false
) returns dum_public.users as $$
declare
  v_user dum_public.users;
begin
  if exists(
    select
      1
    from
      dum_public.users
    where
      unaccent(dum_public.users.name) ilike unaccent($1) and
      unaccent(dum_public.users.first_surname) ilike unaccent($2) and
      unaccent(dum_public.users.second_surname) ilike unaccent($3)
  ) then
    raise exception 'El usuario % % % ya ha sido registrado.', upper($1), upper($2), upper($3) using errcode = 'USRAR';
  end if;

  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  if password is not null then
    perform dum_private.assert_valid_password(password);
  end if;

  -- Insert the new user
  insert into dum_public.users (
    name,
    first_surname,
    second_surname,
    avatar_url
  ) values (upper($1), upper($2), upper($3), lower($12)) returning * into v_user;

  -- Insert the main address
  insert into dum_public.user_addresses (
    town_id,
    suburb_id,
    street_id,
    ext_number,
    int_number,
    is_main,
    user_id
  ) values ($4, $5, $6, $7, $8, true, v_user.id);

  -- Insert phone numbers
  insert into dum_public.user_phone_numbers (
    phone_number,
    user_id
  ) values ($9, v_user.id),
           ($10, v_user.id);

  if $11 <> '' then
    insert into dum_public.user_phone_numbers (
      phone_number,
      user_id
    ) values ($11, v_user.id);
  end if;

	-- Add the user's email
  insert into dum_public.user_emails (
    user_id,
    email,
    is_verified,
    is_primary
  ) values (v_user.id, lower($13), $15, $15);

  -- Store the password
  if password is not null then
    update
      dum_private.user_secrets
    set
      password_hash = crypt($14, gen_salt('bf'))
    where
      user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from dum_public.users where id = v_user.id;

  return v_user;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function dum_private.really_create_user(
                                                    name text,
                                                    first_surname text,
                                                    second_surname text,
                                                    town_id uuid,
                                                    suburb_id uuid,
                                                    street_id uuid,
                                                    exterior_number text,
                                                    interior_number text,
                                                    phone_one text,
                                                    phone_two text,
                                                    phone_three text,
                                                    avatar_url text,
                                                    email text,
                                                    password text,
                                                    email_is_verified bool
                                                  ) is
  E'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';

/**********/

/*
 * The `register_user` function is called by `link_or_register_user` when there
 * is no matching user to link the login to, so we want to register the user
 * using OAuth or similar credentials.
 */

create function dum_private.register_user(
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json,
  f_email_is_verified boolean default false
) returns dum_public.users as $$
declare
  v_user dum_public.users;
  v_name text;
  v_first_surname text;
  v_second_surname text;
  v_town_id uuid;
  v_suburb_id uuid;
  v_street_id uuid;
  v_exterior_number text;
  v_interior_number text;
  v_phone_one text;
  v_phone_two text;
  v_phone_three text;
  v_avatar_url text;
  v_email citext;
  v_user_authentication_id uuid;
begin
  -- Extract data from the user’s OAuth profile data.
  v_name := f_profile ->> 'name';
  v_first_surname := f_profile ->> 'first_surname';
  v_second_surname := f_profile ->> 'second_surname';
  v_town_id := f_profile ->> 'town_id';
  v_suburb_id := f_profile ->> 'suburb_id';
  v_street_id := f_profile ->> 'street_id';
  v_exterior_number := f_profile ->> 'exterior_number';
  v_interior_number := f_profile ->> 'interior_number';
  v_phone_one := f_profile ->> 'phone_one';
  v_phone_two := f_profile ->> 'phone_two';
  v_phone_three := f_profile ->> 'phone_three';
  v_avatar_url := f_profile ->> 'avatar_url';
  v_email := f_profile ->> 'email';

  -- Create the user account
  v_user = dum_private.really_create_user(
    name => v_name,
    first_surname => v_first_surname,
    second_surname => v_second_surname,
    town_id => v_town_id,
    suburb_id => v_suburb_id,
    street_id => v_street_id,
    exterior_number => v_exterior_number,
    interior_number => v_interior_number,
    phone_one => v_phone_one,
    phone_two => v_phone_two,
    phone_three => v_phone_three,
    avatar_url => v_avatar_url,
    email => v_email,
    email_is_verified => f_email_is_verified
  );

  -- Insert the user’s private account data (e.g. OAuth tokens)
  insert into dum_public.user_authentications (user_id, service, identifier, details) values
    (v_user.id, f_service, f_identifier, f_profile) returning id into v_user_authentication_id;
  insert into dum_private.user_authentication_secrets (user_authentication_id, details) values
    (v_user_authentication_id, f_auth_details);

  return v_user;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function dum_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) is
  E'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';

/**********/

/*
 * The `link_or_register_user` function is called from
 * `installPassportStrategy.ts` when a user logs in with a social login
 * provider (OAuth), e.g. GitHub, Facebook, etc. If the user is already logged
 * in then the new provider will be linked to the users account, otherwise we
 * will try to retrieve an existing account using these details (matching the
 * service/identifier or the email address), and failing that we will register
 * a new user account linked to this service via the `register_user` function.
 *
 * This function is also responsible for keeping details in sync with the login
 * provider whenever the user logs in; you'll see this in the `update`
 * statemets towards the bottom of the function.
 */

create function dum_private.link_or_register_user(
  f_user_id uuid,
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json
) returns dum_public.users as $$
declare
  v_matched_user_id uuid;
  v_matched_authentication_id uuid;
  v_email citext;
  v_name text;
  v_avatar_url text;
  v_user dum_public.users;
  v_user_email dum_public.user_emails;
begin
  -- See if a user account already matches these details
  select id, user_id
    into v_matched_authentication_id, v_matched_user_id
    from dum_public.user_authentications
    where service = f_service
    and identifier = f_identifier
    limit 1;

  if v_matched_user_id is not null and f_user_id is not null and v_matched_user_id <> f_user_id then
    raise exception 'A different user already has this account linked.' using errcode = 'TAKEN';
  end if;

  v_email = f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_avatar_url := f_profile ->> 'avatar_url';

  if v_matched_authentication_id is null then
    if f_user_id is not null then
      -- Link new account to logged in user account
      insert into dum_public.user_authentications (user_id, service, identifier, details) values
        (f_user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
      insert into dum_private.user_authentication_secrets (user_authentication_id, details) values
        (v_matched_authentication_id, f_auth_details);
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'linked_account',
          'user_id', f_user_id,
          'extra1', f_service,
          'extra2', f_identifier,
          'current_user_id', dum_public.current_user_id()
        ));
    elsif v_email is not null then
      -- See if the email is registered
      select * into v_user_email from dum_public.user_emails where email = v_email and is_verified is true;
      if v_user_email is not null then
        -- User exists!
        insert into dum_public.user_authentications (user_id, service, identifier, details) values
          (v_user_email.user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
        insert into dum_private.user_authentication_secrets (user_authentication_id, details) values
          (v_matched_authentication_id, f_auth_details);
        perform graphile_worker.add_job(
          'user__audit',
          json_build_object(
            'type', 'linked_account',
            'user_id', f_user_id,
            'extra1', f_service,
            'extra2', f_identifier,
            'current_user_id', dum_public.current_user_id()
          ));
      end if;
    end if;
  end if;
  if v_matched_user_id is null and f_user_id is null and v_matched_authentication_id is null then
    -- Create and return a new user account
    return dum_private.register_user(f_service, f_identifier, f_profile, f_auth_details, true);
  else
    if v_matched_authentication_id is not null then
      update dum_public.user_authentications
        set details = f_profile
        where id = v_matched_authentication_id;
      update dum_private.user_authentication_secrets
        set details = f_auth_details
        where user_authentication_id = v_matched_authentication_id;
      update dum_public.users
        set
          name = coalesce(users.name, v_name),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        where id = v_matched_user_id
        returning  * into v_user;
      return v_user;
    else
      -- v_matched_authentication_id is null
      -- -> v_matched_user_id is null (they're paired)
      -- -> f_user_id is not null (because the if clause above)
      -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
      -- -> contradiction.
      raise exception 'This should not occur';
    end if;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function dum_private.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) is
  E'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';
