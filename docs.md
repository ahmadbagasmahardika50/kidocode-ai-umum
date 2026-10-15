# KidoCode AI - Acuan AI Agent

## 1. Konteks Proyek
Website belajar logika coding untuk anak SD kelas 4-6.
- Tema lomba: Innovating Education Through Technology
- Subtema: Web Education for Kids (SD)
- Kategori: Umum, M-One Telkomsel Coding Competition
- Batas akhir pengumpulan: 15 Oktober 2026 pukul 15.30 WIB
- Garis start: 5 Oktober 2026 pukul 09.30 WIB. Semua kode dan docs dibuat setelah garis start.

## 2. Tujuan Produk
Mengajarkan konsep dasar logika (urutan langkah, belok, dan nanti perulangan) lewat misi bergaya game. Anak menyusun blok perintah, melihat robot bergerak, dan dibantu asisten AI (KidoBot) yang memberi petunjuk, bukan jawaban langsung.

## 3. Tech Stack
- Next.js (App Router), React, TypeScript
- Tailwind CSS (utility class saja, tanpa file CSS custom kecuali globals.css)
- Font: Quicksand via next/font/google
- AI: Google Gemini API, dipanggil dari route handler `app/api/kidobot/route.ts`
- Environment variable: `GEMINI_API_KEY` (hanya di server, jangan di browser)

## 4. Struktur Folder
app/
layout.tsx # layout global, font, KidoBot dipasang di sini
page.tsx # landing page
playground/page.tsx # Misi 1: simulasi blok logika
dashboard/page.tsx # progres belajar dan peta misi
api/kidobot/route.ts# endpoint AI KidoBot
components/
bot/KidoBot.tsx # floating chat


## 5. Fitur yang Harus Dibangun
## 5. Halaman & Fitur
1. `/` Beranda: hero dan ringkasan cara belajar, dengan animasi masuk bertahap.
2. `/belajar` Konsep dasar: urutan, maju, belok, aksi, dan pengulangan (segera hadir).
3. `/playground` Daftar misi. `/playground/[id]` memainkan misi (3 misi).
4. `/kuis` Tiga soal pilihan ganda dengan penjelasan.
5. `/dashboard` Progres per misi, disimpan di localStorage kunci `kido-progress`.
6. KidoBot: asisten chat di semua halaman, memakai Gemini dengan fallback petunjuk lokal.

Animasi: fade-up saat masuk, pop saat hasil, dan transisi posisi robot. Dinonaktifkan untuk pengguna dengan reduce motion.

## 6. Aturan AI KidoBot
- Bahasa Indonesia sederhana, maksimal 3 kalimat pendek.
- Boleh memakai emoji.
- Tidak memberi jawaban langsung untuk urutan blok. Gunakan pertanyaan pancingan.
- Fokus pada konsep logika. Pertanyaan di luar coding diarahkan kembali dengan sopan.
- Tidak meminta atau menyimpan data pribadi anak.

## 7. Aturan UI/UX
- Palet netral: slate untuk teks dan latar, teal sebagai warna aksen.
- Tidak memakai emoji dekoratif di antarmuka.
- Tombol dan kartu sederhana dengan batas tipis dan transisi warna saat hover.
- Layout responsif: satu kolom di mobile, tiga kolom di desktop (playground).

## 8. Aturan Kode
- Gunakan React functional components dan hooks.
- Komponen reusable di `components/`, halaman dan route di `app/`.
- Jangan commit `.env*.local`.
- Beri komentar singkat pada fungsi utama (simulasi, route handler, komponen bot).
- Saat memperbaiki bug, ubah hanya baris yang error. Jangan tulis ulang seluruh file kecuali diminta.
- Jalankan `npm run build` sebelum push.

## 9. Konvensi Commit
- Format: `tipe: deskripsi singkat` (contoh: `feat:`, `fix:`, `docs:`, `chore:`).
- Satu commit untuk satu fitur atau perbaikan.
- Jangan force push dan jangan mengubah riwayat commit.

## 10. Definisi Selesai
- Playground misi 1 bisa diselesaikan lewat simulasi.
- Dashboard membaca progres yang tersimpan.
- KidoBot membalas lewat Gemini di local dan Vercel.
- Website bisa diakses lewat link Vercel dan repo GitHub bersifat publik.

