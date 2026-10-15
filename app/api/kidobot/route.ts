import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah KidoBot, asisten belajar logika coding untuk anak SD kelas 4-6 di platform KidoCode.
Aturan:
- Jawab dalam bahasa Indonesia yang sederhana, maksimal 3 kalimat pendek, tanpa emoji.
- Jangan pernah memberi jawaban langsung untuk urutan blok misi. Beri petunjuk bertahap berupa pertanyaan pancingan.
- Fokus pada konsep logika: langkah, urutan, belok, dan pengambilan objek.
- Jika pertanyaan di luar belajar coding, arahkan kembali dengan sopan.
- Jangan meminta atau menyimpan data pribadi anak.`;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

type IncomingMessage = { role: "user" | "model"; text: string };

// Petunjuk lokal dipakai saat Gemini tidak bisa dipanggil.
function localHint(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("baterai") || t.includes("ambil")) {
    return "Coba pikirkan dulu: robot harus berada di mana sebelum bisa mengambil baterai?";
  }
  if (t.includes("maju") || t.includes("langkah")) {
    return "Robot mulai menghadap ke kanan. Berapa kali robot harus maju agar sampai ke baterai?";
  }
  if (t.includes("belok")) {
    return "Belok kanan membuat robot berubah arah. Apakah robot perlu berbelok di misi ini?";
  }
  if (t.includes("halo") || t.includes("hai") || t.includes("hallo")) {
    return "Halo! Ada blok yang membingungkan? Tanyakan tentang maju, belok, atau baterai.";
  }
  return "Perhatikan petunjuk di sebelah kiri layar, lalu susun blok perlahan.";
}

export async function POST(req: Request) {
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Pesanmu belum terbaca. Coba kirim lagi." });
  }

  const recent = (body.messages ?? []).slice(-10);
  const lastUser = [...recent].reverse().find((m) => m.role === "user")?.text ?? "";
  const fallback = () => NextResponse.json({ reply: localHint(lastUser) });

  // Key diambil dari environment variable di server, tidak pernah ke browser.
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return fallback();

  // Gemini mensyaratkan riwayat dimulai dari pesan user.
  const firstUser = recent.findIndex((m) => m.role === "user");
  if (firstUser < 0) return fallback();
  const contents = recent.slice(firstUser).map((m) => ({
    role: m.role,
    parts: [{ text: String(m.text).slice(0, 500) }],
  }));

  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      }),
    });

    if (!res.ok) {
      console.error("Gemini error status:", res.status);
      return fallback();
    }

    const data = await res.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) return fallback();
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return fallback();
  }
}