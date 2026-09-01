
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'phone')
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role)
  values (new.id, 'member')
  on conflict (user_id, role) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create policy "Admins insert roles" on public.user_roles
for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins update roles" on public.user_roles
for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete roles" on public.user_roles
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

grant insert, update, delete on public.user_roles to authenticated;

create policy "Public can read club media files" on storage.objects
for select using (bucket_id = 'media');

create policy "Admins upload club media" on storage.objects
for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

create policy "Admins update club media" on storage.objects
for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

create policy "Admins delete club media" on storage.objects
for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
