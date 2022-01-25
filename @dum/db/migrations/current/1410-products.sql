-- The table that will store the information of the products in the store
 create table dum_public.products (
   id uuid primary key default gen_random_uuid(),
   barcode text not null check (barcode ~ '^[0-9]*$'),
   brand text not null,
   description text not null,
   unformated_price numeric(8,2) not null,
   tax numeric (3,2),
   stock integer not null,
   -- Remember to change the type of sub_deparment_id from SERIAL to UUID
   sub_department_id uuid not null references dum_public.sub_departments(id) on delete cascade,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
 );

-- Enable ROW lEVEL SECURITY
alter table dum_public.products enable row level security;

-- Products are publicly visible.
create policy select_all on dum_public.products for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.products to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Products owned by a particular Sub - Department.
create index idx_product_sub_departments_products on dum_public.products (sub_department_id);

comment on table dum_public.products is
  E'A product sold in the store.';

comment on column dum_public.products.id is
  E'Unique identifier for the product.';
comment on column dum_public.products.barcode is
  E'Unique code used to get the information from a product.';
comment on column dum_public.products.brand is
  E'The brand of the product.';
comment on column dum_public.products.description is
  E'The description of the characteristics of a product.';
comment on column dum_public.products.unformated_price is
  E'The price of the product.';
comment on column dum_public.products.tax is
  E'The tax that applies to the product.';
comment on column dum_public.products.stock is
  E'The current quantity of the product in stock.';

create trigger _100_timestamps
  before insert or update on dum_public.products
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Custom Query that returns the price in a users friendly format
 */
create or replace function dum_public.products_price(product dum_public.products) returns text as $$
  select cast(product.unformated_price as money);
$$ language sql stable;

-- Inserts mock data in the dum_public.products table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.products(
  barcode,
  brand,
  description,
  unformated_price,
  tax,
  stock,
  sub_department_id
) values('0000000000', 'BLACK & DECKER', 'TIJERA SIERRA CORTA RAMAS BLACK+DECKER LLP120 20V', 3000, 0.16, 10, '6310a459-4f35-4c61-ae3f-aa1f4690525a'),
        ('0000000001', 'TEKA', 'HORNO ELÉCTRICO TEKA STEAKMASTER MULTIFUNCIÓN 3518 W', 28999, 0.16, 5, '07e1074b-99a1-4795-9a1e-c59419a6d15c'),
        ('0000000002', 'BONASA', 'BOMBA BONASA 15/60 IMPULSOR BRONCE 1.5 HP', 4499, 0.16, 2, 'e6202cd2-165c-4b22-b583-d5cc947041e7'),
        ('0000000003', 'IUSA', 'MINISPLIT IUSA PRIMO 12000BTU/H. 115V FRÍO CALOR', 6959, 0.16, 3, '25980163-64ab-4c45-b817-74aeafd36f50'),
        ('0000000004', 'TRUPPER', 'ESTANTE PLÁSTICO USO RUDO 5 REPISAS TRUPER EST-5', 835, 0.16, 4, 'b4b84da6-4000-4250-82a6-b3d45b9fb8a2'),
        ('0000000005', 'VICTORINOX', 'NAVAJA VICTORINOX MULTIHERRAMIENTA SWISSTOOL BS 3.0323.3CN 29 FUNCIONES', 5857, 0.16, 3, '40573ab4-3edb-486b-9748-97e33e5737ec'),
        ('0000000006', 'MILWAUKEE', 'CARRO PARA TRANSPORTE DE HERRAMIENTAS MILWAUKEE 48-22-8415', 4972, 0.16, 7, '2e1d5c1c-9100-45d6-ad1e-fd64388fc039'),
        ('0000000007', 'BOSCH', 'MARTILLO DEMOLEDOR BOSCH GSH 27 VC DE 2000 W', 32010, 0.16, 2, '24eb47ed-fa42-4ea7-b7c8-e27dc01c760a'),
        ('0000000008', 'MILWAUKEE', 'TALADRO SACA NUCLEOS PORTÁTIL MX FUEL MILWAUKEE + SOPORTE', 126499, 0.16, 2, '6bb1c2c1-253b-4c8f-99b3-f8d10c8598bc'),
        ('0000000009', 'EVANS', 'COMPRESOR EVANS MEDIC AIR 1 HP 90L LIBRE DE ACEITE', 14484, 0.16, 3, 'b2a8be24-162f-49b7-8a2f-98d4c5b5aa21'),
        ('00000000010', 'STIHL', 'KIT PISTÓN Y CILINDRO 52 MM STIHL 1111 020 1200', 3745, 0.16, 10, '638fce0c-e6b0-485a-98b8-0553b9cc9209'),
        ('00000000011', 'AUSTROMEX', 'DISCO DE DIAMANTE PARA CONCRETO AUSTRODIAM 2243 16 PULG', 8174, 0.16, 5, '618e757e-0bd6-46ab-8415-ea7f9656d01a');
