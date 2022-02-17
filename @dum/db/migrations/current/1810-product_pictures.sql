-- The table that will store the information of all pictures added in a specific product
create table dum_public.product_pictures (
   id uuid primary key default gen_random_uuid(),
   picture_url text check(picture_url ~ '^$|^https?://[^/]+'),
   product_id uuid not null references dum_public.products(id) on delete cascade,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now(),
   -- Each Product Picture must have a unique URL
   constraint product_pictures_unique_url unique(picture_url)
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.product_pictures enable row level security;

-- Product Pictures are publicly visible.
create policy select_all on dum_public.product_pictures for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.product_pictures to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Product Pictures owned by a particular Product.
create index idx_product_pictures_pictures on dum_public.product_pictures(product_id);

comment on table dum_public.product_pictures is
  E'A Picture associated to a specific Product.';
comment on column dum_public.product_pictures.picture_url is
  E'The Picture URL.';

create trigger _100_timestamps
  before insert or update on dum_public.product_pictures
  for each row
  execute procedure dum_private.tg__timestamps();

/*
 * Custom Query that returns a specific Product Picture by it's ID
 */
create or replace function dum_public.product_picture(product_id uuid, picture_id uuid default null) returns dum_public.product_pictures as $$
  declare
    product_picture dum_public.product_pictures;
  begin
    if $2 is null then
      select
        *
      from
        dum_public.product_pictures
      where
        dum_public.product_pictures.product_id = $1
      order by
        dum_public.product_pictures.created_at
      limit
        1
      into
        product_picture;
    else
      select
        *
      from
        dum_public.product_pictures
      where
        dum_public.product_pictures.product_id = $1
      and
        dum_public.product_pictures.id = $2
      order by
        dum_public.product_pictures.created_at
      limit
        1
      into
        product_picture;
    end if;

    return product_picture;
  end;
$$ language plpgsql stable;

-- Inserts mock data in the dum_public.products table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.product_pictures(
  id,
  picture_url,
  product_id
) values('476145de-c1a5-4156-8e05-8c9769853ca7', 'https://cms.grupoferrepat.net/assets/img/productos/98908.jpg', 'eef185db-0d4b-4d54-a7f1-b64652c794b4'),
        ('81dc8e45-4b13-4559-828f-039dc49e4379', 'https://cms.grupoferrepat.net/assets/img/productos/95226.jpg', 'ea0dce7e-da49-489a-b395-7e9ea411b75b'),
        ('c1995fab-d0ed-4916-bb49-06ba081f1e8d', 'https://cms.grupoferrepat.net/assets/img/productos/95226_2.jpg', 'ea0dce7e-da49-489a-b395-7e9ea411b75b'),
        ('49049581-cf66-49db-8704-701a65997366', 'https://cms.grupoferrepat.net/assets/img/productos/1615001.jpg', 'd58d52f1-839e-4bf1-ba1a-8b83dabddddb'),
        ('d81599da-9120-4840-aa05-127e26aba433', 'https://cms.grupoferrepat.net/assets/img/productos/1615001_2.jpg', 'd58d52f1-839e-4bf1-ba1a-8b83dabddddb'),
        ('ff25410f-897d-4660-8d18-f27850a983e1', 'https://cms.grupoferrepat.net/assets/img/productos/14861.jpg', '17e5beae-94b4-4c76-b2a4-8db7206b8d3e'),
        ('5b914e04-aca1-4c4a-9135-ee145ba3f44d', 'https://cms.grupoferrepat.net/assets/img/productos/14859.jpg', '68c15627-70ad-4484-a608-1468bef08bfe'),
        ('a41e8f9d-862b-45a8-bec0-a0efff77c618', 'https://cms.grupoferrepat.net/assets/img/productos/14911.jpg', 'd6db3753-5d4d-4b7b-bc1a-b5a2ff5d9329'),
        ('de684d9c-3626-4d1c-97d0-adab170232a0', 'https://cms.grupoferrepat.net/assets/img/productos/95222-B.jpg', '1e3f2f26-2d90-4076-b306-cf88472c8473'),
        ('5b87634b-7aae-4018-8f15-bd7eae788e45', 'https://cms.grupoferrepat.net/assets/img/productos/14872.jpg', '5bad00d6-06e7-4f3a-9d16-08e94a4a0f73'),
        ('3f8419a4-3841-4928-b0c4-9948b91225f5', 'https://cms.grupoferrepat.net/assets/img/productos/14870.jpg', '3e711cb0-6c22-4bb1-8c13-9ac22bc0a684'),
        ('bfae3c61-10dd-4489-ba1a-2d912570ccfb', 'https://cms.grupoferrepat.net/assets/img/productos/14926.jpg', '7dacda91-bf2e-4849-8384-3f007a09dd6a'),
        ('8375408d-e8d2-4223-b644-6b29afc942ca', 'https://cms.grupoferrepat.net/assets/img/productos/AC0382600165.jpg', '275192b5-1f6f-420d-a0bd-4dbef363f839'),
        ('ce476678-e0f2-4ed5-9320-e9a8cdacb2f1', 'https://cms.grupoferrepat.net/assets/img/productos/AC0382600165_2.jpg', '275192b5-1f6f-420d-a0bd-4dbef363f839'),
        ('36c2464b-df56-44ad-b63a-f7e084d1335c', 'https://cms.grupoferrepat.net/assets/img/productos/30017.jpg', '1bc85133-15a8-4659-a188-bbd147070498'),
        ('a33ff37f-cd76-42c5-9991-346b83e71a68', 'https://cms.grupoferrepat.net/assets/img/productos/30017_2.jpg', '1bc85133-15a8-4659-a188-bbd147070498'),
        ('87f53ba9-fe4a-425a-a086-cc613e31fecc', 'https://cms.grupoferrepat.net/assets/img/productos/30027.jpg', '192a183c-003e-42d5-ae13-95c17f282f45'),
        ('af1a9035-8fd8-45b1-8376-e337a9e9de6d', 'https://cms.grupoferrepat.net/assets/img/productos/30027_2.jpg', '192a183c-003e-42d5-ae13-95c17f282f45'),
        ('9e349065-e6ce-43b4-9e1e-d4c6b7f1ac35', 'https://cms.grupoferrepat.net/assets/img/productos/30016.jpg', 'ca89f979-37ab-4aa1-ad44-e8bcff863500'),
        ('f59cc259-784e-4796-bb61-8bb0c8673c58', 'https://cms.grupoferrepat.net/assets/img/productos/30016_2.jpg', 'ca89f979-37ab-4aa1-ad44-e8bcff863500'),
        ('0b7e8193-a31d-4ccf-8986-6d2e156edb99', 'https://cms.grupoferrepat.net/assets/img/productos/30020.jpg', 'db4a7753-8b17-4f44-b45f-d6c86964d44d'),
        ('49ba09b7-62ab-4d26-b856-55ee48c61cf9', 'https://cms.grupoferrepat.net/assets/img/productos/30020_2.jpg', 'db4a7753-8b17-4f44-b45f-d6c86964d44d'),
        ('f0defb3f-5522-420e-9f06-b78ba529ab4e', 'https://cms.grupoferrepat.net/assets/img/productos/30015.jpg', 'a3ffb7bf-57ee-4c77-b97a-6fa7148b6d59'),
        ('ec414aad-0a5c-4fcd-8964-ef2e973b905e', 'https://cms.grupoferrepat.net/assets/img/productos/30015_2.jpg', 'a3ffb7bf-57ee-4c77-b97a-6fa7148b6d59'),
        ('89f074b9-f8cb-4c71-9cd6-824ded3f0a9c', 'https://cms.grupoferrepat.net/assets/img/productos/30023.jpg', '38c5563d-9007-4c3a-9f12-f318d5086dd7'),
        ('f199217d-20da-4fcd-812a-dcd9fc3b2433', 'https://cms.grupoferrepat.net/assets/img/productos/30023_2.jpg', '38c5563d-9007-4c3a-9f12-f318d5086dd7'),
        ('f7e0bcf0-895b-4aaf-985d-3863b99d0189', 'https://cms.grupoferrepat.net/assets/img/productos/30010.jpg', '10830c05-6518-427b-8fc9-720f750f33a5'),
        ('95062654-bed6-483a-814b-9cbbd94fb24b', 'https://cms.grupoferrepat.net/assets/img/productos/30010_2.jpg', '10830c05-6518-427b-8fc9-720f750f33a5'),
        ('c724afdf-0abb-4b65-9c68-4104cc2d2001', 'https://cms.grupoferrepat.net/assets/img/productos/30011.jpg', 'f558caff-1b74-43a7-add1-54d3fcef3d28'),
        ('da0fd762-98af-49bd-afb0-fbd8271ea301', 'https://cms.grupoferrepat.net/assets/img/productos/30011_2.jpg', 'f558caff-1b74-43a7-add1-54d3fcef3d28'),
        ('18386daf-6b96-4147-ab01-b2a050b8a343', 'https://cms.grupoferrepat.net/assets/img/productos/30014.jpg', '1aef53cc-413c-4ca5-8f12-28efd08f8c7d'),
        ('221a7908-346c-4555-9a30-95c75b0ff22b', 'https://cms.grupoferrepat.net/assets/img/productos/30014_2.jpg', '1aef53cc-413c-4ca5-8f12-28efd08f8c7d'),
        ('47cfef0c-784f-47fa-8ac6-404e624dba85', 'https://cms.grupoferrepat.net/assets/img/productos/30012.jpg', 'e356f5a5-d888-4e3d-98c2-478350b452e2'),
        ('ddcd327b-009b-460f-82de-25f8f5e963a8', 'https://cms.grupoferrepat.net/assets/img/productos/30012_2.jpg', 'e356f5a5-d888-4e3d-98c2-478350b452e2'),
        ('996b846e-cb71-4e9c-bfe4-64f76b9cc94b', 'https://cms.grupoferrepat.net/assets/img/productos/30009.jpg', '376ad472-0597-4a33-b70c-5822bd4c2aeb'),
        ('586d6763-48a0-48f4-8bdd-1df73404b9b9', 'https://cms.grupoferrepat.net/assets/img/productos/30009_2.jpg', '376ad472-0597-4a33-b70c-5822bd4c2aeb'),
        ('a1765e55-5f41-4eea-aa48-5cc16c14149e', 'https://cms.grupoferrepat.net/assets/img/productos/30008.jpg', 'd35f8b7b-0762-40e7-b256-62d687aeaca1'),
        ('34d4e3bf-6663-477e-b5e1-87645e393fe2', 'https://cms.grupoferrepat.net/assets/img/productos/30008_2.jpg', 'd35f8b7b-0762-40e7-b256-62d687aeaca1'),
        ('6b86f7e4-2ddf-4d8e-b8be-f76bca87a995', 'https://cms.grupoferrepat.net/assets/img/productos/30029.jpg', 'd3852dae-107d-4f52-bec3-d5ec1ba194af'),
        ('1d2ddf4b-5030-4d01-87c5-15c94b52f511', 'https://cms.grupoferrepat.net/assets/img/productos/30029_2.jpg', 'd3852dae-107d-4f52-bec3-d5ec1ba194af'),
        ('c9fb6774-6c8f-4e89-b27d-f487988f2603', 'https://cms.grupoferrepat.net/assets/img/productos/30007.jpg', '8f094314-2680-4dbc-ab39-dd7be6424fd2'),
        ('0cb163e9-e653-4d55-8bee-0b5ceb738568', 'https://cms.grupoferrepat.net/assets/img/productos/30007_2.jpg', '8f094314-2680-4dbc-ab39-dd7be6424fd2');
