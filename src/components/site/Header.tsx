import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import { SITE } from "@/data/site";

const NAV = [
  { to: "/", label: "Acasă" },
  { to: "/servicii", label: "Servicii" },
  { to: "/preturi", label: "Prețuri" },
  { to: "/echipa", label: "Echipă" },
  { to: "/galerie", label: "Galerie" },
  { to: "/informatii", label: "Informații ITP" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">{SITE.name}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Stație ITP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-muted text-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground sm:flex"
          >
            <Phone className="h-4 w-4 text-primary" />
            {SITE.phone}
          </a>
          <Link
            to="/programare"
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Programare
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label="Meniu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/programare"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-2.5 text-center text-sm font-semibold text-accent-foreground"
            >
              Fă o programare
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
