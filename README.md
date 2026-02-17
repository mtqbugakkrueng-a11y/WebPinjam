# WebPinjam Desa

Aplikasi web desa berbasis **Next.js** untuk:

1. Laporan antar bidang:
   - Bidang Pemerintahan
   - Bidang Pembangunan
2. Pinjam meminjam barang antar bidang.

## Fitur Utama

- Dashboard responsif untuk desktop/mobile.
- Form pengajuan laporan.
- Form pengajuan pinjaman barang.
- Update status laporan (`Diajukan`, `Diproses`, `Selesai`).
- Update status pinjaman (`Diajukan`, `Disetujui`, `Ditolak`, `Dikembalikan`).
- API route backend dengan validasi input.
- Penyimpanan data sederhana melalui file `data/db.json`.

## Endpoint API

### Laporan
- `GET /api/reports`
- `POST /api/reports`
- `PATCH /api/reports/:id`

### Pinjaman
- `GET /api/loans`
- `POST /api/loans`
- `PATCH /api/loans/:id`

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.
