import { auth } from "@/share/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

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
  const isLogin = targetPath.includes("auth/login");

  let session = null;
  if (!isLogin) {
    session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
      return NextResponse.json({ message: "Backend URL not configured" }, { status: 500 });
  }

  const url = new URL(`${backendUrl}/${targetPath}${request.nextUrl.search}`);

  const backendToken = request.cookies.get("backend_token")?.value;

  const requestHeaders = new Headers(request.headers);
  // Remove headers that might interfere with the proxy
  requestHeaders.delete("host");
  requestHeaders.delete("cookie");
  requestHeaders.delete("connection");

  if (backendToken) {
    requestHeaders.set("Authorization", `Bearer ${backendToken}`);
  }

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: requestHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? await request.blob() : undefined,
    });

    // Forward backend response headers
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
        // Skip security headers that Next.js might want to control
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
