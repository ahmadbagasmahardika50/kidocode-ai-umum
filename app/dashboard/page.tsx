"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MISSIONS } from "@/lib/missions";
import { getUser, logout, progressKey } from "@/lib/auth";

type Progress = Record<string, boolean>;

const BADGES = [
  { need: 1, title: "Pemula", desc: "Menyelesaikan 1 misi" },
  { need: 3, title: "Pemecah masalah", desc: "Menyelesaikan 3 misi" },
  { need: 4, title: "Master robot", desc: "Menyelesaikan semua misi" },
];

export default function Dashboard() {
  const router = useRouter();
  const [progress, setProgress] = useState<Progress>({});
  const [user, setUser] = useState<string | null>(null);

  // Baca progres dan nama user yang tersimpan di browser
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setUser(getUser());
    try {
      setProgress(JSON.parse(localStorage.getItem("progressKey()") ?? "{}"));
    } catch {
      setProgress({});
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const done = MISSIONS.filter((m) => progress[`misi${m.id}`]).length;
  const percent = Math.round((done / MISSIONS.length) * 100);

  const keluar = () => {
    logout();
    router.push("/masuk");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            KidoCode
          </Link>
          <div className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            <Link href="/belajar" className="hover:text-slate-900">Belajar</Link>
            <Link href="/kuis" className="hover:text-slate-900">Kuis</Link>
            {user && <span className="text-slate-900">Halo, {user}</span>}
            <button onClick={keluar} className="text-red-600 hover:text-red-800">
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-3">
        <aside className="anim-fade-up h-fit rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-bold">Progres kamu</h2>
          <p className="mt-3 text-3xl font-bold">
            {done}/{MISSIONS.length}
          </p>
          <p className="text-sm text-slate-600">misi selesai</p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-teal-600 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>

          <h3 className="mt-8 text-sm font-bold">Lencana</h3>
          <ul className="mt-3 grid gap-3">
            {BADGES.map((b) => {
              const earned = done >= b.need;
              return (
                <li
                  key={b.title}
                  className={`rounded-md border p-3 transition-colors ${
                    earned ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-slate-50 opacity-60"
                  }`}
                >
                  <p className={`text-sm font-semibold ${earned ? "text-teal-800" : "text-slate-500"}`}>
                    {b.title}
                  </p>
                  <p className="text-xs text-slate-600">{b.desc}</p>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="flex flex-col gap-4 lg:col-span-2">
          <h1 className="text-2xl font-bold">Peta misi</h1>
          {MISSIONS.map((m, i) => {
            const ok = Boolean(progress[`misi${m.id}`]);
            return (
              <div
                key={m.id}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`anim-fade-up rounded-lg border bg-white p-6 ${
                  ok ? "border-teal-200" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    Misi {m.id}: {m.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      ok ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {ok ? "Selesai" : "Belum"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{m.story}</p>
                <Link
                  href={`/playground/${m.id}`}
                  className="mt-5 inline-block rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {ok ? "Main lagi" : "Mulai misi"}
                </Link>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}