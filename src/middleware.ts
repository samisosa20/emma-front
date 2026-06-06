import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

interface Session {
    user: any;
    session: any;
}


export default async function middleware(request: NextRequest) {
  // Check session against the backend auth endpoint via the proxy or directly
  const apiUrl = (process.env.NEXT_PUBLIC_INTERNAL_API_URL || request.nextUrl.origin).replace("localhost", "127.0.0.1");

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
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
    request.nextUrl.pathname.startsWith("/blogs") ||
    request.nextUrl.pathname.startsWith("/verify-bolt");

  let response: NextResponse;

  if (!session && !isPublicRoute) {
    response = NextResponse.redirect(new URL("/login", request.url));
  } else if (session && isPublicRoute && request.nextUrl.pathname !== "/") {
    response = NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    response = NextResponse.next();
  }

  // Add global security headers (CWE-1027, CWE-693)
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(), interest-cohort=()"
  );
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Enhanced Content Security Policy (CSP) to mitigate XSS and data injection (CWE-79)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://flagcdn.com https://lh3.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
    connect-src 'self';
    frame-ancestors 'none';
    form-action 'self';
    object-src 'none';
    base-uri 'self';
    ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
  `
    .replace(/\s{2,}/g, " ")
    .trim();
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
