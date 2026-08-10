import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getActiveRide = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("rides")
      .select("*, bikes(code, battery_level)")
      .eq("user_id", context.userId)
      .in("status", ["active", "paused"])
      .order("started_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data ?? null;
  });

export const startRide = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { bike_id: string; start_lat: number; start_lng: number }) => data,
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { data: existing } = await context.supabase
      .from("rides")
      .select("id")
      .eq("user_id", context.userId)
      .in("status", ["active", "paused"])
      .maybeSingle();

    if (existing) throw new Error("Ai deja o cursă activă");

    const { data: ride, error } = await context.supabase
      .from("rides")
      .insert({
        user_id: context.userId,
        bike_id: data.bike_id,
        start_lat: data.start_lat,
        start_lng: data.start_lng,
        status: "active",
      })
      .select("*")
      .single();

    if (error) throw error;

    await context.supabase.from("bikes").update({ status: "rented" }).eq("id", data.bike_id);

    return ride;
  });

export const updateRidePosition = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { ride_id: string; lat: number; lng: number; distance_km: number }) => data,
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const cost = Number((data.distance_km * 1).toFixed(2));
    const { error } = await context.supabase
      .from("rides")
      .update({
        end_lat: data.lat,
        end_lng: data.lng,
        distance_km: data.distance_km,
        cost_lei: cost,
      })
      .eq("id", data.ride_id)
      .eq("user_id", context.userId);

    if (error) throw error;
    return { ok: true };
  });

export const setDestination = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { ride_id: string; lat: number; lng: number }) => data,
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("rides")
      .update({ destination_lat: data.lat, destination_lng: data.lng })
      .eq("id", data.ride_id)
      .eq("user_id", context.userId);

    if (error) throw error;
    return { ok: true };
  });

export const endRide = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { ride_id: string; end_lat: number; end_lng: number; distance_km: number }) => data,
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const cost = Number((data.distance_km * 1).toFixed(2));
    const { data: ride, error } = await context.supabase
      .from("rides")
      .update({
        end_lat: data.end_lat,
        end_lng: data.end_lng,
        distance_km: data.distance_km,
        cost_lei: cost,
        status: "completed",
        ended_at: new Date().toISOString(),
      })
      .eq("id", data.ride_id)
      .eq("user_id", context.userId)
      .select("*")
      .single();

    if (error) throw error;
    if (!ride) throw new Error("Cursa nu a fost găsită");

    await context.supabase
      .from("bikes")
      .update({ status: "available", lat: data.end_lat, lng: data.end_lng })
      .eq("id", ride.bike_id);

    return ride;
  });

export const listRides = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("rides")
      .select("*, bikes(code)")
      .eq("user_id", context.userId)
      .eq("status", "completed")
      .order("ended_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  });
