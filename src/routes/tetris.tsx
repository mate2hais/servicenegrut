import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  RotateCw,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronsDown,
} from "lucide-react";

export const Route = createFileRoute("/tetris")({
  head: () => ({
    meta: [
      { title: "Tetris Clasic — Joc cu scor, nivele și bonusuri" },
      {
        name: "description",
        content:
          "Joc clasic de Tetris cu piese colorate, scor, nivele, bonusuri la fiecare 4 linii, sunete și rotire în ambele sensuri.",
      },
      { property: "og:title", content: "Tetris Clasic — Joc cu scor, nivele și bonusuri" },
      {
        property: "og:description",
        content:
          "Joacă Tetris clasic: piese colorate, scor, nivele, bonus la fiecare 4 linii și efecte sonore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TetrisPage,
});

const COLS = 10;
const ROWS = 20;

type Cell = number; // 0 = gol, 1..7 = piesă

const SHAPES: number[][][] = [
  [], // index 0 nefolosit
  // I
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // J
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  // L
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  // O
  [
    [4, 4],
    [4, 4],
  ],
  // S
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  // T
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  // Z
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

const COLORS: Record<number, string> = {
  1: "#22d3ee",
  2: "#3b82f6",
  3: "#f97316",
  4: "#facc15",
  5: "#22c55e",
  6: "#a855f7",
  7: "#ef4444",
};

type Piece = { shape: number[][]; x: number; y: number; type: number };

const emptyBoard = (): Cell[][] =>
  Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));

const rotate = (shape: number[][], dir: 1 | -1): number[][] => {
  const n = shape.length;
  const out = Array.from({ length: n }, () => Array<number>(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (dir === 1) out[x][n - 1 - y] = shape[y][x];
      else out[n - 1 - x][y] = shape[y][x];
    }
  }
  return out;
};

const randomType = () => 1 + Math.floor(Math.random() * 7);

const spawnPiece = (type: number): Piece => {
  const shape = SHAPES[type].map((r) => [...r]);
  return { shape, type, x: Math.floor((COLS - shape.length) / 2), y: -1 };
};

const collides = (board: Cell[][], piece: Piece, dx = 0, dy = 0, shape?: number[][]) => {
  const s = shape ?? piece.shape;
  for (let y = 0; y < s.length; y++) {
    for (let x = 0; x < s.length; x++) {
      if (!s[y][x]) continue;
      const nx = piece.x + x + dx;
      const ny = piece.y + y + dy;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
};

/* ---------- sunet ---------- */
function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  const ensure = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (freq: number, start: number, dur: number, gain = 0.14, type: OscillatorType = "sine") => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    },
    []
  );

  const playDrop = useCallback(() => {
    if (mutedRef.current) return;
    if (!ensure()) return;
    tone(330, 0, 0.12, 0.12, "triangle");
    tone(220, 0.03, 0.14, 0.08, "sine");
  }, [ensure, tone]);

  const playClear = useCallback(() => {
    if (mutedRef.current) return;
    if (!ensure()) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.07, 0.22, 0.13, "triangle"));
  }, [ensure, tone]);

  const playBonus = useCallback(() => {
    if (mutedRef.current) return;
    if (!ensure()) return;
    [659.25, 880, 1174.66].forEach((f, i) => tone(f, i * 0.09, 0.3, 0.15, "square"));
  }, [ensure, tone]);

  const playGameOver = useCallback(() => {
    if (mutedRef.current) return;
    if (!ensure()) return;
    [440, 349.23, 261.63, 174.61].forEach((f, i) => tone(f, i * 0.15, 0.35, 0.14, "sawtooth"));
  }, [ensure, tone]);

  return { muted, setMuted, ensure, playDrop, playClear, playBonus, playGameOver };
}

