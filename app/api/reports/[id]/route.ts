import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { ReportStatus } from "@/lib/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = (await request.json()) as { status?: ReportStatus };

  if (!body.status) {
    return NextResponse.json({ message: "Status wajib diisi." }, { status: 400 });
  }

  const allowed: ReportStatus[] = ["Diajukan", "Diproses", "Selesai"];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ message: "Status laporan tidak valid." }, { status: 400 });
  }

  const db = await readDb();
  const idx = db.reports.findIndex((item) => item.id === params.id);

  if (idx < 0) {
    return NextResponse.json({ message: "Laporan tidak ditemukan." }, { status: 404 });
  }

  db.reports[idx].status = body.status;
  await writeDb(db);

  return NextResponse.json(db.reports[idx]);
}
