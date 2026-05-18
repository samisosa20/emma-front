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
