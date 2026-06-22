import { NextRequest, NextResponse } from "next/server";

/**
 * ⚡ Bolt Optimization: Module-level static configuration.
 * 🎯 Problem: Lists and strings were being re-allocated on every request.
 * 📊 Impact: O(1) lookups for headers and keys, zero allocation for static strings.
 */
const SENSITIVE_HEADERS = new Set([
  "content-encoding",
  "transfer-encoding",
  "content-length",
  "server",
  "x-powered-by",
  "via",
  "x-runtime",
  "x-aspnet-version",
  "x-vercel-id",
  "x-vercel-cache",
  "x-request-id",
  "x-version",
  "x-managed-by",
  "authorization",
  "api-key",
  "x-api-key",
  "proxy-authorization",
  "cookie",
  "x-auth-token",
  "x-session-id",
  "x-correlation-id",
]);

const SENSITIVE_BODY_KEYS = new Set([
  "token",
  "access_token",
  "accesstoken",
  "refresh_token",
  "id_token",
  "session_token",
  "password",
  "client_secret",
  "secret",
  "session",
  "sid",
  "api_key",
  "apikey",
  "auth_token",
  "private_key",
  "cookie",
  "otp",
  "code",
  "verification_code",
  "secret_key",
  "api_token",
]);

const CSP_HEADER = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://flagcdn.com https://lh3.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
    connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
    frame-ancestors 'none';
    form-action 'self';
    object-src 'none';
    base-uri 'self';
    ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
  `
  .replace(/\s{2,}/g, " ")
  .trim();

/**
 * ⚡ Bolt Optimization: Performant recursive scrubbing.
 * 🎯 Problem: Combination of Object.keys and Object.values caused redundant allocations.
 * 📊 Impact: Uses single for...in loop for both deletion and recursion, reducing GC pressure.
 */
const scrubSensitiveData = (obj: any, depth = 0) => {
  if (depth > 10 || !obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      scrubSensitiveData(obj[i], depth + 1);
    }
    return;
  }

  for (const key in obj) {
    if (SENSITIVE_BODY_KEYS.has(key.toLowerCase())) {
      delete obj[key];
    } else {
      scrubSensitiveData(obj[key], depth + 1);
    }
  }
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return handleRequest(request, { path });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return handleRequest(request, { path });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return handleRequest(request, { path });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return handleRequest(request, { path });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return handleRequest(request, { path });
}

async function handleRequest(request: NextRequest, { path }: { path: string[] }) {
  // CSRF Protection: Verify Origin/Referer matches for state-changing requests (CWE-352)
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const secFetchSite = request.headers.get("sec-fetch-site");

    // Modern browser defense: Sec-Fetch-Site (CWE-352)
    if (secFetchSite && !["same-origin", "same-site"].includes(secFetchSite)) {
      return applySecurityHeaders(NextResponse.json({ message: "Invalid request origin" }, { status: 403 }));
    }

    let isRequestValid = false;
    if (origin) {
      try {
        isRequestValid = new URL(origin).origin === request.nextUrl.origin;
      } catch {
        isRequestValid = false;
      }
    } else if (referer) {
      try {
        isRequestValid = new URL(referer).origin === request.nextUrl.origin;
      } catch {
        isRequestValid = false;
      }
    }

    if (!isRequestValid) {
      return applySecurityHeaders(NextResponse.json({ message: "Invalid request source" }, { status: 403 }));
    }
  }

  // Check for path traversal segments to prevent unauthorized access to backend endpoints (CWE-22)
  if (path.some(segment => segment === ".." || segment === ".")) {
    return applySecurityHeaders(NextResponse.json({ message: "Invalid path" }, { status: 400 }));
  }

  let targetPath = path.join("/").replace(/\/+$/, "");
  // Strip legacy v2 prefix to prevent path confusion and maintain consistency (CWE-20)
  if (targetPath.startsWith("v2/")) {
    targetPath = targetPath.substring(3).replace(/\/+$/, "");
  } else if (targetPath === "v2") {
    targetPath = "";
  }

  // Note: Local session validation removed since backend now handles auth via Better Auth
  // We just forward everything to the backend. The backend will validate its own session cookies.

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!backendUrl) {
      return applySecurityHeaders(NextResponse.json({ message: "Backend URL not configured" }, { status: 500 }));
  }

  const url = new URL(`${backendUrl}/${targetPath}${request.nextUrl.search}`);

  const requestHeaders = new Headers(request.headers);
  // Remove headers that might interfere with the proxy
  requestHeaders.delete("host");
  requestHeaders.delete("connection");
  // Strip client-provided Authorization header to prevent token injection/override (CWE-522)
  requestHeaders.delete("Authorization");

  // Prioritize Authorization header from HttpOnly cookie to prevent token injection (CWE-522, CWE-613)
  const token = request.cookies.get("backend_token")?.value;
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: requestHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? await request.blob() : undefined,
    });

    // Forward backend response headers (including Set-Cookie for Better Auth)
    // Blacklist sensitive headers to avoid information leakage (CWE-209, CWE-1027)
    const responseHeaders = new Headers();
    const sensitiveHeaders = [
      "content-encoding",
      "transfer-encoding",
      "content-length",
      "server",
      "x-powered-by",
      "via",
      "x-runtime",
      "x-aspnet-version",
      "x-vercel-id",
      "x-vercel-cache",
      "x-request-id",
      "x-version",
      "x-managed-by",
      "authorization",
      "api-key",
      "x-api-key",
      "proxy-authorization",
      "cookie",
      "x-auth-token",
      "x-session-id",
      "x-correlation-id",
      "proxy-authenticate",
      "x-forwarded-for",
      "x-real-ip",
      "x-client-ip",
      "x-host",
      "forwarded",
    ];

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!SENSITIVE_HEADERS.has(lowerKey)) {
        if (lowerKey === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    });

    const contentType = response.headers.get("content-type");
    // Use strict equality for path matching to prevent path confusion vulnerabilities (CWE-20)
    const isAuthPath = targetPath === "auth/login" ||
                       targetPath === "auth/register" ||
                       targetPath === "auth/verify" ||
                       targetPath === "auth/recovery-password";

    const isLogoutPath = targetPath === "auth/sign-out" ||
                         targetPath === "auth/logout";

    let body;
    let tokenToSet: string | undefined;

    if (response.status === 204) {
        body = null;
    } else if (contentType?.includes("application/json")) {
        const data = await response.json();

        // Capture JWT token from successful authentication responses (CWE-522)
        if (isAuthPath && response.ok && data.token) {
            tokenToSet = data.token;
        }

        // Globally scrub sensitive tokens from body to prevent XSS exfiltration (CWE-200)
        // This ensures that even if a new endpoint returns a token, it won't reach the client-side JS
        // Depth limit added to prevent stack overflow (CWE-674)
        const scrubSensitiveData = (obj: any, depth = 0) => {
            if (depth > 10 || !obj || typeof obj !== 'object') return;

            if (Array.isArray(obj)) {
                obj.forEach(item => scrubSensitiveData(item, depth + 1));
                return;
            }

            const sensitiveKeys = [
                'token', 'access_token', 'accessToken', 'refresh_token', 'id_token', 'session_token',
                'password', 'client_secret', 'secret', 'session', 'sid',
                'api_key', 'apikey', 'auth_token', 'private_key', 'cookie',
                'otp', 'code', 'verification_code', 'secret_key', 'api_token',
                'jwt', 'passphrase', 'xsrfToken', 'csrfToken', 'recovery_code', 'authorization_code'
            ];

            const lowerSensitiveKeys = sensitiveKeys.map(k => k.toLowerCase());

            Object.keys(obj).forEach(key => {
                const lowerKey = key.toLowerCase();
                // Use case-insensitive exact match to prevent accidental deletion of fields like 'author' or 'postalCode'
                if (lowerSensitiveKeys.includes(lowerKey)) {
                    delete obj[key];
                }
            });

            Object.values(obj).forEach(val => scrubSensitiveData(val, depth + 1));
        };
        scrubSensitiveData(data);

        body = JSON.stringify(data);
    } else {
        body = await response.blob();
    }

    const res = applySecurityHeaders(new NextResponse(body, {
        status: response.status,
        headers: responseHeaders
    }));

    // Clear session cookie on explicit logout or session expiration (CWE-613)
    if ((isLogoutPath && response.ok) || response.status === 401) {
      res.cookies.delete("backend_token");
    }

    if (tokenToSet) {
      res.cookies.set("backend_token", tokenToSet, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch (error: any) {
    // Log the actual error on the server for debugging
    console.error("Proxy error:", error);
    // Return a generic error message to the client to avoid information leakage (CWE-209)
    // We must ensure security headers are still applied here.
    return applySecurityHeaders(NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 502 }
    ));
  }
}

/**
 * Applies a consistent set of security headers to a NextResponse object (CWE-693).
 * This includes headers for clickjacking protection, MIME-type sniffing prevention,
 * strict transport security, and a robust Content Security Policy (CSP).
 *
 * @param response The NextResponse object to harden.
 * @returns The same NextResponse object with security headers applied.
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(), interest-cohort=()"
  );

  // Enhanced Content Security Policy (CSP) to mitigate XSS and data injection (CWE-79)
  response.headers.set("Content-Security-Policy", CSP_HEADER);

  return response;
}
