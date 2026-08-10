import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listBikes } from "@/lib/bikes.functions";
import { getActiveRide, startRide } from "@/lib/rides.functions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Battery, Locate, Navigation } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/map")({
  head: () => ({
    meta: [
      { title: "Hartă — BikeGo Galați" },
      { name: "description", content: "Vezi bicicletele disponibile în Galați pe hartă." },
    ],
  }),
  component: MapPage,
});

const GALATI_CENTER = { lat: 45.4353, lng: 28.008 };

declare global {
  interface Window {
    initMap?: () => void;
  }
}

function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestBike, setNearestBike] = useState<{ id: string; distance: number } | null>(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchBikes = useServerFn(listBikes);
  const fetchActiveRide = useServerFn(getActiveRide);
  const startRideFn = useServerFn(startRide);

  const { data: bikes = [] } = useQuery({
    queryKey: ["bikes"],
    queryFn: () => fetchBikes(),
  });

  const { data: activeRide } = useQuery({
    queryKey: ["active-ride"],
    queryFn: () => fetchActiveRide(),
  });

  useEffect(() => {
    if (activeRide) {
      navigate({ to: "/app/ride" });
    }
  }, [activeRide, navigate]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = () => {
      const map = new google.maps.Map(mapRef.current!, {
        center: GALATI_CENTER,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      mapInstance.current = map;
      setLoadingMap(false);
    };

    if (typeof google !== "undefined" && google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
      const script = document.createElement("script");
      const browserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
      const trackingId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
      script.src = `https://maps.googleapis.com/maps/api/js?key=${browserKey}&loading=async&callback=initMap&channel=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current || bikes.length === 0) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    bikes.forEach((bike) => {
      const marker = new google.maps.Marker({
        position: { lat: bike.lat, lng: bike.lng },
        map: mapInstance.current,
        title: `Bicicleta ${bike.code} — ${bike.battery_level}%`,
        icon: {
          url: getBikeIconSvg(bike.battery_level),
          scaledSize: new google.maps.Size(36, 36),
          anchor: new google.maps.Point(18, 18),
        },
      });
      marker.addListener("click", () => {
        toast.info(`Bicicleta ${bike.code} — baterie ${bike.battery_level}%`);
      });
      markersRef.current.push(marker);
    });
  }, [bikes]);

  useEffect(() => {
    if (!userLocation || !mapInstance.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(userLocation);
    } else {
      userMarkerRef.current = new google.maps.Marker({
        position: userLocation,
        map: mapInstance.current,
        title: "Tu ești aici",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#22c55e",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
    }

    let nearest: { id: string; distance: number } | null = null;
    bikes.forEach((bike) => {
      const d = haversine(userLocation.lat, userLocation.lng, bike.lat, bike.lng);
      if (!nearest || d < nearest.distance) nearest = { id: bike.id, distance: d };
    });
    setNearestBike(nearest);
  }, [userLocation, bikes]);

  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        mapInstance.current?.panTo(loc);
        mapInstance.current?.setZoom(16);
      },
      () => toast.error("Nu am putut accesa locația. Verifică permisiunile."),
    );
  };

  const handleStartRide = async () => {
    if (!nearestBike || !userLocation) return;
    const bike = bikes.find((b) => b.id === nearestBike.id);
    if (!bike) return;
    if (bike.battery_level < 10) {
      toast.error("Bicicleta are bateria prea mică. Alege alta.");
      return;
    }

    setStarting(true);
    try {
      await startRideFn({
        data: {
          bike_id: bike.id,
          start_lat: userLocation.lat,
          start_lng: userLocation.lng,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["active-ride"] });
      toast.success(`Cursa cu ${bike.code} a început!`);
      navigate({ to: "/app/ride" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Eroare la pornirea cursei");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col">
      <div ref={mapRef} className="flex-1" />

      {loadingMap && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Locate className="h-5 w-5 animate-pulse" />
            Se încarcă harta...
          </div>
        </div>
      )}

      <button
        onClick={locateMe}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-lg transition-transform hover:scale-105"
        aria-label="Locația mea"
      >
        <Locate className="h-5 w-5 text-primary" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur">
          {nearestBike ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cea mai apropiată bicicletă</p>
                  <h2 className="text-2xl font-bold">
                    {bikes.find((b) => b.id === nearestBike.id)?.code}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    la {nearestBike.distance.toFixed(2)} km distanță
                  </p>
                </div>
                <BatteryIndicator level={bikes.find((b) => b.id === nearestBike.id)?.battery_level ?? 0} />
              </div>
              <Button
                className="mt-4 w-full"
                size="lg"
                onClick={handleStartRide}
                disabled={starting || !userLocation}
              >
                {starting ? "Se deblochează..." : "Deblochează și pornește cursa"}
              </Button>
              {!userLocation && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Apasă butonul de locație pentru a găsi cea mai apropiată bicicletă.
                </p>
              )}
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {bikes.length} biciclete disponibile în zonă
              </p>
              <Button className="mt-3 w-full" variant="outline" onClick={locateMe}>
                <Navigation className="mr-2 h-4 w-4" />
                Găsește cea mai apropiată
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BatteryIndicator({ level }: { level: number }) {
  const color = level > 50 ? "text-success" : level > 20 ? "text-warning" : "text-destructive";
  return (
    <div className={`flex flex-col items-center gap-1 ${color}`}>
      <Battery className="h-6 w-6" />
      <span className="text-xs font-semibold">{level}%</span>
    </div>
  );
}

function getBikeIconSvg(level: number) {
  const color = level > 50 ? "#22c55e" : level > 20 ? "#eab308" : "#ef4444";
  const svg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1.2-.4-1.6 0l-1.6 1.6c-.4.4-.5 1-.2 1.5l1.3 2.1H5v2h3.8l-1.5 4H5v2h2.5c.8 0 1.5-.5 1.8-1.2l1.5-4.1zm10.2 1.5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>`
  )}`;
  return svg;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
