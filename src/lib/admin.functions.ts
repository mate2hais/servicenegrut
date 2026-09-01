import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: doar administratorii au acces.");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;

    const [{ data: memberships }, { data: profiles }, { data: media }, { data: competitions }, { data: plans }] =
      await Promise.all([
        supabase
          .from("memberships")
          .select("id, user_id, discipline, age_group, athlete_name, start_date, end_date, status, notes, membership_plans(name)")
          .order("end_date", { ascending: true }),
        supabase.from("profiles").select("id, full_name, phone, created_at"),
        supabase.from("media_items").select("id, kind, title, session_date, storage_path").order("session_date", { ascending: false }).limit(50),
        supabase.from("competitions").select("id, title, discipline, scope, start_date, city, country").order("start_date", { ascending: true }),
        supabase.from("membership_plans").select("id, name, discipline, age_group, price_lei, duration_days").order("price_lei"),
      ]);

    const byUser = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    const rows = (memberships ?? []).map((m: any) => ({
      ...m,
      member_name: byUser.get(m.user_id)?.full_name ?? "Membru",
      member_phone: byUser.get(m.user_id)?.phone ?? null,
    }));

    const today = new Date();
    const in5 = new Date(today.getTime() + 5 * 86400000).toISOString().slice(0, 10);
    const todayStr = today.toISOString().slice(0, 10);

    return {
      memberships: rows,
      profiles: profiles ?? [],
      media: media ?? [],
      competitions: competitions ?? [],
      plans: plans ?? [],
      expiringSoon: rows.filter((m: any) => m.status === "active" && m.end_date >= todayStr && m.end_date <= in5),
      expired: rows.filter((m: any) => m.end_date < todayStr && m.status !== "cancelled"),
    };
  });

export const upsertMembership = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        user_id: z.string().uuid(),
        plan_id: z.string().uuid().nullable().optional(),
        discipline: z.enum(["bjj", "mma"]),
        age_group: z.enum(["kids", "adults"]),
        athlete_name: z.string().max(80).optional(),
        start_date: z.string(),
        end_date: z.string(),
        status: z.enum(["active", "expired", "cancelled"]),
        notes: z.string().max(400).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const payload = {
      user_id: data.user_id,
      plan_id: data.plan_id ?? null,
      discipline: data.discipline,
      age_group: data.age_group,
      athlete_name: data.athlete_name || null,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      notes: data.notes || null,
    };
    const q = data.id
      ? context.supabase.from("memberships").update(payload).eq("id", data.id)
      : context.supabase.from("memberships").insert(payload);
    const { error } = await q;
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const extendMembership = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), days: z.number().int().min(1).max(400) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: m, error: e1 } = await context.supabase
      .from("memberships")
      .select("end_date")
      .eq("id", data.id)
      .maybeSingle();
    if (e1 || !m) throw new Error("Abonamentul nu a fost găsit.");
    const base = new Date(m.end_date) > new Date() ? new Date(m.end_date) : new Date();
    const end = new Date(base.getTime() + data.days * 86400000).toISOString().slice(0, 10);
    const { error } = await context.supabase
      .from("memberships")
      .update({ end_date: end, status: "active" })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const, end_date: end };
  });

export const setMembershipStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["active", "expired", "cancelled"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("memberships").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const saveMediaItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        kind: z.enum(["photo", "video"]),
        storage_path: z.string().min(3),
        title: z.string().max(120).optional(),
        description: z.string().max(500).optional(),
        discipline: z.enum(["bjj", "mma"]).nullable().optional(),
        age_group: z.enum(["kids", "adults"]).nullable().optional(),
        session_date: z.string(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("media_items").insert({
      kind: data.kind,
      storage_path: data.storage_path,
      public_url: data.storage_path,
      title: data.title || null,
      description: data.description || null,
      discipline: data.discipline ?? null,
      age_group: data.age_group ?? null,
      session_date: data.session_date,
      uploaded_by: context.userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteMediaItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), storage_path: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    await context.supabase.storage.from("media").remove([data.storage_path]);
    const { error } = await context.supabase.from("media_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteCompetition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("competitions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

const aiCompetition = z.object({
  title: z.string(),
  discipline: z.enum(["bjj", "mma"]),
  scope: z.enum(["national", "europe"]),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  organizer: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export const refreshCompetitions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("Serviciul AI nu este configurat.");

    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "Ești un asistent care listează competiții reale de Brazilian Jiu-Jitsu și MMA. Răspunzi exclusiv prin apelul de tool.",
          },
          {
            role: "user",
            content: `Listează 16 competiții importante de BJJ și MMA programate după ${today}: 8 în România (scope national) și 8 în Europa (scope europe). Include date exacte (YYYY-MM-DD), oraș, țară, organizator (ex: IBJJF, ADCC, UFC, AJP, FRAM) și link oficial dacă îl știi.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "save_competitions",
              description: "Salvează lista de competiții",
              parameters: {
                type: "object",
                properties: {
                  competitions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        discipline: { type: "string", enum: ["bjj", "mma"] },
                        scope: { type: "string", enum: ["national", "europe"] },
                        start_date: { type: "string" },
                        end_date: { type: "string" },
                        city: { type: "string" },
                        country: { type: "string" },
                        organizer: { type: "string" },
                        url: { type: "string" },
                        description: { type: "string" },
                      },
                      required: ["title", "discipline", "scope", "start_date"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["competitions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "save_competitions" } },
      }),
    });

    if (res.status === 429) throw new Error("Prea multe cereri către AI. Încearcă mai târziu.");
    if (res.status === 402) throw new Error("Credite AI insuficiente în spațiul de lucru Lovable.");
    if (!res.ok) throw new Error("Actualizarea AI a eșuat.");

    const json: any = await res.json();
    const args = json?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("Răspuns AI invalid.");
    const parsed = z.object({ competitions: z.array(aiCompetition) }).safeParse(JSON.parse(args));
    if (!parsed.success) throw new Error("Datele primite de la AI nu sunt valide.");

    const rows = parsed.data.competitions
      .filter((c) => c.start_date >= today)
      .map((c) => ({
        title: c.title,
        discipline: c.discipline,
        scope: c.scope,
        start_date: c.start_date,
        end_date: c.end_date || null,
        city: c.city || null,
        country: c.country || (c.scope === "national" ? "România" : "Europa"),
        organizer: c.organizer || null,
        url: c.url || null,
        description: c.description || null,
        source: "ai",
        approved: true,
      }));

    if (rows.length === 0) return { ok: true as const, inserted: 0 };

    await context.supabase.from("competitions").delete().eq("source", "ai");
    const { error } = await context.supabase.from("competitions").insert(rows);
    if (error) throw new Error(error.message);
    return { ok: true as const, inserted: rows.length };
  });
