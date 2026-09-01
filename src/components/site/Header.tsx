import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Swords, LogOut, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CLUB } from "@/data/club";

const NAV = [
  { to: "/", label: "Acasă" },
  { to: "/program", label: "Program" },
  { to: "/antrenori", label: "Antrenori" },
  { to: "/abonamente", label: "Abonamente" },
  { to: "/competitii", label: "Competiții" },
  { to: "/galerie", label: "Galerie" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Swords className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-wide">{CLUB.name}</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {CLUB.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <>
              <Link
                to="/cont"
                className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold sm:inline-flex"
              >
                <UserRound className="h-4 w-4 text-primary" />
                Contul meu
              </Link>
              <button
                onClick={signOut}
                className="hidden rounded-md p-2 text-muted-foreground hover:text-foreground sm:block"
                aria-label="Deconectare"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="hidden rounded-md bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground sm:inline-flex"
            >
              Cont / Înscriere
            </Link>
          )}
          <button
            type="button"
            className="rounded-md p-2 lg:hidden"
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
                className="rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link to="/cont" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-muted">
                  Contul meu
                </Link>
                <button onClick={signOut} className="rounded-md px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground">
                  Deconectare
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-bold uppercase text-primary-foreground"
              >
                Cont / Înscriere
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
