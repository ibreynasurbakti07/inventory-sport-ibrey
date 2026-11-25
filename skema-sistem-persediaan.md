# Skema Sistem Persediaan Sportstock

## Ruang lingkup

Sportstock adalah sistem persediaan dan gudang untuk usaha mikro. Sistem mencatat katalog barang, saldo kuantitas, dokumen pergerakan barang, stok opname, dan kartu gudang. Harga jual boleh disimpan sebagai referensi katalog, tetapi tidak dipakai menghitung nilai transaksi, nilai persediaan, atau HPP. Sistem tidak mengelola produksi atau pembayaran.

**Implementasi saat ini:** frontend menggunakan Supabase Auth dan menyimpan data persediaan melalui REST/RPC ke PostgreSQL. Akun baru otomatis menjadi karyawan; manager pertama harus ditetapkan melalui SQL Editor Supabase. RLS dan fungsi database membatasi operasi, bukan sekadar tampilan UI.

Pembelian, penjualan, retur pembelian, dan retur penjualan dicatat hanya sebagai dokumen jumlah barang yang mengubah saldo:

| Dokumen | Dampak ke stok |
| --- | --- |
| Pembelian | Menambah stok |
| Penjualan | Mengurangi stok |
| Retur pembelian | Mengurangi stok |
| Retur penjualan | Menambah stok |
| Saldo awal | Mengisi saldo barang baru yang belum memiliki saldo/kartu |
| Stok opname | Mengubah stok menjadi hasil hitung fisik; selisih disimpan |

Setiap dokumen dapat memuat satu atau lebih barang. RPC `record_stock_document` hanya membuat dokumen berstatus pending beserta rinciannya. SPV yang berbeda dari pencatat meninjau dokumen; saat menyetujui, fungsi database memperbarui saldo dan membuat entri kartu gudang dalam satu transaksi. Penolakan tidak mengubah saldo dan harus disertai alasan.

## ERD

```mermaid
erDiagram
    CATEGORIES ||--o{ PRODUCTS : mengelompokkan
    SUPPLIERS o|--o{ PRODUCTS : memasok
    AUTH_USERS o|--o{ STOCK_DOCUMENTS : mencatat
    AUTH_USERS o|--o{ STOCK_DOCUMENTS : memproses
    AUTH_USERS ||--o| USER_PROFILES : memiliki_role
    STOCK_DOCUMENTS ||--|{ STOCK_DOCUMENT_LINES : memiliki
    PRODUCTS ||--o{ STOCK_DOCUMENT_LINES : dirinci
    STOCK_DOCUMENTS ||--o{ WAREHOUSE_CARD_ENTRIES : menghasilkan
    STOCK_DOCUMENT_LINES ||--o| WAREHOUSE_CARD_ENTRIES : perubahan_saldo
    PRODUCTS ||--o{ WAREHOUSE_CARD_ENTRIES : memiliki_kartu
    AUTH_USERS o|--o{ WAREHOUSE_CARD_ENTRIES : mencatat_perubahan

    CATEGORIES {
        uuid id PK
        text name UK
    }
    SUPPLIERS {
        uuid id PK
        text name UK
        text phone
        text email
    }
    PRODUCTS {
        uuid id PK
        uuid category_id FK
        uuid supplier_id FK "nullable"
        text name
        text brand
        text sku UK
        text unit
        bigint selling_price "referensi katalog; nullable"
        integer stock "saldo sistem"
        integer min_stock
    }
    AUTH_USERS {
        uuid id PK
        text email
    }
    USER_PROFILES {
        uuid user_id PK_FK
        text display_name
        text role
        boolean is_active
    }
    STOCK_DOCUMENTS {
        uuid id PK
        text document_no UK
        text document_type
        date document_date
        text partner_name "vendor atau mitra"
        text purchase_location "lokasi/kanal; wajib untuk pembelian"
        text received_by "penerima pembelian; nullable"
        text handled_by "pelaksana opname/petugas gudang"
        uuid recorded_by FK "auth.users"
        text recorded_by_email
        uuid approved_by FK "auth.users nullable"
        text approved_by_email
        uuid rejected_by FK "auth.users nullable"
        text rejected_by_email
        timestamptz approved_at
        timestamptz rejected_at
        text status "pending, approved, rejected"
        text rejection_reason
        text note
    }
    STOCK_DOCUMENT_LINES {
        uuid id PK
        uuid document_id FK
        uuid product_id FK
        integer quantity
        integer system_stock
        integer physical_stock "nullable"
        integer difference "nullable"
        text counted_by "nullable"
    }
    WAREHOUSE_CARD_ENTRIES {
        uuid id PK
        uuid document_id FK
        uuid document_line_id FK_UK
        uuid product_id FK
        text movement_type
        integer quantity
        integer stock_before
        integer stock_after
        uuid created_by FK
    }
```

`AUTH_USERS` adalah `auth.users` milik Supabase, bukan tabel aplikasi terpisah. `USER_PROFILES` menghubungkan akun dengan role dan status aktif. Untuk penyesuaian stok opname tanpa selisih, baris dokumen tetap disimpan tetapi tidak dibuat entri kartu karena saldonya tidak berubah. Saldo pada setiap entri kartu menyimpan nilai sebelum dan sesudah, sehingga kartu tetap dapat ditelusuri dan dicetak.

## Data penting dan aturan

