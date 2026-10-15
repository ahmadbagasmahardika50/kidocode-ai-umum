import Link from "next/link";
import { MISSIONS } from "@/lib/missions";

export default function PlaygroundIndex() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-6">
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            Beranda
          </Link>
          <span className="h-5 w-px bg-slate-200" />
          <span className="font-bold">Pilih misi</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="anim-fade-up text-2xl font-bold">Misi Robot Kucing</h1>
        <p className="anim-fade-up mt-2 text-slate-600" style={{ animationDelay: "80ms" }}>
          Selesaikan misi satu per satu. Setiap misi menambah satu konsep baru.
        </p>

        <div className="mt-8 grid gap-4">
          {MISSIONS.map((m, i) => (
            <Link
              key={m.id}
              href={`/playground/${m.id}`}
              style={{ animationDelay: `${i * 100 + 160}ms` }}
              className="anim-fade-up rounded-lg border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-teal-700">Misi {m.id}</p>
              <h2 className="mt-1 text-lg font-bold">{m.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.story}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}