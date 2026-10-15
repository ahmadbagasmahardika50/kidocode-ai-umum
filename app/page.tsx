import Link from "next/link";

const features = [
  {
    no: "01",
    title: "Belajar lewat misi",
    desc: "Setiap konsep logika dikemas sebagai misi yang diselesaikan langkah demi langkah.",
  },
  {
    no: "02",
    title: "Petunjuk dari KidoBot",
    desc: "KidoBot membantu dengan pertanyaan pancingan, bukan jawaban langsung.",
  },
  {
    no: "03",
    title: "Susun blok visual",
    desc: "Tanpa mengetik kode. Anak cukup menyusun blok perintah lalu melihat hasilnya.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight">KidoCode</span>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/dashboard" className="transition-colors hover:text-slate-900">
              Dashboard
            </Link>
            <Link
              href="/playground"
              className="rounded-md bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-700"
            >
              Mulai
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          Web Education for Kids (SD)
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          Belajar logika coding dengan menyusun blok perintah
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Bantu Robot Kucing sampai ke baterai. Setiap misi melatih urutan langkah, belokan,
          dan pengambilan objek.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/playground"
            className="rounded-md bg-teal-700 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Mulai misi pertama
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Lihat progres
          </Link>
        </div>
      </main>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-bold">Cara belajar di KidoCode</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.no}>
                <p className="text-sm font-semibold text-teal-700">{f.no}</p>
                <h3 className="mt-2 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-500">
          KidoCode AI. Dibuat untuk M-One Telkomsel Coding Competition, Kategori Umum.
        </div>
      </footer>
    </div>
  );
}