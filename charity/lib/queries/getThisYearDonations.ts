import { db } from "../db";
import { donations } from "../../drizzle/schema";
import { gte } from "drizzle-orm";

export async function getThisYearDonations(): Promise<number> {
  const startOfYearInSeconds = Math.floor(
    new Date(new Date().getFullYear(), 0, 1).getTime() / 1000
  );
  const result = await db
    .select({
      amount: donations.amount
    })
    .from(donations)
    .where(gte(donations.created, startOfYearInSeconds));
  
  const typed: number = result.reduce(
    (sum, r) => sum + r.amount,
    0
  );
  
  return typed;
}


