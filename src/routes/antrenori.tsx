import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Medal } from "lucide-react";
import { getCoaches } from "@/lib/club.functions";
import { DISCIPLINE_LABEL } from "@/data/club";

const coachesQuery = queryOptions({ queryKey: ["coaches"], queryFn: () => getCoaches() });

export const Route = createFileRoute("/antrenori")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(coachesQuery);
  },
  head: () => ({
    meta: [
      { title: "Antrenori BJJ și MMA — Ascendo Club Galați" },
      { name: "description", content: "Cunoaște echipa tehnică Ascendo Club: centuri negre de Brazilian Jiu-Jitsu și antrenori MMA cu experiență competițională." },
      { property: "og:title", content: "Antrenori — Ascendo Club" },
      { property: "og:description", content: "Echipa tehnică de BJJ și MMA a clubului din Galați." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Lista nu s-a putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: CoachesPage,
});

function CoachesPage() {
  const { data } = useSuspenseQuery(coachesQuery);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-5xl">Antrenori</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Fiecare grupă este condusă de un antrenor cu experiență pe saltea și în competiție.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <article key={c.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              {c.photo_url ? (
                <img src={c.photo_url} alt={c.full_name} loading="lazy" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Medal className="h-7 w-7" />
                </span>
              )}
              <div>
                <h2 className="text-2xl leading-tight">{c.full_name}</h2>
                <p className="text-sm text-muted-foreground">{c.title}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.disciplines.map((d: string) => (
                <span key={d} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {DISCIPLINE_LABEL[d]}
                </span>
              ))}
              {c.rank && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                  {c.rank}
                </span>
              )}
            </div>

            {c.bio && <p className="mt-4 text-sm text-muted-foreground">{c.bio}</p>}
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              {c.years_experience} ani de experiență
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
