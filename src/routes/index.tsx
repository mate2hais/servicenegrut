import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { CalendarDays, Flame, Medal, ShieldCheck, Users, Trophy } from "lucide-react";
import heroImg from "@/assets/hero-gym.jpg";
import { getCoaches, getPlans } from "@/lib/club.functions";
import { CLUB, AGE_LABEL, DISCIPLINE_LABEL } from "@/data/club";

const homeQuery = queryOptions({
  queryKey: ["home"],
  queryFn: async () => ({ coaches: await getCoaches(), plans: await getPlans() }),
});

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(homeQuery);
  },
  head: () => ({
    meta: [
      { title: "Ascendo Club — Academie de BJJ și MMA în Galați" },
      { name: "description", content: "Antrenamente de Brazilian Jiu-Jitsu și MMA pentru copii și adulți în Galați. Program complet, antrenori licențiați, abonamente flexibile și competiții actualizate." },
      { property: "og:title", content: "Ascendo Club — BJJ & MMA Galați" },
      { property: "og:description", content: "Grupe de copii și adulți, antrenori licențiați, abonamente flexibile și galerie de la antrenamente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-10 text-center">Pagina nu s-a putut încărca.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Pagina nu există.</p>,
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(homeQuery);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Doi sportivi făcând grappling pe salteaua clubului"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Flame className="h-3.5 w-3.5" />
            {CLUB.tagline} · {CLUB.city}
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-7xl">
            Disciplină pe saltea. Rezultate în competiție.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {CLUB.name} este academia unde copiii și adulții învață Brazilian Jiu-Jitsu și MMA
            într-un mediu sigur, structurat și orientat spre performanță.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/abonamente" className="rounded-md bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground">
              Începe antrenamentul
            </Link>
            <Link to="/program" className="rounded-md border border-border bg-background/70 px-8 py-4 text-sm font-bold uppercase tracking-wide backdrop-blur">
              Vezi programul
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "2", v: "discipline" },
              { k: `${data.coaches.length}`, v: "antrenori" },
              { k: "6–60", v: "ani, toate grupele" },
              { k: "12+", v: "clase săptămânal" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-4xl text-primary">{s.k}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Antrenori licențiați", d: "Centuri negre BJJ și antrenori MMA cu experiență competițională." },
            { icon: Users, t: "Grupe pentru copii", d: "Clase separate pe vârste, cu accent pe disciplină și siguranță." },
            { icon: CalendarDays, t: "Program flexibil", d: "Antrenamente dimineața și seara, de luni până sâmbătă." },
            { icon: Trophy, t: "Competiții", d: "Lot competițional, deplasări naționale și în Europa." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-border bg-card p-6">
              <b.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-xl">{b.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl">Abonamente populare</h2>
            <Link to="/abonamente" className="text-sm font-semibold text-primary hover:underline">
              Toate abonamentele →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {data.plans.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-background p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {DISCIPLINE_LABEL[p.discipline]} · {AGE_LABEL[p.age_group]}
                </span>
                <h3 className="mt-2 text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.sessions_per_week} antrenamente / săptămână</p>
                <p className="mt-5 font-display text-4xl text-primary">
                  {p.price_lei} <span className="text-base">lei/lună</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl">Echipa tehnică</h2>
          <Link to="/antrenori" className="text-sm font-semibold text-primary hover:underline">
            Vezi toți antrenorii →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.coaches.slice(0, 4).map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-6">
              <Medal className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-xl">{c.full_name}</h3>
              <p className="text-sm text-muted-foreground">{c.title}</p>
              {c.rank && <p className="mt-2 text-xs uppercase tracking-wider text-primary">{c.rank}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
