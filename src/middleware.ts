import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

interface Session {
    user: any;
    session: any;
}


export default async function middleware(request: NextRequest) {
  // Check session against the backend auth endpoint via the proxy or directly
  // Using the proxied path /api/v2/auth/get-session
  const apiUrl = process.env.NEXT_PUBLIC_INTERNAL_API_URL || request.nextUrl.origin;

  const { data: session } = await betterFetch<Session>(
    "/auth/get-session",
    {
      baseURL: apiUrl,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/forgot") ||
    request.nextUrl.pathname.startsWith("/blogs");

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublicRoute && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
