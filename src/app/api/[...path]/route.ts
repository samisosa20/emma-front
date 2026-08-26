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
  "proxy-authenticate",
  "x-forwarded-for",
  "x-real-ip",
  "x-client-ip",
  "x-host",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
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
  "verification_code",
  "secret_key",
  "api_token",
  "jwt",
  "passphrase",
  "xsrfToken",
  "csrfToken",
  "recovery_code",
  "authorization_code",
]);

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleRequest(request, { path });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleRequest(request, { path });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleRequest(request, { path });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleRequest(request, { path });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleRequest(request, { path });
}

async function handleRequest(
  request: NextRequest,
  { path }: { path: string[] },
) {
  // Check for path traversal segments to prevent unauthorized access to backend endpoints (CWE-22)
  if (path.some((segment) => segment === ".." || segment === ".")) {
    return applySecurityHeaders(
      NextResponse.json({ message: "Invalid path" }, { status: 400 }),
    );
  }

  let targetPath = path.join("/").replace(/\/+/g, "/").replace(/\/+$/, "");
  // Strip legacy v2 prefix to prevent path confusion and maintain consistency (CWE-20)
  if (targetPath.startsWith("v2/")) {
    targetPath = targetPath.substring(3).replace(/\/+$/, "");
  } else if (targetPath === "v2") {
    targetPath = "";
  }

  // Identificador global para rutas de Better Auth
  const isBetterAuthRoute = targetPath.startsWith("auth/");

  // CSRF Protection: Verify Origin/Referer matches for state-changing requests (CWE-352)
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const secFetchSite = request.headers.get("sec-fetch-site");

    // Modern browser defense: Sec-Fetch-Site (CWE-352)
    // Permisividad añadida para cross-site en callbacks de OAuth
    if (
      secFetchSite &&
      !["same-origin", "same-site"].includes(secFetchSite) &&
      !isBetterAuthRoute
    ) {
      return applySecurityHeaders(
        NextResponse.json(
          { message: "Invalid request origin" },
          { status: 403 },
        ),
      );
    }

    const host =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    const proto =
      request.headers.get("x-forwarded-proto") ||
      request.nextUrl.protocol.replace(":", "");
    const expectedOrigin = host ? `${proto}://${host}` : request.nextUrl.origin;
    const internalOrigin = request.nextUrl.origin; // Mantener como fallback local

    let isRequestValid = false;
    if (origin) {
      try {
        const requestOrigin = new URL(origin).origin;
        isRequestValid =
          requestOrigin === expectedOrigin || requestOrigin === internalOrigin;
      } catch {
        isRequestValid = false;
      }
    } else if (referer) {
      try {
        const requestReferer = new URL(referer).origin;
        isRequestValid =
          requestReferer === expectedOrigin ||
          requestReferer === internalOrigin;
      } catch {
        isRequestValid = false;
      }
    }

    // Bypass de CSRF de origen estricto para las rutas de autenticación
    if (!isRequestValid && !isBetterAuthRoute) {
      return applySecurityHeaders(
        NextResponse.json(
          { message: "Invalid request source" },
          { status: 403 },
        ),
      );
    }
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!backendUrl) {
    return applySecurityHeaders(
      NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 },
      ),
    );
  }

  const url = new URL(`${backendUrl}/${targetPath}${request.nextUrl.search}`);

  const requestHeaders = new Headers(request.headers);
  // Remove headers that might interfere with the proxy
  requestHeaders.set("host", request.nextUrl.host);
  requestHeaders.delete("connection");
  // Strip client-provided Authorization header to prevent token injection/override (CWE-522)
  requestHeaders.delete("Authorization");

  // Strip spoofable headers to prevent IP spoofing and header injection (CWE-290, CWE-450)
  // MODIFICACIÓN: Preservamos las cabeceras de reenvío si es una ruta de Better Auth
  if (!isBetterAuthRoute) {
    requestHeaders.delete("x-forwarded-for");
    requestHeaders.delete("x-real-ip");
    requestHeaders.delete("x-forwarded-host");
    requestHeaders.delete("x-forwarded-proto");
    requestHeaders.delete("forwarded");
    requestHeaders.delete("x-client-ip");
  } else {
    // Aseguramos que Better Auth sepa desde dónde se llamó originalmente al proxy
    if (!requestHeaders.has("x-forwarded-host")) {
      requestHeaders.set("x-forwarded-host", request.nextUrl.host);
    }
    if (!requestHeaders.has("x-forwarded-proto")) {
      requestHeaders.set(
        "x-forwarded-proto",
        request.nextUrl.protocol.replace(":", ""),
      );
    }
  }

  requestHeaders.delete("x-api-key");
  requestHeaders.delete("x-forwarded-port");
  requestHeaders.delete("x-forwarded-server");
  requestHeaders.delete("x-original-url");
  requestHeaders.delete("x-rewrite-url");

  // Prioritize Authorization header from HttpOnly cookie to prevent token injection (CWE-522, CWE-613)
  const token = request.cookies.get("backend_token")?.value;
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
    try {
      const { memberTokensMap } = require("@/app/api/shared-spaces/store");
      const parts = token.split(".");
      if (parts.length === 3) {
        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = Buffer.from(payloadBase64, "base64").toString("utf8");
        const payload = JSON.parse(json);
        if (payload) {
          const uId = payload.id || payload.sub || payload.userId;
          const uEmail = payload.email;
          if (uId) memberTokensMap.set(String(uId), token);
          if (uEmail) memberTokensMap.set(String(uEmail).toLowerCase(), token);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Forward Shared Space context header (do not inject into query params to prevent Prisma unknown field errors)
  const spaceId = request.headers.get("x-space-id") || request.nextUrl.searchParams.get("spaceId") || request.nextUrl.searchParams.get("space_id");
  url.searchParams.delete("spaceId");
  url.searchParams.delete("space_id");

  if (spaceId) {
    requestHeaders.set("X-Space-Id", spaceId);
  }
  const sharedSpace = request.headers.get("x-shared-space");
  if (sharedSpace) {
    requestHeaders.set("X-Shared-Space", sharedSpace);
  }

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: requestHeaders,
      redirect: "manual",
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.blob()
          : undefined,
    });

    // Forward backend response headers (excluding Set-Cookie to handle it manually)
    // Blacklist sensitive headers to avoid information leakage (CWE-209, CWE-1027)
    const responseHeaders = new Headers();

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Excluimos set-cookie del copiado masivo
      if (!SENSITIVE_HEADERS.has(lowerKey) && lowerKey !== "set-cookie") {
        responseHeaders.set(key, value);
      }
    });

    const contentType = response.headers.get("content-type");
    // Use strict equality for path matching to prevent path confusion vulnerabilities (CWE-20)
    const isAuthPath =
      targetPath === "auth/login" ||
      targetPath === "auth/register" ||
      targetPath === "auth/verify" ||
      targetPath === "auth/recovery-password";

    const isLogoutPath =
      targetPath === "auth/sign-out" || targetPath === "auth/logout";

    let body;
    let tokenToSet: string | undefined;

    if (response.status === 204) {
      body = null;
    } else if (contentType?.includes("application/json")) {
      let data = await response.json();

      // Capture JWT token from successful authentication responses (CWE-522)
      if (isAuthPath && response.ok && data.token) {
        tokenToSet = data.token;
      }

      // Shared Space Resource Pooling & Cross-Partner Aggregation
      if (spaceId) {
        try {
          const { getOrCreateSpaceStore, spacesRegistry, memberTokensMap } = require("@/app/api/shared-spaces/store");
          const spaceStore = getOrCreateSpaceStore(spaceId);
          const currentSpace = spacesRegistry.get(spaceId);

          const getTargetResource = (pathStr: string) => {
            if (pathStr === "accounts" || pathStr.startsWith("accounts/")) return "accounts";
            if (pathStr === "movements" || pathStr.startsWith("movements/")) return "movements";
            if (pathStr === "events" || pathStr.startsWith("events/")) return "events";
            if (pathStr === "investments" || pathStr.startsWith("investments/")) return "investments";
            if (pathStr === "budgets" || pathStr.startsWith("budgets/")) return "budgets";
            if (pathStr === "categories" || pathStr.startsWith("categories/")) return "categories";
            if (pathStr === "payments" || pathStr.startsWith("payments/")) return "payments";
            if (pathStr === "heritages" || pathStr.startsWith("heritages/")) return "heritages";
            if (pathStr.startsWith("reports/")) return "reports";
            return null;
          };

          const resource = getTargetResource(targetPath);

          // Populate primary user items into store
          if (resource && resource !== "reports" && spaceStore) {
            if (request.method === "GET") {
              if (targetPath === resource) {
                if (data && Array.isArray(data.content)) {
                  data.content.forEach((item: any) => {
                    if (item && (item.id || item.accountId || item.movementId)) {
                      const id = String(item.id || item.accountId || item.movementId);
                      spaceStore[resource].set(id, item);
                    }
                  });
                } else if (Array.isArray(data)) {
                  data.forEach((item: any) => {
                    if (item && (item.id || item.accountId || item.movementId)) {
                      const id = String(item.id || item.accountId || item.movementId);
                      spaceStore[resource].set(id, item);
                    }
                  });
                }
              } else if (targetPath.startsWith(`${resource}/`)) {
                if (response.ok && data) {
                  const item = data.content || data.data || data;
                  if (item && (item.id || item.accountId || item.movementId)) {
                    spaceStore[resource].set(String(item.id || item.accountId || item.movementId), item);
                  }
                }
              }
            } else if (request.method === "POST") {
              if (response.ok && data) {
                const item = data.content || data.data || data;
                if (item && (item.id || item.accountId || item.movementId)) {
                  spaceStore[resource].set(String(item.id || item.accountId || item.movementId), item);
                }
              }
            } else if (request.method === "DELETE") {
              const id = targetPath.split("/")[1];
              if (id) spaceStore[resource].delete(id);
            }
          }

          // Query backend on behalf of other space members if tokens are available
          if (request.method === "GET" && currentSpace) {
            const tokensToQuery = new Set<string>();

            if (currentSpace.members) {
              for (const member of currentSpace.members) {
                if (member.token && member.token !== token) tokensToQuery.add(member.token);
                if (member.userId && memberTokensMap.has(member.userId)) {
                  const t = memberTokensMap.get(member.userId);
                  if (t && t !== token) tokensToQuery.add(t);
                }
                if (member.email && memberTokensMap.has(member.email.toLowerCase())) {
                  const t = memberTokensMap.get(member.email.toLowerCase());
                  if (t && t !== token) tokensToQuery.add(t);
                }
              }
            }

            for (const t of memberTokensMap.values()) {
              if (t && t !== token) {
                tokensToQuery.add(t);
              }
            }

            for (const partnerToken of tokensToQuery) {
              try {
                const partnerHeaders = new Headers(requestHeaders);
                partnerHeaders.set("Authorization", `Bearer ${partnerToken}`);
                const partnerRes = await fetch(url.toString(), {
                  method: "GET",
                  headers: partnerHeaders,
                });
                if (partnerRes.ok && partnerRes.headers.get("content-type")?.includes("application/json")) {
                  const partnerData = await partnerRes.json();
                  if (targetPath.startsWith("reports/account/") && targetPath.endsWith("/balance")) {
                    if (partnerData && (partnerData.code || partnerData.totalAmount !== 0)) {
                      data = partnerData;
                    }
                  } else {
                    const partnerItems = Array.isArray(partnerData.content) ? partnerData.content : (Array.isArray(partnerData) ? partnerData : (partnerData ? [partnerData] : []));
                    if (resource && resource !== "reports" && partnerItems.length > 0) {
                      partnerItems.forEach((pItem: any) => {
                        if (pItem && (pItem.id || pItem.accountId || pItem.movementId)) {
                          const pId = String(pItem.id || pItem.accountId || pItem.movementId);
                          spaceStore[resource].set(pId, pItem);
                        }
                      });
                    }
                  }
                }
              } catch (pErr) {
                // continue
              }
            }
          }

          // Format output for list endpoints
          if (resource && spaceStore && request.method === "GET") {
            if (resource === "movements") {
              const accountId = request.nextUrl.searchParams.get("accountId");
              const eventId = request.nextUrl.searchParams.get("eventId");
              let allMoves = Array.from(spaceStore.movements.values());

              if (accountId) {
                allMoves = allMoves.filter((m: any) => m.accountId === accountId || m.account?.id === accountId);
              }
              if (eventId) {
                allMoves = allMoves.filter((m: any) => m.eventId === eventId || m.event?.id === eventId);
              }

              allMoves.sort((a: any, b: any) => {
                const dateA = new Date(a.datePurchase || a.createdAt || 0).getTime();
                const dateB = new Date(b.datePurchase || b.createdAt || 0).getTime();
                return dateB - dateA;
              });

              if (data && Array.isArray(data.content)) {
                data.content = allMoves;
                data.totalElements = allMoves.length;
              } else if (Array.isArray(data)) {
                data = allMoves;
              } else {
                data = {
                  content: allMoves,
                  totalElements: allMoves.length,
                  page: 1,
                  size: 10,
                  totalPages: 1,
                };
              }
            } else if (resource !== "reports" && targetPath === resource) {
              const allItems = Array.from(spaceStore[resource].values());
              if (data && Array.isArray(data.content)) {
                data.content = allItems;
                if (data.totalElements !== undefined) data.totalElements = allItems.length;
              } else if (Array.isArray(data)) {
                data = allItems;
              }
            } else if (resource !== "reports" && targetPath.startsWith(`${resource}/`)) {
              const id = targetPath.split("/")[1];
              if (id && (!response.ok || response.status === 404)) {
                const cached = spaceStore[resource].get(id);
                if (cached) {
                  data = cached;
                }
              }
            }
          }

          // Handle reports/account/:id/balance calculation & fallback
          if (targetPath.startsWith("reports/account/") && targetPath.endsWith("/balance") && request.method === "GET") {
            const pathParts = targetPath.split("/");
            const accId = pathParts[2];
            if (accId && (!data || (!data.code && Number(data.totalAmount || 0) === 0))) {
              const acc = spaceStore.accounts.get(accId);
              if (acc) {
                const badge = acc.badge || acc.currency || {};
                const code = (typeof badge === "string" ? badge : badge.code) || "USD";
                const symbol = badge.symbol || "$";
                const flag = badge.flag || "🇺🇸";
                const bal = Number(acc.balance ?? acc.initialBalance ?? 0);
                data = {
                  code,
                  symbol,
                  flag,
                  yearlyAmount: bal,
                  monthlyAmount: bal,
                  totalAmount: bal,
                };
              }
            }
          }

          // Reports general-balance aggregation across all shared accounts
          if (targetPath === "reports/general-balance" && request.method === "GET") {
            const accounts = Array.from(spaceStore.accounts.values());
            if (accounts.length > 0) {
              const badgeTotals = new Map<string, { code: string; symbol: string; flag: string; amount: number }>();
              accounts.forEach((acc: any) => {
                const badge = acc.badge || acc.currency || {};
                const code = (typeof badge === "string" ? badge : badge.code) || "USD";
                const symbol = badge.symbol || "$";
                const flag = badge.flag || "🇺🇸";
                const bal = Number(acc.balance ?? acc.initialBalance ?? 0);

                if (!badgeTotals.has(code)) {
                  badgeTotals.set(code, { code, symbol, flag, amount: 0 });
                }
                badgeTotals.get(code)!.amount += bal;
              });

              if (badgeTotals.size > 0) {
                const aggregated = Array.from(badgeTotals.values());
                if (data && Array.isArray(data.content)) {
                  data.content = aggregated;
                } else if (Array.isArray(data)) {
                  data = aggregated;
                }
              }
            }
          }
        } catch (spaceErr) {
          // ignore error to keep response stable
        }
      }

      // Globally scrub sensitive tokens from body to prevent XSS exfiltration (CWE-200)
      // MODIFICACIÓN: Excluimos las respuestas de Better Auth para no borrar códigos de estado vitales
      if (!isBetterAuthRoute) {
        scrubSensitiveData(data);
      }

      body = JSON.stringify(data);
    } else {
      body = await response.blob();
    }

    // Instanciamos la respuesta con las cabeceras estándar
    const res = applySecurityHeaders(
      new NextResponse(body, {
        status: response.status,
        headers: responseHeaders,
      }),
    );

    // CLAVE: Inyectamos las cookies individualmente a la instancia ya creada
    // para evitar que Next.js las agrupe y rompa el formato
    const setCookies = (response.headers as any).getSetCookie?.() || [];
    if (setCookies.length > 0) {
      setCookies.forEach((cookie: string) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

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
    return applySecurityHeaders(
      NextResponse.json(
        { message: "Ocurrió un error al procesar la solicitud." },
        { status: 502 },
      ),
    );
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
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), usb=(), fullscreen=(), interest-cohort=()",
  );

  // Enhanced Content Security Policy (CSP) to mitigate XSS and data injection (CWE-79)
  response.headers.set("Content-Security-Policy", CSP_HEADER);

  return response;
}
