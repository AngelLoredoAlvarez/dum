-- The enum type that will contain all the categories of the tools that the store will have
create type dum_public.product_category as enum (
  'ELECTRICAL',
  'HAND_TOOLS',
  'TOOL_KITS',
  'GARDENING',
  'CONSTRUCTION',
  'LADDERS',
  'SECURITY_EQUIPMENTS'
  'WOODWORK',
  'PLUMBING'
);

-- The table that will store the information of the products in the store
 create table dum_public.products (
   id uuid primary key default gen_random_uuid(),
   barcode text not null check (barcode ~ '^[0-9]*$'),
   description text not null,
   category dum_public.product_category,
   price numeric(8,2) not null,
   tax numeric (3,2),
   stock integer not null,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
 );

-- Enable ROW lEVEL SECURITY
alter table dum_public.products enable row level security;

-- Products are publicly visible.
create policy select_all on dum_public.products for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.products to :DATABASE_VISITOR;

comment on table dum_public.products is
  E'A product sold in the store.';

comment on column dum_public.products.id is
  E'Unique identifier for the product.';
comment on column dum_public.products.barcode is
  E'Unique code used to get the information from a product.';
comment on column dum_public.products.description is
  E'The description of the characteristics of a product.';
 comment on column dum_public.products.category is
  E'The cateogory to belongs a product.';
comment on column dum_public.products.price is
  E'The price of the product.';
comment on column dum_public.products.tax is
  E'The tax that applies to the product.';
comment on column dum_public.products.stock is
  E'The current quantity of the product in stock.';

create trigger _100_timestamps
  before insert or update on dum_public.products
  for each row
  execute procedure dum_private.tg__timestamps();

-- Insert mock data, just for testing, ¡¡¡REMOVE THIS BEFORE COMMIT THE CHANGES!!!
insert into dum_public.products (
  barcode,
  description,
  category,
  price,
  tax,
  stock
) values ('0000000000', 'Martillo Pulido Truper 16658 - MOR-16', 'CONSTRUCTION', 215.00, 0.16, 10),
         ('0000000001', 'Carretilla para Niños Truper 10440', 'CONSTRUCTION', 215.00, 0.16, 5),
         ('0000000002', 'Flexómetro de 5 m Contra Impactos Truper', 'CONSTRUCTION', 215.00, 0.16, 3);
