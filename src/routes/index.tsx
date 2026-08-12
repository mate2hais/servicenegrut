import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Baby, Heart, Star, Cross, Church, Music, Gift, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Invitație de botez — Familia Dediu" },
      { name: "description", content: "Te invităm cu drag la botezul micuțului nostru. Confirmă participarea ta într-un mod jucăuș." },
      { property: "og:title", content: "Invitație de botez — Familia Dediu" },
      { property: "og:description", content: "Te invităm cu drag la botezul micuțului nostru. Confirmă participarea ta într-un mod jucăuș." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChristeningInvitation,
});

const PADDING = 24;
const FLEE_DISTANCE = 140;

function ChristeningInvitation() {
  const [confirmed, setConfirmed] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState({ left: 0, top: 0 });
  const [mounted, setMounted] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moveNoAway = (cursorX: number, cursorY: number) => {
    const area = areaRef.current;
    const btn = noBtnRef.current;
    if (!area || !btn) return;

    const areaRect = area.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const btnW = btnRect.width;
    const btnH = btnRect.height;

    const maxLeft = areaRect.width - btnW - PADDING;
    const maxTop = areaRect.height - btnH - PADDING;

    let attempts = 0;
    let newLeft = 0;
    let newTop = 0;

    // Try to find a spot far enough from the cursor and not too close to the "Da" button area.
    while (attempts < 40) {
      newLeft = PADDING + Math.random() * Math.max(0, maxLeft - PADDING);
      newTop = PADDING + Math.random() * Math.max(0, maxTop - PADDING);

      const centerX = areaRect.left + newLeft + btnW / 2;
      const centerY = areaRect.top + newTop + btnH / 2;
      const dist = Math.hypot(centerX - cursorX, centerY - cursorY);

      // Keep away from the static "Da" button, which sits near the bottom center.
      const daBtn = document.getElementById("da-button");
      let farFromDa = true;
      if (daBtn) {
        const daRect = daBtn.getBoundingClientRect();
        const daCenterX = daRect.left + daRect.width / 2;
        const daCenterY = daRect.top + daRect.height / 2;
        const distDa = Math.hypot(centerX - daCenterX, centerY - daCenterY);
        if (distDa < 140) farFromDa = false;
      }

      if (dist > FLEE_DISTANCE && farFromDa) break;
      attempts++;
    }

    setNoBtnStyle({ left: newLeft, top: newTop });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (dist < FLEE_DISTANCE) {
      moveNoAway(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    moveNoAway(touch.clientX, touch.clientY);
  };

  return (
    <div
      ref={areaRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 text-foreground"
    >
      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Sparkles className="absolute left-[10%] top-[12%] h-8 w-8 text-primary/40 animate-pulse" />
        <Star className="absolute right-[15%] top-[18%] h-6 w-6 text-secondary/60" />
        <Heart className="absolute left-[8%] bottom-[20%] h-7 w-7 text-accent/50" />
        <Music className="absolute right-[10%] bottom-[15%] h-6 w-6 text-primary/30" />
        <Gift className="absolute left-[20%] top-[60%] h-6 w-6 text-secondary/40" />
        <Cross className="absolute right-[22%] top-[55%] h-5 w-5 text-primary/30" />
        <Church className="absolute left-[5%] top-[40%] h-8 w-8 text-primary/20" />
        <Baby className="absolute right-[8%] top-[38%] h-8 w-8 text-accent/40" />

        {/* Soft circles */}
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div
        className={`relative z-10 w-full max-w-2xl rounded-[2rem] border border-border bg-card p-8 shadow-2xl shadow-primary/10 transition-all duration-700 sm:p-12 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Baby className="h-8 w-8" />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            O veste minunată
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Ești invitat la botez!
          </h1>

          <div className="mt-8 space-y-4 text-lg text-card-foreground">
            <p>
              Cu inimi pline de bucurie, te invităm să fii alături de noi la botezul micuțului
              nostru, care își va primi numele sfânt alături de cei dragi.
            </p>
            <p className="font-medium text-foreground">
              Părinți: Dediu Liviu și Dediu Giulia
            </p>
            <p className="text-base text-muted-foreground">
              Fie ca această zi specială să fie binecuvântată, plină de zâmbete, emoție și
              amintiri frumoase alături de familie și prieteni.
            </p>
          </div>

          {!confirmed ? (
            <div className="mt-10 w-full">
              <p className="mb-6 text-xl font-semibold text-foreground">
                Vei veni să sărbătorim împreună?
              </p>

              <div className="relative mx-auto flex min-h-[14rem] w-full max-w-md flex-col items-center justify-center gap-4">
                <button
                  id="da-button"
                  onClick={() => setConfirmed(true)}
                  className="z-20 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-3.5 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                >
                  <Heart className="h-5 w-5" />
                  Da, cu drag!
                </button>

                <button
                  ref={noBtnRef}
                  onMouseEnter={(e) => moveNoAway(e.clientX, e.clientY)}
                  onTouchStart={handleTouchStart}
                  style={{
                    position: "absolute",
                    left: noBtnStyle.left,
                    top: noBtnStyle.top,
                    transition: "left 0.25s ease-out, top 0.25s ease-out",
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-8 py-3 text-base font-medium text-muted-foreground shadow-sm"
                >
                  Nu pot
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 w-full max-w-md rounded-2xl bg-primary/10 p-6 text-center">
              <div className="flex justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">Ne bucurăm mult!</p>
              <p className="mt-2 text-muted-foreground">
                Te așteptăm cu drag la botezul micuțului nostru. Vei primi în curând toate
                detaliile.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="relative z-10 mt-10 text-center text-sm text-muted-foreground">
        Cu drag, Familia Dediu
      </footer>
    </div>
  );
}
