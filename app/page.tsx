import Link from "next/link";

const features = [
  { icon: "🎮", title: "Belajar Sambil Bermain", desc: "Setiap konsep logika dikemas jadi misi seperti game." },
  { icon: "🤖", title: "KidoBot Asisten AI", desc: "KidoBot memberi petunjuk bertahap, tidak langsung memberi jawaban." },
  { icon: "🧩", title: "Susun Blok Visual", desc: "Tidak perlu mengetik kode rumit. Cukup susun blok perintah." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-extrabold text-sky-700">🧩 KidoCode</span>
          <div className="flex items-center gap-4 font-semibold text-slate-500">
            <Link href="/dashboard" className="hover:text-sky-500 transition-colors">Dashboard</Link>
            <Link
              href="/playground"
              className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold px-5 py-2 rounded-full transition-colors"
            >
              Main Sekarang
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-20 text-center">
        <p className="inline-block px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-full mb-6 text-sm">
          Web Education for Kids (SD)
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Belajar Logika Coding
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            Sambil Bermain!
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 font-medium">
          Bantu Robot Kucing menyelesaikan misinya dengan menyusun blok perintah.
          Ada KidoBot yang siap memberi petunjuk kalau kamu bingung.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/playground"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_6px_0_rgb(2,132,199)] hover:translate-y-0.5 active:translate-y-1.5 transition-all"
          >
            🚀 Mulai Petualangan
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl font-bold text-slate-600 border-2 border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Lihat Progres
          </Link>
        </div>
      </main>

      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12">Kenapa Belajar di KidoCode?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-sky-50 p-8 rounded-3xl border border-sky-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 font-medium border-t border-slate-100">
        © 2026 KidoCode AI · Dibuat untuk M-One Telkomsel Coding Competition
      </footer>
    </div>
  );
}