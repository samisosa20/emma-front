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

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: requestHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? await request.blob() : undefined,
    });

    // Forward backend response headers (including Set-Cookie for Better Auth)
    // Blacklist sensitive headers to avoid information leakage (CWE-209)
    const responseHeaders = new Headers();
    const sensitiveHeaders = ["content-encoding", "transfer-encoding", "content-length", "server", "x-powered-by", "via", "x-runtime"];
    response.headers.forEach((value, key) => {
        if (!sensitiveHeaders.includes(key.toLowerCase())) {
            responseHeaders.set(key, value);
        }
    });

    // Add global security headers (CWE-1027, CWE-693)
    responseHeaders.set("X-Frame-Options", "DENY");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    responseHeaders.set("X-XSS-Protection", "1; mode=block");
    responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    responseHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

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

    // For traditional login compatibility, still handle the JWT token if present
    // Ensure cookie is set for both login and register to maintain session consistency
    const isAuthPath = targetPath.endsWith("auth/login") || targetPath.endsWith("auth/register");
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
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 502 }
    );
  }
}
