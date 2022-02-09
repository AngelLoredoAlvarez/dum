-- The table that will store the information about all the recognized brands in the Store
create table dum_public.brands (
   id uuid primary key default gen_random_uuid(),
   brand text not null,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now(),
   -- Each Brand must have a unique name
  constraint brand_unique_name unique(brand)
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.brands enable row level security;

-- Brands are publicly visible.
create policy select_all on dum_public.brands for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.brands to :DATABASE_VISITOR;

comment on table dum_public.brands is
  E'A brand of products in the Store.';

comment on column dum_public.brands.id is
  E'Unique identifier for the brands.';
comment on column dum_public.brands.brand is
  E'The name of the brand.';

create trigger _100_timestamps
  before insert or update on dum_public.brands
  for each row
  execute procedure dum_private.tg__timestamps();

-- Inserts mock data in the dum_public.brands table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.brands(
  id,
  brand
) values('19a66f8e-438e-4bc7-84da-b271a5f4bc17', 'BLACK & DECKER'),
        ('c87f6ceb-f0e1-478d-aca2-badaaaecb255', 'ALFA'),
        ('4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'STIHL'),
        ('a35896fc-d50e-4a31-bbdd-53f746de2769', 'ARDA'),
        ('6f8b1354-5347-41ec-a064-b5c279382a55', 'CORONA'),
        ('f24e4676-509f-4844-a1bc-2d052dfe6481', 'SWEDISH HUSKY POWER'),
        ('29a493e7-1ba5-432c-abd8-b3c7e758d87f', 'SWISSMEX'),
        ('780d9abe-ba58-4c46-a1c4-13e9c0b5d72f', 'POWER CAT'),
        ('68a2e3c0-63e7-4953-bd95-579cf5fb5926', 'KAWASHIMA'),
        ('23b419c4-cfe3-43bb-9c25-3ba40dae9e14', 'TEKA'),
        ('82e2518f-2039-4b7b-9027-85549a4bae72', 'BONASA'),
        ('fc6b652e-7a34-4ec9-a524-5aadbef7b497', 'IUSA'),
        ('f4719291-8950-4e26-82de-4c1a8c9e362f', 'TRUPPER'),
        ('aa8b2b41-a963-4b7d-a42b-ce43c836f5a2', 'VICTORINOX'),
        ('99f28904-0a28-49dd-8e13-f42bb47bcb66', 'MILWAUKEE'),
        ('bbcef709-fb02-4a0e-a4be-80fb275adc50', 'BOSCH'),
        ('67d8f309-8eee-42ec-80fb-3cf8dfe59af1', 'EVANS'),
        ('356fa919-397f-45be-a879-18cedc1a5a04', 'AUSTROMEX'),
        ('fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'TERNIUM');
