import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { LoanStatus } from "@/lib/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = (await request.json()) as { status?: LoanStatus };

  if (!body.status) {
    return NextResponse.json({ message: "Status wajib diisi." }, { status: 400 });
  }

  const allowed: LoanStatus[] = ["Diajukan", "Disetujui", "Ditolak", "Dikembalikan"];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ message: "Status peminjaman tidak valid." }, { status: 400 });
  }

  const db = await readDb();
  const idx = db.loans.findIndex((item) => item.id === params.id);

  if (idx < 0) {
    return NextResponse.json({ message: "Data peminjaman tidak ditemukan." }, { status: 404 });
  }

  db.loans[idx].status = body.status;
  await writeDb(db);

  return NextResponse.json(db.loans[idx]);
}
