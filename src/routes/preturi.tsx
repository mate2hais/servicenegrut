import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { EXTRA_SERVICES, PRICES } from "@/data/site";

export const Route = createFileRoute("/preturi")({
  head: () => ({
    meta: [
      { title: "Prețuri ITP 2026 — AutoNeg Galați" },
      { name: "description", content: "Lista de prețuri ITP AutoNeg: autoturisme, autoutilitare, remorci, motociclete, taxi și servicii suplimentare. Fără costuri ascunse." },
      { property: "og:title", content: "Prețuri ITP — AutoNeg Galați" },
      { property: "og:description", content: "Tarife transparente pentru inspecția tehnică periodică și serviciile conexe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PreturiPage,
});

function PreturiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Tarife</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Lista de prețuri</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Prețurile includ taxa RAR și eliberarea certificatului. Plata se face la recepție, numerar
        sau card.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-semibold">Categorie</th>
              <th className="px-5 py-4 font-semibold">Detalii</th>
              <th className="px-5 py-4 font-semibold">Valabilitate</th>
              <th className="px-5 py-4 text-right font-semibold">Preț</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PRICES.map((p) => (
              <tr key={`${p.category}-${p.detail}`}>
                <td className="px-5 py-4 font-medium">{p.category}</td>
                <td className="px-5 py-4 text-muted-foreground">{p.detail}</td>
                <td className="px-5 py-4 text-muted-foreground">{p.validity}</td>
                <td className="px-5 py-4 text-right font-bold text-primary">{p.price} lei</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 text-2xl font-bold tracking-tight">Servicii suplimentare</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {EXTRA_SERVICES.map((s) => (
          <div key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
            <span className="text-sm font-medium">{s.name}</span>
            <span className="text-sm font-bold text-primary">{s.price} lei</span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-3 rounded-2xl border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>
          Reverificarea este gratuită pentru defectele minore remediate în aceeași zi. Pentru
          revenirea în termen de 30 de zile se aplică tariful redus de reverificare.
        </p>
      </div>

      <Link
        to="/programare"
        className="mt-10 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Fă o programare
      </Link>
    </div>
  );
}
