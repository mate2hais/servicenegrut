import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGallery } from "@/lib/club.functions";
import { AGE_LABEL, DISCIPLINE_LABEL, formatDate } from "@/data/club";

const galleryQuery = queryOptions({ queryKey: ["gallery"], queryFn: () => getGallery() });

export const Route = createFileRoute("/galerie")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(galleryQuery);
  },
  head: () => ({
    meta: [
      { title: "Galerie foto și video de la antrenamente — Ascendo Club" },
      { name: "description", content: "Fotografii și clipuri de la antrenamentele zilnice de BJJ și MMA ale grupelor de copii și adulți din Ascendo Club Galați." },
      { property: "og:title", content: "Galerie antrenamente — Ascendo Club" },
      { property: "og:description", content: "Vezi cum arată antrenamentele noastre, zi de zi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Galeria nu s-a putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: GalleryPage,
});

function GalleryPage() {
  const { data } = useSuspenseQuery(galleryQuery);
  const [kind, setKind] = useState<"all" | "photo" | "video">("all");

  const items = data.filter((i) => kind === "all" || i.kind === kind);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-5xl">Galerie</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Imagini și clipuri încărcate de antrenori după fiecare antrenament.
      </p>

      <div className="mt-8 inline-flex rounded-lg border border-border p-1">
        {([
          ["all", "Toate"],
          ["photo", "Foto"],
          ["video", "Video"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-md px-5 py-2 text-sm font-bold uppercase tracking-wide ${
              kind === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          Încă nu au fost încărcate materiale. Revino în curând.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {item.url ? (
                item.kind === "photo" ? (
                  <img src={item.url} alt={item.title ?? "Antrenament Ascendo Club"} loading="lazy" className="h-56 w-full object-cover" />
                ) : (
                  <video src={item.url} controls preload="metadata" className="h-56 w-full bg-black object-cover" />
                )
              ) : (
                <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
                  Material indisponibil
                </div>
              )}
              <figcaption className="p-4">
                <p className="font-semibold">{item.title ?? "Antrenament"}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {formatDate(item.session_date)}
                  {item.discipline ? ` · ${DISCIPLINE_LABEL[item.discipline]}` : ""}
                  {item.age_group ? ` · ${AGE_LABEL[item.age_group]}` : ""}
                </p>
                {item.description && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
