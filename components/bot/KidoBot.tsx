"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "model"; text: string };

export default function KidoBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "model", text: "Halo! Aku KidoBot. Ada bagian yang membingungkan? Tanyakan saja." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      // Sapaan pembuka tidak dikirim sebagai riwayat ke AI.
      const res = await fetch("/api/kidobot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply ?? "Coba tanyakan lagi." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Koneksi terputus. Coba lagi sebentar." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[450px] w-[340px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
            <div>
              <h3 className="text-sm font-bold">KidoBot</h3>
              <p className="text-xs text-slate-300">Asisten belajar</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup KidoBot"
              className="rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Tutup
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-slate-500">KidoBot sedang menulis...</p>}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 border-t border-slate-200 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Tulis pertanyaanmu"
              className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-50"
            >
              Kirim
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka KidoBot"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-700"
        >
          KidoBot
        </button>
      )}
    </div>
  );
}