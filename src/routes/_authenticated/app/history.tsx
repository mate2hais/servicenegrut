import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listRides } from "@/lib/rides.functions";
import { Bike, Calendar, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export const Route = createFileRoute("/_authenticated/app/history")({
  head: () => ({
    meta: [
      { title: "Istoric curse — BikeGo Galați" },
      { name: "description", content: "Vezi istoricul curselor tale cu BikeGo." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const fetchRides = useServerFn(listRides);
  const { data: rides = [], isLoading } = useQuery({
    queryKey: ["rides"],
    queryFn: () => fetchRides(),
  });

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <Link
        to="/app/map"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Înapoi la hartă
      </Link>

      <h1 className="text-2xl font-bold">Istoric curse</h1>
      <p className="text-sm text-muted-foreground">Toate cursele tale finalizate</p>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Se încarcă...</p>}

      {!isLoading && rides.length === 0 && (
        <div className="mt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Bike className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-4 text-muted-foreground">Nu ai curse finalizate încă.</p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bike className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">
                    Bicicleta {(ride as unknown as { bikes?: { code: string } }).bikes?.code}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ride.ended_at
                      ? format(new Date(ride.ended_at), "d MMMM yyyy, HH:mm", { locale: ro })
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{ride.cost_lei?.toFixed(2)} lei</p>
                <p className="text-xs text-muted-foreground">{ride.distance_km?.toFixed(2)} km</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
