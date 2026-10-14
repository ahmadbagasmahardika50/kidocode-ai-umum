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
  maju: "⬆️ Maju 1 Langkah",
  belok: "↪️ Belok Kanan",
  ambil: "🔋 Ambil Baterai",
};
const COLOR: Record<BlockType, string> = {
  maju: "bg-blue-500 shadow-[0_4px_0_rgb(29,78,216)]",
  belok: "bg-emerald-500 shadow-[0_4px_0_rgb(4,120,87)]",
  ambil: "bg-amber-500 shadow-[0_4px_0_rgb(180,83,9)]",
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
        frames.push({ x, y, dir, msg: "Aduh, robot menabrak dinding! Coba atur ulang urutannya. 💥" });
        return frames;
      }
      x = nx; y = ny;
      frames.push({ x, y, dir });
    } else {
      const won = x === BATTERY.x && y === BATTERY.y;
      frames.push({
        x, y, dir, won,
        msg: won ? "🎉 Yeay! Robot Kucing dapat baterai!" : "Baterainya belum ketemu. Coba lagi ya! 🔍",
      });
      return frames;
    }
  }
  frames.push({ x, y, dir, msg: "Program selesai, tapi robot belum mengambil baterai." });
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white h-16 border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40">
        <Link href="/" className="text-slate-400 hover:text-sky-500 font-bold text-xl">←</Link>
        <span className="font-bold text-slate-700">Misi 1: Cari Baterai Robot Kucing</span>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Kiri: cerita & simulator */}
        <section className="flex flex-col gap-4">
          <div className="bg-amber-50 rounded-3xl border-4 border-amber-200 p-6">
            <h2 className="font-extrabold text-lg text-slate-800">🐱 Robot Kucing Kehabisan Tenaga!</h2>
            <p className="text-sm text-slate-600 font-medium mt-2">
              Baterai 🔋 ada di pojok kanan atas. Susun blok agar robot sampai ke sana dan mengambilnya.
            </p>
            <p className="text-sm text-sky-800 font-semibold mt-3 bg-sky-50 p-3 rounded-xl">
              💡 Petunjuk: robot mulai menghadap kanan. Coba ingat, berapa kali robot harus maju?
            </p>
          </div>

          <div className="bg-slate-800 rounded-3xl p-6 border-4 border-slate-700">
            <div
              className="grid gap-2 mx-auto"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, maxWidth: 360 }}
            >
              {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const x = i % COLS, y = Math.floor(i / COLS);
                const isRobot = current.x === x && current.y === y;
                const isBattery = BATTERY.x === x && BATTERY.y === y;
                return (
                  <div key={i} className="aspect-square rounded-xl bg-slate-700 flex items-center justify-center text-3xl">
                    {isRobot ? (
                      <span className="transition-transform duration-500" style={{ transform: `rotate(${current.dir * 90}deg)` }}>🐱</span>
                    ) : isBattery ? "🔋" : ""}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-white font-bold mt-4 min-h-6">{running ? "⚙️ Robot sedang bergerak..." : msg}</p>
          </div>
        </section>

        {/* Tengah: palet blok */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700">📦 Kotak Blok</div>
          <div className="p-4 flex flex-col gap-3">
            {(Object.keys(LABEL) as BlockType[]).map((t) => (
              <button
                key={t}
                onClick={() => addBlock(t)}
                disabled={running}
                className={`w-full text-left px-4 py-3 text-white font-bold rounded-xl hover:translate-y-0.5 active:translate-y-1 transition-all disabled:opacity-50 ${COLOR[t]}`}
              >
                {LABEL[t]}
              </button>
            ))}
          </div>
        </section>

        {/* Kanan: kanvas urutan */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">📝 Urutan Perintahmu</span>
            <button onClick={() => { setBlocks([]); reset(); }} disabled={running} className="text-xs font-bold text-red-500 hover:text-red-700 disabled:opacity-50">
              Hapus Semua
            </button>
          </div>
          <div className="flex-1 p-4 min-h-64 flex flex-col gap-2">
            {blocks.length === 0 ? (
              <p className="text-slate-400 italic text-center mt-10">Belum ada blok. Klik blok di kotak sebelah kiri ya!</p>
            ) : (
              blocks.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => removeBlock(b.id)}
                  disabled={running}
                  title="Klik untuk menghapus"
                  className={`text-left text-white font-bold px-4 py-3 rounded-xl ${COLOR[b.type]} hover:opacity-80 disabled:opacity-60`}
                >
                  {i + 1}. {LABEL[b.type]} <span className="float-right text-xs opacity-80">hapus ✕</span>
                </button>
              ))
            )}
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <button onClick={reset} disabled={running} className="px-4 py-3 rounded-xl font-bold text-slate-600 border-2 border-slate-200 disabled:opacity-50">
              Ulangi
            </button>
            <button
              onClick={run}
              disabled={running || blocks.length === 0}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold rounded-xl shadow-[0_6px_0_rgb(4,120,87)] hover:translate-y-0.5 active:translate-y-1.5 transition-all"
            >
              {running ? "🔄 Berjalan..." : "▶️ JALANKAN"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}