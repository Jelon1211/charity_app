import { NextResponse } from "next/server";
import { rateLimiter } from "../../../../lib/rate-limit";
import { getLatestDonations } from "../../../../lib/mysql/queries/getLatestDonations";
import { getIp } from "../../../../lib/get-ip";

export async function GET(request: Request) {
  const ip = getIp(request);

  const limit = rateLimiter(ip);
  if (limit) return limit;

  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") || 0);

  const donations = await getLatestDonations(offset);

  return NextResponse.json(donations);
}
