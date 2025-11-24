import { db } from "../db";
import { donations } from "../../drizzle/schema";
import { sql } from "drizzle-orm";

import formatAmount from "../../helpers/formatAmount";
import { totalAmountRaw } from "../../types/db";

export async function getTotalAmount() {
  const result = await db
    .select({
      total_amount: sql<number>`SUM(${donations.amount})`,
    })
    .from(donations);

  const row: totalAmountRaw = {
    total_amount: result[0].total_amount ?? 0,
  };

  return prepareTotalAmount(row);
}

function prepareTotalAmount(result: totalAmountRaw) {
  const raw = result.total_amount / 100;
  const formatted = formatAmount(result.total_amount);

  return { raw, formatted };
}
