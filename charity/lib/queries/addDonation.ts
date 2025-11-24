import { db } from "../db";
import { donations } from "../../drizzle/schema";
import { nowUnix } from "../../helpers/timeHelper";

import { AddRequest } from "../../schemas/donation.schema";
import { SOURCE } from "../../types/db";

export async function addDonation(data: AddRequest) {
  const { donated_at, amount, purpose, source } = data;

  const created = nowUnix();

  await db.insert(donations).values({
    donated_at,
    amount,
    purpose: JSON.stringify(purpose),
    source: source as SOURCE,
    created,
    modified: created,
  });

  return {
    donated_at,
    amount,
    purpose,
    source,
  };
}
