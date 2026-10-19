-- Studio: schema del database
-- Da incollare una volta in Supabase > SQL Editor > New query, poi "Run".
-- Si può rieseguire senza danni.

-- 1. Una riga per ogni modulo di ripasso (es. "latino-u1")
create table if not exists public.sessioni (
  modulo        text primary key,
  stato         jsonb not null default '{}'::jsonb,   -- risposte della studentessa
  orale         jsonb not null default '{}'::jsonb,   -- valutazioni del papà all'interrogazione
  azzerato_il   timestamptz not null default now(),   -- ultimo azzeramento
  aggiornato_il timestamptz not null default now()
);
alter table public.sessioni enable row level security;

-- 2. Chi è il papà: sostituire EMAIL-DEL-PAPA con l'email dell'utente creato in Supabase
create or replace function public.e_papa() returns boolean
language sql stable as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = any (array[lower('EMAIL-DEL-PAPA')])
$$;

-- 3. Solo il papà legge e modifica la tabella
drop policy if exists papa_legge on public.sessioni;
drop policy if exists papa_scrive on public.sessioni;
drop policy if exists papa_inserisce on public.sessioni;
create policy papa_legge     on public.sessioni for select to authenticated using (public.e_papa());
create policy papa_scrive    on public.sessioni for update to authenticated using (public.e_papa()) with check (public.e_papa());
create policy papa_inserisce on public.sessioni for insert to authenticated with check (public.e_papa());

revoke all on public.sessioni from anon, public;
grant select, insert, update on public.sessioni to authenticated;

-- 4. La studentessa (senza account) può solo salvare il proprio stato, mai leggere
create or replace function public.salva_stato(p_modulo text, p_stato jsonb, p_epoca timestamptz)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_az timestamptz;
begin
  if p_modulo !~ '^[a-z0-9-]{1,60}$' then raise exception 'modulo non valido'; end if;
  if jsonb_typeof(p_stato) <> 'object' or pg_column_size(p_stato) > 300000 then raise exception 'stato non valido'; end if;
  insert into sessioni(modulo) values (p_modulo) on conflict (modulo) do nothing;
  select azzerato_il into v_az from sessioni where modulo = p_modulo;
  if p_epoca is not null and p_epoca < v_az then
    return jsonb_build_object('esito', 'azzerato', 'epoca', v_az);
  end if;
  update sessioni set stato = p_stato, aggiornato_il = now() where modulo = p_modulo;
  return jsonb_build_object('esito', 'ok', 'epoca', v_az);
end $$;

-- 5. La studentessa può sapere solo quando il modulo è stato azzerato l'ultima volta
create or replace function public.epoca_modulo(p_modulo text) returns timestamptz
language sql stable security definer set search_path = public as $$
  select azzerato_il from sessioni where modulo = p_modulo
$$;

revoke all on function public.salva_stato(text, jsonb, timestamptz) from public, anon;
revoke all on function public.epoca_modulo(text) from public, anon;
grant execute on function public.salva_stato(text, jsonb, timestamptz) to anon, authenticated;
grant execute on function public.epoca_modulo(text) to anon, authenticated;

-- 6. Aggiornamenti in tempo reale per la vista papà
do $$ begin
  alter publication supabase_realtime add table public.sessioni;
exception when duplicate_object then null;
end $$;
