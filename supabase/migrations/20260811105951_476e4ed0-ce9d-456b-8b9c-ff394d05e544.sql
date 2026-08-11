CREATE POLICY "Anyone can read bikes" ON public.bikes FOR SELECT TO anon USING (true);
GRANT SELECT ON public.bikes TO anon;