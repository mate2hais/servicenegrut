import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Swords } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { CLUB } from "@/data/club";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Cont membru — Ascendo Club Galați" },
      { name: "description", content: "Autentifică-te sau creează-ți cont de membru Ascendo Club pentru a-ți urmări abonamentul de BJJ sau MMA." },
      { property: "og:title", content: "Cont membru — Ascendo Club" },
      { property: "og:description", content: "Autentificare și înregistrare pentru membrii clubului." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/cont" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/cont`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Cont creat! Verifică emailul pentru confirmare.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/cont" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "A apărut o eroare.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    } catch {
      toast.error("Autentificarea cu Google a eșuat.");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Swords className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-center text-4xl">
        {mode === "signin" ? "Autentificare" : "Creează cont"}
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Contul îți arată abonamentul activ și zilele rămase la {CLUB.name}.
      </p>

      <button
        onClick={google}
        className="mt-8 rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold"
      >
        Continuă cu Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> sau <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
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
        )}
        <label className="block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-sm font-semibold">
          Parolă
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
          />
        </label>
        <button
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Se procesează..." : mode === "signin" ? "Intră în cont" : "Creează cont"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        {mode === "signin" ? "Nu ai cont? Înregistrează-te" : "Ai deja cont? Autentifică-te"}
      </button>
    </div>
  );
}
