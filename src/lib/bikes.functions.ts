import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export const listBikes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("status", "available")
      .order("battery_level", { ascending: false });

    if (error) throw error;
    return data ?? [];
  });

export const getBike = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { data: bike, error } = await context.supabase
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("id", data.id)
      .single();

    if (error) throw error;
    return bike;
  });
