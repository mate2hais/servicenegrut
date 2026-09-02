import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Swords } from "lucide-react";
import { CLUB } from "@/data/club";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Swords className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl tracking-wide">{CLUB.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Academie de Brazilian Jiu-Jitsu și MMA în {CLUB.city}. Grupe de copii și adulți,
            antrenori licențiați, competiții și seminarii pe tot parcursul anului.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Navigare</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/program" className="hover:text-foreground">Program antrenamente</Link></li>
            <li><Link to="/antrenori" className="hover:text-foreground">Antrenori</Link></li>
            <li><Link to="/abonamente" className="hover:text-foreground">Abonamente</Link></li>
            <li><Link to="/competitii" className="hover:text-foreground">Competiții</Link></li>
            <li><Link to="/galerie" className="hover:text-foreground">Galerie</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{CLUB.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" />{CLUB.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" />{CLUB.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {CLUB.name} · Toate drepturile rezervate
      </div>
    </footer>
  );
}
