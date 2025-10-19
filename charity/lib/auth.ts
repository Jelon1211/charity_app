import { NextRequest } from "next/server";
import { NODE_AUTHORIZATION } from "../config/const";

export async function requireAuth(
  request: NextRequest
): Promise<Response | void> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const token = authHeader.substring(7);
  if (token !== NODE_AUTHORIZATION) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
}
