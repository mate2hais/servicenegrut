import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_available_bikes",
  title: "Listează bicicletele disponibile",
  description:
    "Listează bicicletele disponibile din flota BikeGo Galați, cu cod, nivel baterie și coordonate.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .optional()
      .describe("Numărul maxim de biciclete returnate (implicit 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const max = Math.min(Math.max(limit ?? 20, 1), 50);
    const { data, error } = await supabaseAnon()
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("status", "available")
      .order("battery_level", { ascending: false })
      .limit(max);

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { bikes: data ?? [] },
    };
  },
});
