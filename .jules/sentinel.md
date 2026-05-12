## 2025-05-22 - [Mitigate Information Leakage in API Proxy]
**Vulnerability:** Raw `error.message` was being returned to the client in the API proxy route handler (`src/app/api/[...path]/route.ts`) when a fetch error occurred. This could leak internal backend URLs, network details, or stack traces (CWE-209).
**Learning:** Even simple proxy handlers can inadvertently expose internal architecture details if they forward or return raw error objects from internal service calls.
**Prevention:** Always catch internal errors and return generic, localized error messages to the client while logging the detailed error on the server for debugging.

## 2026-05-11 - [XSS Protection in Blog Rendering]
**Vulnerability:** Blog content was being rendered using `dangerouslySetInnerHTML` without sanitization, exposing the application to Cross-Site Scripting (XSS) attacks if the backend content is compromised or contains malicious scripts.
**Learning:** Even internal or "trusted" content should be sanitized before being injected into the DOM to maintain defense-in-depth.
**Prevention:** Use `isomorphic-dompurify` to sanitize HTML strings before using them in `dangerouslySetInnerHTML`, ensuring compatibility with both SSR and client-side rendering.
