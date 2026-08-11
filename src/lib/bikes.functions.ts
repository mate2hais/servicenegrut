import { createServerFn } from "@tanstack/react-start";
import { createPublicSupabase } from "@/lib/supabase-public.server";

export const listBikes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await createPublicSupabase()
    .from("bikes")
    .select("id, code, status, battery_level, lat, lng")
    .eq("status", "available")
    .order("battery_level", { ascending: false });

  if (error) throw error;
  return data ?? [];
});

export const getBike = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { data: bike, error } = await createPublicSupabase()
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("id", data.id)
      .single();

    if (error) throw error;
    return bike;
  });
