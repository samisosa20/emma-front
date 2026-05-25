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
