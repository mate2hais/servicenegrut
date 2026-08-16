import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, GraduationCap } from "lucide-react";
import { ACCREDITATIONS, ENGINEERS } from "@/data/site";

export const Route = createFileRoute("/echipa")({
  head: () => ({
    meta: [
      { title: "Echipa de ingineri și acreditări — AutoNeg" },
      { name: "description", content: "Inginerii AutoNeg, condusi de Negruț Cosmin, sunt inspectori atestați RAR. Vezi specializările echipei și acreditările stației ITP." },
      { property: "og:title", content: "Echipa de ingineri și acreditări — AutoNeg" },
      { property: "og:description", content: "Inspectori tehnici atestați RAR, cu experiență în inspecții auto și diagnoză." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EchipaPage,
});

function EchipaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Echipa</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Inginerii care îți verifică mașina
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Fiecare inspecție este realizată de un inginer atestat RAR, care îți explică rezultatul și
        îți spune exact ce trebuie remediat.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {ENGINEERS.map((e) => (
          <article key={e.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {e.initials}
              </span>
              <div>
                <h2 className="text-lg font-bold">{e.name}</h2>
                <p className="text-sm text-muted-foreground">{e.role}</p>
              </div>
            </div>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
              <GraduationCap className="h-3.5 w-3.5" />
              {e.experience}
            </p>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Specializări
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {e.specialties.map((s) => (
                <li key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">{s}</li>
              ))}
            </ul>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Certificări
            </h3>
            <ul className="mt-2 space-y-1.5">
              {e.certifications.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Acreditări și autorizații</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {ACCREDITATIONS.map((a) => (
          <div key={a.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
