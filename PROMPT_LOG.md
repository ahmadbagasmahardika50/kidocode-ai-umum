# Jurnal Prompt Terkurasi & Log Mentah

**Proyek:** KidoCode AI
**Kategori:** Umum (Web Education for Kids)
**Repo:** https://github.com/ahmadbagasmahardika50/kidocode-ai-umum

## A. Jurnal Prompt Terkurasi (maks 5)

1. **Ide & PRD:** "<prompt asli Anda saat menyusun docs.md>"
2. **Pembangunan fitur:** "<prompt asli Anda untuk playground atau landing page>"
3. **Debugging:** "<prompt asli Anda saat ada error, sertakan pesan errornya>"
4. **Audit & optimasi UI:** "<prompt asli Anda untuk memperbaiki tampilan>"
5. **Finishing AI KidoBot:** "<prompt asli Anda untuk menghubungkan KidoBot ke Gemini>"

## B. Log Prompt Mentah

- [2026-10-15 01.45 ] "<teks prompt asli>"
- [2026-10-15 01.45] "<teks prompt asli>"

- [2026-10-15 01.50] Mengganti app/layout.tsx sesuai panduan font Quicksand, metadata, dan KidoBot dipasang global.

- [2026-10-15 01.52] Mengganti app/page.tsx dengan landing page dari panduan (tanpa prompt AI): navbar, hero, tombol ke /playground, kartu fitur, dan footer.

- [2026-10-15 01.56] "Buatkan app/playground/page.tsx sebagai misi 1 KidoCode: grid 4x3, robot kucing mulai di kiri atas menghadap kanan, baterai di kanan atas. Ada blok Maju 1 Langkah, Belok Kanan, dan Ambil Baterai. Jalankan urutan blok langkah demi langkah dengan jeda, tangani robot yang menabrak dinding, dan simpan progres ke localStorage jika berhasil. Gunakan Tailwind dan React state."

- [2026-10-15 07.01] Memastikan app/page.tsx berisi landing page (cek head -3), server dev berjalan, dan route /api/kidobot merespons 200. Menguji playground, dashboard, dan KidoBot secara lokal.

- [2026-10-15 07.25 ] Memeriksa deployment produksi (commit 5b13503). GEMINI_API_KEY sudah tersimpan di Environment Variables. Melakukan Redeploy dan memeriksa log KidoBot.

- [2026-10-15 07.28] Debugging: KidoBot selalu menampilkan "sedang sibuk" di produksi. Tindakan: route /api/kidobot diubah agar memakai petunjuk lokal sebagai fallback saat Gemini gagal, lalu di-deploy ulang.

- [2026-10-15 07.42] Debugging: model gemini-2.5-flash dan gemini-2.5-flash-lite tidak tersedia (404) untuk akun baru. Tindakan: memakai gemini-3.1-flash-lite yang sudah diuji berhasil dengan curl, lalu memperbarui route KidoBot dan deploy ulang.

- [2026-10-15 07.51] Revisi visual: menghapus emoji dekoratif dari seluruh antarmuka dan pesan KidoBot, mengganti palet menjadi netral dengan aksen teal, dan menyederhanakan tombol dan kartu. Logika game dan KidoBot tidak diubah.

- [2026-10-15 07.59] Upgrade: menambahkan animasi (fade-up, pop, transisi posisi robot), tiga misi dengan rute /playground/[id], halaman belajar konsep dasar, kuis tiga soal, dan dashboard per misi.

- [2026-10-15 08.11] Debugging: build Vercel gagal pada /playground/[id] karena prerender membaca params saat build. Tindakan: menambahkan generateStaticParams yang mengembalikan id misi 1 sampai 3.

- [2026-10-15 08.55] Debugging: build gagal karena nama file Confetti tidak cocok dengan import (huruf besar-kecil). Tindakan: rename file dengan git mv dua langkah dan memperbaiki import di PlayClient.tsx. Build lokal sukses, lalu commit dan deploy.

- [2026-10-15 09.04] Upgrade: menambahkan Misi 4 dengan blok Ulang maju 3x (diperluas menjadi tiga blok maju sebelum simulasi), memperbarui label dan warna palet, dan memperbarui penjelasan konsep pengulangan.

- [2026-10-15 09.07] Uji produksi: misi 1 sampai 4 bisa diselesaikan di Vercel (commit befbc74), tombol lanjut misi berfungsi setelah refresh cache. Siap dikumpulkan.

- [2026-10-15 09.12] Upgrade kecil: lencana pencapaian di dashboard dan ukuran teks halaman belajar diperbesar. Build lokal sukses, dideploy ke Vercel.

- [2026-10-15 09.22] "Tambahkan lencana pencapaian di dashboard dan perbesar teks halaman belajar."
- [2026-10-15 09.22] "Tambahkan dua soal kuis lagi sehingga total lima soal, dengan penjelasan untuk setiap jawaban."
- [2026-10-15 09.22] "Tambahkan blok Ulang maju 3x dan misi 4 dengan pengulangan."

- [2026-10-15 09.30] "Tambahkan misi 5 dengan urutan belok kanan, maju, ambil baterai. Baterai berada di kiri bawah."

- [2026-10-15 09.37] "Tambahkan soal kuis ke-6 tentang arah robot setelah belok kanan dari posisi menghadap bawah."

- [2026-10-15 10.32] "Tambahkan login sederhana dengan username dan PIN 4 angka. Halaman misi dan dashboard hanya bisa diakses setelah masuk."

- [2026-10-15 10.36] "Tambahkan login sederhana dengan username dan PIN 4 angka. Halaman misi dan dashboard hanya bisa diakses setelah masuk."

- [2026-10-15 10.43] "Upgrade login: pisahkan daftar dan masuk, kata sandi disimpan dalam bentuk hash SHA-256, dan progres dipisah per akun."

- [2026-10-16 15.08] "Tambahkan misi 6 dengan dua blok ulang. Baterai di kanan bawah, solusi: ulang maju 3x, belok kanan, maju 1 langkah, ambil baterai."

- [2026-10-16 15.11] Debugging: build gagal di lib/missions.ts (Expected '}' got '<eof>') karena fungsi simulate tidak tertutup saat menyalin. Tindakan: menimpa seluruh file dengan versi lengkap dan memperbaiki posisi baterai misi 6.

- [2026-10-16 15.14] "Tambahkan tombol Keluar dan nama akun di header halaman misi, supaya bisa keluar dari semua halaman yang butuh login."
- [2026-10-16 15.16] "Tambahkan tombol Reset progres akun ini di dashboard, dengan konfirmasi sebelum menghapus progres akun yang sedang masuk."

- [2026-10-16 15.20] "Tambahkan kartu profil di dashboard: nama akun dan tanggal bergabung. Tanggal bergabung disimpan saat daftar akun."

- [2026-10-16 15.24] "Tambahkan pesan selamat unik untuk setiap misi yang tampil setelah misi selesai."