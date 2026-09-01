import { createServerFn } from "@tanstack/react-start";
import { createPublicSupabase } from "./supabase-public.server";

export const getCoaches = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("coaches")
    .select("id, full_name, title, disciplines, rank, bio, photo_url, years_experience")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getSchedule = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("classes")
    .select("id, title, discipline, age_group, level, day_of_week, start_time, end_time, room, coaches(full_name)")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPlans = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("membership_plans")
    .select("id, name, discipline, age_group, duration_days, sessions_per_week, price_lei, description, active")
    .eq("active", true)
    .order("price_lei", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCompetitions = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("competitions")
    .select("id, title, discipline, scope, start_date, end_date, city, country, organizer, url, description")
    .eq("approved", true)
    .gte("start_date", new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10))
    .order("start_date", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getGallery = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("media_items")
    .select("id, kind, storage_path, title, description, discipline, age_group, session_date")
    .order("session_date", { ascending: false })
    .limit(120);
  if (error) throw new Error(error.message);
  const items = data ?? [];
  if (items.length === 0) return [];
  const { data: signed } = await supabase.storage
    .from("media")
    .createSignedUrls(items.map((i) => i.storage_path), 60 * 60 * 6);
  const map = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
  return items.map((i) => ({ ...i, url: map.get(i.storage_path) ?? null }));
});
