CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own profile"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TYPE public.bike_status AS ENUM ('available', 'rented', 'maintenance', 'reserved');
CREATE TYPE public.ride_status AS ENUM ('active', 'paused', 'completed', 'cancelled');

CREATE TABLE public.bikes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  status public.bike_status NOT NULL DEFAULT 'available',
  battery_level INTEGER NOT NULL CHECK (battery_level BETWEEN 0 AND 100),
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.bikes TO authenticated;
GRANT ALL ON public.bikes TO service_role;

ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read bikes"
  ON public.bikes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bike_id UUID NOT NULL REFERENCES public.bikes(id) ON DELETE RESTRICT,
  start_lat DOUBLE PRECISION NOT NULL,
  start_lng DOUBLE PRECISION NOT NULL,
  end_lat DOUBLE PRECISION,
  end_lng DOUBLE PRECISION,
  destination_lat DOUBLE PRECISION,
  destination_lng DOUBLE PRECISION,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  distance_km DOUBLE PRECISION NOT NULL DEFAULT 0,
  cost_lei DOUBLE PRECISION NOT NULL DEFAULT 0,
  status public.ride_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.rides TO authenticated;
GRANT ALL ON public.rides TO service_role;

ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own rides"
  ON public.rides
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bikes_updated_at
  BEFORE UPDATE ON public.bikes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON public.rides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.bikes (code, status, battery_level, lat, lng) VALUES
('B001', 'available', 92, 45.4353, 28.0080),
('B002', 'available', 78, 45.4341, 28.0095),
('B003', 'available', 65, 45.4365, 28.0062),
('B004', 'available', 88, 45.4332, 28.0110),
('B005', 'available', 42, 45.4378, 28.0045),
('B006', 'available', 95, 45.4315, 28.0135),
('B007', 'available', 23, 45.4389, 28.0028),
('B008', 'available', 56, 45.4302, 28.0155),
('B009', 'available', 71, 45.4395, 28.0005),
('B010', 'available', 84, 45.4290, 28.0170),
('B011', 'available', 37, 45.4401, 27.9985),
('B012', 'available', 66, 45.4278, 28.0190),
('B013', 'available', 51, 45.4410, 27.9960),
('B014', 'available', 79, 45.4265, 28.0210),
('B015', 'available', 18, 45.4418, 27.9935),
('B016', 'available', 90, 45.4250, 28.0230),
('B017', 'available', 45, 45.4425, 27.9910),
('B018', 'available', 62, 45.4235, 28.0250),
('B019', 'available', 77, 45.4432, 27.9885),
('B020', 'available', 33, 45.4220, 28.0270),
('B021', 'available', 86, 45.4440, 27.9860),
('B022', 'available', 49, 45.4205, 28.0290),
('B023', 'available', 68, 45.4448, 27.9835),
('B024', 'available', 55, 45.4190, 28.0310),
('B025', 'available', 74, 45.4455, 27.9810),
('B026', 'available', 28, 45.4175, 28.0330),
('B027', 'available', 81, 45.4462, 27.9785),
('B028', 'available', 60, 45.4160, 28.0350),
('B029', 'available', 93, 45.4470, 27.9760),
('B030', 'available', 40, 45.4145, 28.0370),
('B031', 'available', 72, 45.4478, 27.9735),
('B032', 'available', 57, 45.4130, 28.0390),
('B033', 'available', 85, 45.4485, 27.9710),
('B034', 'available', 31, 45.4115, 28.0410),
('B035', 'available', 64, 45.4492, 27.9685),
('B036', 'available', 97, 45.4100, 28.0430),
('B037', 'available', 44, 45.4500, 27.9660),
('B038', 'available', 75, 45.4085, 28.0450),
('B039', 'available', 52, 45.4508, 27.9635),
('B040', 'available', 89, 45.4070, 28.0470),
('B041', 'available', 36, 45.4515, 27.9610),
('B042', 'available', 67, 45.4055, 28.0490),
('B043', 'available', 82, 45.4522, 27.9585),
('B044', 'available', 47, 45.4040, 28.0510),
('B045', 'available', 70, 45.4530, 27.9560),
('B046', 'available', 58, 45.4025, 28.0530),
('B047', 'available', 91, 45.4538, 27.9535),
('B048', 'available', 39, 45.4010, 28.0550),
('B049', 'available', 76, 45.4545, 27.9510),
('B050', 'available', 53, 45.3995, 28.0570);