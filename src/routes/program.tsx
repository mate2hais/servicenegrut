import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSchedule } from "@/lib/club.functions";
import { AGE_LABEL, DAYS, DISCIPLINE_LABEL, hhmm } from "@/data/club";

const scheduleQuery = queryOptions({ queryKey: ["schedule"], queryFn: () => getSchedule() });

export const Route = createFileRoute("/program")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(scheduleQuery);
  },
  head: () => ({
    meta: [
      { title: "Program antrenamente BJJ și MMA — Ascendo Club Galați" },
      { name: "description", content: "Programul complet de antrenamente Brazilian Jiu-Jitsu și MMA pentru copii și adulți, de luni până sâmbătă, la Ascendo Club Galați." },
      { property: "og:title", content: "Program antrenamente — Ascendo Club" },
      { property: "og:description", content: "Vezi orele de antrenament pe zile, discipline și grupe de vârstă." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Programul nu s-a putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: SchedulePage,
});

type Filter = "all" | "bjj" | "mma" | "kids" | "adults";

function SchedulePage() {
  const { data } = useSuspenseQuery(scheduleQuery);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = data.filter((c: any) =>
    filter === "all" ? true : filter === "bjj" || filter === "mma" ? c.discipline === filter : c.age_group === filter,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-5xl">Program antrenamente</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Antrenamentele se desfășoară pe grupe de nivel și vârstă. Vino cu 10 minute înainte de oră.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {([
          ["all", "Toate"],
          ["bjj", "BJJ"],
          ["mma", "MMA"],
          ["kids", "Copii"],
          ["adults", "Adulți"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
              filter === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {DAYS.map((day, idx) => {
          const items = filtered.filter((c: any) => c.day_of_week === idx);
          if (items.length === 0) return null;
          return (
            <div key={day} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-2xl text-accent">{day}</h2>
              <ul className="mt-4 space-y-3">
                {items.map((c: any) => (
                  <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background p-4">
                    <div>
                      <p className="font-semibold">{c.title}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {DISCIPLINE_LABEL[c.discipline]} · {AGE_LABEL[c.age_group]} · {c.level}
                        {c.coaches?.full_name ? ` · ${c.coaches.full_name}` : ""}
                      </p>
                    </div>
                    <span className="font-display text-2xl text-primary">
                      {hhmm(c.start_time)}–{hhmm(c.end_time)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
