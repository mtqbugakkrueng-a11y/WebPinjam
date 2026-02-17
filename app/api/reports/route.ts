import { NextRequest, NextResponse } from "next/server";
import { createId, readDb, writeDb } from "@/lib/db";
import { Bidang, ReportItem } from "@/lib/types";

export async function GET(request: NextRequest) {
  const bidang = request.nextUrl.searchParams.get("bidang");
  const db = await readDb();

  if (!bidang) {
    return NextResponse.json(db.reports);
  }

  const filtered = db.reports.filter((item) => item.bidang === bidang);
  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ReportItem>;

  if (!body.judul || !body.deskripsi || !body.bidang || !body.prioritas) {
    return NextResponse.json(
      { message: "Data laporan belum lengkap." },
      { status: 400 }
    );
  }

  const bidang = body.bidang as Bidang;
  if (!["Pemerintahan", "Pembangunan"].includes(bidang)) {
    return NextResponse.json({ message: "Bidang tidak valid." }, { status: 400 });
  }

  const db = await readDb();
  const report: ReportItem = {
    id: createId("RPT"),
    judul: body.judul,
    deskripsi: body.deskripsi,
    bidang,
    prioritas: body.prioritas,
    status: "Diajukan",
    createdAt: new Date().toISOString()
  };

  db.reports.unshift(report);
  await writeDb(db);

  return NextResponse.json(report, { status: 201 });
}
