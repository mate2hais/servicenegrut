import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const listBikes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
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
    const { data: bike, error } = await publicClient()
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("id", data.id)
      .single();

    if (error) throw error;
    return bike;
  });
