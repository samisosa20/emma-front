import { NextRequest, NextResponse } from "next/server";

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
  // Check for path traversal segments to prevent unauthorized access to backend endpoints (CWE-22)
  if (path.some(segment => segment === ".." || segment === ".")) {
    return applySecurityHeaders(NextResponse.json({ message: "Invalid path" }, { status: 400 }));
  }

  let targetPath = path.join("/");
  // Strip legacy v2 prefix to prevent path confusion and maintain consistency (CWE-20)
  if (targetPath.startsWith("v2/")) {
    targetPath = targetPath.substring(3);
  } else if (targetPath === "v2") {
    targetPath = "";
  }

  // Note: Local session validation removed since backend now handles auth via Better Auth
  // We just forward everything to the backend. The backend will validate its own session cookies.

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
      return applySecurityHeaders(NextResponse.json({ message: "Backend URL not configured" }, { status: 500 }));
  }

  const url = new URL(`${backendUrl}/${targetPath}${request.nextUrl.search}`);

  const requestHeaders = new Headers(request.headers);
  // Remove headers that might interfere with the proxy
  requestHeaders.delete("host");
  requestHeaders.delete("connection");

  // Inject Authorization header from HttpOnly cookie if not present (Defense-in-Depth)
  if (!requestHeaders.has("Authorization")) {
    const token = request.cookies.get("backend_token")?.value;
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
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
    ];

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!sensitiveHeaders.includes(lowerKey)) {
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

    if (contentType?.includes("application/json")) {
        const data = await response.json();

        // Capture JWT token from successful authentication responses (CWE-522)
        if (isAuthPath && response.ok && data.token) {
            tokenToSet = data.token;
            // Scrub token from body to prevent XSS exfiltration (CWE-200)
            delete data.token;
        }

        body = JSON.stringify(data);
    } else {
        body = await response.blob();
    }

    const res = applySecurityHeaders(new NextResponse(body, {
        status: response.status,
        headers: responseHeaders
    }));

    if (isLogoutPath && response.ok) {
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
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(), interest-cohort=()"
  );

  // Enhanced Content Security Policy (CSP) to mitigate XSS and data injection (CWE-79)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
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
