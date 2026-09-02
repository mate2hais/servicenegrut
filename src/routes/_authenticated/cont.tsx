import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, CalendarClock, ShieldCheck } from "lucide-react";
import { getMyAccount, updateMyProfile } from "@/lib/member.functions";
import { AGE_LABEL, DISCIPLINE_LABEL, STATUS_LABEL, daysLeft, formatDate } from "@/data/club";

export const Route = createFileRoute("/_authenticated/cont")({
  head: () => ({
    meta: [
      { title: "Contul meu — abonament BJJ/MMA | Ascendo Club" },
      { name: "description", content: "Vezi zilele rămase din abonamentul tău de BJJ sau MMA, istoricul abonamentelor și datele tale de contact." },
      { property: "og:title", content: "Contul meu — Ascendo Club" },
      { property: "og:description", content: "Situația abonamentului tău la Ascendo Club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Contul nu s-a putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: AccountPage,
});

function AccountPage() {
  const fetchAccount = useServerFn(getMyAccount);
  const saveProfile = useServerFn(updateMyProfile);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["my-account"], queryFn: () => fetchAccount() });

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data?.profile) {
      setFullName(data.profile.full_name ?? "");
      setPhone(data.profile.phone ?? "");
    }
  }, [data]);

  if (isLoading || !data) return <p className="p-10 text-center text-muted-foreground">Se încarcă...</p>;

  const active = data.memberships.find((m: any) => m.status === "active" && daysLeft(m.end_date) >= 0);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveProfile({ data: { full_name: fullName, phone } });
      toast.success("Datele au fost salvate.");
      qc.invalidateQueries({ queryKey: ["my-account"] });
    } catch {
      toast.error("Datele nu au putut fi salvate.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-5xl">Contul meu</h1>
        {data.isAdmin && (
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-foreground">
            <ShieldCheck className="h-4 w-4" />
            Panou admin
          </Link>
        )}
      </div>

      {active ? (
        <div className="mt-8 rounded-xl border border-primary/40 bg-primary/5 p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Abonament activ</p>
          <h2 className="mt-2 text-3xl">
            {DISCIPLINE_LABEL[active.discipline]} · {AGE_LABEL[active.age_group]}
          </h2>
          <p className="mt-6 font-display text-6xl text-primary">
            {daysLeft(active.end_date)} <span className="text-xl">zile rămase</span>
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4" />
            Valabil până la {formatDate(active.end_date)}
          </p>
          {daysLeft(active.end_date) <= 5 && (
            <p className="mt-4 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Abonamentul expiră în curând. Prelungește-l la recepție.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl">Nu ai un abonament activ</h2>
          <p className="mt-2 text-muted-foreground">Alege un abonament ca să începi antrenamentele.</p>
          <Link to="/abonamente" className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground">
            Vezi abonamentele
          </Link>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-3xl">Istoric abonamente</h2>
        {data.memberships.length === 0 ? (
          <p className="mt-4 text-muted-foreground">Nu există înregistrări.</p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Abonament</th>
                  <th className="p-3">Sportiv</th>
                  <th className="p-3">Perioadă</th>
                  <th className="p-3">Stare</th>
                </tr>
              </thead>
              <tbody>
                {data.memberships.map((m: any) => (
                  <tr key={m.id} className="border-t border-border">
                    <td className="p-3">
                      {m.membership_plans?.name ?? `${DISCIPLINE_LABEL[m.discipline]} ${AGE_LABEL[m.age_group]}`}
                    </td>
                    <td className="p-3">{m.athlete_name ?? "—"}</td>
                    <td className="p-3">{formatDate(m.start_date)} – {formatDate(m.end_date)}</td>
                    <td className="p-3">{STATUS_LABEL[m.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-12 max-w-lg">
        <h2 className="text-3xl">Datele mele</h2>
        <form onSubmit={save} className="mt-5 space-y-4 rounded-xl border border-border bg-card p-6">
          <label className="block text-sm font-semibold">
            Nume complet
            <input
              required
              minLength={3}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block text-sm font-semibold">
            Telefon
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <button className="rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground">
            Salvează
          </button>
        </form>
      </section>
    </div>
  );
}
