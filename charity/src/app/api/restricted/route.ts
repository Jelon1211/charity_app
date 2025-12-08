import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import { getIp } from "../../../../lib/get-ip";
import { rateLimiter } from "../../../../lib/rate-limit";
import { validateRequest } from "../../../../lib/validate";
import { DonationRequestSchema } from "../../../../schemas/donation.schema";
import { addDonation } from "../../../../lib/queries/addDonation";
import { NODE_ENV } from "../../../../config/const";

export async function POST(request: NextRequest) {
  if (NODE_ENV !== "development") {
    return NextResponse.json({ success: false }, { status: 401 });
  }
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
