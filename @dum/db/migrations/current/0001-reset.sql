/*
 * Graphile Migrate will run our `current/...` migrations in one batch. Since
 * this is our first migration it's defining the entire database, so we first
 * drop anything that may have previously been created
 * (dum_public/dum_hidden/dum_private) so that we can start from scratch.
 */

drop schema if exists dum_public cascade;
drop schema if exists dum_hidden cascade;
drop schema if exists dum_private cascade;
