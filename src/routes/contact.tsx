import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact stație ITP AutoNeg — Galați" },
      { name: "description", content: "Adresă, telefon, email și program de lucru pentru stația ITP AutoNeg din Galați. Sună-ne sau programează-te online." },
      { property: "og:title", content: "Contact stație ITP AutoNeg — Galați" },
      { property: "og:description", content: "Ne găsești în Galați, Str. Traian nr. 128. Program luni–sâmbătă." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Unde ne găsești</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted"
          >
            <Phone className="h-5 w-5 text-primary" />
            <span>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground">Telefon</span>
              <span className="font-semibold">{SITE.phone}</span>
            </span>
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted"
          >
            <Mail className="h-5 w-5 text-primary" />
            <span>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <span className="font-semibold">{SITE.email}</span>
            </span>
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-primary" />
            <span>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground">Adresă</span>
              <span className="font-semibold">{SITE.address}</span>
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> Program
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {SITE.schedule.map((s) => (
                <li key={s.day} className="flex justify-between">
                  <span className="text-muted-foreground">{s.day}</span>
                  <span className="font-medium">{s.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/programare"
            className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Programare online
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Hartă locație AutoNeg Galați"
            src="https://www.google.com/maps?q=Strada%20Traian%20128%2C%20Gala%C8%9Bi&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
