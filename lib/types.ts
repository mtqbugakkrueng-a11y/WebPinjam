export type Bidang = "Pemerintahan" | "Pembangunan";

export type ReportStatus = "Diajukan" | "Diproses" | "Selesai";
export type LoanStatus = "Diajukan" | "Disetujui" | "Ditolak" | "Dikembalikan";

export interface ReportItem {
  id: string;
  bidang: Bidang;
  judul: string;
  deskripsi: string;
  prioritas: "Rendah" | "Sedang" | "Tinggi";
  status: ReportStatus;
  createdAt: string;
}

export interface LoanItem {
  id: string;
  barang: string;
  jumlah: number;
  dariBidang: Bidang;
  keBidang: Bidang;
  alasan: string;
  status: LoanStatus;
  createdAt: string;
}

export interface AppDatabase {
  reports: ReportItem[];
  loans: LoanItem[];
}
