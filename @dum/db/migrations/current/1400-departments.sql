-- The table that will store all the Main Departments
create table dum_public.main_departments (
  -- Remember to change the type on this id, from SERIAL to UUID
  id uuid primary key default gen_random_uuid(),
  main_department text not null,
  picture_url text check(picture_url ~ '^$|^https?://[^/]+'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Each Main Department must have a unique name
  constraint main_department_unique_name unique(main_department)
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.main_departments enable row level security;

-- The Main Departments are publicly visible.
create policy select_all on dum_public.main_departments for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.main_departments to :DATABASE_VISITOR;

comment on table dum_public.main_departments is
  E'A Main Department wich the Store will have.';

comment on column dum_public.main_departments.id is
  E'Unique identifier for the Main Department.';
comment on column dum_public.main_departments.main_department is
  E'The name of the Main Department.';

create trigger _100_timestamps
  before insert or update on dum_public.main_departments
  for each row
  execute procedure dum_private.tg__timestamps();

-- INSERTS mock data in the dum_public.main_departments table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.main_departments(
  id,
  main_department,
  picture_url
) values('4737e8b6-43af-457c-b96c-8ea23bfe5638', 'HOGAR Y JARDÍN', 'https://www.viviendasaludable.es/wp-content/uploads/2019/02/organizar-el-jardin-1.jpg'),
        ('73876311-083e-4ecb-9b12-63e55f802825', 'HERRAMIENTAS', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Hand_tools.jpg'),
        ('edfc44a0-b6cc-4d2a-adf2-852a2a43ddca', 'MATERIAL ELÉCTRICO', 'https://actrum.com/assets/images/servicios/materiales01.jpg'),
        ('20701679-709d-4cda-a0a8-589e65bfe309', 'FERRETERIA', 'https://slp.gob.mx/ssalud/Noticias/vigilanciaFerreterias.jpg'),
        ('6b234a7a-e3fd-458b-a75f-63797e0bb70b', 'BAÑOS Y PLOMERIA', 'https://queretaro10.com/wp-content/uploads/2018/01/sucursales.png'),
        ('c168c8fd-1ecb-4763-bbcc-4d39e448afb7', 'MAQUINARIA LIGERA', 'https://como-funciona.co/wp-content/uploads/2018/09/imagen1-png.png'),
        ('669b75b3-71b1-4c9e-9eab-964d1ac8579f', 'SEGURIDAD', 'https://concepto.de/wp-content/uploads/2014/01/sseguridad-industrial-1-e1551712014904.jpg'),
        ('eca0adaf-a1fb-4cb5-b143-3048a56ed22e', 'AGRÍCOLA', 'https://www.2000agro.com.mx/wp-content/uploads/ciclo-agricola-1-990x658.jpg');


-- The table that will store the Sub - Departments that belongs to a Main Department
create table dum_public.sub_departments (
  -- Remember to change the type of id from SERIAL to UUID
  id uuid primary key default gen_random_uuid(),
  sub_department text not null,
  picture_url text check(picture_url ~ '^$|^https?://[^/]+'),
  -- Remember to change the type of deparment_id from SERIAL to UUID
  department_id uuid not null references dum_public.main_departments(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Each Sub Department must have a unique name
  constraint sub_department_unique_name unique(sub_department)
);

-- Enable ROW lEVEL SECURITY
alter table dum_public.sub_departments enable row level security;

-- The Sub - Departments are publicly visible.
create policy select_all on dum_public.sub_departments for select using (true);

-- Grant the SELECT permission to all the columns in the table
grant select on dum_public.sub_departments to :DATABASE_VISITOR;

-- Allow efficient retrieval of all the Sub - Departments owned by a particular Department.
create index idx_department_sub_departments on dum_public.sub_departments (department_id);

comment on table dum_public.sub_departments is
  E'A Sub - Department that belongs to a Main Department.';

comment on column dum_public.sub_departments.id is
  E'Unique identifier for the Sub - Department.';
comment on column dum_public.sub_departments.sub_department is
  E'The name of the Sub - Department.';

create trigger _100_timestamps
  before insert or update on dum_public.sub_departments
  for each row
  execute procedure dum_private.tg__timestamps();

-- INSERTS mock data in the dum_public.sub_departments table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.sub_departments (
  id,
  sub_department,
  picture_url,
  department_id
) values ('6310a459-4f35-4c61-ae3f-aa1f4690525a', 'Jardinería', 'https://blog.homedepot.com.mx/wp-content/uploads/2019/10/Portada_Principiantes_01.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('07e1074b-99a1-4795-9a1e-c59419a6d15c', 'Cocina', 'https://cdn1.coppel.com/images/catalog/pm/3520983-1.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('e6202cd2-165c-4b22-b583-d5cc947041e7', 'Mantenimiento', 'https://www.prisa.mx/blog/wp-content/uploads/2021/01/aspectos-clave-para-mantenimiento-hogar.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('25980163-64ab-4c45-b817-74aeafd36f50', 'Linea Blanca y Electrónica', 'https://lh5.googleusercontent.com/fBdmrzDEms4PbMEQzf8Ay6cl_35GODC4ANdwaO5On17xSmCSxB3Zh_VVTovPcgyoklSTsetqsn0I21b-XL7wpLCRf8z8dXag1AemM26Nqf3b_XqNWg2ocR_yA5kWqvlzZmJZeLKf', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('b4b84da6-4000-4250-82a6-b3d45b9fb8a2', 'Muebles y Decoración', 'https://www.gaiadesign.com.mx/media/catalog/product/cache/28cb47c806b746a91bc25b380c9673fa/l/i/librero_angular_5_repisas_miniambiente1_v1_ho.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('40573ab4-3edb-486b-9748-97e33e5737ec', 'Campismo', 'https://www.hobbyaficion.com/wp-content/uploads/2017/08/tommy-lisbin-211935-unsplash-300x200.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('2e1d5c1c-9100-45d6-ad1e-fd64388fc039', 'Manuales', 'https://media.istockphoto.com/photos/various-hand-tools-with-a-white-background-picture-id157384169?s=612x612', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('24eb47ed-fa42-4ea7-b7c8-e27dc01c760a', 'Eléctricas y Mecánicas', 'https://eltecnoanalista.com/wp-content/uploads/2020/04/Herramientas-Mec%C3%A1nicas-05.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('6bb1c2c1-253b-4c8f-99b3-f8d10c8598bc', 'Taladros y Rotomartillos', 'https://www.grupoferreterochc.com.mx/files/Productos/Neo/Kit_Neo_TP813LI812AI816.jpg','73876311-083e-4ecb-9b12-63e55f802825'),
         ('b2a8be24-162f-49b7-8a2f-98d4c5b5aa21', 'Neumáticas y de Combustion', 'https://www.maquituls.es/noticias/wp-content/uploads/2016/11/neu.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('638fce0c-e6b0-485a-98b8-0553b9cc9209', 'Refacciones', 'https://mx.all.biz/img/mx/catalog/33387.jpeg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('618e757e-0bd6-46ab-8415-ea7f9656d01a', 'Accesorios para Herramientas', 'https://www.tornimatic.com/wp-content/uploads/2014/09/bodego-sencer_web.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('dcc4d7fa-a71e-4e1c-b4d9-023c2f082f83', 'Instalación', 'https://electricasanmiguel.com.mx/wp-content/uploads/2020/11/22instalacionelectrica22_ElectricaSanMiguel.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('de6af070-9d6f-49b1-befa-49d69aa1bbcd', 'Iluminación', 'https://tecnohotelnews.com/wp-content/uploads/2018/07/shutterstock_238845451.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('2bb43fed-4303-48ea-ac35-34b8166bb1a6', 'Equipo Eléctrico', 'https://thumbs.dreamstime.com/z/equipo-el%C3%A9ctrico-en-fondo-met%C3%A1lico-vista-superior-varios-equipos-y-herramientas-electricistas-metalico-gris-164688877.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('535f5277-7296-4a7d-b9e5-3fb54fd2fb9e', 'Sistemas Fotovoltaicos', 'https://www.indisect.com/wp-content/uploads/2020/02/portada-panel-aislado-1024x512.png', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('b26e5285-0616-430e-b080-da9de33bfa12', 'Baterías y Cargadores', 'https://www.actualidadmotor.com/wp-content/uploads/2020/05/cargadores-bateria-coche-1024x614.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('7e1a9584-ebfe-4216-9d1f-96841a719429', 'Fijación y Sujeción', 'https://www.lifeder.com/wp-content/uploads/2017/12/587.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('4484477b-7b52-4d09-8a61-563f2adce6be', 'Láminas para Techos', 'https://comeca.com.mx/wp-content/uploads/2017/08/laminasparatechoscolor.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('1273d184-d8a5-44ea-a23a-e6e8409344e9', 'Aceites y Lubricantes', 'https://garinetiquetas.com/assets/img/automotriz/etiquetas_de_marca.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('aadee1ef-a1dc-499d-91a0-371f83ccd64e', 'Pintura', 'https://www.hogar.mapfre.es/media/2018/08/pinturas_con_base_de_aceite_o_de_agua.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('5ea37be6-444b-41d2-b775-7bd58e61180a', 'Otros Productos', 'https://mercafilms.com.mx/wp-content/uploads/2018/09/otros_productos.png', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('a01a2642-fc99-4677-9113-7830ef8d7d1b', 'Básculas', 'https://www.sicar.mx/wp-content/uploads/2016/06/bascula-torrey-LEQ-3.png', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('4adebd8a-08e9-4d31-bace-4384cb15b3c9', 'Accesorios para Baño', 'https://hygolet.com.mx/blog/wp-content/uploads/2020/01/accesorios.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('1e154826-13eb-4a93-a22a-92d111a2b799', 'Grifería', 'https://arquitecturayempresa.es/sites/default/files/styles/n1000x540/public/imagenes/noticia/griferia_portada.jpg?itok=89AWoJvb', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('9b0bb9dc-4172-41e4-9359-d03986869833', 'Conexiones', 'https://grupoinfra.com/img/productos/imagenes/4526-conexiones-mangueras.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('a656cc9e-d93b-4e1d-a1a1-7a4a9718d373', 'Herrajes', 'https://img.interempresas.net/FotosArtProductos/P147294.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('5d230fb3-0daa-49e5-87ed-ef3bf1885974', 'Muebles para Baño', 'https://cdn.homedepot.com.mx/contentMarketing/Tips_Compra/26_Banos/TC_D26_16/images/cuarto-bano.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('85af9e73-1afe-4ff8-8672-bbbc63691bcc', 'Calentadores', 'https://blog.homedepot.com.mx/wp-content/uploads/2015/12/calentadores-de-agua.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('a0286b63-5f64-4708-bb6a-2a356633d64b', 'Equipo para Soldar', 'https://i1.wp.com/www.ventageneradores.net/blog/wp-content/uploads/2016/04/soldador-convencional.jpg?resize=1024%2C1024', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('cf9ff9dc-0d1b-4047-9d85-fad3ab6fe062', 'Maquinaria Eléctrica', 'https://www.diariosigloxxi.com/multimedia/images/img_3dea7a3ce5d31135f801ea89a0f5f913.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('52fa1f04-a81d-4835-91a4-85638ba176d8', 'Equipo de Limpieza', 'https://negociosrentableshispanos.com/wp-content/uploads/2019/02/Herramientas-y-equipos-de-limpieza-640x430.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('c9fdcb13-7ad2-4f84-9c49-ca233dab6413', 'Maquinaria de Combustión', 'https://www.revista.ferrepat.com/wp-content/uploads/2015/11/800x518xmartelo-demolidor-bosh-gsh-27-2.jpeg.pagespeed.ic_.dyJvYSW93P-e1447918275963.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('ce5fdee8-4b8e-45ad-923b-8de106ee32ff', 'Candados y Cerraduras', 'https://2.bp.blogspot.com/-XSb2cj4zaN8/WjU5RUCyjzI/AAAAAAAAAxI/t9gmFlx3rOsSnfkuTXEK3AX9f_jwTAaAgCEwYBhgL/s1600/candado%2Bmaster3.JPG', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('56e2f419-ef19-4c1b-a4d0-4bcddc69ec45', 'Mirillas, Cámaras e Interfonos', 'https://enetmx.com/wp-content/uploads/2021/01/DP1C-h.png', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('c341813c-ed12-40f9-b0da-f3eda6cf7757', 'Cajas Fuertes y Detectores', 'https://static.grainger.com/rp/s/is/image/Grainger/32RT41_AS01?$zmmain$', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('31f38848-2bcb-4ec7-b813-4e5e4bac658f', 'Seguridad Industrial y Perimetral', 'https://www.redesdeseguridad.com/media/visornets/Visor-redes-de-seguridad-asesoramiento-en-seguridad-colectiva1.jpg', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('b10cff4d-4a98-4209-8fc2-4f1fcfe8e9be', 'Herramienta Manual Agrícola', 'https://agronomaster.com/wp-content/uploads/2018/05/herramientas-agricolas-manuales-3.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('0b0e706e-c376-4a13-8cfa-280a6b21b95c', 'Forestal', 'https://static.stihl.com/upload/produkte/images/gruppen/middle/332ba94e33a348629f091f542043db4d.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('aca0e20e-6272-4b31-9da5-6adda9e1fc01', 'Riego', 'https://previews.123rf.com/images/kuponjabah/kuponjabah1309/kuponjabah130900193/22159446-herramienta-de-riego-en-el-jard%C3%ADn.jpg?fj=1', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('03567568-3dc4-461c-8bc3-b3b37b63d3d3', 'Maquinaria Agrícola Ligera', 'https://como-funciona.co/wp-content/uploads/2018/09/imagen1-png.png', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('c366510d-4a16-419e-a46e-e89b606ab21f', 'Bombas y Motobombas', 'https://ferretero.com/wp-content/uploads/2019/02/bombasparaagua-735x400.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('1a8aa484-173c-44d7-b12e-bd1768a49456', 'Mallas y Alambres', 'https://mallasdealambre.com/images/mallas-de-alambre-1.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e');
