## 2025-05-22 - [Mitigate Information Leakage in API Proxy]
**Vulnerability:** Raw `error.message` was being returned to the client in the API proxy route handler (`src/app/api/[...path]/route.ts`) when a fetch error occurred. This could leak internal backend URLs, network details, or stack traces (CWE-209).
**Learning:** Even simple proxy handlers can inadvertently expose internal architecture details if they forward or return raw error objects from internal service calls.
**Prevention:** Always catch internal errors and return generic, localized error messages to the client while logging the detailed error on the server for debugging.

## 2026-05-11 - [XSS Protection in Blog Rendering]
**Vulnerability:** Blog content was being rendered using `dangerouslySetInnerHTML` without sanitization, exposing the application to Cross-Site Scripting (XSS) attacks if the backend content is compromised or contains malicious scripts.
**Learning:** Even internal or "trusted" content should be sanitized before being injected into the DOM to maintain defense-in-depth.
**Prevention:** Use `isomorphic-dompurify` to sanitize HTML strings before using them in `dangerouslySetInnerHTML`, ensuring compatibility with both SSR and client-side rendering.

## 2026-05-12 - [Hardening API Proxy and Response Security]
**Vulnerability:** The API proxy was forwarding sensitive backend headers (e.g., `Server`, `X-Powered-By`) and the global middleware lacked standard security headers, exposing the app to information leakage and clickjacking.
**Learning:** Security headers should be enforced at the entry point (middleware) and proxies must explicitly blacklist internal headers to prevent leaking backend environment details.
**Prevention:** Implement a blacklist for sensitive headers in proxy handlers and inject `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` in global middleware.

## 2026-05-18 - [Hardening HTTPS with HSTS]
**Vulnerability:** The application was missing the `Strict-Transport-Security` (HSTS) header, leaving it vulnerable to protocol downgrade attacks (SSL stripping) and cookie hijacking if a user is redirected from HTTP to HTTPS.
**Learning:** Security headers should be treated as a bundle in the global middleware to ensure defense-in-depth is applied to every response.
**Prevention:** Always include `Strict-Transport-Security` with a long `max-age`, `includeSubDomains`, and `preload` directives in the production middleware to force HTTPS usage.

## 2026-05-20 - [Hardening Security Headers in API Proxy]
**Vulnerability:** API routes were bypassed by global middleware security header injection due to the middleware matcher configuration, leaving them vulnerable to clickjacking and MIME-sniffing.
**Learning:** Next.js middleware matchers that exclude `/api` require manual header injection in the API route handlers to ensure uniform security across the entire application surface.
**Prevention:** Always mirror global security headers in catch-all API proxy handlers or ensure middleware covers all routes including API segments.

## 2026-05-20 - [Manual Security Headers in API Proxy]
**Vulnerability:** API routes were bypassing the global middleware security headers due to the matcher configuration, leaving API responses without protection against clickjacking or sniffing.
**Learning:** In Next.js, if middleware excludes API routes for performance or compatibility, security headers must be manually injected in the API route handlers or proxy to maintain a consistent security posture.
**Prevention:** Ensure API proxy responses explicitly set `X-Frame-Options`, `X-Content-Type-Options`, and other critical security headers when the global middleware doesn't cover them.

## 2026-05-21 - [Hardening Security Header Precedence and CSP]
**Vulnerability:** Security headers and Content Security Policy (CSP) were vulnerable to being overridden by the backend in the API proxy. Additionally, the CSP lacked protection against plugin-based attacks and base-tag hijacking.
**Learning:** In a proxy, security headers MUST be set after forwarding backend headers to ensure the proxy's security posture is enforced. A robust CSP should include 'object-src' and 'base-uri' directives.
**Prevention:** Always set security headers last in proxy handlers and use a comprehensive CSP that restricts object/plugin loading and base URL manipulation.

## 2026-05-22 - [Harden API Proxy with Cookie-to-Header Injection]
**Vulnerability:** The application relied on frontend-side storage (localStorage) for JWT tokens, making them vulnerable to XSS-based exfiltration. While Better Auth was partially implemented, the legacy proxy lacked a robust way to bridge HttpOnly cookies with backend-required Authorization headers.
**Learning:** An API proxy can act as a secure bridge by extracting sensitive tokens from HttpOnly cookies and injecting them as headers into outgoing requests, allowing the frontend to move away from insecure storage while maintaining backend compatibility.
**Prevention:** Implement path-specific token capture in the proxy for successful auth responses and use automated header injection from HttpOnly cookies as a defense-in-depth measure.

## 2026-05-25 - [Hardening API Proxy Cookie Handling and Session Termination]
**Vulnerability:** The API proxy was overwriting the `Set-Cookie` header instead of appending multiple cookies from the backend, potentially dropping security cookies. Additionally, the `backend_token` HttpOnly cookie was not being cleared upon logout, leading to stale sessions on the client.
**Learning:** Catch-all proxies must use `.append()` for headers that support multiple values (like `Set-Cookie`) to avoid data loss. Manual session termination (clearing cookies) in the proxy is necessary when the frontend doesn't have direct access to HttpOnly cookies.
**Prevention:** Always use `responseHeaders.append("Set-Cookie", ...)` in proxy handlers and implement explicit cookie deletion for known logout paths.

## 2026-05-27 - [Universal Security Header Enforcement]
**Vulnerability:** Security headers were missing on redirect responses from middleware and on error responses from API handlers, leaving these states vulnerable to clickjacking and other attacks (CWE-693).
**Learning:** Next.js `NextResponse.redirect` and `NextResponse.json` (in catch blocks) create fresh response objects. Security headers must be explicitly applied to these specific objects before they are returned to ensure a consistent security posture across all execution paths.
**Prevention:** Always capture the response object in a variable and apply security headers to it before returning, especially for redirects and error handlers.

## 2026-05-30 - [Secure Token Handling with Proxy Scrubbing and Injection]
**Vulnerability:** JWT tokens were being returned in JSON response bodies and stored in client-side localStorage, making them vulnerable to XSS exfiltration (CWE-200).
**Learning:** Moving to HttpOnly cookies is only the first step; the proxy must also scrub the token from the response body to ensure it's truly inaccessible to JavaScript. Furthermore, the proxy must handle the bridge between cookies and the backend's expected Authorization headers.
**Prevention:** Implement response body scrubbing in the API proxy for all auth-related paths and ensure the proxy injects the secure cookie-based token into outgoing backend requests.

## 2026-05-31 - [Centralized Security Header Enforcement in API Proxy]
**Vulnerability:** Early returns (validation failures, config errors) in the API proxy were bypassing security header injection, leaving some response paths unprotected against clickjacking and other client-side attacks (CWE-693).
**Learning:** Manually applying security headers to every response path is error-prone. A centralized helper function ensures consistent enforcement across all exit points, including success, error, and early return states.
**Prevention:** Use a dedicated `applySecurityHeaders` utility in proxy route handlers to wrap all `NextResponse` objects before they are returned.

## 2026-06-05 - [Harden Token Scrubbing and Route-Specific Caching]
**Vulnerability:** The API proxy's recursive JSON scrubbing was missing several modern session keys (e.g., `id_token`, `sid`, `session_token`), potentially leaking sensitive data. Additionally, missing strict cache control on private routes could expose financial data via browser history/cache.
**Learning:** Security posture must be comprehensive and context-aware. Proxies should scrub all variations of session identifiers, and middleware should enforce `no-store` policies specifically on private routes to protect sensitive data without sacrificing public asset performance.
**Prevention:** Expand sensitive key blacklists for response scrubbing and use conditional middleware logic to apply strict cache-control only to authenticated routes.
