/*
 * Logging out deletes the session, and clears the session_id in the
 * transaction. This is a `SECURITY DEFINER` function, so we check that the
 * user is allowed to do it by matching the current_session_id().
 */
create function dum_public.logout() returns void as $$
begin
  -- Delete the session
  delete from dum_private.sessions where uuid = dum_public.current_session_id();
  -- Clear the identifier from the transaction
  perform set_config('jwt.claims.session_id', '', true);
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;
