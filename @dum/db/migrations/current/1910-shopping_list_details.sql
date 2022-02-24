/*
 * Table that stores all the Products in a Shopping List
 */
create table dum_public.shopping_list_details (
  quantity integer,
  unformated_cost numeric(8,2) not null,
  product_id uuid not null,
  shopping_list_id uuid not null references dum_public.shopping_lists(id)
);

comment on table dum_public.shopping_list_details is
  E'The details of a specific Shopping List.';

comment on column dum_public.shopping_list_details.quantity is
  E'The quantity of a specific product.';
comment on column dum_public.shopping_list_details.unformated_cost is
  E'The cost of the quantity of products.';

-- Enable ROW lEVEL SECURITY
alter table dum_public.shopping_list_details enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.shopping_list_details to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Products in a Shopping List from a specific User.
create index idx_user_shopping_list_details on dum_public.shopping_list_details(shopping_list_id);

/*
 * Computed Column that returns the cost of a quantity of a specific product
 */
create or replace function dum_public.shopping_list_details_cost(shopping_list_detail dum_public.shopping_list_details) returns text as $$
  select cast(shopping_list_detail.unformated_cost as money);
$$ language sql stable;
