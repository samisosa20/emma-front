import type { Metadata } from "next";
import { cookies } from "next/headers";
import { authClient } from "@/share/lib/auth-client";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import { SessionProvider } from "@/share/components/SessionProvider";
import { ThemeProvider } from "@/share/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Fiona | wallet",
  description: "Manejo de finanzas personales...",
};

async function getServerSession(cookieHeader: string) {
  if (!cookieHeader || !cookieHeader.includes("session_token")) {
    return null;
  }

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (rawApiUrl) {
    try {
      const backendBase = rawApiUrl.endsWith("/api/v2")
        ? rawApiUrl
        : `${rawApiUrl}/api/v2`;
      const response = await fetch(`${backendBase}/auth/get-session`, {
        headers: { cookie: cookieHeader },
        cache: "no-store",
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      return null;
    }
  }

  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: cookieHeader,
      },
    },
  });
  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const session = await getServerSession(cookieHeader);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-slate-950 text-slate-100 relative selection:bg-emerald-500/30 selection:text-emerald-300">
          {/* Ambient Lighting Background Meshes (Matching Landing Page) */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/[0.04] blur-[150px] rounded-full z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[150px] rounded-full z-0"
          />

          <Header />
          <div className="flex flex-1 overflow-hidden relative z-10">
            <Navbar />
            <main className="flex-1 overflow-y-auto px-3.5 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 relative w-full min-w-0 custom-scrollbar">
              <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 pb-28 lg:pb-10 w-full min-w-0">
                {children}
                <footer className="mt-auto pt-8 pb-4 text-center border-t border-slate-800/60">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-medium text-slate-400">
                        Fiona Core v3.0 • Cifrado AES-256 activo
                      </span>
                    </div>
                    <p className="font-wf-body-regular">
                      © 2023 - {new Date().getFullYear()} Fiona. Todos los derechos reservados.
                    </p>
                  </div>
                </footer>
              </div>
            </main>
          </div>
          <BottomBar />
          {/* <ModalVerify /> */}
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
