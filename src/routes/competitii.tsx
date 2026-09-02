import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { getCompetitions } from "@/lib/club.functions";
import { DISCIPLINE_LABEL, formatDate } from "@/data/club";

const compsQuery = queryOptions({ queryKey: ["competitions"], queryFn: () => getCompetitions() });

export const Route = createFileRoute("/competitii")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(compsQuery);
  },
  head: () => ({
    meta: [
      { title: "Competiții BJJ și MMA — naționale și europene | Ascendo Club" },
      { name: "description", content: "Calendarul competițiilor de Brazilian Jiu-Jitsu și MMA din România și din Europa, actualizat periodic pentru sportivii Ascendo Club." },
      { property: "og:title", content: "Competiții BJJ & MMA — Ascendo Club" },
      { property: "og:description", content: "Două calendare separate: competiții naționale și competiții europene." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Competițiile nu s-au putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: CompetitionsPage,
});

function CompetitionsPage() {
  const { data } = useSuspenseQuery(compsQuery);
  const [scope, setScope] = useState<"national" | "europe">("national");
  const [discipline, setDiscipline] = useState<"all" | "bjj" | "mma">("all");

  const items = data.filter(
    (c) => c.scope === scope && (discipline === "all" || c.discipline === discipline),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-5xl">Competiții</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Calendarul competițional pentru sportivii clubului — separat pe competiții din România și
        competiții din Europa.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-border p-1">
          {([
            ["national", "România"],
            ["europe", "Europa"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setScope(k)}
              className={`rounded-md px-6 py-2 text-sm font-bold uppercase tracking-wide ${
                scope === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-border p-1">
          {([
            ["all", "Toate"],
            ["bjj", "BJJ"],
            ["mma", "MMA"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setDiscipline(k)}
              className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                discipline === k ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          Momentan nu sunt competiții listate pentru această selecție.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <article key={c.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {DISCIPLINE_LABEL[c.discipline]}
                {c.organizer ? ` · ${c.organizer}` : ""}
              </span>
              <h2 className="mt-2 text-2xl leading-tight">{c.title}</h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatDate(c.start_date)}
                {c.end_date && c.end_date !== c.start_date ? ` – ${formatDate(c.end_date)}` : ""}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {[c.city, c.country].filter(Boolean).join(", ")}
              </p>
              {c.description && <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>}
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary hover:underline"
                >
                  Detalii oficiale <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
