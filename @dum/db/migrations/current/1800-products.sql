-- The table that will store the information of the products in the store
 create table dum_public.products (
   id uuid primary key default gen_random_uuid(),
   barcode text not null check (barcode ~ '^[0-9]*$'),
   brand_id uuid not null references dum_public.brands(id) on delete cascade,
   description text not null,
   unformated_price numeric(8,2) not null,
   tax numeric (3,2),
   stock integer not null,
   sub_department_id uuid not null references dum_public.sub_departments(id) on delete cascade,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now(),
   -- Each Products must have a unique name
  constraint product_unique_description unique(description)
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
 * Computed Column that returns the price in a users friendly format
 */
create or replace function dum_public.products_price(product dum_public.products) returns text as $$
  select cast(product.unformated_price as money);
$$ language sql stable;

-- Inserts mock data in the dum_public.products table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.products(
  id,
  barcode,
  brand_id,
  description,
  unformated_price,
  tax,
  stock,
  sub_department_id
) values('eef185db-0d4b-4d54-a7f1-b64652c794b4', '0000000000', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2 TIEMPOS STIHL 1 GALÓN 3.78 L', 878, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('ea0dce7e-da49-489a-b395-7e9ea411b75b', '0000000001', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE LUBRICANTE BARRA CADENA MOTOSIERRA STIHL 0781 516 500', 429, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('d58d52f1-839e-4bf1-ba1a-8b83dabddddb', '0000000002', 'bbcef709-fb02-4a0e-a4be-80fb275adc50', 'TUBO DE GRASA 225 ML PARA MARTILLO PERFORADOR BOSCH 1615430001', 494, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('17e5beae-94b4-4c76-b2a4-8db7206b8d3e', '0000000003', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA INDUSTRIAL DE 14 OZ. TRUPER 14861 - GRAS-15', 385, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('68c15627-70ad-4484-a608-1468bef08bfe', '0000000004', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'GRASERA DE 14 OZ. TRUPER 14859 - GRAS-13', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('d6db3753-5d4d-4b7b-bc1a-b5a2ff5d9329', '0000000005', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'MINIGRASERA DE 3 OZ TRUPER 14911', 305, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('1e3f2f26-2d90-4076-b306-cf88472c8473', '0000000006', '4916fa04-c5fc-4111-a44c-e6d7738c67c1', 'ACEITE PARA MOTOR 2T MOTOSIERRA STIHL 0781 319 8923 400ML', 109, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('5bad00d6-06e7-4f3a-9d16-08e94a4a0f73', '0000000007', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITE DE 300 MILILITROS TRUPER 14872', 89, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('3e711cb0-6c22-4bb1-8c13-9ac22bc0a684', '0000000008', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'ACEITERA DE 180 MILILITROS TRUPER 14870 - ACEF-180', 76, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('7dacda91-bf2e-4849-8384-3f007a09dd6a', '0000000009', 'f4719291-8950-4e26-82de-4c1a8c9e362f', 'UNIDAD DE LIMPIEZA Y LUBRICACIÓN TRUPER 19238 - UNI-LL-1/4', 45, 0.16, 10, '1273d184-d8a5-44ea-a23a-e6e8409344e9'),
        ('275192b5-1f6f-420d-a0bd-4dbef363f839', '1000000000', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 1.08 X 5.50 M RECTANGULAR', 1488, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('1bc85133-15a8-4659-a188-bbd147070498', '1000000001', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 7.32 X .81 M RECTANGULAR', 965, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('192a183c-003e-42d5-ae13-95c17f282f45', '1000000002', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 7.32 X .81 M RECTANGULAR', 899, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('ca89f979-37ab-4aa1-ad44-e8bcff863500', '1000000003', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 6.10 X .81 M RECTANGULAR', 804, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('db4a7753-8b17-4f44-b45f-d6c86964d44d', '1000000004', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 6.10 X .81 M RECTANGULAR', 749, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('a3ffb7bf-57ee-4c77-b97a-6fa7148b6d59', '1000000005', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 5.49 X .81 M RECTANGULAR', 724, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('38c5563d-9007-4c3a-9f12-f318d5086dd7', '1000000006', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 5.49 X .81 M RECTANGULAR', 674, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('10830c05-6518-427b-8fc9-720f750f33a5', '1000000007', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 4.88 X .81 M RECTANGULAR', 643, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('f558caff-1b74-43a7-add1-54d3fcef3d28', '1000000008', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 4.88 X .81 M RECTANGULAR', 600, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('1aef53cc-413c-4ca5-8f12-28efd08f8c7d', '1000000009', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 4.27 X .81 M RECTANGULAR', 563, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('e356f5a5-d888-4e3d-98c2-478350b452e2', '1000000010', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 4.27 X .81 M RECTANGULAR', 525, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('376ad472-0597-4a33-b70c-5822bd4c2aeb', '1000000011', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 3.66 X .81 M RECTANGULAR', 483, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('d35f8b7b-0762-40e7-b256-62d687aeaca1', '1000000012', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 3.66 X .84 M ONDULADA', 483, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('d3852dae-107d-4f52-bec3-d5ec1ba194af', '1000000013', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA GALVANIZADA TERNIUM 3.66 X .81 M RECTANGULAR', 450, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be'),
        ('8f094314-2680-4dbc-ab39-dd7be6424fd2', '1000000014', 'fd3cb9ff-c280-43fe-a812-4d435e9f7c54', 'LÁMINA DE ALUMINIO TERNIUM 3.05 X .84 M ONDULADA', 402, 0.16, 10, '4484477b-7b52-4d09-8a61-563f2adce6be');
