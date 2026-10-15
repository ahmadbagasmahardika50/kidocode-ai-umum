"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BlockType = "maju" | "belok" | "ambil";
type Block = { id: number; type: BlockType };
type Dir = 0 | 1 | 2 | 3; // 0 kanan, 1 bawah, 2 kiri, 3 atas
type Frame = { x: number; y: number; dir: Dir; msg?: string; won?: boolean };

const COLS = 4;
const ROWS = 3;
const START = { x: 0, y: 0 };
const BATTERY = { x: 3, y: 0 };
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

const LABEL: Record<BlockType, string> = {
  maju: "Maju 1 langkah",
  belok: "Belok kanan",
  ambil: "Ambil baterai",
};
const ACCENT: Record<BlockType, string> = {
  maju: "border-l-slate-900",
  belok: "border-l-teal-600",
  ambil: "border-l-amber-500",
};

// Simulasi murni: menghitung seluruh langkah robot dari urutan blok.
function simulate(blocks: Block[]): Frame[] {
  let x = START.x, y = START.y, dir: Dir = 0;
  const frames: Frame[] = [{ x, y, dir }];
  for (const b of blocks) {
    if (b.type === "belok") {
      dir = ((dir + 1) % 4) as Dir;
      frames.push({ x, y, dir });
    } else if (b.type === "maju") {
      const nx = x + DX[dir], ny = y + DY[dir];
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) {
        frames.push({ x, y, dir, msg: "Robot menabrak dinding. Coba atur ulang urutannya." });
        return frames;
      }
      x = nx; y = ny;
      frames.push({ x, y, dir });
    } else {
      const won = x === BATTERY.x && y === BATTERY.y;
      frames.push({
        x, y, dir, won,
        msg: won
          ? "Robot berhasil mengambil baterai."
          : "Baterai belum ditemukan. Coba susun ulang blok.",
      });
      return frames;
    }
  }
  frames.push({ x, y, dir, msg: "Program selesai, tetapi robot belum mengambil baterai." });
  return frames;
}

export default function Playground() {
  const idRef = useRef(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [view, setView] = useState<Frame[]>([{ ...START, dir: 0 }]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [msg, setMsg] = useState("");

  const current = view[step] ?? view[0];

  // Animasi langkah demi langkah
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!running) return;
    if (step < view.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 600);
      return () => clearTimeout(t);
    }
    const last = view[step];
    setRunning(false);
    setMsg(last.msg ?? "");
    if (last.won) {
      try {
        localStorage.setItem("kido-progress", JSON.stringify({ misi1: true }));
      } catch {
        // localStorage tidak tersedia: abaikan
      }
    }
  }, [running, step, view]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const addBlock = (type: BlockType) => {
    if (running) return;
    setBlocks((b) => [...b, { id: ++idRef.current, type }]);
  };
  const removeBlock = (id: number) => {
    if (running) return;
    setBlocks((b) => b.filter((x) => x.id !== id));
  };
  const run = () => {
    if (running || blocks.length === 0) return;
    setView(simulate(blocks));
    setStep(0);
    setMsg("");
    setRunning(true);
  };
  const reset = () => {
    if (running) return;
    setView([{ ...START, dir: 0 }]);
    setStep(0);
    setMsg("");
  };
  const clearAll = () => {
    if (running) return;
    setBlocks([]);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            Kembali
          </Link>
          <span className="h-5 w-px bg-slate-200" />
          <span className="font-bold">Misi 1: Cari baterai</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Kiri: cerita dan papan */}
        <section className="flex flex-col gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Robot kehabisan tenaga</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Baterai berada di pojok kanan atas. Susun blok agar robot sampai ke sana, lalu
              ambil baterainya.
            </p>
            <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
              Robot mulai menghadap ke kanan.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div
              className="mx-auto grid max-w-sm gap-2 rounded-md bg-slate-50 p-3"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const x = i % COLS, y = Math.floor(i / COLS);
                const isRobot = current.x === x && current.y === y;
                const isBattery = BATTERY.x === x && BATTERY.y === y;
                return (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-md border border-slate-200 bg-white"
                  >
                    {isRobot && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700">
                        <span
                          className="block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white transition-transform duration-500"
                          style={{ transform: `rotate(${current.dir * 90}deg)` }}
                        />
                      </div>
                    )}
                    {!isRobot && isBattery && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-800">
                        Baterai
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 min-h-6 text-center text-sm font-semibold text-slate-700">
              {running ? "Robot sedang bergerak..." : msg}
            </p>
          </div>
        </section>

        {/* Tengah: palet blok */}
        <section className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4 font-bold">Blok perintah</div>
          <div className="flex flex-col gap-3 p-4">
            {(Object.keys(LABEL) as BlockType[]).map((t) => (
              <button
                key={t}
                onClick={() => addBlock(t)}
                disabled={running}
                className={`w-full rounded-md border border-l-4 border-slate-200 bg-white px-4 py-3 text-left font-semibold transition-colors hover:bg-slate-50 disabled:opacity-50 ${ACCENT[t]}`}
              >
                {LABEL[t]}
              </button>
            ))}
          </div>
        </section>

        {/* Kanan: urutan */}
        <section className="flex flex-col rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <span className="font-bold">Urutan perintah</span>
            <button
              onClick={clearAll}
              disabled={running}
              className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              Hapus semua
            </button>
          </div>

          <div className="flex min-h-64 flex-1 flex-col gap-2 p-4">
            {blocks.length === 0 ? (
              <p className="mt-10 text-center text-sm text-slate-400">
                Belum ada blok. Pilih blok di sebelah kiri.
              </p>
            ) : (
              blocks.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => removeBlock(b.id)}
                  disabled={running}
                  title="Klik untuk menghapus"
                  className={`flex items-center justify-between rounded-md border border-l-4 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-slate-50 disabled:opacity-60 ${ACCENT[b.type]}`}
                >
                  <span>
                    {i + 1}. {LABEL[b.type]}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Hapus</span>
                </button>
              ))
            )}
          </div>

          <div className="flex gap-2 border-t border-slate-200 p-4">
            <button
              onClick={reset}
              disabled={running}
              className="rounded-md border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              Ulangi
            </button>
            <button
              onClick={run}
              disabled={running || blocks.length === 0}
              className="flex-1 rounded-md bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
            >
              {running ? "Berjalan..." : "Jalankan"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}