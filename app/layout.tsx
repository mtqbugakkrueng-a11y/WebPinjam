import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebPinjam Desa",
  description: "Aplikasi laporan dan pinjam meminjam antar bidang desa"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
