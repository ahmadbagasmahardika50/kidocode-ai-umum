import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah KidoBot, robot kucing yang ramah untuk anak SD kelas 4-6 di platform belajar coding KidoCode AI.
Aturan:
- Jawab dalam bahasa Indonesia yang sederhana, maksimal 3 kalimat pendek, boleh pakai emoji.
- Jangan pernah memberi jawaban langsung untuk urutan blok misi. Beri petunjuk bertahap berupa pertanyaan pancingan.
- Fokus pada konsep logika: langkah, urutan, belok, dan perulangan.
- Jika pertanyaan di luar belajar coding, arahkan kembali dengan sopan.
- Jangan meminta atau menyimpan data pribadi anak.`;

type IncomingMessage = { role: "user" | "model"; text: string };

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: "KidoBot belum tersambung ke AI. Minta bantuan pengembang ya! 🛠️" });
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Pesanmu belum terbaca. Coba kirim lagi ya! 🙏" }, { status: 400 });
  }

  // Ambil 10 pesan terakhir dan pastikan dimulai dari pesan user (syarat Gemini).
  const recent = (body.messages ?? []).slice(-10);
  const firstUser = recent.findIndex((m) => m.role === "user");
  const contents = (firstUser < 0 ? [] : recent.slice(firstUser)).map((m) => ({
    role: m.role,
    parts: [{ text: String(m.text).slice(0, 500) }],
  }));
  if (contents.length === 0) {
    return NextResponse.json({ reply: "Tanya aku sesuatu dulu ya! 😺" });
  }

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) {
      return NextResponse.json({ reply: "KidoBot sedang sibuk, coba lagi sebentar ya! ⏳" });
    }
    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Hmm, coba tanya dengan kalimat lain ya! 🤔";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Koneksi ke KidoBot terputus. Coba lagi ya! 📡" });
  }
}