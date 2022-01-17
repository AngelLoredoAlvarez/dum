/*
 * Read about our dum_public/dum_hidden/dum_private schemas here:
 * https://www.graphile.org/postgraphile/namespaces/#advice
 *
 * Note this pattern is not required to use PostGraphile, it's merely the
 * preference of the author of this package.
 */

create schema dum_public;
create schema dum_hidden;
create schema dum_private;

-- The 'visitor' role (used by PostGraphile to represent an end user) may
-- access the public, dum_public and dum_hidden schemas (but _NOT_ the
-- dum_private schema).
grant usage on schema public, dum_public, dum_hidden to :DATABASE_VISITOR;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, dum_public, dum_hidden
  grant usage, select on sequences to :DATABASE_VISITOR;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, dum_public, dum_hidden
  grant execute on functions to :DATABASE_VISITOR;
