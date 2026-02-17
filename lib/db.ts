import { promises as fs } from "fs";
import path from "path";
import { AppDatabase } from "@/lib/types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function readDb(): Promise<AppDatabase> {
  const content = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(content) as AppDatabase;
}

export async function writeDb(data: AppDatabase): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function createId(prefix: "RPT" | "LOAN"): string {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${stamp}${random}`;
}
