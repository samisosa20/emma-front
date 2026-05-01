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
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
        if (!["content-encoding", "transfer-encoding", "content-length"].includes(key.toLowerCase())) {
            responseHeaders.set(key, value);
        }
    });

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
    const isLogin = targetPath.includes("auth/login");
    if (isLogin && response.ok && contentType?.includes("application/json")) {
      const data = JSON.parse(body as string);
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
    console.error("Proxy error:", error);
    return NextResponse.json({ message: "Proxy error", error: error.message }, { status: 502 });
  }
}
