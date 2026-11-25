# Sportstock — Sistem Persediaan Gudang

Aplikasi persediaan untuk usaha mikro. Fokus pada kuantitas barang, dokumen pembelian/penjualan/retur, stok opname, laporan, dan kartu gudang. Tidak ada produksi, pembayaran, nilai transaksi, atau HPP. Harga jual hanya informasi katalog.

## Menjalankan aplikasi

1. Buat proyek Supabase dan aktifkan autentikasi email/kata sandi.
2. Jalankan `backend/schema.sql` melalui SQL Editor Supabase. Skrip dapat dijalankan ulang setelah kegagalan parsial; tabel dan data demo yang sudah ada tidak dihapus.
3. Isi URL proyek dan publishable/anon key pada `frontend/supabase-config.js`. Jangan pernah menaruh service-role key di frontend.
4. Sajikan folder `frontend` melalui server statis, misalnya Live Server di VS Code.
5. Daftarkan akun pertama melalui aplikasi. Akun baru otomatis menjadi karyawan.
6. Di SQL Editor Supabase, jadikan akun pertama manager dengan email yang didaftarkan:

   ```sql
   update public.user_profiles
   set role = 'manager', updated_at = now()
   where user_id = (
     select id from auth.users
     where lower(email) = lower('email-manager-anda')
   );
   ```

7. Masuk kembali sebagai manager. Manager dapat membuat barang/pemasok/kategori dan menetapkan role karyawan lain sebagai SPV atau karyawan.

Jika konfirmasi email diaktifkan, konfirmasikan email akun sebelum masuk. Schema menyediakan katalog 63 barang dan riwayat demo; saldo contoh tetap harus diverifikasi dengan hitung fisik sebelum digunakan operasional.

## Alur kerja dan hak akses

| Role | Tanggung jawab dan akses |
| --- | --- |
| Karyawan | Menginput pembelian, penjualan, retur, dan hasil hitung stok opname. Dokumen menunggu persetujuan; pencatat otomatis berasal dari akun login. |
| SPV | Meninjau, menyetujui, atau menolak dokumen. Tidak dapat menyetujui/menolak dokumennya sendiri. Juga dapat melihat laporan. |
| Manager | Mengelola barang, kategori, pemasok, pengguna/role, dan laporan. Tidak menyetujui dokumen operasional. |

Peran dan operasi penting divalidasi di PostgreSQL melalui RLS dan fungsi RPC, bukan hanya dengan menyembunyikan tombol di UI. Dokumen yang menunggu/ditolak tidak mengubah saldo maupun kartu gudang. Saldo berubah dan kartu gudang tercatat hanya setelah SPV menyetujui dokumen. Penolakan wajib disertai alasan.

## Fitur persediaan

- Pembelian wajib mencatat vendor, lokasi/kanal, penerima barang, dan akun penginput.
- Stok opname menyimpan stok sistem, stok fisik, penghitung, penanggung jawab opname, pencatat akun, serta selisih (`fisik - sistem`).
- Laporan hanya menghitung dokumen yang disetujui, mencantumkan saldo sistem, barang masuk/keluar, saldo akhir, vendor, penerima, pencatat, dan penyetuju. Laporan serta kartu gudang dapat dicetak.
- Stok tidak dapat dikeluarkan melebihi saldo. Satu dokumen tidak dapat mencantumkan SKU yang sama lebih dari sekali.
- Seed SQL memuat katalog/demo transaksi untuk pembelian, penjualan, retur pembelian, retur penjualan, dan stok opname. Nilai saldo demo bukan hasil penghitungan fisik.

Skema, ERD, serta alur data tersedia di [docs/skema-sistem-persediaan.md](docs/skema-sistem-persediaan.md).
