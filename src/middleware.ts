import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  // const sessionCookie = getSessionCookie(request, {
  //   cookieName: "session_token",
  //   cookiePrefix: "taskcheck",
  // });
  const sessionCookie = getSessionCookie(request);
  // const sessionCookie = request.cookies.get("session_token");

  console.log(sessionCookie);

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/relatorios/:path*",
    "/categorias/:path*",
    "/admin/:path*",
  ],
};
