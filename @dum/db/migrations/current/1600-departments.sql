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

/*
 * Custom Query that returns a specific Main Department according it's name
 * We used the 'dispense' arguments feture, wich mead that, instead of name the argument, we allow to PostgreSQL to name them,
 * that because the functions returns a weird behavior when we named the arguments
*/
create or replace function dum_public.main_department_by_name(text) returns dum_public.main_departments as $$
  select * from dum_public.main_departments where unaccent(dum_public.main_departments.main_department) ilike '%' || regexp_replace($1, '-', ' ', 'g') || '%';
$$ language sql stable;

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
