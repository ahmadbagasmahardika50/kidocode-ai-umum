import Link from "next/link";

const CONCEPTS = [
  {
    title: "Pengulangan",
    desc: "Mengulang satu aksi beberapa kali. Blok Ulang maju 3x menjalankan maju tiga kali tanpa menyusun tiga blok.",
    example: "Ulang maju 3x sama dengan maju, maju, maju.",
  },
  {
    title: "Maju",
    desc: "Robot bergerak satu kotak ke arah yang sedang dihadapinya. Jika keluar area, robot menabrak dinding.",
    example: "Robot menghadap kanan, lalu maju: pindah ke kotak di sebelah kanan.",
  },
  {
    title: "Belok",
    desc: "Robot berputar 90 derajat searah jarum jam tanpa berpindah tempat.",
    example: "Dari menghadap kanan, belok kanan membuat robot menghadap ke bawah.",
  },
  {
    title: "Aksi",
    desc: "Perintah yang menyelesaikan tujuan. Aksi hanya berhasil jika robot sudah di posisi yang benar.",
    example: "Ambil baterai hanya berhasil jika robot berada di kotak baterai.",
  },
  {
    title: "Pengulangan",
    desc: "Mengulang sekelompok blok beberapa kali. Akan hadir di misi berikutnya.",
    example: "Ulangi maju 3 kali.",
  },
];

export default function Belajar() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">KidoCode</Link>
          <Link href="/playground" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Ke misi
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="anim-fade-up text-3xl font-bold">Konsep dasar logika</h1>
        <p className="anim-fade-up mt-3 max-w-2xl text-slate-600" style={{ animationDelay: "80ms" }}>
          Lima konsep ini dipakai di setiap misi. Baca sekali, lalu coba langsung di misi.
        </p>

        <div className="mt-10 grid gap-5">
          {CONCEPTS.map((c, i) => (
            <article
              key={c.title}
              style={{ animationDelay: `${120 + i * 90}ms` }}
              className="anim-fade-up rounded-lg border border-slate-200 p-6"
            >
              <h2 className="text-lg font-bold">{c.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-700">{c.desc}</p>
              <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                Contoh: {c.example}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/kuis" className="rounded-md bg-teal-700 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-teal-800">
            Uji pemahaman
          </Link>
          <Link href="/playground" className="rounded-md border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            Mulai misi
          </Link>
        </div>
      </main>
    </div>
  );
}