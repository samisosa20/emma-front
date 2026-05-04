import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_INTERNAL_API_URL || "http://localhost:3030"),
  basePath: "/api/auth"
});