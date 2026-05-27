import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    return handleRequest(request, params);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
    return handleRequest(request, params);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    return handleRequest(request, params);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
    return handleRequest(request, params);
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
    return handleRequest(request, params);
}

async function handleRequest(request: NextRequest, { path }: { path: string[] }) {
  // Check for path traversal segments to prevent unauthorized access to backend endpoints (CWE-22)
  if (path.some(segment => segment === ".." || segment === ".")) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 });
  }

  const targetPath = path.join("/");

  // Note: Local session validation removed since backend now handles auth via Better Auth
  // We just forward everything to the backend. The backend will validate its own session cookies.

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
      return NextResponse.json({ message: "Backend URL not configured" }, { status: 500 });
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

    // Consolidate and enforce security headers at the proxy level (CWE-693)
    // These are set LAST to ensure backend values don't override the proxy's security policy
    responseHeaders.set("X-Frame-Options", "DENY");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    responseHeaders.set("X-Permitted-Cross-Domain-Policies", "none");
    responseHeaders.set("X-Download-Options", "noopen");
    responseHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    responseHeaders.set(
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
      connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || ""};
      frame-ancestors 'none';
      form-action 'self';
      object-src 'none';
      base-uri 'self';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim();
    responseHeaders.set("Content-Security-Policy", cspHeader);

    const contentType = response.headers.get("content-type");
    let body;
    if (contentType?.includes("application/json")) {
        body = JSON.stringify(await response.json());
    } else {
        body = await response.blob();
    }

    const res = new NextResponse(body, {
        status: response.status,
        headers: responseHeaders
    });

    // Capture JWT token from successful authentication responses to maintain HttpOnly session (CWE-522)
    const isAuthPath = targetPath.endsWith("auth/login") ||
                       targetPath.endsWith("auth/register") ||
                       targetPath.endsWith("auth/verify") ||
                       targetPath.endsWith("auth/recovery-password");

    const isLogoutPath = targetPath.endsWith("auth/sign-out") ||
                         targetPath.endsWith("auth/logout");

    if (isLogoutPath && response.ok) {
      res.cookies.delete("backend_token");
    }

    if (isAuthPath && response.ok && contentType?.includes("application/json")) {
      const data = typeof body === "string" ? JSON.parse(body) : {};
      if (data.token) {
        res.cookies.set("backend_token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }

    return res;
  } catch (error: any) {
    // Log the actual error on the server for debugging
    console.error("Proxy error:", error);
    // Return a generic error message to the client to avoid information leakage (CWE-209)
    // We must ensure security headers are still applied here.
    const errorResponse = NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 502 }
    );

    errorResponse.headers.set("X-Frame-Options", "DENY");
    errorResponse.headers.set("X-Content-Type-Options", "nosniff");
    errorResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    errorResponse.headers.set("X-Permitted-Cross-Domain-Policies", "none");
    errorResponse.headers.set("X-Download-Options", "noopen");
    errorResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    errorResponse.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(), interest-cohort=()"
    );

    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://flagcdn.com https://lh3.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
      connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || ""};
      frame-ancestors 'none';
      form-action 'self';
      object-src 'none';
      base-uri 'self';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim();
    errorResponse.headers.set("Content-Security-Policy", cspHeader);

    return errorResponse;
  }
}
