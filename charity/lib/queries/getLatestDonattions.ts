import { db } from "../db";
import { donations } from "../../drizzle/schema";
import { desc } from "drizzle-orm";

import formatAmount from "../../helpers/formatAmount";
import { sourceLinks } from "../../helpers/linksHelper";
import { formatDateToDisplay } from "../../helpers/timeHelper";
import { Donation } from "../../types/Table";
import { donationsRaw, SOURCE } from "../../types/db";

export async function getLatestDonations(
  offset: number = 0,
  limit: number = 3
): Promise<Donation[]> {
  const result = await db
    .select({
      amount: donations.amount,
      purpose: donations.purpose,
      source: donations.source,
      donated_at: donations.donated_at,
    })
    .from(donations)
    .orderBy(desc(donations.donated_at))
    .limit(limit)
    .offset(offset);

  const typed: donationsRaw = result.map((r) => ({
    amount: r.amount,
    purpose: r.purpose,
    source: r.source as SOURCE,
    donated_at: r.donated_at,
  }));

  return prepareLatestDonations(typed);
}

function prepareLatestDonations(result: donationsRaw): Donation[] {
  return result.map((item, index) => ({
    id: index,
    amount: formatAmount(item.amount),
    source: sourceLinks(item.source),
    purpose: JSON.parse(item.purpose),
    donated_at: formatDateToDisplay(item.donated_at, "pl-PL", {
      dateStyle: "medium",
      timeZone: "Europe/Warsaw",
    }),
  }));
}
