import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import { rateLimiter } from "../../../../lib/rate-limit";
import { validateRequest } from "../../../../lib/validate";
import { DonationRequestSchema } from "../../../../schemas/donation.schema";

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof Response) {
    return authResult;
  }

  const limitResponse = rateLimiter();
  if (limitResponse instanceof Response) {
    return limitResponse;
  }

  const validation = await validateRequest(request, DonationRequestSchema);
  if (!validation.success) {
    return validation.response;
  }

  const { data } = validation;

  console.log(data);
  const result = { success: true, data: "response" };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
