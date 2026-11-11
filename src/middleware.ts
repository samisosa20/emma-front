import { NextResponse, type NextRequest } from "next/server";

const CSP_HEADER = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://flagcdn.com https://lh3.googleusercontent.com https://*.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
    connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://flagcdn.com https://lh3.googleusercontent.com https://*.googleusercontent.com;
    frame-ancestors 'none';
    form-action 'self';
    object-src 'none';
    base-uri 'self';
    ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
  `
  .replace(/\s{2,}/g, " ")
  .trim();

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const DIRECT_SESSION_URL = rawApiUrl
  ? `${rawApiUrl.endsWith("/api/v2") ? rawApiUrl : `${rawApiUrl}/api/v2`}/auth/get-session`
  : null;

const SESSION_CACHE_TTL_MS = 5000;
const MAX_SESSION_CACHE_SIZE = 500;
const sessionCache = new Map<string, number>();
const sessionInFlight = new Map<string, Promise<boolean>>();

function extractSessionToken(cookieHeader: string): string | null {
  const match = cookieHeader.match(
    /(?:^|;\s*)(?:__Secure-)?better-auth\.session_token=([^;]+)/,
  );
  return match ? match[1] : null;
}

async function hasValidSession(
  cookieHeader: string,
  fallbackOrigin: string,
): Promise<boolean> {
  const sessionToken = extractSessionToken(cookieHeader);
  if (!sessionToken) {
    return false;
  }

  const now = Date.now();
  const cachedUntil = sessionCache.get(sessionToken);
  if (cachedUntil && cachedUntil > now) {
    return true;
  }
  if (cachedUntil) {
    sessionCache.delete(sessionToken);
  }

  const existingFlight = sessionInFlight.get(sessionToken);
  if (existingFlight) {
    return existingFlight;
  }

  const sessionUrl =
    DIRECT_SESSION_URL || `${fallbackOrigin}/api/v2/auth/get-session`;

  const checkPromise = (async () => {
    try {
      const res = await fetch(sessionUrl, {
        headers: { cookie: cookieHeader },
        cache: "no-store",
      });
      if (!res.ok) return false;
      const data = await res.json();
      const valid = Boolean(data?.user && data?.session);
      if (valid) {
        if (sessionCache.size >= MAX_SESSION_CACHE_SIZE) {
          const oldestKey = sessionCache.keys().next().value;
          if (oldestKey !== undefined) {
            sessionCache.delete(oldestKey);
          }
        }
        sessionCache.set(sessionToken, Date.now() + SESSION_CACHE_TTL_MS);
      }
      return valid;
    } catch {
      return false;
    } finally {
      sessionInFlight.delete(sessionToken);
    }
  })();

  sessionInFlight.set(sessionToken, checkPromise);
  return checkPromise;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot") ||
    pathname.startsWith("/blogs") ||
    pathname.startsWith("/verify-bolt") ||
    pathname.startsWith("/verify-palette");

  const cookieHeader = request.headers.get("cookie") || "";
  const isAuthenticated = cookieHeader
    ? await hasValidSession(cookieHeader, request.nextUrl.origin)
    : false;

  let response: NextResponse;

  if (!isAuthenticated && !isPublicRoute) {
    response = NextResponse.redirect(new URL("/login", request.url));
  } else if (isAuthenticated && isPublicRoute && pathname !== "/") {
    response = NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    response = NextResponse.next();
  }

  // Enforce no-cache policy for private routes containing sensitive financial data (CWE-524)
  if (!isPublicRoute) {
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate",
    );
  }

  // Add global security headers (CWE-1027, CWE-693)
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), usb=(), fullscreen=(), interest-cohort=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set("Content-Security-Policy", CSP_HEADER);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
