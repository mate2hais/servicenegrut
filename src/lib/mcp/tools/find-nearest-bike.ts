import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export default defineTool({
  name: "find_nearest_bike",
  title: "Găsește cea mai apropiată bicicletă",
  description:
    "Găsește cea mai apropiată bicicletă disponibilă față de o poziție (latitudine/longitudine) din Galați.",
  inputSchema: {
    lat: z.number().describe("Latitudinea poziției curente."),
    lng: z.number().describe("Longitudinea poziției curente."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ lat, lng }) => {
    const { data, error } = await supabaseAnon()
      .from("bikes")
      .select("id, code, status, battery_level, lat, lng")
      .eq("status", "available");

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length)
      return { content: [{ type: "text", text: "Nicio bicicletă disponibilă." }] };

    const nearest = data
      .map((b) => ({ ...b, distance_km: Number(distanceKm(lat, lng, b.lat, b.lng).toFixed(3)) }))
      .sort((a, b) => a.distance_km - b.distance_km)[0]!;

    return {
      content: [{ type: "text", text: JSON.stringify(nearest) }],
      structuredContent: { bike: nearest },
    };
  },
});