- `products.stock` adalah saldo terkini dalam satuan barang, bukan nilai rupiah. `products.brand` menyimpan merek, `products.name` menyimpan nama barang, dan `products.selling_price` adalah referensi katalog saja. Harga tersebut tidak digunakan dalam transaksi, perhitungan nilai persediaan, maupun HPP.
- Katalog contoh di `backend/schema.sql` berisi 63 barang dari enam kategori. Jumlah awal dibuat sebagai data demo deterministik, bukan hasil hitung fisik; verifikasi dengan stok opname sebelum operasional. `on conflict (sku) do nothing` menjaga seed agar tidak menimpa katalog yang sudah ada.
- `stock_documents.document_type` hanya menerima `purchase`, `sale`, `purchase_return`, `sales_return`, `stocktake`, dan `opening` untuk saldo awal. Saldo awal hanya dapat dibuat sekali untuk barang yang belum memiliki saldo/kartu gudang.
- Dokumen pembelian wajib mencatat nama vendor, lokasi/kanal pembelian, dan petugas penerima. `purchase_location` dapat mencatat alamat toko, cabang, atau kanal seperti marketplace. Semua rincian pembelian tampil pada laporan pergerakan persediaan bersama saldo sistem, jumlah masuk, saldo akhir, dan nama pencatat.
- `stock_document_lines.quantity` adalah jumlah pada dokumen biasa; pada stok opname nilainya adalah besar selisih absolut. Kolom `system_stock`, `physical_stock`, dan `difference` merekam pembanding opname dengan rumus `fisik - sistem`.
- `stock_documents.recorded_by` dan `recorded_by_email` otomatis diisi dari sesi pengguna yang menyimpan dokumen. `stock_documents.received_by` menyimpan petugas penerima barang pembelian. `stock_document_lines.counted_by` adalah nama petugas yang menghitung barang; `stock_documents.handled_by` adalah nama penanggung jawab/pelaksana opname.
- Dokumen yang menunggu/ditolak tidak mengubah saldo. `warehouse_card_entries` hanya mencatat perubahan saldo saat disetujui SPV. Sistem menolak pengeluaran atau retur pembelian yang melebihi saldo.
- Satu dokumen tidak boleh memuat barang yang sama lebih dari satu kali. Barang/kategori serta dokumen/detail/kartu yang masih dirujuk tidak dapat dihapus agar jejak persediaan tetap utuh. Pemasok boleh dihapus; referensi pemasok pada barang terkait menjadi kosong.
- `SALDO-AWAL-SKEMA-V1` membuat saldo produk yang sudah ada saat penerapan skema menjadi baris awal kartu gudang. Tabel `stock_movements` lama tidak lagi digunakan aplikasi; mutasi lama yang tidak memiliki tipe dokumen diperlakukan sebagai histori legacy, bukan dicampur ke kartu baru.

## Alur kerja dan pengguna

1. **Manager** membuat barang, kategori, pemasok, dan batas minimum; mengelola akun/role serta meninjau laporan. Manager tidak dapat mengesahkan dokumen operasional.
2. **Karyawan** menginput pembelian, penjualan, retur, atau hasil stok opname. Untuk pembelian, vendor, lokasi/kanal, dan penerima barang wajib dicatat. Identitas penginput diambil otomatis dari akun login.
3. Pada stok opname, karyawan mencatat stok sistem yang ditampilkan, stok fisik, nama penghitung, dan penanggung jawab opname. Selisih dihitung dengan rumus `fisik - sistem`.
4. **SPV** meninjau dokumen, lalu menyetujui atau menolak dengan alasan. Pencatat tidak dapat memproses dokumennya sendiri. Stok sistem diperiksa kembali saat persetujuan; jika stok berubah setelah hitung fisik, SPV menolak dokumen dan meminta hitung ulang.
5. Setelah disetujui, perubahan saldo dan kartu gudang dibuat dalam transaksi database yang sama. Laporan hanya menyertakan dokumen yang disetujui; laporan dan kartu dapat dicetak.

Semua role aktif berbagi data katalog dan riwayat gudang yang sama agar kartu gudang lengkap. Hak perubahan dipisah: karyawan hanya dapat mengirim dokumen lewat RPC, SPV hanya memproses dokumen, dan manager hanya mengelola master data/role serta meninjau laporan. Backend menerapkan aturan tersebut melalui RLS dan pemeriksaan role dalam RPC.

## Akses dan penerapan

1. Jalankan `backend/schema.sql` pada proyek Supabase. Skrip menyiapkan tabel, seed demo, RLS, dan RPC.
2. Daftarkan akun pertama, lalu tetapkan role manager untuk email tersebut di SQL Editor. Jangan memberi frontend service-role key.
3. Akun yang mendaftar berikutnya otomatis ber-role karyawan; manager dapat mengganti role/statusnya.
4. Role `authenticated` tidak memiliki izin langsung mengubah saldo atau menulis dokumen/kartu. Perubahan saldo hanya melalui persetujuan SPV pada RPC yang memvalidasi role, status dokumen, stok, dan pemisahan tugas.

Kolom `price` yang mungkin tertinggal dari versi database sebelumnya tidak dipakai aplikasi ini. Pada database lama, jalankan skema baru agar izin dan trigger lama diselaraskan; saldo saat penerapan menjadi saldo awal kartu gudang.
