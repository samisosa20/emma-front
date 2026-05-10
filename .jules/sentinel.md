## 2025-05-22 - [Mitigate Information Leakage in API Proxy]
**Vulnerability:** Raw `error.message` was being returned to the client in the API proxy route handler (`src/app/api/[...path]/route.ts`) when a fetch error occurred. This could leak internal backend URLs, network details, or stack traces (CWE-209).
**Learning:** Even simple proxy handlers can inadvertently expose internal architecture details if they forward or return raw error objects from internal service calls.
**Prevention:** Always catch internal errors and return generic, localized error messages to the client while logging the detailed error on the server for debugging.
