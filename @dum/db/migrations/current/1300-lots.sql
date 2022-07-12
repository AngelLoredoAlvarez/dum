/*
* The lots tables stores the information related to each lot:
* - block to which it belongs
* - it's number
* - it's coordinates etc.
*/
create table dum_public.lots (
  id uuid primary key default gen_random_uuid(),
  block integer not null,
  lot_number integer not null,
  geom geometry(point, 32614) not null
);

/*
* Applies the special index for Spacial Information to allow us to do very efficient queries
*/
create index lots_geom_idx ON dum_public.lots USING GIST (geom);

/*
* Grant SELECT to all columns in this table, because the information stored
* is public to anyone
*/
grant select on dum_public.lots to :DATABASE_VISITOR;

/*
* Custom Query that converts the UTM coordinates to Geographic Coordinates
*/
create function dum_public.lots_latlong(lots dum_public.lots) returns text as $$
  select ST_AsLatLonText(geom) from (select ST_Transform(lots.geom, 4326) as geom) g;
$$ language sql stable;