function TetrisPage() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [piece, setPiece] = useState<Piece | null>(null);
  const [nextType, setNextType] = useState<number>(randomType);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [bonuses, setBonuses] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [flash, setFlash] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const bonusCounter = useRef(0);
  const sound = useSound();

  const boardRef = useRef(board);
  boardRef.current = board;
  const pieceRef = useRef(piece);
  pieceRef.current = piece;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1400);
  };

  const reset = useCallback(() => {
    bonusCounter.current = 0;
    setBoard(emptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setBonuses(0);
    setGameOver(false);
    setFlash([]);
    const t = randomType();
    setPiece(spawnPiece(t));
    setNextType(randomType());
    setRunning(true);
    sound.ensure();
  }, [sound]);

  const clearLines = useCallback(
    (b: Cell[][]) => {
      const full: number[] = [];
      for (let y = 0; y < ROWS; y++) if (b[y].every((c) => c !== 0)) full.push(y);

      let bonusRow: number | null = null;
      if (full.length > 0) {
        bonusCounter.current += full.length;
        if (bonusCounter.current >= 4) {
          bonusCounter.current -= 4;
          // rândul cu cele mai puține piese (dar nu gol și nu deja plin)
          let best = -1;
          let bestCount = Infinity;
          for (let y = 0; y < ROWS; y++) {
            if (full.includes(y)) continue;
            const count = b[y].filter((c) => c !== 0).length;
            if (count > 0 && count < bestCount) {
              bestCount = count;
              best = y;
            }
          }
          if (best >= 0) bonusRow = best;
        }
      }

      const toRemove = bonusRow !== null ? [...full, bonusRow] : full;
      if (toRemove.length === 0) return { board: b, cleared: 0, bonus: false };

      const kept = b.filter((_, y) => !toRemove.includes(y));
      while (kept.length < ROWS) kept.unshift(Array<Cell>(COLS).fill(0));
      return { board: kept, cleared: full.length, bonus: bonusRow !== null, rows: toRemove };
    },
    []
  );

  const lockPiece = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    const b = boardRef.current.map((r) => [...r]);
    let dead = false;
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape.length; x++) {
        if (!p.shape[y][x]) continue;
        const ny = p.y + y;
        const nx = p.x + x;
        if (ny < 0) {
          dead = true;
          continue;
        }
        b[ny][nx] = p.type;
      }
    }
    sound.playDrop();

    const res = clearLines(b);
    if (res.cleared > 0) {
      setFlash(res.rows ?? []);
      setTimeout(() => setFlash([]), 220);
      if (res.bonus) {
        sound.playBonus();
        setBonuses((v) => v + 1);
        showToast("BONUS! Un rând extra distrus 🎉");
      } else {
        sound.playClear();
      }
      const base = [0, 100, 300, 500, 800][res.cleared] ?? 800;
      const gained = base * level + (res.bonus ? 250 * level : 0);
      setScore((s) => s + gained);
      setLines((l) => {
        const nl = l + res.cleared + (res.bonus ? 1 : 0);
        const nlevel = Math.floor(nl / 10) + 1;
        setLevel((cur) => (nlevel > cur ? nlevel : cur));
        return nl;
      });
    } else {
      setScore((s) => s + 10);
    }

    setBoard(res.board);

    if (dead) {
      setRunning(false);
      setGameOver(true);
      setPiece(null);
      sound.playGameOver();
      return;
    }

    const np = spawnPiece(nextType);
    if (collides(res.board, np)) {
      setBoard(res.board);
      setPiece(null);
      setRunning(false);
      setGameOver(true);
      sound.playGameOver();
      return;
    }
    setPiece(np);
    setNextType(randomType());
  }, [clearLines, level, nextType, sound]);

  const move = useCallback((dx: number) => {
    const p = pieceRef.current;
    if (!p) return;
    if (!collides(boardRef.current, p, dx, 0)) setPiece({ ...p, x: p.x + dx });
  }, []);

  const softDrop = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    if (!collides(boardRef.current, p, 0, 1)) {
      setPiece({ ...p, y: p.y + 1 });
      setScore((s) => s + 1);
    } else {
      lockPiece();
    }
  }, [lockPiece]);

  const hardDrop = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    let d = 0;
    while (!collides(boardRef.current, p, 0, d + 1)) d++;
    pieceRef.current = { ...p, y: p.y + d };
    setPiece(pieceRef.current);
    setScore((s) => s + d * 2);
    lockPiece();
  }, [lockPiece]);

  const doRotate = useCallback((dir: 1 | -1) => {
    const p = pieceRef.current;
    if (!p) return;
    const shape = rotate(p.shape, dir);
    const kicks = [0, -1, 1, -2, 2];
    for (const k of kicks) {
      if (!collides(boardRef.current, p, k, 0, shape)) {
        setPiece({ ...p, shape, x: p.x + k });
        return;
      }
    }
  }, []);

  // buclă de cădere
  useEffect(() => {
    if (!running) return;
    const speed = Math.max(90, 800 - (level - 1) * 70);
    const id = setInterval(() => {
      const p = pieceRef.current;
      if (!p) return;
      if (!collides(boardRef.current, p, 0, 1)) {
        setPiece({ ...p, y: p.y + 1 });
      } else {
        lockPiece();
      }
    }, speed);
    return () => clearInterval(id);
  }, [running, level, lockPiece]);

  // tastatură
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!running) {
        if (e.key === "Enter") reset();
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          move(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          move(1);
          break;
        case "ArrowDown":
          e.preventDefault();
          softDrop();
          break;
        case "ArrowUp":
        case "x":
        case "X":
          e.preventDefault();
          doRotate(1);
          break;
        case "z":
        case "Z":
          e.preventDefault();
          doRotate(-1);
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
        case "p":
        case "P":
          setRunning((r) => !r);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, move, softDrop, doRotate, hardDrop, reset]);

  // matricea afișată
  const view = board.map((r) => [...r]);
  if (piece) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape.length; x++) {
        if (!piece.shape[y][x]) continue;
        const ny = piece.y + y;
        const nx = piece.x + x;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) view[ny][nx] = piece.type;
      }
    }
  }

  const nextShape = SHAPES[nextType];

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background px-4 py-6 text-foreground">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Tetris</h1>
        <p className="text-sm text-muted-foreground">
          Piese colorate, scor, nivele și bonus la fiecare 4 linii
        </p>
      </header>

      <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:justify-center">
        {/* Tablă */}
        <div className="relative mx-auto">
          <div
            className="grid overflow-hidden rounded-xl border border-border bg-muted/40 p-1 shadow-xl"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              width: "min(88vw, 300px)",
              aspectRatio: `${COLS} / ${ROWS}`,
            }}
          >
            {view.flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className="rounded-[2px]"
                  style={{
                    background: cell ? COLORS[cell] : "rgba(120,120,120,0.10)",
                    boxShadow: cell ? "inset 0 0 0 1px rgba(255,255,255,0.35)" : undefined,
                    opacity: flash.includes(y) ? 0.3 : 1,
                    transition: "opacity 120ms linear",
                    margin: 1,
                  }}
                />
              ))
            )}
          </div>

          {(!running || gameOver) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/80 backdrop-blur-sm">
              <p className="text-xl font-semibold">
                {gameOver ? "Game Over" : score > 0 ? "Pauză" : "Gata de joc?"}
              </p>
              {gameOver && <p className="text-sm text-muted-foreground">Scor final: {score}</p>}
              <button
                onClick={() => (gameOver || score === 0 ? reset() : (sound.ensure(), setRunning(true)))}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Play className="h-4 w-4" />
                {gameOver ? "Joc nou" : score > 0 ? "Continuă" : "Start"}
              </button>
            </div>
          )}

          {toast && (
            <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg">
              {toast}
            </div>
          )}
        </div>

        {/* Panou */}
        <aside className="mx-auto flex w-full max-w-[300px] flex-col gap-3 sm:w-44">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            <Stat label="Scor" value={score} />
            <Stat label="Linii" value={lines} />
            <Stat label="Nivel" value={level} />
            <Stat label="Bonusuri" value={bonuses} />
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Urmează</p>
            <div
              className="grid gap-[2px]"
              style={{ gridTemplateColumns: `repeat(${nextShape.length}, 1fr)` }}
            >
              {nextShape.flatMap((row, y) =>
                row.map((c, x) => (
                  <div
                    key={`n-${x}-${y}`}
                    className="aspect-square rounded-[2px]"
                    style={{
                      background: c ? COLORS[c] : "transparent",
                      boxShadow: c ? "inset 0 0 0 1px rgba(255,255,255,0.35)" : undefined,
                    }}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => (running ? setRunning(false) : (sound.ensure(), setRunning(true)))}
              disabled={gameOver || !piece}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium disabled:opacity-40"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Pauză" : "Start"}
            </button>
            <button
              onClick={() => sound.setMuted((m) => !m)}
              className="rounded-lg border border-border bg-card px-3 py-2"
              aria-label={sound.muted ? "Activează sunetul" : "Oprește sunetul"}
            >
              {sound.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <p className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
            ← → mută · ↓ coboară · ↑/X rotește dreapta · Z rotește stânga · Space cădere rapidă · P
            pauză
          </p>
        </aside>
      </div>

      {/* Comenzi tactile */}
      <div className="mt-5 grid w-full max-w-sm grid-cols-4 gap-2">
        <Ctrl onClick={() => move(-1)} label="Stânga">
          <ArrowLeft className="h-5 w-5" />
        </Ctrl>
        <Ctrl onClick={() => doRotate(-1)} label="Rotește stânga">
          <RotateCcw className="h-5 w-5" />
        </Ctrl>
        <Ctrl onClick={() => doRotate(1)} label="Rotește dreapta">
          <RotateCw className="h-5 w-5" />
        </Ctrl>
        <Ctrl onClick={() => move(1)} label="Dreapta">
          <ArrowRight className="h-5 w-5" />
        </Ctrl>
        <Ctrl onClick={softDrop} label="Coboară" className="col-span-2">
          <ArrowDown className="h-5 w-5" />
        </Ctrl>
        <Ctrl onClick={hardDrop} label="Cădere rapidă" className="col-span-2">
          <ChevronsDown className="h-5 w-5" />
        </Ctrl>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-xl font-bold tabular-nums">{value}</p>
    </div>
  );
}

function Ctrl({
  onClick,
  label,
  children,
  className = "",
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-xl border border-border bg-card py-3 text-foreground shadow-sm active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
