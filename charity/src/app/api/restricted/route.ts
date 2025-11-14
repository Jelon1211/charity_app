import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "../../../../lib/rate-limit";
import { requireAuth } from "../../../../lib/auth";
import { validateRequest } from "../../../../lib/validate";
import { DonationRequestSchema } from "../../../../schemas/donation.schema";
import { addDonation } from "../../../../lib/mysql/queries/addDonation";
import { getIp } from "../../../../lib/get-ip";

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  const limit = rateLimiter(ip);
  if (limit) return limit;

  const authResult = await requireAuth(request);
  if (authResult instanceof Response) return authResult;

  const validation = await validateRequest(request, DonationRequestSchema);
  if (!validation.success) return validation.response;

  const { data } = validation;

  try {
    const donation = await addDonation(data);
    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (err) {
    console.error("Error adding donation:", err);
    return NextResponse.json(
      { success: false, message: "Database error while adding donation" },
      { status: 500 }
    );
  }
}
