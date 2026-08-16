import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublicSupabase } from "./supabase-public.server";

const appointmentSchema = z.object({
  full_name: z.string().min(3).max(80),
  phone: z.string().min(6).max(25),
  email: z.string().email().max(120).optional().or(z.literal("")),
  plate: z.string().min(4).max(15),
  car_model: z.string().max(80).optional().or(z.literal("")),
  vehicle_category: z.string().min(2).max(60),
  preferred_date: z.string().min(8).max(20),
  preferred_time: z.string().min(4).max(10),
  notes: z.string().max(600).optional().or(z.literal("")),
});

export const createAppointment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicSupabase();
    const { error } = await supabase.from("appointments").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      plate: data.plate.toUpperCase(),
      car_model: data.car_model || null,
      vehicle_category: data.vehicle_category,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      notes: data.notes || null,
    });

    if (error) throw new Error("Programarea nu a putut fi salvată. Încearcă din nou.");
    return { ok: true as const };
  });
