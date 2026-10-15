# KidoCode AI

Platform belajar logika coding untuk anak SD. Dibuat untuk M-One Telkomsel Coding Competition, Kategori Umum (Web Education for Kids).

## Menjalankan secara lokal
1. `npm install`
2. Buat file `.env.local` berisi `GEMINI_API_KEY=isi_key_anda` (opsional, untuk balasan AI KidoBot).
3. `npm run dev`, lalu buka http://localhost:3000

## Fitur
- Beranda, konsep dasar logika, dan kuis 10 soal
- 6 misi robot kucing dengan blok maju, belok, ambil baterai, dan ulang
- Akun dengan daftar dan masuk, progres per akun, dan lencana
- KidoBot, asisten belajar berbasis Gemini dengan fallback lokal

## Teknologi
Next.js (App Router), React, TypeScript, Tailwind CSS, Google Gemini API.

## Catatan
Akun dan progres disimpan di browser. Ini versi demo untuk penilaian.