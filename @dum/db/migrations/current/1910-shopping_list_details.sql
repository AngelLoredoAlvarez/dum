/*
 * Table that stores all the Products in a Shopping List
 */
create table dum_public.shopping_list_details (
  id uuid primary key default gen_random_uuid(),
  quantity integer,
  unformated_cost numeric(8,2) not null,
  product_id uuid not null references dum_public.products(id),
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
create index idx_product_shopping_list_details on dum_public.shopping_list_details(product_id);

-- Allow efficient retrieval of all the Shopping Lists associated to a Shopping Detail.
create index idx_user_shopping_list_details on dum_public.shopping_list_details(shopping_list_id);

/*
 * Computed Column that returns the cost of a quantity of a specific product
 */
create or replace function dum_public.shopping_list_details_cost(shopping_list_detail dum_public.shopping_list_details) returns text as $$
  select cast(shopping_list_detail.unformated_cost as money);
$$ language sql stable;

/*
 * Function that return the id from a specific Shipping List Detail
 */
 create or replace function dum_public.shopping_list_detail_id(product_id uuid) returns uuid as $$
  select id from dum_public.shopping_list_details where product_id = $1 and shopping_list_id = dum_public.open_shopping_list_id();
 $$ language sql stable;

/*
 * Function that inserts into the dum_public.shopping_list and dum_public.shopping_list_details tables
 */
create or replace function dum_public.create_shopping_list(product_id uuid, quantity integer) returns dum_public.shopping_list_details as $$
  declare
    created_shopping_list dum_public.shopping_lists;
    calculated_unformated_cost numeric(8,2);
    added_product dum_public.shopping_list_details;
  begin
    -- We calculate the unformated_cost, multiplying the unformated_price by the quantity
    select unformated_price * $2 from dum_public.products where id = $1 into calculated_unformated_cost;

    -- We check if there's a shopping list already
    if dum_public.open_shopping_list_id() is not null then
      -- If it does, we have to check if the product was already added to the dum_public.shopping_list_details table
      insert into dum_public.shopping_list_details (
        quantity,
        unformated_cost,
        product_id,
        shopping_list_id
      ) values (
        $2,
        calculated_unformated_cost,
        $1,
        dum_public.open_shopping_list_id()
      ) returning * into added_product;
    else
      -- If it does not, we insert in the dum_public.shopping_lists and the dum_public.shopping_list_details tables
      insert into dum_public.shopping_lists (
        user_id
      ) values(
        dum_public.current_user_id()
      ) returning * into created_shopping_list;

      insert into dum_public.shopping_list_details (
        quantity,
        unformated_cost,
        product_id,
        shopping_list_id
      ) values (
        $2,
        calculated_unformated_cost,
        $1,
        created_shopping_list.id
      ) returning * into added_product;
    end if;

    return added_product;
  end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function dum_public.create_shopping_list(product_id uuid, quantity integer) is
  E'Creates the shopping list will all the products that the user want to buy.';
