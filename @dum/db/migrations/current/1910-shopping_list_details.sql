/*
 * Table that stores all the Products in a Shopping List
 */
create table dum_public.shopping_list_details (
  id uuid primary key default gen_random_uuid(),
  quantity integer,
  unformated_cost numeric(8,2) not null,
  product_id uuid not null references dum_public.products(id),
  shopping_list_id uuid not null references dum_public.shopping_lists(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.shopping_list_details enable row level security;

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.shopping_list_details to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Products in a Shopping List from a specific User.
create index idx_product_shopping_list_details on dum_public.shopping_list_details(product_id);

-- Allow efficient retrieval of all the Shopping Lists associated to a Shopping Detail.
create index idx_user_shopping_list_details on dum_public.shopping_list_details(shopping_list_id);

-- Users may only manage their own Shopping Lists Details.
create policy select_own on dum_public.shopping_list_details for select using (shopping_list_id = dum_public.opened_shopping_list_id());
create policy insert_own on dum_public.shopping_list_details for insert with check (shopping_list_id = dum_public.opened_shopping_list_id());

comment on table dum_public.shopping_list_details is
  E'The details of a specific Shopping List.';

comment on column dum_public.shopping_list_details.quantity is
  E'The quantity of a specific product.';
comment on column dum_public.shopping_list_details.unformated_cost is
  E'The cost of the quantity of products.';

create trigger _100_timestamps
  before insert or update on dum_public.shopping_list_details
  for each row
  execute procedure dum_private.tg__timestamps();

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
  select id from dum_public.shopping_list_details where product_id = $1 and shopping_list_id = dum_public.opened_shopping_list_id();
 $$ language sql stable;

/*
 * Function that returns the unformated_cost for a Shopping List Detail
 */
create or replace function dum_public.shopping_list_detail_unformated_cost(product_id uuid, quantity integer) returns numeric(8,2) as $$
  select ceil(((unformated_price * tax) + unformated_price) * 2) from dum_public.products where id = $1;
$$ language sql stable;

/*
 * Function that inserts into the dum_public.shopping_list and dum_public.shopping_list_details tables
 */
create or replace function dum_public.add_to_shopping_list(product_id uuid, selected_quantity integer) returns dum_public.shopping_list_details as $$
  declare
    created_shopping_list dum_public.shopping_lists;
    calculated_unformated_cost numeric(8,2);
    added_product dum_public.shopping_list_details;
  begin
    -- We check if there's a shopping list already
    if dum_public.opened_shopping_list_id() is not null then
      -- If it does, that means that a product was already added, we need to verify if the product that the user want's to save exists alreadt in the Shopping List Details
      if dum_public.shopping_list_detail_id($1) is not null then
        update
          dum_public.shopping_list_details
        set
          quantity = quantity + $2,
          unformated_cost = dum_public.shopping_list_detail_unformated_cost($1, $2)
        where
          id = dum_public.shopping_list_detail_id($1)
        returning * into added_product;
      else
        -- If the product does not exists in the table, we insert a new row
        insert into dum_public.shopping_list_details (
          quantity,
          unformated_cost,
          product_id,
          shopping_list_id
        ) values (
          $2,
          dum_public.shopping_list_detail_unformated_cost($1, $2),
          $1,
          dum_public.opened_shopping_list_id()
        ) returning * into added_product;
      end if;
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
        dum_public.shopping_list_detail_unformated_cost($1, $2),
        $1,
        created_shopping_list.id
      ) returning * into added_product;
    end if;

    return added_product;
  end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function dum_public.add_to_shopping_list(product_id uuid, quantity integer) is
  E'Add a Product to a New or to an Already created Shopping List and returns the created `ShoppingListDetail`.';

/*
 * Computed column that returns the total count of all products in a Open Shopping List
 */
create or replace function dum_public.users_shopping_list_products_count(u dum_public.users) returns integer as $$
  select
    count(*)
  from
    dum_public.shopping_list_details
  inner join
    dum_public.shopping_lists
  on
    (dum_public.shopping_list_details.shopping_list_id = dum_public.shopping_lists.id)
  inner join
    dum_public.users
  on
    (dum_public.shopping_lists.user_id = dum_public.users.id)
  where
    dum_public.shopping_lists.is_open = true
  and
    dum_public.users.id = u.id;
$$ language sql stable;

/*
 * Function that returns all the products in the Opened Shopping List for a User
 */
create or replace function dum_public.products_in_the_shopping_list() returns setof dum_public.shopping_list_details as $$
  select
   dum_public.shopping_list_details.*
  from
    dum_public.shopping_list_details
  inner join
    dum_public.shopping_lists
  on
    (dum_public.shopping_list_details.shopping_list_id = dum_public.shopping_lists.id)
  where
    dum_public.shopping_lists.id = dum_public.opened_shopping_list_id()
  and
    dum_public.shopping_lists.user_id = dum_public.current_user_id()
  order by
    dum_public.shopping_list_details.updated_at
  desc;
$$ language sql stable;

/*
 * Function that returns the last added product to the shopping list
 */
create or replace function dum_public.last_added_product_in_the_shopping_list() returns dum_public.shopping_list_details as $$
  select * from dum_public.shopping_list_details where shopping_list_id = dum_public.opened_shopping_list_id() order by updated_at desc limit 1;
$$ language sql stable;
