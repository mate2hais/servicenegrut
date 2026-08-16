import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle, Award, CalendarCheck, CheckCircle2, Clock, Gauge, MapPin, Quote, ShieldCheck, Star,
} from "lucide-react";
import heroImg from "@/assets/hero-itp.jpg";
import liftImg from "@/assets/gallery-lift.jpg";
import emissionsImg from "@/assets/gallery-emissions.jpg";
import headlightImg from "@/assets/gallery-headlight.jpg";
import { ENGINEERS, PRICES, SITE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoNeg — Stație ITP autorizată RAR în Galați" },
      { name: "description", content: "Inspecție tehnică periodică rapidă la AutoNeg Galați: programare online, prețuri transparente, ingineri atestați RAR și echipamente moderne." },
      { property: "og:title", content: "AutoNeg — Stație ITP autorizată RAR în Galați" },
      { property: "og:description", content: "Programează online ITP-ul în 30 de minute. Prețuri transparente și inspectori atestați RAR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  { n: "01", title: "Programează-te", text: "Alegi data și intervalul orar direct de pe site, în mai puțin de un minut." },
  { n: "02", title: "Vii cu actele", text: "Talon, CIV, RCA și buletin. Preluăm mașina la ora stabilită, fără cozi." },
  { n: "03", title: "Inspecția pe stand", text: "Frâne, suspensii, emisii, iluminare, caroserie — verificate cu aparatură omologată." },
  { n: "04", title: "Primești rezultatul", text: "Îți explicăm fiecare punct din raport și îți eliberăm certificatul pe loc." },
];

const REVIEWS = [
  { name: "Mihai R.", text: "M-am programat seara, dimineața la 9 eram deja pe stand. În 25 de minute aveam ITP-ul. Recomand!" },
  { name: "Alina D.", text: "Domnul inginer mi-a explicat clar de ce nu trecea mașina și ce trebuie schimbat. Zero bătaie de cap." },
  { name: "George P.", text: "Prețuri corecte, afișate pe site, fără surprize la plată. Stație curată și oameni serioși." },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Autoturism pe linia de inspecție tehnică din stația AutoNeg"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Autorizație RAR {SITE.authNumber}
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            ITP-ul mașinii tale, rezolvat în 30 de minute
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {SITE.name} este stația de inspecție tehnică periodică din Galați unde primești
            programare fermă, prețuri afișate și explicații pe înțelesul tău.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/programare" className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]">
              <CalendarCheck className="h-4 w-4" />
              Programează-te online
            </Link>
            <Link to="/preturi" className="rounded-lg border border-border bg-background/80 px-7 py-3.5 text-sm font-semibold backdrop-blur">
              Vezi prețurile
            </Link>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "30 min", v: "durata medie" },
              { k: "14 ani", v: "experiență" },
              { k: "4", v: "ingineri atestați" },
              { k: "100%", v: "prețuri afișate" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-extrabold text-primary">{s.k}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, t: "Programare fermă", d: "Îți respectăm ora rezervată, fără așteptări inutile." },
            { icon: Gauge, t: "Aparatură modernă", d: "Stand frâne, analizor noxe și reglofar verificate metrologic." },
            { icon: Award, t: "Ingineri atestați", d: "Inspectori tehnici cu atestat RAR valabil și experiență reală." },
            { icon: MapPin, t: "Central în Galați", d: `${SITE.address}, cu parcare la intrarea în hală.` },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6">
              <b.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-bold">{b.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">Cum decurge o inspecție</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-background p-6">
                <span className="text-3xl font-extrabold text-primary/25">{s.n}</span>
                <h3 className="mt-2 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE PREVIEW */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Prețuri populare</h2>
          <Link to="/preturi" className="text-sm font-semibold text-primary hover:underline">
            Lista completă →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {PRICES.slice(0, 3).map((p) => (
            <div key={p.detail} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold">{p.category}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
              <p className="mt-5 text-3xl font-extrabold text-primary">{p.price} <span className="text-base font-semibold">lei</span></p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Valabilitate {p.validity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Echipa AutoNeg</h2>
            <Link to="/echipa" className="text-sm font-semibold text-primary hover:underline">
              Vezi echipa și acreditările →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGINEERS.map((e) => (
              <div key={e.name} className="rounded-2xl border border-border bg-background p-6 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {e.initials}
                </span>
                <h3 className="mt-4 font-bold">{e.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{e.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Din stația noastră</h2>
          <Link to="/galerie" className="text-sm font-semibold text-primary hover:underline">
            Toată galeria →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { src: liftImg, alt: "Inginer verificând suspensia unei mașini pe elevator" },
            { src: emissionsImg, alt: "Sondă de analiză a noxelor în eșapamentul unei mașini" },
            { src: headlightImg, alt: "Aparat de reglaj faruri în fața farului unei mașini" },
          ].map((img) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={1200}
              height={800}
              className="h-56 w-full rounded-2xl border border-border object-cover"
            />
          ))}
        </div>
      </section>

      {/* INFO CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-destructive/25 bg-destructive/5 p-8 sm:p-10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
            Ce riști dacă nu faci ITP la timp?
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Amendă, reținerea certificatului de înmatriculare, probleme la despăgubirea RCA/CASCO și,
            cel mai grav, un risc real de siguranță. Am pregătit un ghid complet cu sancțiunile și cu
            tot ce trebuie verificat la mașină înainte de inspecție.
          </p>
          <Link
            to="/informatii"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background"
          >
            <CheckCircle2 className="h-4 w-4" />
            Citește ghidul complet
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-3xl font-extrabold tracking-tight">Ce spun clienții</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
              <footer className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold">{r.name}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
