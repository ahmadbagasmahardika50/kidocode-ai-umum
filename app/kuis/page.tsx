"use client";
import Link from "next/link";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "Robot menghadap ke kanan. Blok apa yang membuat robot menghadap ke bawah?",
    options: ["Maju 1 langkah", "Belok kanan", "Ambil baterai"],
    answer: 1,
    why: "Belok kanan memutar robot 90 derajat searah jarum jam. Dari kanan, robot menghadap ke bawah.",
  },
  {
    q: "Baterai berada dua kotak lurus di depan robot. Urutan mana yang benar?",
    options: ["Ambil baterai, maju, maju", "Maju, maju, ambil baterai", "Maju, ambil baterai, maju"],
    answer: 1,
    why: "Robot harus sampai ke baterai dulu, baru bisa mengambilnya.",
  },
  {
    q: "Apa yang terjadi jika robot maju melewati tepi area?",
    options: ["Robot diam saja", "Robot menabrak dinding dan misi gagal", "Robot otomatis berbelok"],
    answer: 1,
    why: "Blok maju tidak boleh keluar area. Robot akan menabrak dinding.",
  },
  {
    q: "Blok Ulang maju 3x sama dengan urutan blok apa?",
    options: ["Maju, belok, maju", "Maju, maju, maju", "Ambil baterai, maju, maju"],
    answer: 1,
    why: "Blok Ulang maju 3x menjalankan blok maju tiga kali berturut-turut.",
  },
  {
    q: "Mengapa urutan blok penting?",
    options: [
      "Karena robot selalu menjalankan blok dari atas ke bawah",
      "Karena blok tidak bisa diubah",
      "Karena robot hanya bisa berjalan ke kiri",
    ],
    answer: 0,
    why: "Urutan menentukan jalan robot. Mengubah urutan akan mengubah hasil.",
  },
  {
    q: "Robot menghadap ke bawah. Blok apa yang membuat robot menghadap ke kiri?",
    options: ["Belok kanan sekali", "Belok kanan dua kali", "Maju 1 langkah"],
    answer: 0,
    why: "Belok kanan memutar robot searah jarum jam. Dari menghadap bawah, satu kali belok kanan membuat robot menghadap ke kiri.",
  },
];

export default function Kuis() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[index];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= QUESTIONS.length) {
      setFinished(true);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">KidoCode</Link>
          <Link href="/belajar" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Kembali ke belajar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14">
        {finished ? (
          <div className="anim-pop rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-teal-700">Hasil kuis</p>
            <p className="mt-2 text-4xl font-bold">
              {score}/{QUESTIONS.length}
            </p>
            <p className="mt-3 text-slate-600">
              {score === QUESTIONS.length
                ? "Semua jawaban benar. Lanjut ke misi berikutnya."
                : "Coba baca lagi konsepnya, lalu ulangi kuis."}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={restart}
                className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Ulangi kuis
              </button>
              <Link href="/playground" className="rounded-md bg-teal-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-800">
                Ke misi
              </Link>
            </div>
          </div>
        ) : (
          <div key={index} className="anim-fade-up rounded-lg border border-slate-200 bg-white p-8">
            <p className="text-sm font-semibold text-slate-500">
              Soal {index + 1} dari {QUESTIONS.length}
            </p>
            <h1 className="mt-2 text-xl font-bold leading-snug">{q.q}</h1>

            <div className="mt-6 grid gap-3">
              {q.options.map((opt, i) => {
                const isAnswer = picked !== null && i === q.answer;
                const isWrong = picked === i && i !== q.answer;
                return (
                  <button
                    key={opt}
                    onClick={() => choose(i)}
                    disabled={picked !== null}
                    className={`rounded-md border px-4 py-3 text-left font-semibold transition-colors ${
                      isAnswer
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : isWrong
                        ? "border-red-400 bg-red-50 text-red-700"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="anim-fade-up mt-6 rounded-md bg-slate-100 p-4 text-sm text-slate-700">
                <p className="font-semibold">
                  {picked === q.answer ? "Jawaban benar." : "Jawaban belum tepat."}
                </p>
                <p className="mt-1">{q.why}</p>
                <button
                  onClick={next}
                  className="mt-4 rounded-md bg-slate-900 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {index + 1 >= QUESTIONS.length ? "Lihat hasil" : "Soal berikutnya"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}