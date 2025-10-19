import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import { rateLimiter } from "../../../../lib/rate-limit";

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof Response) {
    return authResult;
  }

  const limitResponse = rateLimiter();
  if (limitResponse instanceof Response) {
    return limitResponse;
  }

  const body = await request.json();
  console.log(body);
  const result = { success: true, data: "response" };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
