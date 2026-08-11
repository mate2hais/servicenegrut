import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_my_rides",
  title: "Istoricul curselor mele",
  description:
    "Listează cursele utilizatorului autentificat, cu distanță, cost în lei și status.",
  inputSchema: {
    limit: z.number().int().optional().describe("Număr maxim de curse (implicit 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Neautentificat" }], isError: true };
    const max = Math.min(Math.max(limit ?? 10, 1), 50);
    const { data, error } = await supabaseForUser(ctx)
      .from("rides")
      .select("id, status, distance_km, cost_lei, started_at, ended_at, bikes(code)")
      .order("started_at", { ascending: false })
      .limit(max);

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { rides: data ?? [] },
    };
  },
});
