import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, MapPin, CreditCard, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BikeGo Galați — Închiriază o bicicletă" },
      { name: "description", content: "Găsește cea mai apropiată bicicletă în Galați, urmărește cursa în timp real și plătește 1 leu/km." },
      { property: "og:title", content: "BikeGo Galați — Închiriază o bicicletă" },
      { property: "og:description", content: "Găsește cea mai apropiată bicicletă în Galați, urmărește cursa în timp real și plătește 1 leu/km." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bike className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">BikeGo</span>
        </div>
        <Link
          to="/auth"
          className="rounded-full bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          Intră în cont
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Galațiul pe două roți
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Găsește cea mai apropiată bicicletă din flota noastră de 50, deblocheaz-o din telefon și
          plătește doar 1 leu pentru fiecare km parcurs.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/auth"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MapPin className="h-5 w-5" />
            Începe o cursă
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <Feature
            icon={<MapPin className="h-6 w-6" />}
            title="Localizare live"
            description="Vezi toate bicicletele disponibile pe harta orașului în timp real."
          />
          <Feature
            icon={<Clock className="h-6 w-6" />}
            title="Tarif simplu"
            description="1 leu/km. Fără abonamente, fără taxe ascunse."
          />
          <Feature
            icon={<CreditCard className="h-6 w-6" />}
            title="Plată rapidă"
            description="Achită cursa direct din aplicație, în siguranță."
          />
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BikeGo Galați. Toate drepturile rezervate.
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
