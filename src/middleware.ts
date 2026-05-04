import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

interface Session {
    user: any;
    session: any;
}


export default async function middleware(request: NextRequest) {

  console.log("=== MIDDLEWARE START ===");
  console.log("URL:", request.url);
  console.log("Cookies:", request.cookies.getAll());
  
  const apiUrl = process.env.NEXT_PUBLIC_INTERNAL_API_URL || "http://localhost:3030";
  console.log("API URL:", apiUrl);

  const response = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    console.log("=== MIDDLEWARE FETCH SUCCESS ===");
    console.log("Status:", response.status);
  
  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/forgot") ||
    request.nextUrl.pathname.startsWith("/blogs");

  if (!response.ok && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (response.ok && isPublicRoute && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
