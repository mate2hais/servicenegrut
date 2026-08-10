import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Bike, MapPin, History, LogOut, User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Te-ai deconectat");
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/app/map" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bike className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">BikeGo</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink to="/app/map" icon={<MapPin className="h-4 w-4" />} label="Hartă" />
            <NavLink to="/app/history" icon={<History className="h-4 w-4" />} label="Istoric" />
            <button
              onClick={handleLogout}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Deconectare"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary/10 text-primary" }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
