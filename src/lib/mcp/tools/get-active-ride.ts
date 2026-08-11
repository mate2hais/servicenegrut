import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_active_ride",
  title: "Cursa activă",
  description:
    "Returnează cursa activă sau în pauză a utilizatorului autentificat, cu distanța și costul curent.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Neautentificat" }], isError: true };
    const { data, error } = await supabaseForUser(ctx)
      .from("rides")
      .select("id, status, distance_km, cost_lei, started_at, bikes(code, battery_level)")
      .in("status", ["active", "paused"])
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: data ? JSON.stringify(data) : "Nicio cursă activă." }],
      structuredContent: { ride: data ?? null },
    };
  },
});
