import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export const computeBikeRoute = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      origin: { lat: number; lng: number };
      destination: { lat: number; lng: number };
    }) => data,
  )
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) {
      throw new Error("Conexiunea Google Maps nu este configurată.");
    }

    const { origin, destination } = data;
    for (const p of [origin, destination]) {
      if (
        typeof p?.lat !== "number" ||
        typeof p?.lng !== "number" ||
        Math.abs(p.lat) > 90 ||
        Math.abs(p.lng) > 180
      ) {
        throw new Error("Coordonate invalide.");
      }
    }

    const response = await fetch(`${GATEWAY_URL}/routes/directions/v2:computeRoutes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": mapsKey,
        "Content-Type": "application/json",
        "X-Goog-FieldMask":
          "routes.polyline.encodedPolyline,routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
        destination: {
          location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
        },
        travelMode: "WALK",
        polylineQuality: "HIGH_QUALITY",
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Routes API failed [${response.status}]: ${body}`);
      if (response.status === 403) {
        throw new Error(
          "Cererea către Google Maps a fost refuzată (403). Verifică restricțiile cheii server în Google Cloud Console.",
        );
      }
      throw new Error(`Nu am putut calcula traseul [${response.status}]: ${body}`);
    }

    const json = (await response.json()) as {
      routes?: Array<{
        polyline?: { encodedPolyline?: string };
        distanceMeters?: number;
        duration?: string;
      }>;
    };
    const route = json.routes?.[0];
    if (!route?.polyline?.encodedPolyline) throw new Error("Nu am găsit un traseu.");

    return {
      encodedPolyline: route.polyline.encodedPolyline,
      distanceMeters: route.distanceMeters ?? 0,
      durationSeconds: Number(String(route.duration ?? "0").replace("s", "")) || 0,
    };
  });
