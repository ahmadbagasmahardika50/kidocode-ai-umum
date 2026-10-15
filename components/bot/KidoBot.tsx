"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "model"; text: string };

export default function KidoBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "model", text: "Halo kawan! Aku KidoBot 🤖. Ada yang bingung? Tanya aku ya!" },
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
        { role: "model", text: data.reply ?? "Coba tanya lagi ya! 😺" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Koneksi terputus. Coba lagi ya! 📡" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-[340px] h-[450px] flex flex-col mb-4 overflow-hidden bg-white border border-sky-100 rounded-3xl shadow-2xl">
          <div className="bg-sky-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-bold text-sm">KidoBot</h3>
                <p className="text-xs text-sky-100">Teman belajarmu</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup KidoBot"
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 max-w-[80%] text-sm font-semibold leading-relaxed shadow-sm rounded-2xl ${
                    m.role === "user"
                      ? "bg-sky-500 text-white"
                      : "bg-white text-slate-800 border border-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-xs text-slate-500 font-semibold animate-pulse">KidoBot sedang berpikir... 🤔</p>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ketik pertanyaanmu..."
              className="flex-1 bg-white border-2 border-sky-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            />
            <button
              onClick={send}
              disabled={loading}
              aria-label="Kirim"
              className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white w-10 h-10 rounded-xl font-bold"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka KidoBot"
          className="bg-sky-500 text-white w-16 h-16 rounded-full shadow-[0_8px_0_rgb(2,132,199)] hover:-translate-y-1 active:translate-y-1 transition-all text-3xl border-2 border-white"
        >
          🤖
        </button>
      )}
    </div>
  );
}