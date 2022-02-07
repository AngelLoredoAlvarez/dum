-- The table that will store the Sub - Departments that belongs to a Main Department
create table dum_public.sub_departments (
  -- Remember to change the type of id from SERIAL to UUID
  id uuid primary key default gen_random_uuid(),
  sub_department text not null,
  description text,
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

/*
 * Custom Query that returns a specific Sub Department according it's name
 * We used the 'dispense' arguments feture, wich mead that, instead of name the argument, we allow to PostgreSQL to name them,
 * that because the functions returns a weird behavior when we named the arguments
*/
create or replace function dum_public.sub_department_by_name(text) returns dum_public.sub_departments as $$
  select * from dum_public.sub_departments where unaccent(dum_public.sub_departments.sub_department) ilike '%' || regexp_replace($1, '-', ' ', 'g') || '%';
$$ language sql stable;

-- INSERTS mock data in the dum_public.sub_departments table ¡¡¡REMOVE THIS WHEN YOU LAUNCH TO PROD!!!
insert into dum_public.sub_departments (
  id,
  sub_department,
  description,
  picture_url,
  department_id
) values ('6310a459-4f35-4c61-ae3f-aa1f4690525a', 'Jardinería', '¡Consulta la amplia variedad que tenemos en artículos de jardinería como azadones, mangueras, aspesores y muchos más!, ¡Sólo en nuestra Tienda Online!.', 'https://blog.homedepot.com.mx/wp-content/uploads/2019/10/Portada_Principiantes_01.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('07e1074b-99a1-4795-9a1e-c59419a6d15c', 'Cocina', 'Tenemos todo en artículos de cocina, desde baterías, campanas, hornos, parrilas, licuadoras, cafeteras y cubiertos. ¡Visítanos ya!', 'https://cdn1.coppel.com/images/catalog/pm/3520983-1.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('e6202cd2-165c-4b22-b583-d5cc947041e7', 'Mantenimiento', 'Contamos con un amplia variedad de artículos de mantenimiento como bombas de agua, impermeabilizantes, cepillos para limpieza, ¡y mucho más!', 'https://www.prisa.mx/blog/wp-content/uploads/2021/01/aspectos-clave-para-mantenimiento-hogar.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('25980163-64ab-4c45-b817-74aeafd36f50', 'Linea Blanca y Electrónica', 'También encontrarás artículos de línea blanca y electrónica. Decora tu hogar de la mejor manera. Tenemos ventiladores, planchas, calentadores, ¡de todo!', 'https://lh5.googleusercontent.com/fBdmrzDEms4PbMEQzf8Ay6cl_35GODC4ANdwaO5On17xSmCSxB3Zh_VVTovPcgyoklSTsetqsn0I21b-XL7wpLCRf8z8dXag1AemM26Nqf3b_XqNWg2ocR_yA5kWqvlzZmJZeLKf', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('b4b84da6-4000-4250-82a6-b3d45b9fb8a2', 'Muebles y Decoración', 'Decora tu sala de TV con los mejores accesorios para el hogar. Contamos con estantes y soportes para televisión. ¡Adquierelos ahora en nuestra tienda online!.', 'https://www.gaiadesign.com.mx/media/catalog/product/cache/28cb47c806b746a91bc25b380c9673fa/l/i/librero_angular_5_repisas_miniambiente1_v1_ho.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('40573ab4-3edb-486b-9748-97e33e5737ec', 'Campismo', '¿Te gusta acampar?, contamos con varios artículos de campismo. Consigue tus linternas, navajas, cuchillos y etc. ¡Compra ahora!', 'https://www.hobbyaficion.com/wp-content/uploads/2017/08/tommy-lisbin-211935-unsplash-300x200.jpg', '4737e8b6-43af-457c-b96c-8ea23bfe5638'),
         ('2e1d5c1c-9100-45d6-ad1e-fd64388fc039', 'Manuales', '¡No busques más!, En nuestra tienda tenemos una amplia variedad en herramientas manuales para que complementes tu taller. ¡Adquiere la tuya!', 'https://media.istockphoto.com/photos/various-hand-tools-with-a-white-background-picture-id157384169?s=612x612', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('24eb47ed-fa42-4ea7-b7c8-e27dc01c760a', 'Eléctricas y Mecánicas', 'Adquiere herramientas eléctricas y mecánicas de las mejores marcas en nuestra tienda en línea. Cuentan con doble garantía, ¡no esperes más!', 'https://eltecnoanalista.com/wp-content/uploads/2020/04/Herramientas-Mec%C3%A1nicas-05.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('6bb1c2c1-253b-4c8f-99b3-f8d10c8598bc', 'Taladros y Rotomartillos', 'Coloca tus marcos, retratos o pinturas con ayuda de los taladros y rotomartillos que hemos seleccionado para ti. Manejamos las mejores marcas.', 'https://www.grupoferreterochc.com.mx/files/Productos/Neo/Kit_Neo_TP813LI812AI816.jpg','73876311-083e-4ecb-9b12-63e55f802825'),
         ('b2a8be24-162f-49b7-8a2f-98d4c5b5aa21', 'Neumáticas y de Combustion', 'Contamos con las mejores herramientas neumáticas, tenemos pistolas electricas y de gravedad, así como compresores de aire. ¡Adquiere el tuyo!', 'https://www.maquituls.es/noticias/wp-content/uploads/2016/11/neu.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('638fce0c-e6b0-485a-98b8-0553b9cc9209', 'Refacciones', 'Manejamos una amplia gama de refacciones para todo tipo de herramientas. Encuentra la tuya en nuestra tienda online.', 'https://mx.all.biz/img/mx/catalog/33387.jpeg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('618e757e-0bd6-46ab-8415-ea7f9656d01a', 'Accesorios para Herramientas', 'En nuestra tienda podrás adquirir los mejores accesorios para herramientas, tenemos de varias marcas y para una amplia variedad de herramientas.', 'https://www.tornimatic.com/wp-content/uploads/2014/09/bodego-sencer_web.jpg', '73876311-083e-4ecb-9b12-63e55f802825'),
         ('dcc4d7fa-a71e-4e1c-b4d9-023c2f082f83', 'Instalación', 'En nuestra tienda online encontrarás una amplia variedad en material de Instalación de la mejor calidad. Tenemos cables, contactos, interruptores, ¡de todo!', 'https://electricasanmiguel.com.mx/wp-content/uploads/2020/11/22instalacionelectrica22_ElectricaSanMiguel.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('de6af070-9d6f-49b1-befa-49d69aa1bbcd', 'Iluminación', 'Aquí encontrarás una amplia variedad en artículos de iluminación como lámparas, focos, reflectores y más. Todo de la mejor calidad.', 'https://tecnohotelnews.com/wp-content/uploads/2018/07/shutterstock_238845451.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('2bb43fed-4303-48ea-ac35-34b8166bb1a6', 'Equipo Eléctrico', 'El mejor equipo electrónico sólo con nosotros. Tenemos los mejores precios y las mejores marcas. Consigue reguladores, arrancadores ¡y más!', 'https://thumbs.dreamstime.com/z/equipo-el%C3%A9ctrico-en-fondo-met%C3%A1lico-vista-superior-varios-equipos-y-herramientas-electricistas-metalico-gris-164688877.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('535f5277-7296-4a7d-b9e5-3fb54fd2fb9e', 'Sistemas Fotovoltaicos', 'Consulta nuestros sistemas foltovoltáicos o los paneles solar que tenemos para ti. Ahórrate esos gastos de luz. ¡Compra la tuya ahora!', 'https://www.indisect.com/wp-content/uploads/2020/02/portada-panel-aislado-1024x512.png', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('b26e5285-0616-430e-b080-da9de33bfa12', 'Baterías y Cargadores', 'Manejamos diferentes tamaños de batería y cargadores. No te quedes sin pilas para tu control remoto. ¡Compra ahora!', 'https://www.actualidadmotor.com/wp-content/uploads/2020/05/cargadores-bateria-coche-1024x614.jpg', 'edfc44a0-b6cc-4d2a-adf2-852a2a43ddca'),
         ('7e1a9584-ebfe-4216-9d1f-96841a719429', 'Fijación y Sujeción', 'Amplia variedad en artículos de fijación y sujeción como cintas adhesivas, silicones, selladores, cinchos de plastico etc.', 'https://www.lifeder.com/wp-content/uploads/2017/12/587.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('4484477b-7b52-4d09-8a61-563f2adce6be', 'Láminas para Techos', 'Construye tu taller, bodega o almacen con las mejores láminas para techo de la mejor calidad y al mejor precio. ¡Sólo en nuestra tienda online!', 'https://comeca.com.mx/wp-content/uploads/2017/08/laminasparatechoscolor.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('1273d184-d8a5-44ea-a23a-e6e8409344e9', 'Aceites y Lubricantes', 'Engrasa tus motores, cadenas, motosierras con los aceites y lubricantes que hemos seleccionado para ti. Amplia variedad en marcas. Elige el tuyo.', 'https://garinetiquetas.com/assets/img/automotriz/etiquetas_de_marca.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('aadee1ef-a1dc-499d-91a0-371f83ccd64e', 'Pintura', 'Decora cualquier espacio con el color que tienes en mente. En nuestra tienda encontrarás una amplia variedad de colores y marcas en pintura.', 'https://www.pinturassuper.com/wp-content/uploads/2019/02/Caracteristicas-de-la-pintura-de-esmalte.jpg', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('5ea37be6-444b-41d2-b775-7bd58e61180a', 'Otros Productos', 'Lonas y toldos podrás encontrar en aquí. Contamos en varios colores, tamaños y marcas. Elige el que más se ajuste a tus necesidades.', 'https://mercafilms.com.mx/wp-content/uploads/2018/09/otros_productos.png', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('a01a2642-fc99-4677-9113-7830ef8d7d1b', 'Básculas', 'La mejores básculas para tu negocio, encuentra los diferentes modelos y tipos. Elige la que más se ajuste a tus necesidades.', 'https://www.sicar.mx/wp-content/uploads/2016/06/bascula-torrey-LEQ-3.png', '20701679-709d-4cda-a0a8-589e65bfe309'),
         ('4adebd8a-08e9-4d31-bace-4384cb15b3c9', 'Accesorios para Baño', 'Adquiere tus accesorios para baño en la tienda en línea al mejor precio y con envío a todo México. ¡No esperes más y compra ahora!', 'https://hygolet.com.mx/blog/wp-content/uploads/2020/01/accesorios.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('1e154826-13eb-4a93-a22a-92d111a2b799', 'Grifería', '¿Estás remodelando tu casa? Descubre la más amplia variedad en grifería que tenemos para ti, de la mejor calidad, a buen precio y envío a todo México.', 'https://arquitecturayempresa.es/sites/default/files/styles/n1000x540/public/imagenes/noticia/griferia_portada.jpg?itok=89AWoJvb', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('9b0bb9dc-4172-41e4-9359-d03986869833', 'Conexiones', 'Repara o remodela tu hogar con alguna de las conexiones que hemos seleccionado para ti. La mejor calidad y al mejor precio. ¡Compra ahora!', 'https://grupoinfra.com/img/productos/imagenes/4526-conexiones-mangueras.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('a656cc9e-d93b-4e1d-a1a1-7a4a9718d373', 'Herrajes', 'Contamos con herrajes para mangueras, W.C, así como coladeras. Renueva tu hogar con los productos que tenemos para ti.', 'https://img.interempresas.net/FotosArtProductos/P147294.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('5d230fb3-0daa-49e5-87ed-ef3bf1885974', 'Muebles para Baño', 'Muebles para baño como lavabos, mingitorios, secadores y tazas podrás encontrar en nuestra tienda online. Tenemos varios modelos y marcas a buen precio.', 'https://cdn.homedepot.com.mx/contentMarketing/Tips_Compra/26_Banos/TC_D26_16/images/cuarto-bano.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('85af9e73-1afe-4ff8-8672-bbbc63691bcc', 'Calentadores', 'Tenemos todo tipo de calentadores de gas y calentadores eléctricos. Varios modelos y al mejor precio. ¡Compra ya!', 'https://blog.homedepot.com.mx/wp-content/uploads/2015/12/calentadores-de-agua.jpg', '6b234a7a-e3fd-458b-a75f-63797e0bb70b'),
         ('a0286b63-5f64-4708-bb6a-2a356633d64b', 'Equipo para Soldar', 'Adquiere tu equipo para soldar, hacemos envíos a todo México. Tenemos los mejores precios y prodcutos de la mejor calidad.', 'https://i1.wp.com/www.ventageneradores.net/blog/wp-content/uploads/2016/04/soldador-convencional.jpg?resize=1024%2C1024', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('cf9ff9dc-0d1b-4047-9d85-fad3ab6fe062', 'Maquinaria Eléctrica', 'Contamos con una amplia variedad en maquinaria eléctrica, especialmente de motores y bombas. ¡Adquiere el tuyo ahora!', 'https://www.diariosigloxxi.com/multimedia/images/img_3dea7a3ce5d31135f801ea89a0f5f913.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('52fa1f04-a81d-4835-91a4-85638ba176d8', 'Equipo de Limpieza', 'Ahórrate horas de aseo con un buen equipo de limpieza. Tenemos aspiradoras, hidrolavadores, limpiador de vapor y muchos más. ¡Adquiere el tuyo!', 'https://negociosrentableshispanos.com/wp-content/uploads/2019/02/Herramientas-y-equipos-de-limpieza-640x430.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('c9fdcb13-7ad2-4f84-9c49-ca233dab6413', 'Maquinaria de Combustión', 'En nuestra tienda online encontrarás maquinaria de combustión para la construcción, también contamos con plantas de luz, podadoras, motores ¡y más!', 'https://www.revista.ferrepat.com/wp-content/uploads/2015/11/800x518xmartelo-demolidor-bosh-gsh-27-2.jpeg.pagespeed.ic_.dyJvYSW93P-e1447918275963.jpg', 'c168c8fd-1ecb-4763-bbcc-4d39e448afb7'),
         ('ce5fdee8-4b8e-45ad-923b-8de106ee32ff', 'Candados y Cerraduras', 'Mantén tu casa o negocio seguro con candados y cerraduras digitales para una mejor protección. ¡Elige la tuya!', 'https://2.bp.blogspot.com/-XSb2cj4zaN8/WjU5RUCyjzI/AAAAAAAAAxI/t9gmFlx3rOsSnfkuTXEK3AX9f_jwTAaAgCEwYBhgL/s1600/candado%2Bmaster3.JPG', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('56e2f419-ef19-4c1b-a4d0-4bcddc69ec45', 'Mirillas, Cámaras e Interfonos', 'Contamos con mirillas para que puedas colocar en tu puerta y asegurar de quién entra a tu hogar y negocio.', 'https://enetmx.com/wp-content/uploads/2021/01/DP1C-h.png', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('c341813c-ed12-40f9-b0da-f3eda6cf7757', 'Cajas Fuertes y Detectores', '¿Tienes documentos importantes que resguardar?, Hazlo con las mejores cajas fuertes. Hacemos envíos a todo México.', 'https://static.grainger.com/rp/s/is/image/Grainger/32RT41_AS01?$zmmain$', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('31f38848-2bcb-4ec7-b813-4e5e4bac658f', 'Seguridad Industrial y Perimetral', '¿Estas en construcción?, Asegura las zonas de riesgos con el mejor equipo de seguridad industrial. Entra a la nuestra tienda en línea.', 'https://www.redesdeseguridad.com/media/visornets/Visor-redes-de-seguridad-asesoramiento-en-seguridad-colectiva1.jpg', '669b75b3-71b1-4c9e-9eab-964d1ac8579f'),
         ('b10cff4d-4a98-4209-8fc2-4f1fcfe8e9be', 'Herramienta Manual Agrícola', '¿Trabajas en el secotr agrícola? En nuestra tienda online encontrarás la herramienta manual que necesitas, desde guadañas hasta hachas o machetes. ¡Compra ya!', 'https://agronomaster.com/wp-content/uploads/2018/05/herramientas-agricolas-manuales-3.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('0b0e706e-c376-4a13-8cfa-280a6b21b95c', 'Forestal', 'Aquí encontrarás todo el equipo forestal que necesites, como motosierras de diferentes tamaños y modelos. Elige la tuya.', 'https://static.stihl.com/upload/produkte/images/gruppen/middle/332ba94e33a348629f091f542043db4d.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('aca0e20e-6272-4b31-9da5-6adda9e1fc01', 'Riego', 'Si te dedicas al riego, en nuestra tienda encontrarás todas las herramientas necesarias para tu trabajo, consulta nuestro nuevo catálogo en la tienda en línea.', 'https://previews.123rf.com/images/kuponjabah/kuponjabah1309/kuponjabah130900193/22159446-herramienta-de-riego-en-el-jard%C3%ADn.jpg?fj=1', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('03567568-3dc4-461c-8bc3-b3b37b63d3d3', 'Maquinaria Agrícola Ligera', 'En nuestra tienda tenemos maquinaria agrícola de la mejor calidad y al mejor precio. Hacemos envíos a todo México. ¡Elige la tuya!', 'https://como-funciona.co/wp-content/uploads/2018/09/imagen1-png.png', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('c366510d-4a16-419e-a46e-e89b606ab21f', 'Bombas y Motobombas', 'Si necesitas de bombas y motobombas para el riego, en nuestra tienda online podrás encontrar lo necesario. ¡Entra ahora y compra la tuya!', 'https://ferretero.com/wp-content/uploads/2019/02/bombasparaagua-735x400.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e'),
         ('1a8aa484-173c-44d7-b12e-bd1768a49456', 'Mallas y Alambres', 'Protege cada zona de trabajo con las mallas y alambres que hemos seleccionado para ti. ¡Compra ahora!', 'https://mallasdealambre.com/images/mallas-de-alambre-1.jpg', 'eca0adaf-a1fb-4cb5-b143-3048a56ed22e');
