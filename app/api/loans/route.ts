import { NextRequest, NextResponse } from "next/server";
import { createId, readDb, writeDb } from "@/lib/db";
import { Bidang, LoanItem } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.loans);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<LoanItem>;

  if (!body.barang || !body.jumlah || !body.dariBidang || !body.keBidang || !body.alasan) {
    return NextResponse.json(
      { message: "Data peminjaman belum lengkap." },
      { status: 400 }
    );
  }

  const dariBidang = body.dariBidang as Bidang;
  const keBidang = body.keBidang as Bidang;

  if (dariBidang === keBidang) {
    return NextResponse.json(
      { message: "Bidang asal dan tujuan tidak boleh sama." },
      { status: 400 }
    );
  }

  const db = await readDb();
  const loan: LoanItem = {
    id: createId("LOAN"),
    barang: body.barang,
    jumlah: Number(body.jumlah),
    dariBidang,
    keBidang,
    alasan: body.alasan,
    status: "Diajukan",
    createdAt: new Date().toISOString()
  };

  db.loans.unshift(loan);
  await writeDb(db);

  return NextResponse.json(loan, { status: 201 });
}
