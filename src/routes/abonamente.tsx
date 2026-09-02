import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { getPlans } from "@/lib/club.functions";
import { requestMembership } from "@/lib/member.functions";
import { supabase } from "@/integrations/supabase/client";
import { AGE_LABEL, DISCIPLINE_LABEL } from "@/data/club";

const plansQuery = queryOptions({ queryKey: ["plans"], queryFn: () => getPlans() });

export const Route = createFileRoute("/abonamente")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(plansQuery);
  },
  head: () => ({
    meta: [
      { title: "Abonamente BJJ și MMA — Ascendo Club Galați" },
      { name: "description", content: "Abonamente lunare de Brazilian Jiu-Jitsu și MMA pentru copii și adulți, cu prețuri transparente și activare rapidă la Ascendo Club Galați." },
      { property: "og:title", content: "Abonamente — Ascendo Club" },
      { property: "og:description", content: "Alege disciplina și grupa de vârstă, apoi trimite cererea de abonament online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Abonamentele nu s-au putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: PlansPage,
});

type Tab = "adults" | "kids";

function PlansPage() {
  const { data } = useSuspenseQuery(plansQuery);
  const [tab, setTab] = useState<Tab>("adults");
  const [signedIn, setSignedIn] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [athlete, setAthlete] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const send = useServerFn(requestMembership);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: s }) => setSignedIn(!!s.session));
  }, []);

  const plans = data.filter((p) => p.age_group === tab);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBusy(true);
    try {
      await send({ data: { plan_id: selected, athlete_name: athlete, notes } });
      toast.success("Cererea a fost trimisă! Abonamentul va fi confirmat la sală.");
      setSelected(null);
      setAthlete("");
      setNotes("");
      navigate({ to: "/cont" });
    } catch {
      toast.error("Cererea nu a putut fi trimisă.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-5xl">Abonamente</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Alege disciplina și numărul de antrenamente. Poți trimite cererea online, iar la sală o
        confirmăm și îți activăm accesul.
      </p>

      <div className="mt-8 inline-flex rounded-lg border border-border p-1">
        {(["adults", "kids"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-6 py-2 text-sm font-bold uppercase tracking-wide ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {AGE_LABEL[t]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-xl border bg-card p-6 transition-colors ${
              selected === p.id ? "border-primary" : "border-border"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {DISCIPLINE_LABEL[p.discipline]}
            </span>
            <h2 className="mt-2 text-2xl">{p.name}</h2>
            <p className="mt-4 font-display text-5xl text-primary">
              {p.price_lei} <span className="text-base">lei</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Check className="h-4 w-4 text-primary" />{p.sessions_per_week} antrenamente / săptămână</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-primary" />Valabil {p.duration_days} zile</li>
              {p.description && <li className="flex gap-2"><Check className="h-4 w-4 text-primary" />{p.description}</li>}
            </ul>
            {signedIn ? (
              <button
                onClick={() => setSelected(p.id)}
                className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground"
              >
                Alege abonamentul
              </button>
            ) : (
              <Link
                to="/auth"
                className="mt-6 block w-full rounded-md border border-border px-4 py-3 text-center text-sm font-bold uppercase tracking-wide"
              >
                Creează cont pentru a te abona
              </Link>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <form onSubmit={submit} className="mt-10 max-w-xl rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl">Finalizează cererea</h2>
          <label className="mt-5 block text-sm font-semibold">
            Numele sportivului
            <input
              required
              minLength={3}
              value={athlete}
              onChange={(e) => setAthlete(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              placeholder="Ex: Andrei Popescu"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Observații (opțional)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              placeholder="Ex: începător, vin marți și joi"
            />
          </label>
          <div className="mt-5 flex gap-3">
            <button
              disabled={busy}
              className="rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
            >
              {busy ? "Se trimite..." : "Trimite cererea"}
            </button>
            <button type="button" onClick={() => setSelected(null)} className="rounded-md border border-border px-6 py-3 text-sm font-semibold">
              Renunță
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
