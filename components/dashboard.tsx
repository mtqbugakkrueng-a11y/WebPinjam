"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { LoanItem, LoanStatus, ReportItem, ReportStatus } from "@/lib/types";

interface ReportForm {
  judul: string;
  deskripsi: string;
  bidang: "Pemerintahan" | "Pembangunan";
  prioritas: "Rendah" | "Sedang" | "Tinggi";
}

interface LoanForm {
  barang: string;
  jumlah: number;
  dariBidang: "Pemerintahan" | "Pembangunan";
  keBidang: "Pemerintahan" | "Pembangunan";
  alasan: string;
}

export default function Dashboard() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [reportForm, setReportForm] = useState<ReportForm>({
    judul: "",
    deskripsi: "",
    bidang: "Pemerintahan",
    prioritas: "Sedang"
  });
  const [loanForm, setLoanForm] = useState<LoanForm>({
    barang: "",
    jumlah: 1,
    dariBidang: "Pemerintahan",
    keBidang: "Pembangunan",
    alasan: ""
  });

  async function loadData() {
    const [reportRes, loanRes] = await Promise.all([
      fetch("/api/reports"),
      fetch("/api/loans")
    ]);

    setReports(await reportRes.json());
    setLoans(await loanRes.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitReport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportForm)
    });

    setReportForm({
      judul: "",
      deskripsi: "",
      bidang: "Pemerintahan",
      prioritas: "Sedang"
    });

    loadData();
  }

  async function submitLoan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loanForm)
    });

    setLoanForm({
      barang: "",
      jumlah: 1,
      dariBidang: "Pemerintahan",
      keBidang: "Pembangunan",
      alasan: ""
    });

    loadData();
  }

  async function updateReportStatus(id: string, status: ReportStatus) {
    await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadData();
  }

  async function updateLoanStatus(id: string, status: LoanStatus) {
    await fetch(`/api/loans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadData();
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1>WebPinjam Desa</h1>
        <p>
          Sistem laporan antar bidang (Pemerintahan &amp; Pembangunan) serta pinjam
          meminjam sarana kerja antar bidang.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Buat Laporan Bidang</h2>
          <form className={styles.form} onSubmit={submitReport}>
            <input
              className={styles.input}
              placeholder="Judul laporan"
              value={reportForm.judul}
              onChange={(e) => setReportForm({ ...reportForm, judul: e.target.value })}
              required
            />
            <textarea
              className={styles.textarea}
              placeholder="Deskripsi"
              value={reportForm.deskripsi}
              onChange={(e) => setReportForm({ ...reportForm, deskripsi: e.target.value })}
              required
            />
            <div className={styles.formRow}>
              <select
                className={styles.select}
                value={reportForm.bidang}
                onChange={(e) =>
                  setReportForm({ ...reportForm, bidang: e.target.value as ReportForm["bidang"] })
                }
              >
                <option>Pemerintahan</option>
                <option>Pembangunan</option>
              </select>
              <select
                className={styles.select}
                value={reportForm.prioritas}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    prioritas: e.target.value as ReportForm["prioritas"]
                  })
                }
              >
                <option>Rendah</option>
                <option>Sedang</option>
                <option>Tinggi</option>
              </select>
            </div>
            <button className={styles.button} type="submit">
              Kirim Laporan
            </button>
          </form>

          <div className={styles.list}>
            {reports.map((report) => (
              <div className={styles.item} key={report.id}>
                <strong>{report.judul}</strong>
                <div className={styles.meta}>
                  {report.bidang} · Prioritas {report.prioritas} · Status {report.status}
                </div>
                <p>{report.deskripsi}</p>
                <div className={styles.statusRow}>
                  {(["Diajukan", "Diproses", "Selesai"] as ReportStatus[]).map((status) => (
                    <button
                      key={status}
                      className={styles.button}
                      type="button"
                      onClick={() => updateReportStatus(report.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <h2>Pinjam Meminjam Antar Bidang</h2>
          <form className={styles.form} onSubmit={submitLoan}>
            <input
              className={styles.input}
              placeholder="Nama barang"
              value={loanForm.barang}
              onChange={(e) => setLoanForm({ ...loanForm, barang: e.target.value })}
              required
            />
            <div className={styles.formRow}>
              <input
                className={styles.input}
                type="number"
                min={1}
                value={loanForm.jumlah}
                onChange={(e) => setLoanForm({ ...loanForm, jumlah: Number(e.target.value) })}
                required
              />
              <select
                className={styles.select}
                value={loanForm.dariBidang}
                onChange={(e) =>
                  setLoanForm({
                    ...loanForm,
                    dariBidang: e.target.value as LoanForm["dariBidang"]
                  })
                }
              >
                <option>Pemerintahan</option>
                <option>Pembangunan</option>
              </select>
            </div>
            <select
              className={styles.select}
              value={loanForm.keBidang}
              onChange={(e) =>
                setLoanForm({ ...loanForm, keBidang: e.target.value as LoanForm["keBidang"] })
              }
            >
              <option>Pemerintahan</option>
              <option>Pembangunan</option>
            </select>
            <textarea
              className={styles.textarea}
              placeholder="Alasan peminjaman"
              value={loanForm.alasan}
              onChange={(e) => setLoanForm({ ...loanForm, alasan: e.target.value })}
              required
            />
            <button className={styles.button} type="submit">
              Ajukan Pinjaman
            </button>
          </form>

          <div className={styles.list}>
            {loans.map((loan) => (
              <div className={styles.item} key={loan.id}>
                <strong>
                  {loan.barang} ({loan.jumlah})
                </strong>
                <div className={styles.meta}>
                  {loan.dariBidang} → {loan.keBidang} · Status {loan.status}
                </div>
                <p>{loan.alasan}</p>
                <div className={styles.statusRow}>
                  {(["Diajukan", "Disetujui", "Ditolak", "Dikembalikan"] as LoanStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        className={styles.button}
                        type="button"
                        onClick={() => updateLoanStatus(loan.id, status)}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
