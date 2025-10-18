import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://dozbrajamy.pl;"
  );

  res.headers.set("X-Frame-Options", "ALLOW-FROM https://dozbrajamy.pl");

  return res;
}

export const config = {
  matcher: ["/:path*"],
};
