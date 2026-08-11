import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listAvailableBikes from "./tools/list-available-bikes";
import findNearestBike from "./tools/find-nearest-bike";
import listMyRides from "./tools/list-my-rides";
import getActiveRide from "./tools/get-active-ride";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "speak-romanian-chat",
  title: "Speak Romanian Chat",
  version: "0.1.0",
  instructions:
    "Unelte pentru BikeGo Galați: vezi bicicletele disponibile din flotă, găsește cea mai apropiată bicicletă față de o poziție și consultă cursele utilizatorului autentificat.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listAvailableBikes, findNearestBike, listMyRides, getActiveRide] as Parameters<
    typeof defineMcp
  >[0]["tools"],
});
