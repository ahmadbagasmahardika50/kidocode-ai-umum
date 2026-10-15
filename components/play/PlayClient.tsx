"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COLS,
  ROWS,
  MISSIONS,
  simulate,
  type BlockType,
  type Frame,
  type Mission,
} from "@/lib/missions";
import { getUser, logout, progressKey } from "@/lib/auth";
import Confetti from "@/components/play/Confetti";

type Block = { id: number; type: BlockType };

const LABEL: Record<BlockType, string> = {
  maju: "Maju 1 langkah",
  belok: "Belok kanan",
  ambil: "Ambil baterai",
  ulang: "Ulang maju 3x",
};
const ACCENT: Record<BlockType, string> = {
  maju: "border-l-slate-900",
  belok: "border-l-teal-600",
  ambil: "border-l-amber-500",
  ulang: "border-l-violet-500",
};

export default function PlayClient({ mission }: { mission: Mission }) {
  const router = useRouter();
  const idRef = useRef(0);
  const startFrame: Frame = { x: mission.start.x, y: mission.start.y, dir: 0 };

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [view, setView] = useState<Frame[]>([startFrame]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const current = view[step] ?? view[0];
  const nextMission = MISSIONS.find((m) => m.id === mission.id + 1);

  // Ambil nama user yang sedang masuk
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setUser(getUser());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Animasi langkah demi langkah
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!running) return;
    if (step < view.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 550);
      return () => clearTimeout(t);
    }
    const last = view[step];
    setRunning(false);
    setMsg(last.msg ?? "");
    if (last.won) {
      setDone(true);
      try {
        const key = progressKey();
        const saved = JSON.parse(localStorage.getItem(key) ?? "{}");
        localStorage.setItem(key, JSON.stringify({ ...saved, [`misi${mission.id}`]: true }));
      } catch {
        // localStorage tidak tersedia: abaikan
      }
    }
  }, [running, step, view, mission.id]);
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
    setView(simulate(blocks.map((b) => b.type), mission));
    setStep(0);
    setMsg("");
    setDone(false);
    setRunning(true);
  };
  const reset = () => {
    if (running) return;
    setView([startFrame]);
    setStep(0);
    setMsg("");
  };
  const clearAll = () => {
    if (running) return;
    setBlocks([]);
    reset();
  };
  const keluar = () => {
    logout();
    router.push("/masuk");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <Link href="/playground" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              Semua misi
            </Link>
            <span className="h-5 w-px bg-slate-200" />
            <span className="font-bold">
              Misi {mission.id}: {mission.title}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            {user && <span className="hidden text-slate-600 sm:inline">Halo, {user}</span>}
            <button onClick={keluar} className="text-red-600 hover:text-red-800">
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {done && <Confetti />}

        <section className="flex flex-col gap-6">
          <div className="anim-fade-up rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Robot kehabisan tenaga</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{mission.story}</p>
            <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">{mission.hint}</p>
          </div>

          <div className="anim-fade-up rounded-lg border border-slate-200 bg-white p-6" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto w-full max-w-sm" style={{ aspectRatio: `${COLS} / ${ROWS}` }}>
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: ROWS * COLS }).map((_, i) => {
                  const x = i % COLS;
                  const y = Math.floor(i / COLS);
                  const isBattery = mission.battery.x === x && mission.battery.y === y;
                  return (
                    <div key={i} className="flex items-end border border-slate-200 bg-white p-1">
                      {isBattery && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-800">
                          Baterai
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                className="absolute p-2 transition-all duration-500 ease-in-out"
                style={{
                  width: `${100 / COLS}%`,
                  height: `${100 / ROWS}%`,
                  left: `${(current.x * 100) / COLS}%`,
                  top: `${(current.y * 100) / ROWS}%`,
                }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-md bg-teal-700 shadow-md">
                  <span
                    className="block h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white transition-transform duration-500"
                    style={{ transform: `rotate(${current.dir * 90}deg)` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 min-h-6 text-center text-sm font-semibold text-slate-700">
              {running ? (
                <p>Robot sedang bergerak...</p>
              ) : (
                msg && (
                  <p key={msg} className="anim-fade-up">
                    {msg}
                  </p>
                )
              )}
            </div>
          </div>

          {done && (
            <div className="anim-pop rounded-lg border border-teal-200 bg-teal-50 p-6">
              <h3 className="font-bold text-teal-800">Misi selesai</h3>
              <p className="mt-1 text-sm text-slate-700">{mission.praise}</p>
              <p className="mt-1 text-xs text-slate-500">Progres kamu sudah tersimpan.</p>
              <Link
                href={nextMission ? `/playground/${nextMission.id}` : "/dashboard"}
                className="mt-4 inline-block rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                {nextMission ? "Lanjut ke misi berikutnya" : "Lihat progres"}
              </Link>
            </div>
          )}
        </section>

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
                  style={{ animationDelay: `${Math.min(i, 5) * 40}ms` }}
                  className={`anim-fade-up flex items-center justify-between rounded-md border border-l-4 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-slate-50 disabled:opacity-60 ${ACCENT[b.type]}`}
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