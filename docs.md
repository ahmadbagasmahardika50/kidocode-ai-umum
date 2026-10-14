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
1. **Landing page** (`/`): hero, daftar fitur, tombol ke playground dan dashboard.
2. **Playground Misi 1** (`/playground`):
   - Grid 4x3, robot mulai di kiri atas menghadap kanan, baterai di kanan atas.
   - Blok: Maju 1 Langkah, Belok Kanan, Ambil Baterai.
   - Simulasi langkah demi langkah dengan jeda.
   - Pesan jika robot menabrak dinding, atau jika baterai belum diambil.
   - Jika berhasil, progres disimpan di localStorage dengan kunci `kido-progress`.
3. **Dashboard** (`/dashboard`):
   - Membaca progres dari localStorage.
   - Menampilkan misi 1 (aktif atau selesai) dan misi 2 (segera hadir).
4. **KidoBot** (floating chat, tampil di semua halaman):
   - Mengirim riwayat chat ke `/api/kidobot`.
   - Balasan dibuat oleh Gemini dengan sistem prompt anak SD.
   - Jika API key belum ada, tampilkan pesan ramah, jangan crash.

## 6. Aturan AI KidoBot
- Bahasa Indonesia sederhana, maksimal 3 kalimat pendek.
- Boleh memakai emoji.
- Tidak memberi jawaban langsung untuk urutan blok. Gunakan pertanyaan pancingan.
- Fokus pada konsep logika. Pertanyaan di luar coding diarahkan kembali dengan sopan.
- Tidak meminta atau menyimpan data pribadi anak.

## 7. Aturan UI/UX
- Warna cerah ramah anak: sky, amber, emerald, dengan slate untuk teks dan netral.
- Teks utama minimal `text-lg` di area belajar. Tombol cukup besar untuk jari anak.
- Setiap tombol punya efek hover dan active (translate dan shadow 3D).
- Layout responsif: satu kolom di mobile, tiga kolom di desktop (playground).
- Hindari desain dashboard korporat atau template AI generik.

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