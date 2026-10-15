# Jurnal Prompt Terkurasi
**Proyek:** KidoCode AI
**Kategori:** Umum (Web Education for Kids)
**Repo:** https://github.com/ahmadbagasmahardika50/kidocode-ai-umum

Jurnal ini disusun dari log mentah di PROMPT_LOG.md (bagian B). Log mentah lengkap tersedia di repo.

1. **Ide & pembangunan misi awal:** "Buatkan app/playground/page.tsx sebagai misi 1 KidoCode: grid 4x3, robot kucing mulai di kiri atas menghadap kanan, baterai di kanan atas. Ada blok Maju 1 Langkah, Belok Kanan, dan Ambil Baterai. Jalankan urutan blok langkah demi langkah dengan jeda, tangani robot yang menabrak dinding, dan simpan progres ke localStorage jika berhasil. Gunakan Tailwind dan React state."

2. **Debugging build Vercel:** Build gagal pada /playground/[id] karena halaman membaca params saat prerender. Tindakan: menambahkan generateStaticParams untuk id misi 1 sampai 3.

3. **Audit & optimasi UI:** "Revisi visual: menghapus emoji dekoratif, palet netral dengan aksen teal, dan tombol serta kartu yang disederhanakan. Logika game dan KidoBot tidak diubah."

4. **Pembangunan fitur akun:** "Tambahkan login sederhana dengan username dan PIN 4 angka. Halaman misi dan dashboard hanya bisa diakses setelah masuk." Kemudian diperbarui: "Upgrade login: pisahkan daftar dan masuk, kata sandi disimpan dalam bentuk hash SHA-256, dan progres dipisah per akun."

5. **Integrasi KidoBot dengan Gemini:** Model gemini-2.5-flash dan gemini-2.5-flash-lite mengembalikan 404 untuk akun baru. Tindakan: memakai gemini-3.1-flash-lite yang sudah diuji berhasil, lalu memperbarui route KidoBot dan deploy ulang.