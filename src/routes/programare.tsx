import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAppointment } from "@/lib/appointments.functions";
import { SITE, TIME_SLOTS, VEHICLE_CATEGORIES } from "@/data/site";

export const Route = createFileRoute("/programare")({
  head: () => ({
    meta: [
      { title: "Programare ITP online — AutoNeg Galați" },
      { name: "description", content: "Rezervă online ora pentru inspecția tehnică periodică la AutoNeg. Alege data, intervalul orar și categoria vehiculului în mai puțin de un minut." },
      { property: "og:title", content: "Programare ITP online — AutoNeg" },
      { property: "og:description", content: "Alege data și ora pentru inspecția tehnică. Confirmare telefonică rapidă." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramarePage,
});

function ProgramarePage() {
  const submit = useServerFn(createAppointment);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      plate: String(fd.get("plate") ?? "").trim(),
      car_model: String(fd.get("car_model") ?? "").trim(),
      vehicle_category: String(fd.get("vehicle_category") ?? ""),
      preferred_date: String(fd.get("preferred_date") ?? ""),
      preferred_time: String(fd.get("preferred_time") ?? ""),
      notes: String(fd.get("notes") ?? "").trim(),
    };

    if (payload.full_name.length < 3 || payload.phone.length < 6 || payload.plate.length < 4) {
      toast.error("Completează numele, telefonul și numărul de înmatriculare.");
      return;
    }

    setLoading(true);
    try {
      await submit({ data: payload });
      setDone(true);
      toast.success("Programarea a fost trimisă!");
    } catch {
      toast.error("Nu am putut trimite programarea. Încearcă din nou sau sună-ne.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Cererea ta a fost trimisă</h1>
        <p className="mt-4 text-muted-foreground">
          Te sunăm în cel mult o oră lucrătoare pentru a confirma ora exactă. Dacă e urgent, ne poți
          suna direct la {SITE.phone}.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-8 rounded-lg border border-border px-6 py-3 text-sm font-semibold"
        >
          Fă o altă programare
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Programare</p>
      <h1 className="mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        <CalendarCheck className="h-8 w-8 text-primary" />
        Rezervă ora pentru ITP
      </h1>
      <p className="mt-4 text-muted-foreground">
        Completează formularul, iar noi confirmăm telefonic intervalul ales. Durata medie a
        inspecției este de 30 de minute.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8">
        <Field label="Nume și prenume *">
          <input name="full_name" required maxLength={80} className={inputCls} placeholder="Ion Popescu" />
        </Field>
        <Field label="Telefon *">
          <input name="phone" required type="tel" maxLength={25} className={inputCls} placeholder="07xx xxx xxx" />
        </Field>
        <Field label="Email">
          <input name="email" type="email" maxLength={120} className={inputCls} placeholder="email@exemplu.ro" />
        </Field>
        <Field label="Număr de înmatriculare *">
          <input name="plate" required maxLength={15} className={`${inputCls} uppercase`} placeholder="GL 12 ABC" />
        </Field>
        <Field label="Marcă și model">
          <input name="car_model" maxLength={80} className={inputCls} placeholder="Dacia Logan 1.5 dCi" />
        </Field>
        <Field label="Categorie vehicul *">
          <select name="vehicle_category" required defaultValue={VEHICLE_CATEGORIES[0]} className={inputCls}>
            {VEHICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Data dorită *">
          <input name="preferred_date" required type="date" min={today} defaultValue={today} className={inputCls} />
        </Field>
        <Field label="Interval orar *">
          <select name="preferred_time" required defaultValue="09:00" className={inputCls}>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Observații">
            <textarea name="notes" rows={4} maxLength={600} className={inputCls} placeholder="Ex: instalație GPL, revin după reverificare, prefer dimineața..." />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Trimite cererea de programare
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Datele sunt folosite exclusiv pentru gestionarea programării.
          </p>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
