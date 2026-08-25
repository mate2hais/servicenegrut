-- Cleanup old project tables
DROP TABLE IF EXISTS public.rides CASCADE;
DROP TABLE IF EXISTS public.bikes CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TYPE IF EXISTS public.ride_status CASCADE;
DROP TYPE IF EXISTS public.bike_status CASCADE;

-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'member');
CREATE TYPE public.discipline AS ENUM ('bjj', 'mma');
CREATE TYPE public.age_group AS ENUM ('kids', 'adults');
CREATE TYPE public.competition_scope AS ENUM ('national', 'europe');
CREATE TYPE public.media_kind AS ENUM ('photo', 'video');
CREATE TYPE public.membership_status AS ENUM ('active', 'expired', 'cancelled');

-- Roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles (already exists) - allow admins to read all
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Coaches
CREATE TABLE public.coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  title text NOT NULL,
  disciplines public.discipline[] NOT NULL DEFAULT '{}',
  rank text,
  bio text,
  photo_url text,
  years_experience integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.coaches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coaches TO authenticated;
GRANT ALL ON public.coaches TO service_role;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view coaches" ON public.coaches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage coaches" ON public.coaches FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON public.coaches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Class schedule
CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  discipline public.discipline NOT NULL,
  age_group public.age_group NOT NULL,
  level text NOT NULL DEFAULT 'toate nivelurile',
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time time NOT NULL,
  end_time time NOT NULL,
  room text,
  coach_id uuid REFERENCES public.coaches(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.classes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.classes TO authenticated;
GRANT ALL ON public.classes TO service_role;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view classes" ON public.classes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage classes" ON public.classes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Membership plans
CREATE TABLE public.membership_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  discipline public.discipline NOT NULL,
  age_group public.age_group NOT NULL,
  duration_days integer NOT NULL DEFAULT 30,
  sessions_per_week integer NOT NULL DEFAULT 3,
  price_lei integer NOT NULL,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.membership_plans TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.membership_plans TO authenticated;
GRANT ALL ON public.membership_plans TO service_role;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view plans" ON public.membership_plans FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage plans" ON public.membership_plans FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_membership_plans_updated_at BEFORE UPDATE ON public.membership_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Memberships
CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES public.membership_plans(id) ON DELETE SET NULL,
  discipline public.discipline NOT NULL,
  age_group public.age_group NOT NULL,
  athlete_name text,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date NOT NULL,
  status public.membership_status NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read own memberships" ON public.memberships
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Members request own memberships" ON public.memberships
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage memberships" ON public.memberships FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_memberships_user ON public.memberships(user_id);
CREATE INDEX idx_memberships_end_date ON public.memberships(end_date);

-- Competitions
CREATE TABLE public.competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  discipline public.discipline NOT NULL,
  scope public.competition_scope NOT NULL,
  start_date date NOT NULL,
  end_date date,
  city text,
  country text NOT NULL DEFAULT 'România',
  organizer text,
  url text,
  description text,
  source text NOT NULL DEFAULT 'manual',
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.competitions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.competitions TO authenticated;
GRANT ALL ON public.competitions TO service_role;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved competitions" ON public.competitions
  FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Admins manage competitions" ON public.competitions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_competitions_updated_at BEFORE UPDATE ON public.competitions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Media gallery
CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.media_kind NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  title text,
  description text,
  discipline public.discipline,
  age_group public.age_group,
  session_date date NOT NULL DEFAULT CURRENT_DATE,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view media" ON public.media_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage media" ON public.media_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_media_items_updated_at BEFORE UPDATE ON public.media_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed data: coaches
INSERT INTO public.coaches (full_name, title, disciplines, rank, bio, years_experience, sort_order) VALUES
('Alexandru Marinescu', 'Head Coach BJJ', ARRAY['bjj']::public.discipline[], 'Centură neagră IBJJF', 'Competitor și instructor cu peste 15 ani pe saltea, medaliat la campionate naționale și europene de Brazilian Jiu Jitsu.', 15, 1),
('Cristian Dobre', 'Head Coach MMA', ARRAY['mma','bjj']::public.discipline[], 'Pro MMA · Centură maro BJJ', 'Fost luptător profesionist MMA, specializat pe wrestling, clinch și tranziții la sol.', 12, 2),
('Ionuț Stanciu', 'Antrenor Grappling & No-Gi', ARRAY['bjj']::public.discipline[], 'Centură maro', 'Focus pe leg locks, guard passing și pregătire pentru competiții no-gi.', 8, 3),
('Andreea Pavel', 'Antrenor grupa copii & Autoapărare', ARRAY['bjj','mma']::public.discipline[], 'Centură violet', 'Coordonează programul pentru copii 5-14 ani și cursurile de autoapărare.', 7, 4);

-- Seed data: classes
INSERT INTO public.classes (title, discipline, age_group, level, day_of_week, start_time, end_time, room) VALUES
('BJJ Gi — Fundamentals', 'bjj', 'adults', 'începători', 1, '18:00', '19:30', 'Sala 1'),
('MMA — Striking & Clinch', 'mma', 'adults', 'toate nivelurile', 1, '19:30', '21:00', 'Sala 2'),
('BJJ Kids', 'bjj', 'kids', '5-10 ani', 2, '17:00', '18:00', 'Sala 1'),
('BJJ No-Gi', 'bjj', 'adults', 'avansați', 2, '19:00', '20:30', 'Sala 1'),
('MMA Kids', 'mma', 'kids', '10-14 ani', 3, '17:00', '18:00', 'Sala 2'),
('BJJ Gi — All Levels', 'bjj', 'adults', 'toate nivelurile', 3, '18:30', '20:00', 'Sala 1'),
('MMA — Wrestling & Ground', 'mma', 'adults', 'toate nivelurile', 4, '19:30', '21:00', 'Sala 2'),
('BJJ Kids', 'bjj', 'kids', '5-10 ani', 4, '17:00', '18:00', 'Sala 1'),
('BJJ Gi — Competition Team', 'bjj', 'adults', 'competiție', 5, '18:00', '20:00', 'Sala 1'),
('MMA Sparring', 'mma', 'adults', 'avansați', 5, '20:00', '21:30', 'Sala 2'),
('Open Mat', 'bjj', 'adults', 'toate nivelurile', 6, '11:00', '13:00', 'Sala 1'),
('Autoapărare', 'mma', 'adults', 'începători', 6, '13:00', '14:30', 'Sala 2');

-- Seed data: membership plans
INSERT INTO public.membership_plans (name, discipline, age_group, duration_days, sessions_per_week, price_lei, description) VALUES
('BJJ Adulți — Lunar', 'bjj', 'adults', 30, 3, 250, 'Acces la toate antrenamentele de Brazilian Jiu Jitsu, gi și no-gi.'),
('BJJ Adulți — 3 luni', 'bjj', 'adults', 90, 5, 660, 'Acces nelimitat BJJ, inclusiv open mat și echipa de competiție.'),
('MMA Adulți — Lunar', 'mma', 'adults', 30, 3, 270, 'Striking, wrestling și ground game, sparring supervizat.'),
('MMA Adulți — 3 luni', 'mma', 'adults', 90, 5, 720, 'Program complet MMA cu pregătire fizică specifică.'),
('BJJ Copii — Lunar', 'bjj', 'kids', 30, 2, 180, 'Grupa de copii 5-14 ani, accent pe disciplină și tehnică.'),
('MMA Copii — Lunar', 'mma', 'kids', 30, 2, 190, 'Inițiere în MMA pentru copii, în condiții de siguranță.');

-- Seed data: competitions
INSERT INTO public.competitions (title, discipline, scope, start_date, end_date, city, country, organizer, url, description, source) VALUES
('Campionatul Național de Brazilian Jiu Jitsu', 'bjj', 'national', '2026-10-17', '2026-10-18', 'București', 'România', 'FRJJ', NULL, 'Competiție națională gi, toate categoriile de vârstă și greutate.', 'manual'),
('Galați Open BJJ', 'bjj', 'national', '2026-09-12', NULL, 'Galați', 'România', 'Ascendo Club', NULL, 'Turneu regional gi și no-gi, inclusiv categorii de copii.', 'manual'),
('IBJJF European Championship', 'bjj', 'europe', '2027-01-20', '2027-01-25', 'Lisabona', 'Portugalia', 'IBJJF', 'https://ibjjf.com', 'Cea mai mare competiție de BJJ din Europa.', 'manual'),
('ADCC European Trials', 'bjj', 'europe', '2026-11-07', '2026-11-08', 'Varșovia', 'Polonia', 'ADCC', NULL, 'Calificări europene no-gi pentru ADCC World Championship.', 'manual'),
('Campionatul Național de MMA Amator', 'mma', 'national', '2026-11-21', '2026-11-22', 'Cluj-Napoca', 'România', 'FRAM', NULL, 'Competiție națională MMA amator, toate categoriile.', 'manual'),
('RXF Fight Night', 'mma', 'national', '2026-09-26', NULL, 'Brașov', 'România', 'RXF', NULL, 'Gală profesionistă de MMA.', 'manual'),
('IMMAF European Open', 'mma', 'europe', '2026-10-05', '2026-10-10', 'Belgrad', 'Serbia', 'IMMAF', 'https://immaf.org', 'Campionatul european amator de MMA.', 'manual'),
('Oktagon MMA', 'mma', 'europe', '2026-12-12', NULL, 'Praga', 'Cehia', 'Oktagon', NULL, 'Una dintre cele mai mari promoții de MMA din Europa.', 'manual');