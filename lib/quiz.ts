import { progressKey } from "@/lib/auth";

// Skor kuis disimpan di progres akun yang sedang masuk.
export function saveQuizScore(score: number, total: number) {
  try {
    const key = progressKey();
    const saved = JSON.parse(localStorage.getItem(key) ?? "{}");
    localStorage.setItem(key, JSON.stringify({ ...saved, kuisSkor: score, kuisTotal: total }));
  } catch {
    // abaikan
  }
}

export function readQuizScore(): { score: number; total: number } | null {
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey()) ?? "{}");
    if (typeof saved.kuisSkor === "number" && typeof saved.kuisTotal === "number") {
      return { score: saved.kuisSkor, total: saved.kuisTotal };
    }
  } catch {
    // abaikan
  }
  return null;
}