/*
 * The post_topic enum is the type of post that will be created
 */
 create type dum_public.post_topic as enum (
   'NEWS'
 );

 /*
  * The post table will store all the post of insterest for the user
  */
create table dum_public.posts (
  id uuid primary key default gen_random_uuid(),
  headline text not null check (char_length(headline) < 280),
  body text,
  topic dum_public.post_topic,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table dum_public.posts enable row level security;

-- Posts are publicly visible for all users
create policy select_all on dum_public.posts for select using (true);

-- Grant the permision to select any row in the table
grant select on dum_public.posts to :DATABASE_VISITOR;

comment on table dum_public.posts is
  E'A post of interest for the user.';

comment on column dum_public.posts.id is
  E'Unique identifier for the post.';
comment on column dum_public.posts.headline is
  E'The headline or title of the post.';
comment on column dum_public.posts.body is
  E'The body or content of the post.';
comment on column dum_public.posts.body is
  E'The topic of the post.';

-- Create the trigger that will create or update the timestamps
create trigger _100_timestamps
  before insert or update on dum_public.posts
  for each row
  execute procedure dum_private.tg__timestamps();

-- Custom Query that returns the LAST date in wich the post was updated
create or replace function dum_public.posts_date(post dum_public.posts) returns text as $$
  select to_char(post.updated_at, 'DD-MM-YYYY');
$$ language sql stable;

-- Custom Query that returns the FULL date in wich the post was updated
create or replace function dum_public.posts_full_date(post dum_public.posts) returns text as $$
  select to_char(post.updated_at, 'TMDay, DD "de" TMMonth "de" YYYY');
$$ language sql stable;

-- Custom Query that returns the LAST hour in wich the post was updated
create or replace function dum_public.posts_time(post dum_public.posts) returns text as $$
  select to_char(post.updated_at, 'hh:mm am');
$$ language sql stable;

-- Custom Query that returns the AGE of the post
create or replace function dum_public.posts_age(post dum_public.posts) returns text as $$
	declare
		years integer;
		months integer;
		days integer;
		hours integer;
		minutes integer;
		seconds integer;
		age text;
	begin
		select extract(year from age(now(), post.updated_at)) into years;
		select extract(month from age(now(), post.updated_at)) into months;
		select extract(day from age(now(), post.updated_at)) into days;
		select extract(hour from age(now(), post.updated_at)) into hours;
		select extract(minute from age(now(), post.updated_at)) into minutes;
		select extract(second from age(now(), post.updated_at)) into seconds;

		if years > 0 then
			if years = 1 then
				age := years || ' año';
			else
				age := years || ' años';
			end if;
		elsif months > 0 then
			if months = 1 then
				age := months || ' mes';
			else
				age := months || ' meses';
			end if;
		elsif days > 0 then
			if days = 1 then
				age := days || ' dia';
			else
				age := days || ' dias';
			end if;
		elsif hours > 0 then
			if hours = 1 then
				age := hours || ' hora';
			else
				age := hours || ' horas';
			end if;
		elsif minutes > 0 then
			if minutes = 1 then
				age := minutes || ' minuto';
			else
				age := minutes || ' minutos';
			end if;
		elsif seconds > 0 then
			if seconds = 1 then
				age := seconds || ' segundo';
			else
				age := seconds || ' segundos';
			end if;
		end if;

		return 'hace ' || age;
	end;
$$ language plpgsql stable;

-- Custom query that returns all the posts order by it's date creations
create or replace function dum_public.posts() returns setof dum_public.posts as $$
  select * from dum_public.posts order by dum_public.posts.updated_at desc;
$$ language sql stable;

comment on function dum_public.posts() is
  E'Reads and enables pagination through a set of `Post`.';

-- Insert some rows after the DB is re-created, ¡¡¡¡¡DELETE THIS WHEN LAUNCHING TO PROD!!!!!
INSERT INTO dum_public.posts (headline, body, topic)
VALUES ('Lorem 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS'),
       ('Lorem 10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'NEWS');
