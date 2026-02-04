import { NextResponse } from "next/server";
import { getIp } from "../../../../lib/get-ip";
import { rateLimiter } from "../../../../lib/rate-limit";
import { getDonations } from "../../../../lib/queries/getDonattions";

export async function GET(request: Request) {
  const ip = getIp(request);

  const limit = rateLimiter(ip);
  if (limit) return limit;

  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") || 0);

  const donations = await getDonations(offset);

  return NextResponse.json(donations);
}
