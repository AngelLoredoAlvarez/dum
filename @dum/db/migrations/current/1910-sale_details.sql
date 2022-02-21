/*
 * Table that will store all the information about the products in a Custome Sale
 */
 create table dum_public.sale_details (
   quantity integer,
   unformated_cost numeric(8,2) not null,
   product_id uuid not null,
   sale_id uuid not null references dum_public.sales(id) on delete cascade
 );

 comment on table dum_public.sale_details is
  E'The details of a specific sale';

comment on column dum_public.sale_details.quantity is
  E'The quantity of a specific product.';
comment on column dum_public.sale_details.unformated_cost is
  E'The cost of the quantity of products.';

-- Enable ROW lEVEL SECURITY
alter table dum_public.sale_details enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.sale_details to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Sales owned by a particular User.
create index idx_user_sale_details on dum_public.sale_details(sale_id);

/*
 * Computed Column that returns the cost of a quantity of a specific product
 */
create or replace function dum_public.sale_details_cost(sale_detail dum_public.sale_details) returns text as $$
  select cast(sale_detail.unformated_cost as money);
$$ language sql stable;
