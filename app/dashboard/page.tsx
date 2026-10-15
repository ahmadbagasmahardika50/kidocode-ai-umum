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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            KidoCode
          </Link>
          <span className="text-sm font-semibold text-slate-600">
            {done} dari {total} misi selesai
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-3">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-bold">Progres kamu</h2>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-teal-600 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-600">{percent}% dari Dunia 1</p>
        </aside>

        <section className="flex flex-col gap-4 lg:col-span-2">
          <h1 className="text-2xl font-bold">Peta misi</h1>

          <div
            className={`rounded-lg border bg-white p-6 ${
              misi1 ? "border-teal-200" : "border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Misi 1: Cari baterai</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  misi1 ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {misi1 ? "Selesai" : "Aktif"}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Susun blok agar robot sampai ke baterai.
            </p>
            <Link
              href="/playground"
              className="mt-5 inline-block rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              {misi1 ? "Main lagi" : "Mulai misi"}
            </Link>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-500">Misi 2: Perulangan</h3>
            <p className="mt-2 text-sm text-slate-500">Segera hadir.</p>
          </div>
        </section>
      </main>
    </div>
  );
}