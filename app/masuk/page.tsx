"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";

export default function MasukPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const res = login(username, pin);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(res.error ?? "Gagal masuk.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            KidoCode
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-sm px-6 py-16">
        <div className="anim-fade-up rounded-lg border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-bold">Masuk</h1>
          <p className="mt-2 text-sm text-slate-600">
            Isi username dan PIN 4 angka. Jika username baru, akun otomatis dibuat.
          </p>

          <label className="mt-6 block text-sm font-semibold text-slate-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="misal: bagas"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />

          <label className="mt-4 block text-sm font-semibold text-slate-700">PIN (4 angka)</label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="1234"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />

          {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

          <button
            onClick={submit}
            className="mt-6 w-full rounded-md bg-teal-700 py-3 font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Masuk
          </button>
        </div>
      </main>
    </div>
  );
}