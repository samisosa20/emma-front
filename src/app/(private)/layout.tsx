import type { Metadata } from "next";
import { cookies } from "next/headers";
import { authClient } from "@/share/lib/auth-client";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ModalVerify from "./components/ModalVerify";
import BottomBar from "./components/BottomBar";
import { SessionProvider } from "@/share/components/SessionProvider";
import { ThemeProvider } from "@/share/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Fiona | wallet",
  description: "Manejo de finanzas personales...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: cookieHeader,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <div className="flex flex-col h-screen w-full overflow-hidden bg-wf-background text-wf-on-background transition-colors duration-200">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto px-3.5 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8 relative w-full min-w-0">
              <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 pb-24 md:pb-8 w-full min-w-0">
                {children}
                <footer className="h-[35px] text-center mt-auto pt-6 pb-2">
                  <p className="text-xs sm:text-sm text-wf-on-surface-variant font-wf-body-regular">
                    © Copyright 2023 - {new Date().getFullYear()} Fiona
                  </p>
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
