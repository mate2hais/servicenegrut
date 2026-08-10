/// <reference types="google.maps" />
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getActiveRide, updateRidePosition, endRide } from "@/lib/rides.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Battery,
  MapPin,
  Navigation,
  Square,
  Flag,
  Clock,
  Route as RouteIcon,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
  Bike,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/ride")({
  head: () => ({
    meta: [
      { title: "Cursă activă — BikeGo Galați" },
      { name: "description", content: "Urmărește cursa ta activă în timp real." },
    ],
  }),
  component: RidePage,
});

function RidePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchActiveRide = useServerFn(getActiveRide);
  const updatePosition = useServerFn(updateRidePosition);
  const endRideFn = useServerFn(endRide);

  const { data: ride, isLoading } = useQuery({
    queryKey: ["active-ride"],
    queryFn: () => fetchActiveRide(),
    refetchInterval: 5000,
  });

  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState("");
  const [showDestination, setShowDestination] = useState(false);
  const [destinationCost, setDestinationCost] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paying, setPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const watchRef = useRef<number | null>(null);
  const startedAtRef = useRef<Date | null>(null);
  const lastPosRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!ride) {
      navigate({ to: "/app/map" });
      return;
    }
    startedAtRef.current = new Date(ride.started_at);
    setDistance(ride.distance_km ?? 0);
    setCost(ride.cost_lei ?? 0);
  }, [ride, navigate]);

  useEffect(() => {
    if (!startedAtRef.current) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAtRef.current!.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [ride]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(loc);

        if (lastPosRef.current) {
          const d = haversine(
            lastPosRef.current.lat,
            lastPosRef.current.lng,
            loc.lat,
            loc.lng,
          );
          const newDistance = distance + d;
          setDistance(newDistance);
          setCost(Number((newDistance * 1).toFixed(2)));

          if (ride) {
            updatePosition({
              data: {
                ride_id: ride.id,
                lat: loc.lat,
                lng: loc.lng,
                distance_km: newDistance,
              },
            }).catch(() => {});
          }
        }
        lastPosRef.current = loc;
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    );

    return () => {
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    };
  }, [distance, ride, updatePosition]);

  const openPayment = () => setShowPayment(true);

  const handlePayAndEnd = async () => {
    if (!ride || !position) return;
    if (cardNumber.length < 16 || cardCvc.length < 3 || cardExpiry.length < 5) {
      toast.error("Completează corect datele cardului.");
      return;
    }
    setPaying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const completed = await endRideFn({
        data: {
          ride_id: ride.id,
          end_lat: position.lat,
          end_lng: position.lng,
          distance_km: distance,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["active-ride"] });
      toast.success(`Plată de ${completed.cost_lei} lei procesată cu succes!`);
      navigate({ to: "/app/history" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Eroare la încheierea cursei");
    } finally {
      setPaying(false);
      setShowPayment(false);
    }
  };

  const handleDestinationSearch = async () => {
    if (!destination.trim() || !position) return;
    try {
      const service = new google.maps.DistanceMatrixService();
      const response = await service.getDistanceMatrix({
        origins: [position],
        destinations: [{ query: destination }],
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.METRIC,
      });
      const element = response.rows[0]?.elements[0];
      if (element?.status === "OK" && element.distance) {
        const extraKm = element.distance.value / 1000;
        const total = Number(((distance + extraKm) * 1).toFixed(2));
        setDestinationCost(total);
      } else {
        toast.error("Nu am putut calcula ruta. Încearcă altă destinație.");
      }
    } catch {
      toast.error("Eroare la calculul rutei.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Se încarcă cursa...</p>
      </div>
    );
  }

  if (!ride) return null;

  const bikeCode = (ride as unknown as { bikes?: { code: string; battery_level: number } }).bikes?.code ?? "—";
  const battery = (ride as unknown as { bikes?: { battery_level: number } }).bikes?.battery_level ?? 0;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background px-4 py-6">
      <div className="mx-auto w-full max-w-md space-y-4">
        <Link
          to="/app/map"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi la hartă
        </Link>

        <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bike className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Cursa ta este activă</h1>
          <p className="text-sm text-muted-foreground">Bicicleta {bikeCode}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <Battery className="h-4 w-4" />
            <span>Baterie {battery}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<Clock className="h-5 w-5" />} label="Timp" value={formatTime(elapsed)} />
          <StatCard icon={<RouteIcon className="h-5 w-5" />} label="Distanță" value={`${distance.toFixed(2)} km`} />
          <StatCard icon={<CreditCard className="h-5 w-5" />} label="Cost estimat" value={`${cost.toFixed(2)} lei`} />
          <StatCard icon={<MapPin className="h-5 w-5" />} label="Tarif" value="1 leu/km" />
        </div>

        {!showDestination ? (
          <Button variant="outline" className="w-full" onClick={() => setShowDestination(true)}>
            <Flag className="mr-2 h-4 w-4" />
            Setează destinație
          </Button>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-medium">Unde vrei să ajungi?</p>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Introdu o adresă sau locație"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <Button onClick={handleDestinationSearch}>Calculează</Button>
            </div>
            {destinationCost !== null && (
              <p className="mt-2 text-sm text-primary">
                Cost estimat până la destinație: <strong>{destinationCost.toFixed(2)} lei</strong>
              </p>
            )}
          </div>
        )}

        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={openPayment}
          disabled={!position}
        >
          <Square className="mr-2 h-5 w-5" />
          Încheie cursa și plătește
        </Button>

        {!position && (
          <p className="text-center text-xs text-muted-foreground">
            Așteptăm semnalul GPS pentru a putea încheia cursa.
          </p>
        )}
      </div>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Plătește cursa
            </DialogTitle>
            <DialogDescription>
              Simulează plata cu cardul. Nu se procesează tranzacții reale.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-2xl bg-primary/5 p-4 text-center">
              <p className="text-sm text-muted-foreground">Total de plată</p>
              <p className="text-3xl font-bold text-primary">{cost.toFixed(2)} lei</p>
              <p className="text-xs text-muted-foreground">{distance.toFixed(2)} km × 1 leu/km</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Număr card</Label>
              <Input
                id="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                maxLength={16}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Titular card</Label>
              <Input
                id="cardName"
                placeholder="Ion Popescu"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Data expirării</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                    setCardExpiry(v);
                  }}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)} disabled={paying}>
              Anulează
            </Button>
            <Button onClick={handlePayAndEnd} disabled={paying}>
              {paying ? (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4 animate-pulse" />
                  Se procesează...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Plătește acum
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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
