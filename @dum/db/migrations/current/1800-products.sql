-- The table that will store the information of the products in the store
 create table dum_public.products (
   id uuid primary key default gen_random_uuid(),
   barcode text not null check (barcode ~ '^[0-9]*$'),
   brand_id uuid not null references dum_public.brands(id) on delete cascade,
   description text not null,
   picture_url text check(picture_url ~ '^$|^https?://[^/]+'),
   unformated_price numeric(8,2) not null,
   tax numeric (3,2),
   stock integer not null,
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
create index idx_product_sub_departments_products on dum_public.products(sub_department_id);

-- Allow efficient retrieval of all the Products owned by a particular Brand
create index idx_product_brand_products on dum_public.products(brand_id);

comment on table dum_public.products is
  E'A product sold in the store.';

comment on column dum_public.products.id is
  E'Unique identifier for the product.';
comment on column dum_public.products.barcode is
  E'Unique code used to get the information from a product.';
comment on column dum_public.products.brand_id is
  E'The identifier of the Brand to wich the product belongs.';
comment on column dum_public.products.description is
  E'The description of the characteristics of a product.';
comment on column dum_public.products.picture_url is
  E'Optional picture URL.';
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
  brand_id,
  description,
  picture_url,
  unformated_price,
  tax,
  stock,
  sub_department_id
) values('0000000000', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2 TIEMPOS STIHL 1 GALÓN 3.78 L', 'https://cms.grupoferrepat.net/assets/img/productos/98908.jpg', 878, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000001', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE LUBRICANTE BARRA CADENA MOTOSIERRA STIHL 0781 516 500', 'https://cms.grupoferrepat.net/assets/img/productos/95226.jpg', 429, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000002', 'bbcef709-fb02-4a0e-a4be-80fb275adc50', 'TUBO DE GRASA 225 ML PARA MARTILLO PERFORADOR BOSCH 1615430001', 'https://cms.grupoferrepat.net/assets/img/productos/1615001.jpg', 494, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000003', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA INDUSTRIAL DE 14 OZ. TRUPER 14861 - GRAS-15', 'https://cms.grupoferrepat.net/assets/img/productos/14861.jpg', 385, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000004', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA DE 14 OZ. TRUPER 14859 - GRAS-13', 'https://cms.grupoferrepat.net/assets/img/productos/14859.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000005', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'MINIGRASERA DE 3 OZ TRUPER 14911', 'https://cms.grupoferrepat.net/assets/img/productos/14911.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000006', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2T MOTOSIERRA STIHL 0781 319 8923 400ML', 'https://cms.grupoferrepat.net/assets/img/productos/95222-B.jpg', 109, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000007', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE DE 300 MILILITROS TRUPER 14872', 'https://cms.grupoferrepat.net/assets/img/productos/14872.jpg', 89, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000008', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITERA DE 180 MILILITROS TRUPER 14870 - ACEF-180', 'https://cms.grupoferrepat.net/assets/img/productos/14870.jpg', 76, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000009', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'UNIDAD DE LIMPIEZA Y LUBRICACIÓN TRUPER 19238 - UNI-LL-1/4', 'https://cms.grupoferrepat.net/assets/img/productos/14926.jpg', 45, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000010', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE SINTÉTICO PARA MOTOR DE 2 TIEMPOS TRUPER 17624 - ACT-2T-4', 'https://cms.grupoferrepat.net/assets/img/productos/17624.jpg', 38, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000011', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'TUERCA PARA GRASERA TRUPER 14864', 'https://cms.grupoferrepat.net/assets/img/productos/14864.jpg', 24, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000012', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2 TIEMPOS STIHL 1 GALÓN 3.78 L', 'https://cms.grupoferrepat.net/assets/img/productos/98908.jpg', 878, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000013', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE LUBRICANTE BARRA CADENA MOTOSIERRA STIHL 0781 516 500', 'https://cms.grupoferrepat.net/assets/img/productos/95226.jpg', 429, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000014', 'bbcef709-fb02-4a0e-a4be-80fb275adc50', 'TUBO DE GRASA 225 ML PARA MARTILLO PERFORADOR BOSCH 1615430001', 'https://cms.grupoferrepat.net/assets/img/productos/1615001.jpg', 494, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000015', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA INDUSTRIAL DE 14 OZ. TRUPER 14861 - GRAS-15', 'https://cms.grupoferrepat.net/assets/img/productos/14861.jpg', 385, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000016', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA DE 14 OZ. TRUPER 14859 - GRAS-13', 'https://cms.grupoferrepat.net/assets/img/productos/14859.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000017', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'MINIGRASERA DE 3 OZ TRUPER 14911', 'https://cms.grupoferrepat.net/assets/img/productos/14911.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000018', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2T MOTOSIERRA STIHL 0781 319 8923 400ML', 'https://cms.grupoferrepat.net/assets/img/productos/95222-B.jpg', 109, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000019', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE DE 300 MILILITROS TRUPER 14872', 'https://cms.grupoferrepat.net/assets/img/productos/14872.jpg', 89, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000020', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITERA DE 180 MILILITROS TRUPER 14870 - ACEF-180', 'https://cms.grupoferrepat.net/assets/img/productos/14870.jpg', 76, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000021', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'UNIDAD DE LIMPIEZA Y LUBRICACIÓN TRUPER 19238 - UNI-LL-1/4', 'https://cms.grupoferrepat.net/assets/img/productos/14926.jpg', 45, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000022', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE SINTÉTICO PARA MOTOR DE 2 TIEMPOS TRUPER 17624 - ACT-2T-4', 'https://cms.grupoferrepat.net/assets/img/productos/17624.jpg', 38, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000023', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'TUERCA PARA GRASERA TRUPER 14864', 'https://cms.grupoferrepat.net/assets/img/productos/14864.jpg', 24, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000024', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2 TIEMPOS STIHL 1 GALÓN 3.78 L', 'https://cms.grupoferrepat.net/assets/img/productos/98908.jpg', 878, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000025', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE LUBRICANTE BARRA CADENA MOTOSIERRA STIHL 0781 516 500', 'https://cms.grupoferrepat.net/assets/img/productos/95226.jpg', 429, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000026', 'bbcef709-fb02-4a0e-a4be-80fb275adc50', 'TUBO DE GRASA 225 ML PARA MARTILLO PERFORADOR BOSCH 1615430001', 'https://cms.grupoferrepat.net/assets/img/productos/1615001.jpg', 494, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000027', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA INDUSTRIAL DE 14 OZ. TRUPER 14861 - GRAS-15', 'https://cms.grupoferrepat.net/assets/img/productos/14861.jpg', 385, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000028', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA DE 14 OZ. TRUPER 14859 - GRAS-13', 'https://cms.grupoferrepat.net/assets/img/productos/14859.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000029', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'MINIGRASERA DE 3 OZ TRUPER 14911', 'https://cms.grupoferrepat.net/assets/img/productos/14911.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000030', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2T MOTOSIERRA STIHL 0781 319 8923 400ML', 'https://cms.grupoferrepat.net/assets/img/productos/95222-B.jpg', 109, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000031', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE DE 300 MILILITROS TRUPER 14872', 'https://cms.grupoferrepat.net/assets/img/productos/14872.jpg', 89, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000032', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITERA DE 180 MILILITROS TRUPER 14870 - ACEF-180', 'https://cms.grupoferrepat.net/assets/img/productos/14870.jpg', 76, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000033', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'UNIDAD DE LIMPIEZA Y LUBRICACIÓN TRUPER 19238 - UNI-LL-1/4', 'https://cms.grupoferrepat.net/assets/img/productos/14926.jpg', 45, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000034', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE SINTÉTICO PARA MOTOR DE 2 TIEMPOS TRUPER 17624 - ACT-2T-4', 'https://cms.grupoferrepat.net/assets/img/productos/17624.jpg', 38, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000035', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'TUERCA PARA GRASERA TRUPER 14864', 'https://cms.grupoferrepat.net/assets/img/productos/14864.jpg', 24, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000036', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2 TIEMPOS STIHL 1 GALÓN 3.78 L', 'https://cms.grupoferrepat.net/assets/img/productos/98908.jpg', 878, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000037', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE LUBRICANTE BARRA CADENA MOTOSIERRA STIHL 0781 516 500', 'https://cms.grupoferrepat.net/assets/img/productos/95226.jpg', 429, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000038', 'bbcef709-fb02-4a0e-a4be-80fb275adc50', 'TUBO DE GRASA 225 ML PARA MARTILLO PERFORADOR BOSCH 1615430001', 'https://cms.grupoferrepat.net/assets/img/productos/1615001.jpg', 494, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000039', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA INDUSTRIAL DE 14 OZ. TRUPER 14861 - GRAS-15', 'https://cms.grupoferrepat.net/assets/img/productos/14861.jpg', 385, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000040', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA DE 14 OZ. TRUPER 14859 - GRAS-13', 'https://cms.grupoferrepat.net/assets/img/productos/14859.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000041', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'MINIGRASERA DE 3 OZ TRUPER 14911', 'https://cms.grupoferrepat.net/assets/img/productos/14911.jpg', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000042', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2T MOTOSIERRA STIHL 0781 319 8923 400ML', 'https://cms.grupoferrepat.net/assets/img/productos/95222-B.jpg', 109, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000043', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE DE 300 MILILITROS TRUPER 14872', 'https://cms.grupoferrepat.net/assets/img/productos/14872.jpg', 89, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000044', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITERA DE 180 MILILITROS TRUPER 14870 - ACEF-180', 'https://cms.grupoferrepat.net/assets/img/productos/14870.jpg', 76, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000045', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'UNIDAD DE LIMPIEZA Y LUBRICACIÓN TRUPER 19238 - UNI-LL-1/4', 'https://cms.grupoferrepat.net/assets/img/productos/14926.jpg', 45, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000046', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE SINTÉTICO PARA MOTOR DE 2 TIEMPOS TRUPER 17624 - ACT-2T-4', 'https://cms.grupoferrepat.net/assets/img/productos/17624.jpg', 38, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('0000000047', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'TUERCA PARA GRASERA TRUPER 14864', 'https://cms.grupoferrepat.net/assets/img/productos/14864.jpg', 24, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9');
