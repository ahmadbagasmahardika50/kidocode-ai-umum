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