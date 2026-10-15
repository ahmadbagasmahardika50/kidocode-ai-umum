"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [misi1, setMisi1] = useState(false);

  // Baca progres yang disimpan oleh playground
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kido-progress") ?? "{}");
      setMisi1(Boolean(saved.misi1));
    } catch {
      setMisi1(false);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const done = misi1 ? 1 : 0;
  const total = 3;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="min-h-screen pb-20">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-sky-700">🧩 KidoCode</Link>
          <span className="text-sm font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
            ⭐ {done}/{total} misi selesai
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <div className="text-6xl text-center mb-3">🧒</div>
          <h2 className="text-xl font-bold text-center">Programmer Cilik</h2>
          <div className="w-full bg-slate-100 rounded-full h-4 mt-6 overflow-hidden">
            <div
              className="bg-emerald-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 font-semibold mt-2">{percent}% dari Dunia 1</p>
        </aside>

        <section className="lg:col-span-2 flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold">Peta Petualangan 🗺️</h1>

          <div
            className={`bg-white p-6 rounded-3xl border-2 shadow-sm ${
              misi1 ? "border-emerald-200" : "border-amber-300"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">Misi 1: Cari Baterai</h3>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  misi1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {misi1 ? "SELESAI ✓" : "AKTIF"}
              </span>
            </div>
            <p className="text-slate-600 font-medium mb-4">Susun blok agar Robot Kucing sampai ke baterai.</p>
            <Link
              href="/playground"
              className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] hover:translate-y-0.5 active:translate-y-1 transition-all"
            >
              {misi1 ? "Main Lagi" : "Mainkan Misi"}
            </Link>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 opacity-70">
            <h3 className="text-xl font-bold text-slate-500">Misi 2: Perulangan 🔄</h3>
            <p className="text-slate-400 font-medium mt-1">Segera hadir.</p>
          </div>
        </section>
      </main>
    </div>
  );
}