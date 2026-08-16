import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">{SITE.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Stație de inspecție tehnică periodică autorizată RAR, autorizație nr. {SITE.authNumber}.
            Inspecții rapide, corecte și transparente pentru toate categoriile de vehicule.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigare</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/servicii" className="hover:text-foreground">Servicii</Link></li>
            <li><Link to="/preturi" className="hover:text-foreground">Prețuri</Link></li>
            <li><Link to="/echipa" className="hover:text-foreground">Echipă și acreditări</Link></li>
            <li><Link to="/galerie" className="hover:text-foreground">Galerie foto</Link></li>
            <li><Link to="/informatii" className="hover:text-foreground">Informații ITP</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" />{SITE.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" />{SITE.email}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Program</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SITE.schedule.map((s) => (
              <li key={s.day} className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-foreground">{s.day}</span>
                  {s.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name} · Toate drepturile rezervate
      </div>
    </footer>
  );
}
