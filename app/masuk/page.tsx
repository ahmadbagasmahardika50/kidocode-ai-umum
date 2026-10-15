"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, register } from "@/lib/auth";

export default function MasukPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError("");
    if (mode === "daftar" && password !== confirm) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }
    setBusy(true);
    const res =
      mode === "daftar" ? await register(username, password) : await login(username, password);
    setBusy(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(res.error ?? "Gagal.");
    }
  };

  const input =
    "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            KidoCode
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-sm px-6 py-14">
        <div className="anim-fade-up rounded-lg border border-slate-200 bg-white p-8">
          <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
            <button
              onClick={() => { setMode("masuk"); setError(""); }}
              className={`rounded-md py-2 text-sm font-semibold ${
                mode === "masuk" ? "bg-white shadow-sm" : "text-slate-600"
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setMode("daftar"); setError(""); }}
              className={`rounded-md py-2 text-sm font-semibold ${
                mode === "daftar" ? "bg-white shadow-sm" : "text-slate-600"
              }`}
            >
              Daftar akun
            </button>
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            {mode === "masuk" ? "Masuk ke akunmu" : "Buat akun baru"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === "masuk"
              ? "Progres belajarmu tersimpan di akunmu."
              : "Username 3-15 karakter, kata sandi minimal 6 karakter."}
          </p>

          <label className="mt-6 block text-sm font-semibold text-slate-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="misal: bagas"
            className={input}
          />

          <label className="mt-4 block text-sm font-semibold text-slate-700">Kata sandi</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="minimal 6 karakter"
            className={input}
          />

          {mode === "daftar" && (
            <>
              <label className="mt-4 block text-sm font-semibold text-slate-700">
                Ulangi kata sandi
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={input}
              />
            </>
          )}

          {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

          <button
            onClick={submit}
            disabled={busy}
            className="mt-6 w-full rounded-md bg-teal-700 py-3 font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-50"
          >
            {busy ? "Memproses..." : mode === "masuk" ? "Masuk" : "Daftar"}
          </button>
        </div>
      </main>
    </div>
  );
}