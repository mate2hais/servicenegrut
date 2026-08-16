import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Gauge, Lightbulb, Wind, Car, Wrench, ClipboardCheck, Truck, Bike, ShieldCheck,
} from "lucide-react";
import { EXTRA_SERVICES } from "@/data/site";

export const Route = createFileRoute("/servicii")({
  head: () => ({
    meta: [
      { title: "Servicii ITP și verificări tehnice — AutoNeg Galați" },
      { name: "description", content: "Inspecție tehnică periodică pentru autoturisme, autoutilitare, remorci și motociclete, plus verificare pre-ITP, reglaj faruri, test frâne și diagnoză." },
      { property: "og:title", content: "Servicii ITP și verificări tehnice — AutoNeg" },
      { property: "og:description", content: "ITP autorizat RAR pentru toate categoriile de vehicule și servicii tehnice conexe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServiciiPage,
});

const MAIN = [
  { icon: Car, title: "ITP autoturisme (M1)", text: "Inspecție completă pe stand pentru autoturisme până la 3.5 t, benzină, diesel, GPL sau hibrid." },
  { icon: Truck, title: "ITP autoutilitare (N1)", text: "Verificare pentru vehicule de marfă ușoare, inclusiv sisteme de frânare cu sarcină." },
  { icon: Bike, title: "ITP moto și mopede", text: "Inspecție dedicată motocicletelor și mopedelor, cu verificarea frânelor și a iluminării." },
  { icon: ShieldCheck, title: "ITP remorci", text: "Remorci și semiremorci până la 3.5 t: cuplă, instalație electrică, frâne de inerție." },
  { icon: ClipboardCheck, title: "Verificare pre-ITP", text: "Checklist complet înainte de inspecție, ca să știi exact ce trebuie remediat." },
  { icon: Wrench, title: "Consultanță tehnică", text: "Explicații clare pentru fiecare defect constatat și recomandări de reparație." },
];

const EQUIPMENT = [
  { icon: Gauge, title: "Stand de frânare cu role", text: "Măsoară forța de frânare pe fiecare roată și dezechilibrul între axe." },
  { icon: Wind, title: "Analizor de noxe / opacimetru", text: "Verifică emisiile pentru motoare pe benzină și diesel conform normelor Euro." },
  { icon: Lightbulb, title: "Reglofar digital", text: "Verifică și reglează înălțimea și intensitatea fasciculului luminos." },
  { icon: Car, title: "Stand de suspensii și jocuri", text: "Detectează uzura amortizoarelor, a bucșelor și jocurile în direcție." },
];

function ServiciiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Servicii</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tot ce ține de inspecția tehnică, într-un singur loc
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Lucrăm cu echipamente verificate metrologic și inspectori atestați RAR. Inspecția durează în
        medie 30 de minute, iar rezultatul îți este explicat punct cu punct.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MAIN.map((s) => (
          <article key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Echipamentele din stație</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {EQUIPMENT.map((e) => (
          <div key={e.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
              <e.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Servicii suplimentare</h2>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {EXTRA_SERVICES.map((s) => (
          <li key={s.name} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="text-sm font-medium">{s.name}</span>
            <span className="shrink-0 text-sm font-bold text-primary">{s.price} lei</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/programare" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Programează-te acum
        </Link>
        <Link to="/preturi" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold">
          Vezi lista completă de prețuri
        </Link>
      </div>
    </div>
  );
}
