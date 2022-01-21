-- The table that will store all the Main Departments
create table dum_public.main_departments (
  -- Remember to change the type on this id, from SERIAL to UUID
  id serial primary key,
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
  main_department,
  picture_url
) values('HOGAR Y JARDÍN', 'https://www.viviendasaludable.es/wp-content/uploads/2019/02/organizar-el-jardin-1.jpg'),
        ('HERRAMIENTAS', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Hand_tools.jpg'),
        ('MATERIAL ELÉCTRICO', 'https://actrum.com/assets/images/servicios/materiales01.jpg'),
        ('FERRETERIA', 'https://slp.gob.mx/ssalud/Noticias/vigilanciaFerreterias.jpg'),
        ('BAÑOS Y PLOMERIA', 'https://queretaro10.com/wp-content/uploads/2018/01/sucursales.png'),
        ('MAQUINARIA LIGERA', 'https://como-funciona.co/wp-content/uploads/2018/09/imagen1-png.png'),
        ('SEGURIDAD', 'https://concepto.de/wp-content/uploads/2014/01/sseguridad-industrial-1-e1551712014904.jpg'),
        ('AGRÍCOLA', 'https://www.2000agro.com.mx/wp-content/uploads/ciclo-agricola-1-990x658.jpg');

-- The table that will store the Sub - Departments that belongs to a Main Department
create table dum_public.sub_departments (
  -- Remember to change the type of id from SERIAL to UUID
  id serial primary key,
  sub_department text not null,
  picture_url text check(picture_url ~ '^$|^https?://[^/]+'),
  -- Remember to change the type of deparment_id from SERIAL to UUID
  department_id integer not null references dum_public.main_departments(id) on delete cascade,
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
  sub_department,
  picture_url,
  department_id
) values ('Jardinería', 'https://blog.homedepot.com.mx/wp-content/uploads/2019/10/Portada_Principiantes_01.jpg', 1),
         ('Cocina', 'https://cdn1.coppel.com/images/catalog/pm/3520983-1.jpg', 1),
         ('Mantenimiento', 'https://www.prisa.mx/blog/wp-content/uploads/2021/01/aspectos-clave-para-mantenimiento-hogar.jpg', 1),
         ('Linea Blanca y Electrónica', 'https://lh5.googleusercontent.com/fBdmrzDEms4PbMEQzf8Ay6cl_35GODC4ANdwaO5On17xSmCSxB3Zh_VVTovPcgyoklSTsetqsn0I21b-XL7wpLCRf8z8dXag1AemM26Nqf3b_XqNWg2ocR_yA5kWqvlzZmJZeLKf', 1),
         ('Muebles y Decoración', 'https://www.gaiadesign.com.mx/media/catalog/product/cache/28cb47c806b746a91bc25b380c9673fa/l/i/librero_angular_5_repisas_miniambiente1_v1_ho.jpg', 1),
         ('Campismo', 'https://www.hobbyaficion.com/wp-content/uploads/2017/08/tommy-lisbin-211935-unsplash-300x200.jpg', 1),
         ('Manuales', 'https://media.istockphoto.com/photos/various-hand-tools-with-a-white-background-picture-id157384169?s=612x612', 2),
         ('Eléctricas y Mecánicas', 'https://eltecnoanalista.com/wp-content/uploads/2020/04/Herramientas-Mec%C3%A1nicas-05.jpg', 2),
         ('Taladros y Rotomartillos', 'https://www.grupoferreterochc.com.mx/files/Productos/Neo/Kit_Neo_TP813LI812AI816.jpg', 2),
         ('Neumáticas y de Combustion', 'https://www.maquituls.es/noticias/wp-content/uploads/2016/11/neu.jpg', 2),
         ('Refacciones', 'https://mx.all.biz/img/mx/catalog/33387.jpeg', 2),
         ('Accesorios para Herramientas', 'https://www.tornimatic.com/wp-content/uploads/2014/09/bodego-sencer_web.jpg', 2),
         ('Instalación', 'https://electricasanmiguel.com.mx/wp-content/uploads/2020/11/22instalacionelectrica22_ElectricaSanMiguel.jpg', 3),
         ('Iluminación', 'https://tecnohotelnews.com/wp-content/uploads/2018/07/shutterstock_238845451.jpg', 3),
         ('Equipo Eléctrico', 'https://thumbs.dreamstime.com/z/equipo-el%C3%A9ctrico-en-fondo-met%C3%A1lico-vista-superior-varios-equipos-y-herramientas-electricistas-metalico-gris-164688877.jpg', 3),
         ('Sistemas Fotovoltaicos', 'https://www.indisect.com/wp-content/uploads/2020/02/portada-panel-aislado-1024x512.png', 3),
         ('Baterías y Cargadores', 'https://www.actualidadmotor.com/wp-content/uploads/2020/05/cargadores-bateria-coche-1024x614.jpg', 3),
         ('Fijación y Sujeción', 'https://www.lifeder.com/wp-content/uploads/2017/12/587.jpg', 4),
         ('Láminas para Techos', 'https://comeca.com.mx/wp-content/uploads/2017/08/laminasparatechoscolor.jpg', 4),
         ('Aceites y Lubricantes', 'https://garinetiquetas.com/assets/img/automotriz/etiquetas_de_marca.jpg', 4),
         ('Pintura', 'https://www.hogar.mapfre.es/media/2018/08/pinturas_con_base_de_aceite_o_de_agua.jpg', 4),
         ('Otros Productos', 'https://mercafilms.com.mx/wp-content/uploads/2018/09/otros_productos.png', 4),
         ('Básculas', 'https://www.sicar.mx/wp-content/uploads/2016/06/bascula-torrey-LEQ-3.png', 4),
         ('Accesorios para Baño', 'https://hygolet.com.mx/blog/wp-content/uploads/2020/01/accesorios.jpg', 5),
         ('Grifería', 'https://arquitecturayempresa.es/sites/default/files/styles/n1000x540/public/imagenes/noticia/griferia_portada.jpg?itok=89AWoJvb', 5),
         ('Conexiones', 'https://grupoinfra.com/img/productos/imagenes/4526-conexiones-mangueras.jpg', 5),
         ('Herrajes', 'https://img.interempresas.net/FotosArtProductos/P147294.jpg', 5),
         ('Muebles para Baño', 'https://cdn.homedepot.com.mx/contentMarketing/Tips_Compra/26_Banos/TC_D26_16/images/cuarto-bano.jpg', 5),
         ('Calentadores', 'https://blog.homedepot.com.mx/wp-content/uploads/2015/12/calentadores-de-agua.jpg', 5),
         ('Equipo para Soldar', 'https://i1.wp.com/www.ventageneradores.net/blog/wp-content/uploads/2016/04/soldador-convencional.jpg?resize=1024%2C1024', 6),
         ('Maquinaria Eléctrica', 'https://www.diariosigloxxi.com/multimedia/images/img_3dea7a3ce5d31135f801ea89a0f5f913.jpg', 6),
         ('Equipo de Limpieza', 'https://negociosrentableshispanos.com/wp-content/uploads/2019/02/Herramientas-y-equipos-de-limpieza-640x430.jpg', 6),
         ('Mauinaria de Combustión', 'https://www.revista.ferrepat.com/wp-content/uploads/2015/11/800x518xmartelo-demolidor-bosh-gsh-27-2.jpeg.pagespeed.ic_.dyJvYSW93P-e1447918275963.jpg', 6),
         ('Candados y Cerraduras', 'https://2.bp.blogspot.com/-XSb2cj4zaN8/WjU5RUCyjzI/AAAAAAAAAxI/t9gmFlx3rOsSnfkuTXEK3AX9f_jwTAaAgCEwYBhgL/s1600/candado%2Bmaster3.JPG', 7),
         ('Mirillas, Cámaras e Interfonos', 'https://enetmx.com/wp-content/uploads/2021/01/DP1C-h.png', 7),
         ('Cajas Fuertes y Detectores', 'https://static.grainger.com/rp/s/is/image/Grainger/32RT41_AS01?$zmmain$', 7),
         ('Seguridad Industrial y Perimetral', 'https://www.redesdeseguridad.com/media/visornets/Visor-redes-de-seguridad-asesoramiento-en-seguridad-colectiva1.jpg', 7),
         ('Herramienta Manual Agrícola', 'https://agronomaster.com/wp-content/uploads/2018/05/herramientas-agricolas-manuales-3.jpg', 8),
         ('Forestal', 'https://static.stihl.com/upload/produkte/images/gruppen/middle/332ba94e33a348629f091f542043db4d.jpg', 8),
         ('Riego', 'https://previews.123rf.com/images/kuponjabah/kuponjabah1309/kuponjabah130900193/22159446-herramienta-de-riego-en-el-jard%C3%ADn.jpg?fj=1', 8),
         ('Maquinaria Agrícola Ligera', 'https://como-funciona.co/wp-content/uploads/2018/09/imagen1-png.png', 8),
         ('Bombas y Motobombas', 'https://ferretero.com/wp-content/uploads/2019/02/bombasparaagua-735x400.jpg', 8),
         ('Mallas y Alambres', 'https://mallasdealambre.com/images/mallas-de-alambre-1.jpg', 8);
