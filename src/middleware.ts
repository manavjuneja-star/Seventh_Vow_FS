import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from "@/lib/adminSession";

/** Gates every /admin page except the login page itself. API routes under
 *  /api/admin check the same cookie individually since middleware can't
 *  easily short-circuit those with a JSON error body. Runs on the Edge
 *  runtime — imports only `adminSession.ts` (Web Crypto), never
 *  `adminAuth.ts` (Node `crypto`, Edge-incompatible). */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionCookieValue(cookie))) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
