# KidoCode AI - Acuan AI Agent

## 1. Konteks Proyek
Platform web belajar logika coding untuk anak SD kelas 4-6.
- Tema: Innovating Education Through Technology
- Subtema: Web Education for Kids (SD)
- Kategori: Umum, M-One Telkomsel Coding Competition
- Garis start: 5 Oktober 2026 pukul 09.30 WIB. Seluruh kode dan dokumen dibuat setelah garis start.
- Batas akhir pengumpulan: 15 Oktober 2026 pukul 15.30 WIB (pengumpulan dilakukan sebelum batas tersebut).

## 2. Tujuan Produk
Mengajarkan konsep dasar logika (urutan, maju, belok, aksi, dan pengulangan) lewat misi bergaya game. Anak menyusun blok perintah, melihat robot bergerak langkah demi langkah, dan dibantu asisten AI (KidoBot) yang memberi petunjuk bertahap, bukan jawaban langsung.

## 3. Tech Stack
- Next.js (App Router), React, TypeScript
- Tailwind CSS (utility class, dengan animasi tambahan di `app/globals.css`)
- Font: Quicksand via next/font/google
- AI: Google Gemini API (model gemini-3.1-flash-lite), dipanggil dari route handler `app/api/kidobot/route.ts`
- Environment variable: `GEMINI_API_KEY` (hanya di server)
- Penyimpanan: localStorage browser (akun dan progres)

## 4. Struktur Folder
app/
layout.tsx # layout global, font, AuthGuard, KidoBot
page.tsx # beranda
masuk/page.tsx # daftar dan masuk akun
playground/page.tsx # daftar misi
playground/[id]/page.tsx # halaman satu misi (static params 1-6)
dashboard/page.tsx # progres, lencana, profil, reset progres
belajar/page.tsx # konsep dasar logika
kuis/page.tsx # 10 soal pilihan ganda dengan penjelasan
api/kidobot/route.ts # endpoint AI KidoBot
components/
bot/KidoBot.tsx # asisten chat
play/PlayClient.tsx # simulasi misi
play/Confetti.tsx # efek konfeti saat misi selesai
auth/AuthGuard.tsx # melindungi halaman misi dan dashboard
lib/
missions.ts # data misi dan fungsi simulasi
auth.ts # daftar, masuk, keluar, progres per akun


## 5. Fitur
1. **Beranda**: hero, ringkasan cara belajar, animasi masuk bertahap.
2. **Akun**: daftar dan masuk dengan username (3-15 karakter) dan kata sandi (minimal 6 karakter). Kata sandi disimpan dalam bentuk hash SHA-256. Tombol Keluar tersedia di dashboard dan di header misi.
3. **Misi (6 misi)**: robot di grid 4x3, blok Maju 1 langkah, Belok kanan, Ambil baterai, dan Ulang maju 3x. Simulasi berjalan langkah demi langkah. Misi selesai memunculkan konfeti dan pesan selamat unik.
4. **Dashboard**: profil (nama dan tanggal bergabung), progres per akun, lencana (Pemula, Pemecah masalah, Master robot), dan tombol reset progres akun.
5. **Belajar**: lima konsep dasar logika dengan contoh.
6. **Kuis**: 10 soal pilihan ganda, dengan penjelasan setelah setiap jawaban dan hasil akhir.
7. **KidoBot**: asisten chat di semua halaman. Memakai Gemini, dengan fallback petunjuk lokal jika Gemini tidak bisa dipanggil. Sistem prompt mewajibkan petunjuk bertahap, bukan jawaban langsung.

## 6. Aturan AI KidoBot
- Bahasa Indonesia sederhana, maksimal 3 kalimat pendek, tanpa emoji.
- Tidak memberi jawaban langsung untuk urutan blok misi.
- Fokus pada konsep logika. Pertanyaan di luar belajar coding diarahkan kembali dengan sopan.
- Tidak meminta atau menyimpan data pribadi anak.

## 7. Aturan UI/UX
- Palet netral: slate untuk teks dan latar, teal sebagai warna aksen.
- Tidak memakai emoji dekoratif di antarmuka.
- Tombol dan kartu sederhana dengan batas tipis, transisi warna, dan efek tekan.
- Animasi: fade-up saat masuk, pop saat hasil, transisi halaman, dan transisi posisi robot. Semua dinonaktifkan untuk pengguna dengan reduce motion.
- Layout responsif: satu kolom di mobile, tiga kolom di desktop (halaman misi).

## 8. Aturan Kode
- React functional components dan hooks.
- Komponen reusable di `components/`, halaman dan route di `app/`.
- Jangan commit `.env*.local`.
- Simulasi misi dibuat murni (tanpa efek samping) di `lib/missions.ts`.
- Saat memperbaiki bug, ubah hanya baris yang error.
- Jalankan `npm run build` sebelum push.

## 9. Konvensi Commit
- Format: `tipe: deskripsi singkat` (`feat:`, `fix:`, `style:`, `docs:`, `chore:`).
- Satu commit untuk satu fitur atau perbaikan.
- Tidak ada force push dan tidak ada perubahan riwayat commit.

## 10. Definisi Selesai
- Enam misi bisa diselesaikan di link produksi.
- Kuis 10 soal berjalan sampai hasil akhir.
- Login, progres per akun, dan tombol keluar berfungsi.
- KidoBot membalas, dengan fallback jika AI tidak tersedia.
- Repo GitHub bersifat publik dan link Vercel bisa diakses juri.

## 11. Batasan yang Diketahui
- Akun dan progres disimpan di browser (localStorage), belum memakai server atau database.
- Kata sandi sudah di-hash, tetapi ini tetap versi demo untuk penilaian, bukan keamanan produksi.
- Misi perulangan lanjut (blok ulang bersarang) belum tersedia.