import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: memberships }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, phone").eq("id", userId).maybeSingle(),
      supabase
        .from("memberships")
        .select("id, discipline, age_group, athlete_name, start_date, end_date, status, notes, membership_plans(name, price_lei, sessions_per_week)")
        .eq("user_id", userId)
        .order("end_date", { ascending: false }),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    return {
      profile: profile ?? null,
      memberships: memberships ?? [],
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
    };
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ full_name: z.string().min(3).max(80), phone: z.string().max(25).optional() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .upsert({ id: context.userId, full_name: data.full_name, phone: data.phone || null });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const requestMembership = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        plan_id: z.string().uuid(),
        athlete_name: z.string().min(3).max(80),
        notes: z.string().max(400).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: plan, error: planErr } = await supabase
      .from("membership_plans")
      .select("id, discipline, age_group, duration_days")
      .eq("id", data.plan_id)
      .maybeSingle();
    if (planErr || !plan) throw new Error("Abonamentul selectat nu există.");

    const start = new Date();
    const end = new Date(start.getTime() + plan.duration_days * 86400000);

    const { error } = await supabase.from("memberships").insert({
      user_id: userId,
      plan_id: plan.id,
      discipline: plan.discipline,
      age_group: plan.age_group,
      athlete_name: data.athlete_name,
      start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10),
      notes: data.notes || null,
    });
    if (error) throw new Error("Cererea nu a putut fi trimisă. Încearcă din nou.");
    return { ok: true as const };
  });
